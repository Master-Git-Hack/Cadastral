"""File for Homologacion endpoints"""
from typing import Dict, Tuple

from flask import request
from flask_restx import Resource

from ...services.homologacion import (
    get_homologation,
    patch_homologation,
    post_homologation,
)
from ..models import Models, Namespaces

ns = Namespaces.homologacion
model = Models.homologacion


@ns.route("/<string:tipo>/<int:justiprecicacion>")
class HOMOLOGACION(Resource):
    """
    Homologacion Resource Endpoint
    """

    def get(self, tipo: str, justiprecicacion: int) -> Tuple[Dict, int]:
        """
        Returns the data of the homologacion given the tipo and justipreciacion, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return get_homologation(justiprecicacion, tipo.lower())

    def post(self) -> Tuple[Dict, int]:
        """
        Creates a new homologacion
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return post_homologation(collection=request.json)

    def patch(self) -> Tuple[Dict, int]:
        """
        Updates the data of the homologacion given the tipo and justipreciacion, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        data = request.json
        return patch_homologation(
            tipo=data["tipo"],
            factores=data["factores"],
            resultado=data["resultado"],
            valor_unitario=data["valor_unitario"],
            registro=data["registro"],
            tipo_servicio=data["tipo_servicio"],
        )
