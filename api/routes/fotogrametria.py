from typing import Optional

import folium
from fastapi import APIRouter, Depends, Request
from fastapi.responses import HTMLResponse
from geoalchemy2.shape import to_shape
from pyproj import Proj, transform
from requests import get
from shapely import wkt
from shapely.geometry import MultiLineString, MultiPoint, MultiPolygon, Polygon

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
    if etapa is not None:
        area_estudio.filter_group(etapa=etapa)
        matriz_vuelo.filter_group(etapa=etapa)
    else:
        area_estudio.all()
        matriz_vuelo.all()
    map_center = [20.6732, -101.3480]  # Ejemplo: Irapuato
    mapa = folium.Map(location=map_center, zoom_start=10)
    area_de_estudio = []
    for area in area_estudio.Current:
        # Convertir la geometría WKT a un objeto Shapely
        data = area_estudio.dict(area, includes=["geom"])
        for point in data.get("geom", {}).get("coordinates", []):
            for pto in point:
                for p in pto:

                    x, y = p
                    lon, lat = utm_proj(x, y, inverse=True)
                    area_de_estudio += [[lat, lon]]
    folium.Polygon(
        locations=area_de_estudio,
        color="blue",
        fill=False,
        fill_opacity=0.1,
        popup="Área de estudio",
    ).add_to(mapa)

    # print(f"Coordenadas de área {area.id}: {coords}")

    # Agregar capa de Google Satellite (necesita clave de API)
    folium.TileLayer(
        "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        attr='&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps/">Google</a>',
        name="Google Satellite",
        overlay=True,
        control=True,
    ).add_to(mapa)

    # Lista de puntos a dibujar en el mapa (latitud, longitud)
    puntos_de_control = [
        {"nombre": "Irapuato 6", "coordenadas": [19.4305, -99.1345]},
        {"nombre": "Irapuato 14", "coordenadas": [19.4315, -99.1332]},
        {"nombre": "Irapuato 22", "coordenadas": [19.4320, -99.1310]},
        {"nombre": "Irapuato 31", "coordenadas": [19.4330, -99.1320]},
        {"nombre": "Irapuato 40", "coordenadas": [19.4310, -99.1350]},
        {"nombre": "Irapuato 47", "coordenadas": [19.4300, -99.1300]},
        {"nombre": "Irapuato 52", "coordenadas": [19.4300, -99.1360]},
    ]

    # Agregar puntos de control al mapa
    for punto in puntos_de_control:
        folium.Marker(
            location=punto["coordenadas"],
            popup=punto["nombre"],
            icon=folium.Icon(color="yellow", icon="info-sign", prefix="fa"),
        ).add_to(mapa)

    # Estación Base GPS
    base_gps_location = [19.4326, -99.1332]
    folium.Marker(
        location=base_gps_location,
        popup="Estación Base GPS",
        icon=folium.Icon(color="red", icon="crosshairs", prefix="fa"),
    ).add_to(mapa)

    # Matriz de vuelo (dibujar líneas rojas)

    # Área de estudio (dibujar borde azul)

    # Agregar leyenda al mapa
    legend_html = """
    <div style="position: fixed; 
                bottom: 50px; left: 50px; width: 150px; height: 150px; 
                border:2px solid grey; background-color: white; z-index:9999; 
                font-size:14px; padding: 10px;">
                <b>Leyenda</b><br>
                <i class="fa fa-circle" style="color:yellow"></i> Puntos de Control<br>
                <i class="fa fa-crosshairs" style="color:red"></i> Estación Base GPS<br>
                <i style="color:red">Matriz de Vuelo</i><br>
                <i style="color:blue">Área de Estudio</i><br>
    </div>
    """
    mapa.get_root().html.add_child(folium.Element(legend_html))

    # Guardar el mapa en un archivo HTML
    mapa_html = "mapa.html"
    mapa.save(mapa_html)

    # Leer el archivo HTML generado y devolverlo como respuesta
    with open(mapa_html, "r") as f:
        return f.read()


# @fotogrametria.get(
#     "/municipio/{municipio}",
# )
# def get_table(
#     municipio: str,
#     table: str,
#     request: Request,
#     # user=Depends(Usuarios.required),
#     Session=Depends(database.fotogrametria),
# ):
#     # if user is None:
#     #     return response.error(status_code=401, message="No autorizado")
#     municipio = municipio.title().replace("-", "_")
#     localidad = Fotogrametria.schema(municipio)
#     localidad = localidad.get(municipio)
#     if localidad is None:
#         return response.error(status_code=404, message="No encontrado")
#     tables = (
#         localidad.tables.get(key)
#         if key is not None and key in localidad.tables
#         else localidad.tables
#     )
#     data = {}
#     filter = dict(request.query_params)
#     if isinstance(tables, dict):
#         data = {key: table(Session).filter(**filter) for key, table in tables.items()}
#     else:
#         data = tables(Session).filter(**filter)
#     return response.success(data=data)
from shapely.geometry import MultiPolygon, Polygon
