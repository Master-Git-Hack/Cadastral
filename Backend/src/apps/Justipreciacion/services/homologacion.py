"""Service file to handle Homologation operation"""
from typing import Dict, Tuple

from ....utils.dbo import save_changes
from ....utils.response import Response
from ..models.homologacion import Homologation
from . import get_justipreciacion
from .indicadores_municipales import get_data_indicadores_municipales


def get_homologation(_id: int, tipo: str) -> Tuple[Dict, int]:
    """
    Get Homologation Object
    Args:
        _id(int): ID of the Justipreciacion Object
    Returns:
        Homologation Object
    """
    justipreciacion = get_justipreciacion(_id)
    if not justipreciacion:
        return Response.bad_request(
            message="No existe la justipreciacion a la cual desea aplicar la homologacion",
            operation="HOMOLOGACION",
            status_code=200,
        )
    else:
        record = Homologation.query.filter_by(
            registro=justipreciacion.registro, tipo=tipo
        ).first()
        if not record:
            return Response.error(
                message="No existe un registro actual de la Homologacion,\
                se va a proceder como uno nuevo, en caso de que si exista,\
                favor de intentar mas tarde, gracias",
                operation="HOMOLOGACION",
                status_code=200,
            )
        else:
            data = dict(
                factors=record.factores,
                documentation=record.resultado,
                record=dict(
                    id=record.id,
                    type=record.tipo.upper(),
                    appraisalPurpose=record.tipo_servicio,
                    status="exists",
                ),
            )
            return Response.success(
                data=data,
                message="Registro de Homologacion encontrado exitosamente.",
                operation="HOMOLOGACION",
            )


def post_homologation(collection: dict) -> Response:
    """
    This method creates a new homologacion
    Args:
        data (dict): from request, recovered from json
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    homologation = Homologation.query.filter_by(
        registro=collection["registro"], tipo=collection["tipo"]
    ).first()
    if not homologation:
        new_homologation = Homologation(collection)
        if save_changes(new_homologation):
            return Response.success(
                data="",
                message="Homologacion creada exitosamente.",
                operation="HOMOLOGACION",
            )
        else:
            return Response.error(
                message="Homologacion creada exitosamente.",
                operation="HOMOLOGACION",
            )
    else:
        return Response.error(
            message="Ya existe una homologacion para este registro",
            operation="HOMOLOGACION",
            status_code=200,
        )


def patch_homologation(
    tipo: str,
    factores: dict,
    resultado: dict,
    valor_unitario: float,
    registro: str,
    tipo_servicio: str,
) -> Tuple[dict, int]:
    """
    Update Homologation Object
    Args:
        tipo(str): Type of the Homologation
        factores(dict): Factors of the Homologation
        resultado(dict): Result of the Homologation
        valor_unitario(float): Value Unit of the Homologation
        registro(str): Register of the Homologation
        tipo_servicio(str): Type of Service of the Homologation
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    homologation = Homologation.query.filter_by(registro=registro, tipo=tipo).first()
    if not homologation:
        return Response.bad_request(
            message="No se encontro el registro de Homologacion que desea actualizar.",
            operation="HOMOLOGACION",
            status_code=200,
        )
    else:
        homologation.tipo = tipo.lower()
        homologation.factores = factores
        homologation.resultado = resultado
        homologation.valor_unitario = valor_unitario
        homologation.registro = registro
        homologation.tipo_servicio = tipo_servicio.lower()
        if save_changes(homologation):
            return Response.success(
                data=None,
                message="Homologacion actualizada exitosamente.",
                operation="HOMOLOGACION",
            )
        else:
            return Response.error(
                message="Error interno, Homologacion no actualizada.",
                operation="HOMOLOGACION",
            )
