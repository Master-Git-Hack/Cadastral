
from typing import Dict, Tuple

from ....utils.dbo import save_changes
from ....utils.response import Response
from ..models.costos_construccion import CostosConstruccion
from . import get_justipreciacion


def get_Costos_Construccion(_id:int,tipo:str)->Tuple[Dict, int]:
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
        record = CostosConstruccion.query.filter_by(id=_id,registro = justipreciacion.registro, tipo = tipo).first()
        if not record:
            return Response.error(
                message="No existe registro guardado, se creará uno nuevo.",
                operation="CostosConstruccion",
                status_code=200,
            )
        else:
            data = dict(
                titulo=record.descripcion,
                data =[dict(
                    costoDirecto=record.costo_directo,
                    indirectos=record.indirectos,
                    valorNeto=record.valor_resultante,
                    m2=record.m2,
                    tota=0
                )],
                factorGTO=record.factor_gto,
                total=record.total,
                record=dict(
                    id=record.id,
                    register =id.registro,
                    status="exists"
                )
            )
            return Response.success(
                data=data,
                message="Registro del Cálculo del valor unitario de construcción encontrado exitosamente.",
                operation="CostosConstruccion",
            )

def post_Costos_Construccion(collection:dict)->Response:
    """
    This method creates a new calculation of unit value of costos construction
    Args:
        data (dict): from request, recovered from json
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    costos = CostosConstruccion.query.filter_by(id=collection["id"],registro=collection["registro"],tipo=collection["tipo"]).first()
    if not costos:
        new_costos = CostosConstruccion(collection)
        if(save_changes(new_costos)):
            return Response.success(
                data="",
                message="Cálculo del valor unitario de construcción.",
                operation="CostosConstruccion"
            )
        else:
            return Response.error(
                message="Cálculo del valor unitario de construcción creado exitosamente.",
                operation="CostosConstruccion",
            )
