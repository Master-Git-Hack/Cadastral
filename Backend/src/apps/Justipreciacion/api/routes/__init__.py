"""File for Justipreciacion endpoints"""
from typing import Dict, Optional, Tuple

from flask import request
from flask_restx import Resource

from ...services import (
    get_registro_justipreciacion,
    get_required_data_for_homologation,
    get_required_data_for_oc,
    patch_justipreciacion_from_homologacion,
    patch_justipreciacion_from_oc,
)
from ..models import Models, Namespaces
from .homologacion import *
from .indicadores_municales import *
from .obras_complementarias import *

homologacion = Namespaces.homologacion


@homologacion.route("/Justipreciacion/<string:tipo>/<int:justipreciacion>")
class JustipreciacionByHomologacion(Resource):
    """
    Justipreciacion Resource Endpoint
    """

    def get(self, justipreciacion: int, tipo: Optional[str] = None) -> Tuple[Dict, int]:
        """
        Returns the data of the justipreciacion given the tipo and justipreciacion, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return get_required_data_for_homologation(justipreciacion)

    def patch(self, justipreciacion: int, tipo: str) -> Tuple[Dict, int]:
        """
        Updates the data of the justipreciacion given the tipo and justipreciacion, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return patch_justipreciacion_from_homologacion(
            justipreciacion, tipo, request.json
        )


@homologacion.route("/OC/Justipreciacion/<int:justipreciacion>")
class JustipreciacionByHomologacionWithOC(Resource):
    """
    Justipreciacion Resource Endpoint
    """

    def get(self, justipreciacion: int) -> Tuple[Dict, int]:
        """
        Returns the data of the justipreciacion given the tipo and justipreciacion, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return get_required_data_for_oc(justipreciacion)

    def patch(self, justipreciacion: int) -> Tuple[Dict, int]:
        """
        Updates the data of the justipreciacion given the tipo and justipreciacion, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return patch_justipreciacion_from_oc(justipreciacion, request.json)
