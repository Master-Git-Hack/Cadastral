from flask import request
from flask_restx import Resource

from ...services import get_report, merge_reports
from ..models import Reportes

ns = Reportes.ns
model = Reportes.model


@ns.route("/<string:action>/<string:filename>")
class ReportesCatastrales(Resource):
    @ns.expect(model)
    @ns.produces(["application/pdf"])
    def post(self, action: str, filename: str):
        """
        Crea un reporte de catastro
        """
        if action == "GET":
            return get_report(request.get_json(), filename)
        elif action == "MERGE":
            return merge_reports(request.get_json(), filename)
