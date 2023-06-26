from flasgger.utils import swag_from
from flask import Blueprint, request

from .. import config
from ..controllers.justipreciacion import (
    get,
    get_registro,
    get_valor_especifico,
    patch_by_costos_construccion,
    patch_by_homologacion,
    patch_by_obras_complementarias,
)
from ..utils.response import Responses

justipreciacion_api: Blueprint = Blueprint(
    "Justipreciacion", __name__, url_prefix="/justipreciacion"
)

__swagger: dict = config.API_MODELS.get("justipreciacion", {})


@justipreciacion_api.get("/<int:justipreciacion>")
@swag_from({**__swagger.get("get_justipreciacion", {})})
def get_justipreciacion(justipreciacion: int, response: Responses = Responses()):
    if justipreciacion is None:
        return response.error(message="No se proporciono un ID")
    data = get(id=justipreciacion, to_dict=True)

    if data is None:
        return response.error(message="No se encontro el registro", status_code=404)
    return response.success(data=data)


@justipreciacion_api.get("/<int:justipreciacion>/<string:key>")
def get_justipreciacion_key(justipreciacion: int, response: Responses = Responses()):
    if justipreciacion is None:
        return response.error()
    return response.success()


@justipreciacion_api.get("/<int:justipreciacion>/homologacion/<string:tipo>")
def get_justipreciacion_homologacion(
    justipreciacion: int, tipo: str = "terreno", response: Responses = Responses()
):
    if justipreciacion is None:
        return response.error()
    return response.success()


@justipreciacion_api.patch("/<int:justipreciacion>/homologacion/<string:tipo>")
def patch_justipreciacion_homologacion(
    justipreciacion: int, tipo: str = "terreno", response: Responses = Responses()
):
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return response.success()


@justipreciacion_api.get("/<int:justipreciacion>/obras-complementarias")
def get_justipreciacion_obras_complementarias(
    justipreciacion: int, response: Responses = Responses()
):
    if justipreciacion is None:
        return response.error()
    return response.success()


@justipreciacion_api.patch("/<int:justipreciacion>/obras-complementarias")
def patch_justipreciacion_obras_complementarias(
    justipreciacion: int, response: Responses = Responses()
):
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return response.success()
