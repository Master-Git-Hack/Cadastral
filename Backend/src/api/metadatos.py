from flasgger import swag_from
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from .. import config
from ..controllers.metadatos import ReporteMetadatos
from ..models.dataset import Dataset
from ..models.metadatos import MetadatosTemporales as TMP
from ..utils.response import Responses

metadatos_api: Blueprint = Blueprint("Metadatos", __name__, url_prefix="/metadatos")

__swagger: dict = config.API_MODELS.get("metadatos", {})


@metadatos_api.get("/complete")
@swag_from(__swagger.get("get_all_metadatos", {}))
@jwt_required()
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
@jwt_required()
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


@metadatos_api.get("/temporal")
@swag_from(__swagger.get("get_all_metadatos_preview", {}))
@jwt_required()
def get_all_temporal_metadatos(response: Responses = Responses()) -> Responses:
    meta = TMP()
    encargado = get_jwt_identity()
    if meta.filter(encargado=encargado, estatus=1) is None:
        response.success(data=[])

    return response.success(data=meta.to_list())


@metadatos_api.get("/temporal/<int:id>")
@swag_from(__swagger.get("get_all_metadatos_preview", {}))
@jwt_required()
def get_temporal_metadatos(id: int, response: Responses = Responses()) -> Responses:
    meta = TMP()
    if meta.get(id) is None:
        return response.error(
            message="Error procesando la solicitud",
            status_code=404,
        )

    return response.success(data=meta.to_dict())


@metadatos_api.get("/<string:uid>")
@swag_from(__swagger.get("get_metadatos", {}))
@jwt_required()
def get_metadatos(uid: str, response: Responses = Responses()) -> Responses:
    meta = Dataset()
    if meta.filter(uid=uid) is None:
        return response.error(
            message="No existe el registro actual de los metadatos a consultar",
            status_code=404,
        )
    return response.success(data=meta.to_dict())


@metadatos_api.get("/<string:uid>/report")
@swag_from(__swagger.get("get_file_from_metadatos", {}))
@jwt_required()
def get_file_from_metadatos(uid: str, response: Responses = Responses()) -> Responses:
    __response = ReporteMetadatos(uid)
    filename, path = __response.create()
    return response.send_file(filename=filename, path=path)


@metadatos_api.post("/create/<string:table_name>")
# @swag_from(__swagger.get("post_metadatos", {}))
@jwt_required()
def post_metadatos(table_name: str, response: Responses = Responses()) -> Responses:
    meta = Dataset()
    # if meta.filter(table_name=table_name) is not None:
    #     return response.error(
    #         message="Ya existe un registro para esa tabla",
    #         status_code=404,
    #     )
    data = request.json
    if meta.create(**data) is None:
        return response.error(
            message="No se pudo crear el registro",
            status_code=409,
        )
    return response.success(data=meta.to_dict())


@metadatos_api.post("/temporal/create")
@jwt_required()
def post_temporal_metadatos(response: Responses = Responses()) -> Responses:
    data = request.json
    meta = TMP()
    encargado = get_jwt_identity()
    if meta.create(**data, encargado=encargado) is None:
        return response.error(
            message="Error procesando la solicitud",
            status_code=404,
        )

    return response.success(data=meta.to_dict())


@metadatos_api.patch("/<string:uid>")
# @swag_from(__swagger.get("patch_metadatos", {}))
@jwt_required()
def patch_metadatos(uid: str, response: Responses = Responses()) -> Responses:
    meta = Dataset()
    if meta.get(uid) is None:
        return response.error(
            message="No existe el registro actual de Costos de Construccion",
            status_code=404,
        )
    data = request.json
    if meta.update(**data) is None:
        return response.error(
            message="No se pudo actualizar el registro",
            status_code=409,
        )
    return response.success(data=meta.to_dict())


@metadatos_api.patch("/temporal/<int:id>")
@swag_from(__swagger.get("get_all_metadatos_preview", {}))
@jwt_required()
def patch_temporal_metadatos(id: int, response: Responses = Responses()) -> Responses:
    data = request.json
    meta = TMP()
    encargado = get_jwt_identity()
    if meta.filter(id=id, encargado=encargado) is None:
        return response.error(
            message="Error procesando la solicitud",
            status_code=404,
        )
    if meta.update(**data) is None:
        return response.error(
            message="No se pudo actualizar el registro",
            status_code=409,
        )
    return response.success(data=meta.to_dict())


@metadatos_api.delete("/temporal/<int:id>")
@swag_from(__swagger.get("get_all_metadatos_preview", {}))
@jwt_required()
def delete_temporal_metadatos(id: int, response: Responses = Responses()) -> Responses:
    data = request.json
    meta = TMP()

    if meta.get(id) is None:
        return response.error(
            message="Error procesando la solicitud",
            status_code=404,
        )
    if meta.update(estatus=0) is None:
        return response.error(
            message="No se pudo actualizar el registro",
            status_code=409,
        )
    return response.success(message="Registro eliminado correctamente")
