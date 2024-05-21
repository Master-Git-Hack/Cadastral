"""File for Indicadores municipales endpoints"""
from typing import Dict, Tuple

from flask_restx import Resource

from ...services.indicadores_municipales import get_indicadores_municipales
from ..models import Models, Namespaces

ns = Namespaces.indicadores_municipales
model = Models.indicadores_municipales


@ns.route("/IndicadoresMunicipales")
class IndicadoresMunicipales(Resource):
    """
    Indicadores Municipales Resource Endpoint
    """

    def get(self) -> Tuple[Dict, int]:
        """
        Returns the data of the Indicadores Municipales, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return get_indicadores_municipales()
