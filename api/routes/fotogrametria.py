from typing import List, Optional

import folium
from bs4 import BeautifulSoup
from fastapi import APIRouter, Depends, File, Request, UploadFile
from fastapi.responses import HTMLResponse
from folium.plugins import BeautifyIcon, MeasureControl
from geoalchemy2.shape import to_shape
from pyproj import Proj, transform
from requests import get
from shapely import to_geojson, wkt
from shapely.geometry import (
    MultiLineString,
    MultiPoint,
    MultiPolygon,
    Polygon,
    box,
    mapping,
)
from shapely.ops import split

from .. import cache, config, database, limiter, middlewares
from ..models.fotogrametria import Fotogrametria
from ..models.usuarios import Usuarios

response = middlewares.RESPONSES()


fotogrametria = APIRouter(
    prefix="/fotogrametria",
    tags=["Fotogrametria"],
    # dependencies=[Depends(Usuarios.required), Depends(database.fotogrametria)],
    responses={404: {"description": "Not found"}},
)

# Configuración de la proyección UTM Zona 14N (ajusta según tu área)
utm_proj = Proj(proj="utm", zone=14, ellps="WGS84")  # UTM Zona 14N, WGS84


@fotogrametria.get(
    "/schemas",
)
@limiter.limit("100/minute")
async def get_municipios(
    # user=Depends(Usuarios.required),
    request: Request,
    Session=Depends(database.fotogrametria),
):
    # if user is None:
    #     return response.error(status_code=401, message="No autorizado")
    localidad = Fotogrametria()
    return response.success(
        data=[key.lower().replace("_", "-") for key in localidad.schemas.keys()]
    )


@fotogrametria.get(
    "/",
)
@limiter.limit("100/minute")
def get_schema(
    request: Request,
    municipio: str,
    # offset: int = 0,
    # limit: int = 10,
    etapa: Optional[str] = None,
    offset: Optional[int] = None,
    limit: Optional[int] = None,
    # user=Depends(Usuarios.required),
    Session=Depends(database.fotogrametria),
    table: Optional[str] = None,
):
    municipio = municipio.title().replace("-", "_")
    cache_key = f"fotogrametria:{municipio}:table={table}:etapa={etapa}:offset={offset}:limit={limit}"
    # if user is None:
    #     return response.error(status_code=401, message="No autorizado")
    if cache.exists(cache_key):
        return response.success(data=cache.get(cache_key))

    localidad = Fotogrametria()
    localidad = localidad.schemas.get(municipio)
    localidad = localidad()
    if localidad is None:
        return response.error(status_code=404, message="No encontrado")

    tables = (
        localidad.tables.get(table)
        if table is not None and table in localidad.tables
        else localidad.tables
    )
    data = {}

    if isinstance(tables, dict):
        data = {
            key: table(Session).all(offset=offset, limit=limit)
            for key, table in tables.items()
        }
    else:
        instance = tables(Session)
        if etapa is not None:
            instance.filter_group(etapa=etapa, offset=offset, limit=limit)
        else:
            instance.all(offset=offset, limit=limit)
        data = instance.list()

    return response.success(data=data)


def style_function(feature):
    props = feature.get("properties")
    markup = f"""
        <a >
            <div style="font-size: 0.8em;">
            <div style="width: 10px;
                        height: 10px;
                        border: 1px solid black;
                        border-radius: 5px;
                        background-color: orange;">
            </div>
            {props.get("name")}
        </div>
        </a>
    """
    return {"html": markup}


@fotogrametria.post("/scraping-project")
async def scraping_project(project: UploadFile = File(...)):
    # Leer el contenido del archivo
    contents = await project.read()

    # Analizar el contenido del archivo HTML con BeautifulSoup
    data = BeautifulSoup(contents, "lxml")  # o 'html.parser'
    section = data.find("h2", string="Adjustment Grid Coordinates")
    headers = []
    rows = []
    if section:
        table = section.find_next("table")
        if table:
            headers = [
                th.text.lower().replace(" ", "_").replace("(m)", "").strip()
                for th in table.find_all("th")
            ]
            rows = [
                dict(zip(headers, [td.text.strip() for td in tr.find_all("td")]))
                for tr in table.find_all("tr")[1:]
            ]
    return response.success(data={"headers": headers, "rows": rows})


from os import remove

from PIL import Image


def extract_gps_data(image_path):
    img = Image.open(image_path)
    exif_data = img._getexif()
    gps_info = exif_data.get(34853) if exif_data else None
    print(gps_info)
    if gps_info:
        lat = gps_info[2]  # Latitude
        lon = gps_info[4]  # Longitude
        lat_ref = gps_info[1]  # N or S
        lon_ref = gps_info[3]  # E or W

        latitude = convert_to_degrees(lat)
        if lat_ref != "N":
            latitude = -latitude

        longitude = convert_to_degrees(lon)
        if lon_ref != "E":
            longitude = -longitude

        return latitude, longitude
    return None


def convert_to_degrees(value):
    # Assuming value is a tuple of IFDRational objects
    d = value[0].numerator / value[0].denominator
    m = value[1].numerator / value[1].denominator
    s = value[2].numerator / value[2].denominator

    return d + (m / 60.0) + (s / 3600.0)


from math import sqrt


