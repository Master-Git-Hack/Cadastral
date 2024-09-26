from typing import Optional

from fastapi import APIRouter, Depends, Request
from requests import get

from .. import config, database, middlewares
from ..models.fotogrametria import Fotogrametria
from ..models.usuarios import Usuarios

response = middlewares.RESPONSES()


fotogrametria = APIRouter(
    prefix="/fotogrametria",
    tags=["Fotogrametria"],
    # dependencies=[Depends(Usuarios.required), Depends(database.fotogrametria)],
    responses={404: {"description": "Not found"}},
)


@fotogrametria.get(
    "/schemas",
)
def get_municipios(
    # user=Depends(Usuarios.required),
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
def get_schema(
    municipio: str,
    # user=Depends(Usuarios.required),
    Session=Depends(database.fotogrametria),
    table: Optional[str] = None,
):
    # if user is None:
    #     return response.error(status_code=401, message="No autorizado")
    municipio = municipio.title().replace("-", "_")
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
        data = {key: table(Session).all() for key, table in tables.items()}
    else:
        data = tables(Session).all()
    return response.success(data=data)


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
