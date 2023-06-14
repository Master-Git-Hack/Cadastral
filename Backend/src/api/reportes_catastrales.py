from flask import Blueprint, request

from ..utils.response import Responses

indicadores_municipales_api: Blueprint = Blueprint(
    "Reportes Catastrales", __name__, url_prefix="/reportes-catastrales"
)
