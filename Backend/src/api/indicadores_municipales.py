from flasgger.utils import swag_from
from flask import Blueprint, request

from .. import config
from ..utils.response import Responses

indicadores_municipales_api: Blueprint = Blueprint(
    "Indicadores Municipales", __name__, url_prefix="/indicadores-municipales"
)
__swagger: dict = config.API_MODELS.get("indicadores_municipales", {})


@indicadores_municipales_api.get("/")
@swag_from(__swagger.get("get_indicadores_municipales", {}))
def get_indicadores_municipales(response: Responses = Responses()) -> Responses:
    return response.success()
