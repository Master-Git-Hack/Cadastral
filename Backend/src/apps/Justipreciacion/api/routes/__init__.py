"""File for Justipreciacion endpoints"""
from typing import Dict, Optional, Tuple

from flask import request
from flask_restx import Resource

from ...services import (
    get_registro_justipreciacion,
    get_required_data_for_homologation,
    get_required_data_for_oc,
    get_valor_especifico_justipreciacion,
    patch_justipreciacion_from_homologacion,
    patch_justipreciacion_from_oc,
)
from ..models import Models, Namespaces
from .costos_construccion import *
from .homologacion import *
from .indicadores_municales import *
from .obras_complementarias import *

homologacion = Namespaces.homologacion
js = Namespaces.justipreciacion


@js.route("/<int:justipreciacion>")
class RegistroJustipreciacion(Resource):
    """
    Class to handle Justipreciacion endpoint to get Registro data
    """

    def get(self, justipreciacion: int) -> Tuple[Dict, int]:
        """
        Method to get justipreciacion data
        Returns a tuple with the data and the status code
        Returns:
            response: dict with the data
            status_code: int with the status code
        """

        return get_registro_justipreciacion(justipreciacion)


@js.route("/<int:justipreciacion>/<string:key>")
class ValorEspecificoJustipreciacion(Resource):
    """
    Class to handle Justipreciacion endpoint to get Valor Especifico data
    """

    def get(self, justipreciacion: int, key: str) -> Tuple[Dict, int]:
        """
        Method to get justipreciacion data
        Returns a tuple with the data and the status code
        Returns:
            response: dict with the data
            status_code: int with the status code
        """
        return get_valor_especifico_justipreciacion(justipreciacion, key)


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

    @homologacion.expect(Models.homologacion)
    def patch(self, justipreciacion: int, tipo: str) -> Tuple[Dict, int]:
        """
        Updates the data of the justipreciacion given the tipo and justipreciacion, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        print(request.json)
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

    @homologacion.expect(Models.obras_complementarias)
    def patch(self, justipreciacion: int) -> Tuple[Dict, int]:
        """
        Updates the data of the justipreciacion given the tipo and justipreciacion, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return patch_justipreciacion_from_oc(justipreciacion, request.json)
