from flasgger import swag_from
from flask import Blueprint, request

from .. import config
from ..controllers.costos_construccion import *
from ..controllers.justipreciacion import get_justipreciacion
from ..utils.response import Responses

costos_construccion_api: Blueprint = Blueprint(
    "Costos Construccion", __name__, url_prefix="/costos-construccion"
)

__swagger: dict = config.API_MODELS.get("costos_construccion", {})


@costos_construccion_api.get("/<int:justipreciacion>")
@swag_from(__swagger.get("get_costos_construccion", {}))
@get_justipreciacion
def get_costos_construccion(
    justipreciacion: int, response: Responses = Responses()
) -> Responses:
    if isinstance(justipreciacion, Responses):
        return justipreciacion
    if justipreciacion is None:
        return response.error(
            message="No existe el registro de justipreciacion a consulta para la operacion de Costos de Construccion",
            status_code=404,
        )
    c_c = CostosConstruccion()
    if c_c.filter(registro=justipreciacion.current.registro) is None:
        return response.error(
            message="No existe el registro actual de Costos de Construccion",
            status_code=404,
        )
    enabled = c_c.current.factor_gto
    return response.success(
        data={
            "titulo": c_c.current.descripcion,
            "data": [
                {
                    "costoDirecto": c_c.current.costo_directo,
                    "indirectos": c_c.current.indirectos,
                    "valorNeto": c_c.current.valor_resultante,
                    "m2": c_c.current.m2,
                    "total": 0,
                }
            ],
            "factorGTO": {"enabled": enabled, "value": 0.935 if enabled else 1},
            "total": c_c.current.total,
            "record": {
                "id": c_c.current.id,
                "register": c_c.current.registro,
                "status": "exists",
            },
            "redondeo": c_c.current.redondeo,
        }
    )


@costos_construccion_api.post("/<int:justipreciacion>")
def post_costos_construccion(
    justipreciacion: int,
    response: Responses = Responses(),
) -> Responses:
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return post(data)


@costos_construccion_api.patch("/<int:justipreciacion>")
def patch_costos_construccion(
    justipreciacion: int,
    response: Responses = Responses(),
) -> Responses:
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return patch(data)


@costos_construccion_api.patch("/justipreciacion/<int:justipreciacion>")
def path_justipreciacion(
    justipreciacion: int,
    response: Responses = Responses(),
):
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return response.success()
