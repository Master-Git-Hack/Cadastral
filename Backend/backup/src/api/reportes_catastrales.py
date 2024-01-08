from flasgger.utils import swag_from
from flask import Blueprint, request

from .. import config
from ..controllers.reportes_catastrales import ReportesCatastrales
from ..utils.response import Responses

reportes_catastrales_api: Blueprint = Blueprint(
    "Reportes Catastrales", __name__, url_prefix="/reportes-catastrales"
)

__swagger: dict = config.API_MODELS.get("reportes_catastrales", {})


@reportes_catastrales_api.post("/<string:filename>")
@swag_from(__swagger.get("get", {}))
def get(
    filename: str,
    reporte: ReportesCatastrales = ReportesCatastrales(),
    response: Responses = Responses(),
):
    data = request.get_json()
    reporte = reporte.create(data)
    return response.send_file(filename=filename, data=reporte)


@reportes_catastrales_api.post("/merged/<string:filename>")
@swag_from(__swagger.get("get_merged", {}))
def get_merged(
    filename: str,
    reporte: ReportesCatastrales = ReportesCatastrales(),
    response: Responses = Responses(),
):
    data = request.get_json()
    reporte = reporte.merge(data)
    return response.send_file(filename=filename, data=reporte)
