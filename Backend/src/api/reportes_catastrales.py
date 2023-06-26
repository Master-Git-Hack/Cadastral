from flask import Blueprint, request

from ..controllers.reportes_catastrales import ReportesCatastrales
from ..utils.response import Responses

reportes_catastrales_api: Blueprint = Blueprint(
    "Reportes Catastrales", __name__, url_prefix="/reportes-catastrales"
)


@reportes_catastrales_api.post("/<string:filename>")
def get(
    reporte: ReportesCatastrales = ReportesCatastrales(),
    response: Responses = Responses(),
):
    data = request.get_json()
    reporte = reporte.create(data)
    return response.send_file(filename)


@reportes_catastrales_api.post("/merged/<string:filename>")
def get_merged(reporte=()):
    ...
