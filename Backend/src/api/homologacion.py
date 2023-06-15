from flask import Blueprint, request

from ..utils.response import Responses

homologacion_api: Blueprint = Blueprint(
    "Homologacion de Terreno y de Renta", __name__, url_prefix="/homologacion"
)


@homologacion_api.get("/<string:tipo>/<int:justipreciacion>")
def get_homologacion(
    justipreciacion: int, tipo: str = "terreno", response: Responses = Responses()
) -> Responses:
    if justipreciacion is None:
        return response.error()
    return response.success()


@homologacion_api.post("/<string:tipo>/<int:justipreciacion>")
def post_homologacion(
    justipreciacion: int,
    tipo: str = "terreno",
    response: Responses = Responses(),
) -> Responses:
    if justipreciacion is None:
        return response.error()
    return response.success()


@homologacion_api.patch("/<string:tipo>/<int:justipreciacion>")
def patch_homologacion(
    justipreciacion: int,
    tipo: str = "terreno",
    response: Responses = Responses(),
) -> Responses:
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return response.success()


@homologacion_api.get("/justipreciacion/<string:tipo>/<int:justipreciacion>")
def get_homologacion_justipreciacion(
    justipreciacion: int, tipo: str = "terreno", response: Responses = Responses()
) -> Responses:
    if justipreciacion is None:
        return response.error()
    return response.success()


@homologacion_api.post("/justipreciacion/<string:tipo>/<int:justipreciacion>")
def post_homologacion_justipreciacion(
    justipreciacion: int, tipo: str = "terreno", response: Responses = Responses()
) -> Responses:
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return response.success()


@homologacion_api.patch("/justipreciacion/<string:tipo>/<int:justipreciacion>")
def patch_homologacion_justipreciacion(
    justipreciacion: int, tipo: str = "terreno", response: Responses = Responses()
) -> Responses:
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return response.success()


@homologacion_api.get(
    "/obras-complementarias/justipreciacion/<string:tipo>/<int:justipreciacion>"
)
def get_homologacion_obras_complementarias(
    justipreciacion: int, tipo: str = "terreno", response: Responses = Responses()
) -> Responses:
    if justipreciacion is None:
        return response.error()

    return response.success()
