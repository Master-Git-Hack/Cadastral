"""File for Obras Complementarias endpoints"""
from typing import Dict, Tuple

from flask import request
from flask_restx import Resource

from ...services.obras_complementarias import get_oc, patch_oc, post_oc
from ..models import Models, Namespaces

ns = Namespaces.obras_complementarias
model = Models.obras_complementarias


@ns.route("/ObrasComplementarias/<int:justipreciacion>")
class ObrasComplementarias(Resource):
    """
    Obras Complementarias Resource Endpoint
    """

    def get(self, justipreciacion: int) -> Tuple[Dict, int]:
        """
        Returns the data of the Obras Complementarias, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return get_oc(justipreciacion)

    def post(self, justipreciacion: int) -> Tuple[Dict, int]:
        """
        Creates the data of the Obras Complementarias, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return post_oc(justipreciacion, request.json)

    def patch(self, justipreciacion: int) -> Tuple[Dict, int]:
        """
        Updates the data of the Obras Complementarias, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return patch_oc(justipreciacion, request.json)
