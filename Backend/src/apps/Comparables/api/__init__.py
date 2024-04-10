from flask_restx import Namespace

ns = Namespace("COMPARABLES", description="Comparables related operations")
from typing import Dict, Optional, Tuple

from flask import request
from flask_restx import Resource

from ....utils.dbo import save_changes
from ....utils.response import Response
from ..models.comparables_catcom import ComparablesCatCom, ComparablesCatComSchema


@ns.route("/<int:comparable>")
class RegistroComparable(Resource):
    """
    Class to handle Comparable endpoint to get Registro data
    """

    def get(self, comparable: int) -> Tuple[Dict, int]:
        """
        Method to get comparable data
        Returns a tuple with the data and the status code
        Returns:
            response: dict with the data
            status_code: int with the status code
        """

        __comparable = ComparablesCatCom.query.filter_by(id=comparable).first()
        if not __comparable:
            return Response.bad_request(
                message="No existe el comparable a la cual desea aplicar la homologacion",
                operation="COMPARABLES",
            )
        else:

            return Response.success(
                data=ComparablesCatComSchema().dump(__comparable),
                message="Datos obtenidos exitosamente",
                operation="COMPARABLES",
            )


@ns.route("/<int:comparable>/<string:key>")
class ValorEspecificoComparable(Resource):
    """
    Class to handle Comparable endpoint to get Valor Especifico data
    """

    def get(self, comparable: int, key: str) -> Tuple[Dict, int]:
        """
        Method to get comparable data
        Returns a tuple with the data and the status code
        Returns:
            response: dict with the data
            status_code: int with the status code
        """
        __comparable = ComparablesCatCom.query.filter_by(id=comparable).first()
        if not __comparable:
            return Response.bad_request(
                message="No existe el comparable a la cual desea aplicar la homologacion",
                operation="COMPARABLES",
            )
        else:
            r = __comparable.__dict__
            if key not in r:
                return Response.bad_request(
                    message="No existe la llave solicitada en el registro",
                    operation="COMPARABLES",
                )

            return Response.success(
                data=r.get(key, ""),
                message="Datos obtenidos exitosamente",
                operation="COMPARABLES",
            )


"""File to append Namespaces to the app"""
from .... import api

api.add_namespace(ns)
