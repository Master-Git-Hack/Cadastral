"""Fil to get resources from the Catastro table."""
from typing import Dict, Tuple

from flask_restx import Namespace, Resource

from ... import api
from ...utils.response import Response
from .Reportes.models.catastral import Catastral as Model
from .Reportes.models.catastral import catastral_schema

ns = Namespace("CATASTRAL", description="Catastro Basic Information")


@ns.route("/<int:catastro>/<string:key>", methods=["GET"])
class Catastral(Resource):
    """class to get the Catastral data."""

    def get(self, catastro: int, key: str) -> Tuple[Dict, int]:
        """Get the Catastral data."""
        record = Model.query.filter_by(id=catastro).first()
        if not record:
            return Response.bad_request(
                message="No existe el registro de catastro consultado",
                operation="CATASTRAL",
            )
        return Response.success(
            data=catastral_schema.dump(record)[key],
            message="Datos obtenidos exitosamente",
            operation="CATASTRAL",
        )


api.add_namespace(ns)
