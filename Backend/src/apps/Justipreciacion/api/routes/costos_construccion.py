from typing import Dict, Optional, Tuple

from flask import request
from flask_restx import Resource

from src.apps.Justipreciacion.services import patch_justipreaciacion_from_cc

from ...services.costos_construccion import (
    get_costos_construccion,
    patch_costos_construccion,
    post_costos_construccion,
)
from ..models import Models, Namespaces

ns = Namespaces.costos_construccion
model = Models.costos_construccion


@ns.route("/<int:justipreciacion>")
class CostosConstruccion(Resource):
    """
    CostosConsturccion Resource Endpoint
    """

    def get(self, justipreciacion: int) -> Tuple[Dict, int]:
        """
        Returns the data of the homologacion given the tipo and justipreciacion, if not found returns 404
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        print(justipreciacion)
        return get_costos_construccion(justipreciacion)

    @ns.expect(model)
    def post(self, justipreciacion: Optional[int]) -> Tuple[Dict, int]:
        """
        Creates a post CostosConstruccion
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return post_costos_construccion(collection=request.json)

    def patch(self, justipreciacion: Optional[int]) -> Tuple[Dict, int]:
        """
        Creates a patch CostosConstruccion
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return patch_costos_construccion(collection=request.json)


@ns.route("/Justipreciacion/<int:justipreciacion>")
class JustipreciacionCC(Resource):
    def patch(self, justipreciacion: int) -> Tuple[Dict, int]:
        """
        Creates a patch CostosConstruccion
        Returns:
            response (dict): response to the request
            status_code (int): status code of the response
        """
        return patch_justipreaciacion_from_cc(justipreciacion, request.json)
