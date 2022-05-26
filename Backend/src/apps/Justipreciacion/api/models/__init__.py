"""File to append Models and Namespaces \
File for Justipreciacion model and namespace """
from flask_restx import Namespace
from flask_restx.fields import Float, Integer, Nested, String

from .homologacion import Homologacion
from .indicadores_municipales import indicadores_municapales_model as indicadores_mm
from .obras_complementarias import obras_complementarias_model as obras_cm

justipreacion_ns = Namespace(
    "JUSTIPRECIACION", description="Justipreciacion related operations"
)
justipreacion_model = justipreacion_ns.model(
    "justipreciacion",
    dict(
        _id=Integer(required=True, description="Justipreciacion ID"),
        registro=String(required=True, description="Registro"),
        tipo=String(description="Tipo accion a realizar", example="RENTA o TERRENO "),
        data=Nested(
            justipreacion_ns.model(
                "data que puede incluirse en la actualizacion del registro de justipreciacion",
                dict(
                    sp1_vu=Float(description="Valor unitario", example=0.0),
                    sp1_factor=Float(description="", example=0.5),
                    sp1_superficie=Float(description="", example=0.5),
                    comparativo_mercado=Float(description="", example=0.5),
                    cna_edad=Integer(description="", example=1),
                    cna_superficie=Float(description="", example=0.5),
                    valor_total_obras_comp=Float(
                        description="Valor total obras complementarias", example=0.0
                    ),
                ),
            )
        ),
    ),
)


class Models:
    """Class to append Models"""

    homologacion = Homologacion.model
    indicadores_municipales = indicadores_mm
    obras_complementarias = obras_cm
    justipreciacion = justipreacion_model
    justipreciacion_by_homologacion = Homologacion.ns.model(
        "Modelo de justipreaciacion por Homologacion", dict()
    )


class Namespaces:
    """Class to append Namespaces"""

    homologacion = Homologacion.ns
    justipreciacion = justipreacion_ns
    obras_complementarias = Homologacion.ns
    indicadores_municipales = Homologacion.ns
    justipreaciacion_by_homologacion = Homologacion.ns
