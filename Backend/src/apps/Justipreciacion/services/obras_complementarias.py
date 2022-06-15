"""Services file to handle Obras Complementarias (OC for short) operations"""
from typing import Dict, Tuple

from src.apps.Justipreciacion.models import Justipreciacion

from ....utils.dbo import save_changes
from ....utils.response import Response
from ..models.obras_complementarias import ObrasComplementarias
from . import get_justipreciacion


def get_oc(_id: int) -> Tuple[Dict, int]:
    """
    Get OC Object
    Args:
        _id(int): ID justipreciacion to get
    Returns:
        OC Object
    """
    justipreciacion = get_justipreciacion(_id)
    if not justipreciacion:
        return Response.bad_request(
            message="No existe la justipreciacion a la cual desea aplicar el\
            calculo de Obras Complementarias.",
            operation="HOMOLOGACION/ObrasComplementarias",
            status_code=200,
        )
    else:
        obras_c = ObrasComplementarias.query.filter_by(
            registro=justipreciacion.registro
        ).first()
        if not obras_c:
            return Response.bad_request(
                message="No existe el calculo de Obras Complementarias para la justipreciacion, se va a proceder como un registro nuevo, si considera que es un fallo intente más tarde, si persiste comuníquese con el administrador del sistema.",
                operation="HOMOLOGACION/ObrasComplementarias",
                status_code=202,
            )
        else:
            data = dict(
                record=dict(id=obras_c.id, register=obras_c.registro, status="exists"),
                documentation=obras_c.datos,
                calculous=obras_c.calculo,
                total=obras_c.valor_unitario,
            )
            return Response.success(
                data=data,
                message="Datos obtenidos exitosamente",
                operation="HOMOLOGACION/ObrasComplementarias",
            )


def post_oc(_id: int, data: Dict) -> Tuple[Dict, int]:
    """
    Post OC Object
    Args:
        _id(int): ID justipreciacion to get
        data(dict): data to be used in oc
    Returns:
        OC Object
    """
    justipreciacion = get_justipreciacion(_id)
    if not justipreciacion:
        return Response.bad_request(
            message="No existe la justipreciacion a la cual desea aplicar el\
            calculo de Obras Complementarias.",
            operation="HOMOLOGACION/ObrasComplementarias",
            status_code=200,
        )
    else:
        obras_c = ObrasComplementarias.query.filter_by(
            registro=justipreciacion.registro
        ).first()
        if not obras_c:
            new_oc = ObrasComplementarias(data)
            if save_changes(new_oc):
                return Response.success(
                    data=None,
                    message="Datos Guardados Exitosamente",
                    operation="HOMOLOGACION/ObrasComplementarias",
                )
            else:
                return Response.error(
                    message="Error al guardar los datos",
                    operation="HOMOLOGACION/ObrasComplementarias",
                    status_code=200,
                )
        else:
            return Response.bad_request(
                message="Ya existe el calculo de Obras Complementarias para la Homologacion actual en este registro de Justipreciacion.",
                operation="HOMOLOGACION/ObrasComplementarias",
                status_code=200,
            )


def patch_oc(_id: int, data: Dict) -> Tuple[Dict, int]:
    """
    Patch OC Object
    Args:
        _id(int): ID justipreciacion to get
        data(dict): data to be used in oc
    Returns:
        OC Object
    """
    justipreciacion = get_justipreciacion(_id)
    if not justipreciacion:
        return Response.bad_request(
            message="No existe la justipreciacion a la cual desea aplicar el\
            calculo de Obras Complementarias.",
            operation="HOMOLOGACION/ObrasComplementarias",
            status_code=200,
        )
    else:
        obras_c = ObrasComplementarias.query.filter_by(
            registro=justipreciacion.registro
        ).first()
        if not obras_c:
            return Response.bad_request(
                message="No existe el calculo de Obras Complementarias para la justipreciacion.",
                operation="HOMOLOGACION/ObrasComplementarias",
                status_code=200,
            )
        else:
            obras_c.datos = data["datos"]
            obras_c.calculo = data["calculo"]
            obras_c.valor_unitario = data["valor_unitario"]
            obras_c.registro = data["registro"]
            if save_changes(obras_c):
                return Response.success(
                    data=None,
                    message="Datos Guardados Exitosamente",
                    operation="HOMOLOGACION/ObrasComplementarias",
                )
            else:
                return Response.error(
                    message="Error al guardar los datos",
                    operation="HOMOLOGACION/ObrasComplementarias",
                    status_code=200,
                )
