from flask import Blueprint, request

from ..utils.response import Responses

indicadores_municipales_api: Blueprint = Blueprint(
    "Indicadores Municipales", __name__, url_prefix="/indicadores-municipales"
)


@indicadores_municipales_api.get("/")
def get_indicadores_municipales(response: Responses = Responses()) -> Responses:
    return response.success()
