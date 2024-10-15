from typing import Optional

import folium
from fastapi import APIRouter, Depends, Request
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
    mapa_html = "mapa.html"
    mapa.save(mapa_html)

    # Leer el archivo HTML generado y devolverlo como respuesta
    with open(mapa_html, "r") as f:
        return f.read()
