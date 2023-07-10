from flasgger.utils import swag_from
from flasgger_marshmallow import swagger_decorator
from flask import Blueprint

from .. import config
from ..models.indicadores_municipales import IndicadoresMunicipales
from ..utils.response import Responses

indicadores_municipales_api: Blueprint = Blueprint(
    "Indicadores Municipales", __name__, url_prefix="/indicadores-municipales"
)
__swagger: dict = config.API_MODELS.get("indicadores_municipales", {})


@indicadores_municipales_api.get("/")
@swag_from(__swagger.get("get_indicadores_municipales", {}))
def get_indicadores_municipales(
    indicadores=IndicadoresMunicipales(), response: Responses = Responses()
) -> Responses:
    return response.success(data=indicadores.all(to_list=True))
