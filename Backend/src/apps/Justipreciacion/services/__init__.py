"""Services file to handle Justipreciacion operations"""
from typing import Dict, Tuple

from .... import db
from ....utils.dbo import save_changes
from ....utils.response import Response
from ..models import Justipreciacion


def get_registro_justipreciacion(_id: int) -> str:
    """
    Get registro of Justipreciacion
    Args:
        _id (int): ID
    Returns:
        registro (str): registro
    """
    justipreciacion = Justipreciacion.query.filter_by(id=_id).first()
    if not justipreciacion:
        return Response.bad_request(
            message="No existe la justipreciacion a la cual desea aplicar la homologacion",
            operation="JUSTIPRECIACION/Registro",
        )
    else:
        return Response.success(
            data=justipreciacion.registro,
            message="Datos obtenidos exitosamente",
            operation="JUSTIPRECIACION/Registro",
        )


def get_required_data_for_oc(_id: int) -> Tuple[Dict, int]:
    """
    Get required data for oc that it is in Justipreciacion
    Args:
        _id(int): ID justipreciacion to get
    Returns:
        data (dict): data to be used in oc
        _status_code (int): status code of the response
    """
    justipreciacion = Justipreciacion.query.get(_id)
    if not justipreciacion:
        return Response.bad_request(
            message="No existe la justipreciacion a la cual desea aplicar la homologacion",
            operation="HOMOLOGACION/OC/Justipreciacion",
        )
    else:
        return Response.success(
            data=dict(register=justipreciacion.registro),
            message="Datos obtenidos exitosamente",
            operation="HOMOLOGACION/OC/Justipreciacion",
        )


def get_required_data_for_homologation(_id: int) -> Tuple[Dict, int]:
    """
    Get required data for homologation that it is in Justipreciacion
    Args:
        _id (int): ID of the Justipreciacion
        tipo (str): RENTA or TERRENO to distinguish between the two types of data to be retrieved
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    justipreciacion = Justipreciacion.query.get(_id)
    if not justipreciacion:
        return Response.bad_request(
            message="No existe la justipreciacion a la cual desea aplicar la homologacion",
            operation="HOMOLOGACION/Justipreciacion",
        )
    else:
        # data =dict()
        # tipo = tipo.upper()
        # if tipo == "TERRENO":
        #    area_subject = justipreciacion.sp1_superficie
        #    item = justipreciacion.sp1_factor
        # else:
        #    area_subject = justipreciacion.cna_superficie
        #    item = justipreciacion.cna_edad
        # area_subject = area_subject if area_subject is not None else 1
        # item = item if item is not None else 1
        return Response.success(
            data=dict(id=justipreciacion.id, register=justipreciacion.registro),
            message="Datos obtenidos exitosamente",
            operation="HOMOLOGACION/Justipreciacion",
        )


def get_justipreciacion(_id: int) -> Justipreciacion:
    """
    Get Justipreciacion
    Args:
        id (int): ID
    Returns:
        Justipreciacion Object
    """
    return Justipreciacion.query.filter_by(id=_id).first()


def patch_justipreciacion_from_homologacion(
    _id: int, tipo: str, data: dict
) -> Tuple[Dict, int]:
    """
    Update Justipreciacion from an homologacion request
    Args:
        _id (int): ID
        tipo (str): type of the data to be updated
        data (dict): data to be updated
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    tipo = tipo.upper()
    record = get_justipreciacion(_id)

    value = float(f'{data["valor_unitario"]:.2f}')
    if not record:
        return Response.bad_request(
            message="Registro de Justipreciacion no encontrado.",
            operation="HOMOLOGACION/Justipreciacion",
            status_code=404,
        )
    else:
        if tipo == "TERRENO":
            record.sp1_vu = value
            record.sp1_factor = data["sp1_factor"] or 1
            record.sp1_superficie = data["sp1_superficie"] or 1
        elif tipo == "RENTA":
            record.comparativo_mercado = value
            record.cna_edad = data["cna_edad"] or 1
            record.cna_superficie = data["cna_superficie"] or 1

        if save_changes(record):
            return Response.success(
                data=None,
                message="Justipreciacion actualizada exitosamente.",
                operation="HOMOLOGACION/Justipreciacion",
            )
        else:
            return Response.error(
                message="Error al actualizar Justipreciacion.",
                operation="HOMOLOGACION/Justipreciacion",
            )


def patch_justipreciacion_from_oc(_id: int, data: dict) -> Tuple[Dict, int]:
    """
    Update Justipreciacion from an obras complementarias request
    Args:
        _id (int): ID
        data (dict): data to be updated
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """

    record = get_justipreciacion(_id)

    value = float(f'{data["valor_total_obras_comp"]:.2f}')
    if not record:
        return Response.bad_request(
            message="Registro de Justipreciacion no encontrado.",
            operation="HOMOLOGACION/OC/Justipreciacion",
            status_code=404,
        )
    else:
        record.valor_total_obras_comp = value
        if save_changes(record):
            return Response.success(
                data=None,
                message="Justipreciacion actualizada exitosamente.",
                operation="HOMOLOGACION/OC/Justipreciacion",
            )
        else:
            return Response.error(
                message="Error al actualizar Justipreciacion.",
                operation="HOMOLOGACION/OC/Justipreciacion",
            )


def patch_justipreaciacion_from_cc(_id: int, data: dict) -> Tuple[Dict, int]:
    """
    Update Justipreciacion from an obras complementarias request
    Args:
        _id (int): ID
        data (dict): data to be updated
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """

    record = get_justipreciacion(_id)
    value = float(f'{data["cna_vu"]:.2f}')
    if not record:
        return Response.bad_request(
            message="Registro de Justipreciacion no encontrado.",
            operation="HOMOLOGACION/CC/Justipreciacion",
            status_code=404,
        )
    else:
        record.cna_vu = value
        if save_changes(record):
            return Response.success(
                data=None,
                message="Justipreciacion actualizada exitosamente.",
                operation="HOMOLOGACION/CC/Justipreciacion",
            )
        else:
            return Response.error(
                message="Error al actualizar Justipreciacion.",
                operation="HOMOLOGACION/CC/Justipreciacion",
            )
