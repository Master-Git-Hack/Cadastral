from flasgger.utils import swag_from
from flask import Blueprint, request

from .. import config
from ..controllers.homologacion import get
from ..utils.response import Responses

__swagger: dict = config.API_MODELS.get("homologacion", {})
homologacion_api: Blueprint = Blueprint(
    "Homologacion de Terreno y de Renta", __name__, url_prefix="/homologacion"
)


@homologacion_api.get("/<int:justipreciacion>/<string:tipo>")
@swag_from(__swagger.get("get_homologacion", {}))
def get_homologacion(
    justipreciacion: int, tipo: str = "terreno", response: Responses = Responses()
) -> Responses:
    if justipreciacion is None:
        return response.error()
    return get(justipreciacion, tipo.upper())


@homologacion_api.post("/<int:justipreciacion>/<string:tipo>")
@swag_from(__swagger.get("post_homologacion", {}))
def post_homologacion(
    justipreciacion: int,
    tipo: str = "terreno",
    response: Responses = Responses(),
) -> Responses:
    if justipreciacion is None:
        return response.error()
    return response.success()


@homologacion_api.patch("/<int:justipreciacion>/<string:tipo>")
@swag_from(__swagger.get("patch_homologacion", {}))
def patch_homologacion(
    justipreciacion: int,
    tipo: str = "terreno",
    response: Responses = Responses(),
) -> Responses:
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return response.success()


@homologacion_api.get("/justipreciacion/<int:justipreciacion>/<string:tipo>")
@swag_from(__swagger.get("get_homologacion_justipreciacion", {}))
def get_homologacion_justipreciacion(
    justipreciacion: int, tipo: str = "terreno", response: Responses = Responses()
) -> Responses:
    if justipreciacion is None:
        return response.error()
    return response.success()


@homologacion_api.post("/justipreciacion/<int:justipreciacion>/<string:tipo>")
@swag_from(__swagger.get("post_homologacion_justipreciacion", {}))
def post_homologacion_justipreciacion(
    justipreciacion: int, tipo: str = "terreno", response: Responses = Responses()
) -> Responses:
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return response.success()


@homologacion_api.patch("/justipreciacion/<int:justipreciacion>/<string:tipo>")
@swag_from(__swagger.get("patch_homologacion_justipreciacion", {}))
def patch_homologacion_justipreciacion(
    justipreciacion: int, tipo: str = "terreno", response: Responses = Responses()
) -> Responses:
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return response.success()


@homologacion_api.get(
    "/obras-complementarias/justipreciacion/<int:justipreciacion>/<string:tipo>"
)
@swag_from(__swagger.get("get_homologacion_obras_complementarias", {}))
def get_homologacion_obras_complementarias(
    justipreciacion: int, tipo: str = "terreno", response: Responses = Responses()
) -> Responses:
    if justipreciacion is None:
        return response.error()

    return response.success()
