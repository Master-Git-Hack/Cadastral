from flask import Blueprint, request

from ..utils.response import Responses

reportes_catastrales_api: Blueprint = Blueprint(
    "Reportes Catastrales", __name__, url_prefix="/reportes-catastrales"
)
