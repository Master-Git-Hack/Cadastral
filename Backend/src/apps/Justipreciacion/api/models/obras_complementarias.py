"""File to use Obras Complementarias model as reference"""
from flask_restx.fields import Float, Integer, Nested, Raw, String

from .homologacion import Homologacion

obras_complementarias_model = Homologacion.ns.model(
    "Obras Complementarias",
    dict(
        id=Integer(description="ID de la obra complementaria", example=1),
        datos=Raw({}),
        calculo=Raw({}),
        valor_unitario=Float(description="Valor unitario", example=0.0),
        registro=String(
            description="Registro, union entre la tabla justipreciacion y esta",
            example="",
        ),
    ),
)
