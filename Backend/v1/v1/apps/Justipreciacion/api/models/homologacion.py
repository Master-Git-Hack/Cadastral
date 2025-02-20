"""File to use Homologacion model and namespace as reference"""
from flask_restx import Namespace
from flask_restx.fields import Float, Integer, Nested, Raw, String


class Homologacion:
    """Class to use Homologacion model and namespace as reference\
        ns(for short) as reference of Namespace 
        model as reference of Model"""

    ns = Namespace("HOMOLOGACION", description="Homologacion related operations")
    model = ns.model(
        "Homologacion",
        dict(
            tipo=String(
                description="Tipo accion a realizar", example="RENTA o TERRENO "
            ),
            factores=Raw(),
            resultado=Raw(),
            valor_unitario=Float(description="Valor unitario", example=0.0),
            registro=String(
                description="Registro, union entre la tabla justipreciacion y esta",
                example="",
            ),
            tipo_servicio=String(
                description="Tipo de servicio",
                example="tipo de justipreciacion, normal o comercial",
            ),
        ),
    )
