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