def calculate_distance(x1, y1, x2, y2):
    return sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)


def assign_nearest_point(image_coords, db_points):
    min_distance = float("inf")
    nearest_point = None

    for point in db_points:
        distance = calculate_distance(
            image_coords[1], image_coords[0], point["x"], point["y"]
        )
        if distance < min_distance:
            min_distance = distance
            nearest_point = point["pto"]

    return nearest_point


@fotogrametria.post("/metadata-images")
async def metadata_images(images: List[UploadFile] = File(...)):
    db_points = [
        {"x": 255396.6232, "y": 2285543.3714, "pto": "70"},
        {"x": 255400.0000, "y": 2285500.0000, "pto": "67"},
    ]
    results = {}
    for img in images:
        image_path = f"/tmp/{img.filename}"
        with open(image_path, "wb") as img_file:
            img_file.write(await img.read())
        gps_data = extract_gps_data(image_path)
        print(gps_data)
        if gps_data:
            results[img.filename] = f"Punto {assign_nearest_point(gps_data, db_points)}"
        remove(image_path)

    return {"results": results}


@fotogrametria.get("/map", response_class=HTMLResponse)
async def get_map(
    municipio: str,
    etapa: Optional[str] = None,
    Session=Depends(database.fotogrametria),
):
    # Crea un mapa centrado en una ubicación específica
    municipio = municipio.title().replace("-", "_")
    localidad = Fotogrametria()
    localidad = localidad.schemas.get(municipio)
    localidad = localidad()
    area_estudio = localidad.AreaEstudio(Session)
    matriz_vuelo = localidad.MatrizVuelo(Session)
    puntos_control = localidad.PuntosControlGNSS(Session)
    if etapa is not None:
        area_estudio.filter_group(etapa=etapa)
        matriz_vuelo.filter_group(etapa=etapa)
        puntos_control.filter_group(etapa=etapa)
    else:
        area_estudio.all()
        matriz_vuelo.all()
        puntos_control.all()
    map_center = [20.6732, -101.3480]  # Ejemplo: Irapuato
    mapa = folium.Map(location=map_center, zoom_start=14)
    folium.TileLayer(
        "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        attr='&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps/">Google</a>',
        name="Google Satellite",
        overlay=True,
        control=True,
    ).add_to(mapa)
    mapa.add_child(MeasureControl())
    for area in area_estudio.Current:
        shape = to_shape(area.geom)
        if shape.geom_type == "MultiPolygon":
            folium.Polygon(
                locations=[
                    list(reversed(utm_proj(*coord, inverse=True)))
                    for polygon in shape.geoms
                    for coord in polygon.exterior.coords
                ],
                color="blue",
                fill=False,
                fill_opacity=0.1,
                popup="Matriz de Vuelo",
            ).add_to(mapa)

    for matriz in matriz_vuelo.Current:
        shape = to_shape(matriz.geom)
        if shape.geom_type == "Polygon":
            folium.Polygon(
                locations=[
                    list(reversed(utm_proj(*coord, inverse=True)))
                    for coord in shape.exterior.coords
                ],
                color="red",
                fill=False,
                fill_opacity=0.1,
                popup="Matriz de Vuelo",
            ).add_to(mapa)

    for punto in puntos_control.Current:

        if hasattr(punto, "pto"):
            pto = punto.pto
        else:
            pto = punto.punto
        if "gnss" not in pto.lower():
            _id = int(pto)
            pto = f"{municipio.title()} {pto}"
            icon = BeautifyIcon(
                icon="crosshairs",
                icon_shape="circle",
                border_color="#E4D00A",
                text_color="#00000",
                number=_id,
                inner_icon_style="margin-top:0;",
            )
        else:
            icon = BeautifyIcon(
                icon="crosshairs", icon_shape="circle", border_color="#E4D00A"
            )
        folium.Marker(
            location=list(
                reversed(utm_proj(float(punto.x), float(punto.y), inverse=True))
            ),
            name=pto,
            icon=icon,
        ).add_to(mapa)
    # Agregar leyenda al mapa

    legend_html = """
    <div style="position: fixed; 
                bottom: 50px; left: 50px; width: 150px; height: 200px; 
                border:2px solid grey; background-color: white; z-index:9999; 
                font-size:14px; padding: 10px;">
                <b>Leyenda</b><br>
                <i class="fa fa-circle" style="color:yellow"></i> Puntos de Control<br>
                <i class="fa fa-crosshairs" style="color:red"></i> Estación Base GNNS<br>
                <i style="color:red">Matriz de Vuelo</i><br>
                <i style="color:blue">Área de Estudio</i><br>
    </div>
    """
    north_arrow_html = """
        <div style="
        position: relative;
        font-size: 24px;
        font-weight: bold;
        color: black;
        transform: rotate(0deg);
        ">&uarr;</div>
    """

    # Add the north arrow as a DivIcon

    mapa.get_root().html.add_child(folium.Element(north_arrow_html))
    mapa.get_root().html.add_child(folium.Element(legend_html))

    # Guardar el mapa en un archivo HTML
    mapa_html = "/mapa.html"
    mapa.save(mapa_html)

    # Leer el archivo HTML generado y devolverlo como respuesta
    with open(mapa_html, "r") as f:
        return f.read()
