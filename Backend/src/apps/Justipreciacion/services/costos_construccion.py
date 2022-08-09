from typing import Dict, Tuple

from ....utils.dbo import save_changes
from ....utils.response import Response
from ..models.costos_construccion import CostosConstruccion
from . import get_justipreciacion


def get_costos_construccion(_id: int) -> Tuple[Dict, int]:
    """_summary_

    Args:
        _id (int): _description_
        tipo (str): _description_

    Returns:
        Tuple[Dict, int]: _description_
    """
    justipreciacion = get_justipreciacion(_id)
    if not justipreciacion:
        return Response.bad_request(
            message="No existe la justipreciacion a la cual desea aplicar el calculo de valor unitario de construccion.",
            operation="CostosConstruccion",
            status_code=200,
        )
    else:
        record = CostosConstruccion.query.filter_by(
            registro=justipreciacion.registro
        ).first()
        if not record:
            return Response.error(
                message="No existe registro guardado, se creará uno nuevo.",
                operation="CostosConstruccion",
                status_code=200,
            )
        else:
            enabled = record.factor_gto
            data = dict(
                titulo=record.descripcion,
                data=[
                    dict(
                        costoDirecto=record.costo_directo,
                        indirectos=record.indirectos,
                        valorNeto=record.valor_resultante,
                        m2=record.m2,
                        tota=0,
                    )
                ],
                factorGTO=dict(enabled=enabled, value=0.935 if enabled else 1),
                total=record.total,
                record=dict(id=record.id, register=record.registro, status="exists"),
                redondeo=record.redondeo,
            )
            return Response.success(
                data=data,
                message="Registro del Cálculo del valor unitario de construcción encontrado exitosamente.",
                operation="CostosConstruccion",
            )


def post_costos_construccion(collection: dict) -> Response:
    """
    This method creates a new calculation of unit value of costos construction
    Args:
        data (dict): from request, recovered from json
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    costos = CostosConstruccion.query.filter_by(
        registro=collection["registro"], tipo_servicio=collection["tipo_servicio"]
    ).first()
    if not costos:
        new_costos = CostosConstruccion(collection)
        if save_changes(new_costos):
            return Response.success(
                data="",
                message="Cálculo del valor unitario de construcción.",
                operation="CostosConstruccion",
            )
        else:
            return Response.error(
                message="Cálculo del valor unitario de construcción creado exitosamente.",
                operation="CostosConstruccion",
            )


def patch_costos_construccion(collection: dict) -> Tuple[dict, int]:
    """
    Update Homologation Object
    Args:
        data (dict): from request, recovered from json
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    costos = CostosConstruccion.query.filter_by(
        registro=collection["registro"], tipo_servicio=collection["tipo_servicio"]
    ).first()
    if not costos:
        return Response.bad_request(
            message="No se encontro el registro del cálculo del valor unitario de construcción.",
            operation="CostosConstruccion",
            status_code=200,
        )
    else:
        costos.descripcion = collection["descripcion"]
        costos.costo_directo = collection["costo_directo"]
        costos.indirectos = collection["indirectos"]
        costos.valor_resultante = collection["valor_neto"]
        costos.m2 = collection["m2"]
        costos.factor_gto = collection["factor_gto"]
        costos.valor_resultante = collection["valor_resultante"]
        costos.total = collection["total"]
        costos.redondeo = collection["redondeo"]
        if save_changes(costos):
            return Response.success(
                data=None,
                message="Cálculo del valor unitario de construcción, actualizado exitosamente.",
                operation="CostosConstruccion",
            )
        else:
            return Response.error(
                message="Error interno, cálculo del valor unitario de construcción no actualizado.",
                operation="CostosConstruccion",
            )
