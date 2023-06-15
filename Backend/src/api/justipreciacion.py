from flask import Blueprint, request

from ..utils.response import Responses

justipreciacion_api: Blueprint = Blueprint(
    "Justipreciacion", __name__, url_prefix="/justipreciacion"
)


@justipreciacion_api.get("/<int:justipreciacion>")
def get_justipreciacion(justipreciacion: int, response: Responses = Responses()):
    if justipreciacion is None:
        return response.error()
    return response.success()


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
