"""File to use CostosConstruccion model and namespace as reference"""

from flask_restx import Namespace
from flask_restx.fields import Boolean, Float, Integer, String


class CostosConstruccion:
    """Class to use CostosConstruccion model and namespace as reference\
        ns(for short) as reference of Namespace 
        model as reference of Model"""

    ns = Namespace(
        "COSTOSCONSTRUCCION", description="Costos Construccion related operations"
    )
    model = ns.model(
        "CostosConstruccion",
        dict(
            id=Integer(description="Id", example=1),
            descripcion=String(description="Descripcion", example="Descripcion"),
            costo_directo=Float(description="Costo Directo", example=0.0),
            indirectos=Float(description="Indirectos", example=0.0),
            valor_neto=Float(description="Valor Neto", example=0.0),
            m2=Float(description="M2", example=0.0),
            factor_gto=Boolean(description="Factor Gto", example=False),
            valor_resultante=Float(description="Valor Resultante", example=0.0),
            total=Float(description="Total", example=0.0),
            tipo_servicio=String(
                description="Tipo Servicio",
                example="tipo de justipreciacion, normal o comercial",
            ),
            registro=String(description="Registro", example=""),
        ),
    )
