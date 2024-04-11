from sqlalchemy.orm import Session

from ..middlewares.responses import Responses
from ..models.costos_construccion import CostosConstruccion
from .justipreciacion import get as get_justipreciacion

response = Responses()


def get(id: int, db: Session) -> Responses:
    response = Responses()
    justipreciacion = get_justipreciacion(id=id)
    c_c = CostosConstruccion(db)
    if justipreciacion is None:
        return response.error(
            message="No existe el registro de justipreciacion a consulta para la operacion de Costos de Construc_cion",
            status_code=404,
        )
    if c_c.filter(registro=justipreciacion.current.registro) is None:
        return response.error(
            message="No existe el registro actual de Costos de Construc_cion",
            status_code=404,
        )
    enabled = c_c.current.factor_gto
    return response.success(
        data={
            "titulo": c_c.current.descripcion,
            "data": [
                {
                    "costoDirecto": c_c.current.costo_directo,
                    "indirectos": c_c.current.indirectos,
                    "valorNeto": c_c.current.valor_resultante,
                    "m2": c_c.current.m2,
                    "total": 0,
                }
            ],
            "factorGTO": {"enabled": enabled, "value": 0.935 if enabled else 1},
            "total": c_c.current.total,
            "record": {
                "id": c_c.current.id,
                "register": c_c.current.registro,
                "status": "exists",
            },
            "redondeo": c_c.current.redondeo,
        }
    )


def post(data: dict, db: Session) -> Responses:
    response = Responses()
    c_c = CostosConstruccion(db)
    registro = data.get("registro")
    tipo_servicio = data.get("tipo_servicio")
    if (registro is not None and tipo_servicio is not None) and (
        c_c.filter(registro=registro, tipo_servicio=tipo_servicio) is not None
    ):
        return response.error(
            message=f"Existe ya un registro o no se proporcionaron los parametros adecuados( {registro=} y {tipo_servicio=} ) de Costos de Construc_cion, verifique su informacion.",
            status_code=409,
        )
    if c_c.create(**data) is None:
        return response.error(
            message="No se pudo crear el registro de Costos de Construc_cion, verifique su informacion.",
            status_code=422,
        )
    return response.success(data=c_c.to_dict())


def patch(data: dict, db: Session) -> Responses:
    response = Responses()
    c_c = CostosConstruccion(db)
    registro = data.get("registro")
    tipo_servicio = data.get("tipo_servicio")
    if (registro is not None and tipo_servicio is not None) and (
        c_c.filter(registro=registro, tipo_servicio=tipo_servicio) is None
    ):
        return response.error(
            message=f"No existe un registro o no se proporcionaron los parametros adecuados( {registro=} y {tipo_servicio=} ) de Costos de Construc_cion, verifique su informacion.",
            status_code=404,
        )
    if c_c.update(**data) is None:
        return response.error(
            message="No se pudo actualizar el registro de Costos de Construc_cion, verifique su informacion.",
            status_code=422,
        )
    return response.success(data=c_c.to_dict())
