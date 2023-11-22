from flasgger import swag_from
from flask import Blueprint, request

from .. import config
from ..models.dataset import Dataset
from ..utils.response import Responses

metadatos_api: Blueprint = Blueprint("Metadatos", __name__, url_prefix="/metadatos")

__swagger: dict = config.API_MODELS.get("metadatos", {})


@metadatos_api.get("/complete")
@swag_from(__swagger.get("get_all_metadatos", {}))
def get_all_metadatos(response: Responses = Responses()) -> Responses:
    meta = Dataset()
    if meta.all() is None:
        return response.error(
            message="Error procesando la solicitud",
            status_code=404,
        )
    return response.success(data=meta.to_list())


@metadatos_api.get("/preview")
@swag_from(__swagger.get("get_all_metadatos_preview", {}))
def get_all_metadatos_preview(response: Responses = Responses()) -> Responses:
    meta = Dataset()
    if meta.all() is None:
        return response.error(
            message="Error procesando la solicitud",
            status_code=404,
        )

    return response.success(
        data=meta.to_list(
            only=["uid", "table_name", "schema_name", "title", "purpose", "abstract"]
        )
    )


@metadatos_api.get("/<string:uid>")
@swag_from(__swagger.get("get_metadatos", {}))
def get_metadatos(uid: str, response: Responses = Responses()) -> Responses:
    meta = Dataset()
    if meta.filter(uid=uid) is None:
        return response.error(
            message="No existe el registro actual de los metadatos a consultar",
            status_code=404,
        )
    return response.success(data=meta.to_dict())


@metadatos_api.post("/<string:table_name>")
@swag_from(__swagger.get("post_metadatos", {}))
def post_metadatos(table_name: str, response: Responses = Responses()) -> Responses:
    meta = Dataset()
    if meta.filter(table_name=table_name) is not None:
        return response.error(
            message="Ya existe un registro para esa tabla",
            status_code=404,
        )
    data: request = request.json
    if meta.create(**data) is None:
        return response.error(
            message="No se pudo crear el registro",
            status_code=409,
        )
    return response.success(data=meta.to_dict())


@metadatos_api.patch("/<string:table_name>")
@swag_from(__swagger.get("patch_metadatos", {}))
def patch_metadatos(table_name: str, response: Responses = Responses()) -> Responses:
    meta = Dataset()
    if meta.filter(table_name=table_name) is None:
        return response.error(
            message="No existe el registro actual de Costos de Construccion",
            status_code=404,
        )
    data: request = request.json
    if meta.update(**data) is None:
        return response.error(
            message="No se pudo actualizar el registro",
            status_code=409,
        )
    return response.success(data=meta.to_dict())
