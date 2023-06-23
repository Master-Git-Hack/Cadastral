from ..models.costos_construccion import CostosConstruccion
from ..utils.response import Responses
from .justipreciacion import get as get_justipreciacion


def get(id: int) -> Responses:
    response = Responses()
    justipreciacion = get_justipreciacion(id=id)
    cc = CostosConstruccion()
    if justipreciacion is None:
        return response.error(
            message="No existe el registro de justipreciacion a consulta para la operacion de Costos de Construccion",
            status_code=404,
        )
    if cc.filter(registro=justipreciacion.current.registro) is None:
        return response.error(
            message="No existe el registro actual de Costos de Construccion",
            status_code=404,
        )
    enabled = cc.current.factor_gto
    return response.success(
        data={
            "titulo": cc.current.descripcion,
            "data": [
                {
                    "costoDirecto": cc.current.costo_directo,
                    "indirectos": cc.current.indirectos,
                    "valorNeto": cc.current.valor_resultante,
                    "m2": cc.current.m2,
                    "total": 0,
                }
            ],
            "factorGTO": {"enabled": enabled, "value": 0.935 if enabled else 1},
            "total": cc.current.total,
            "record": {
                "id": cc.current.id,
                "register": cc.current.registro,
                "status": "exists",
            },
            "redondeo": cc.current.redondeo,
        }
    )


def post(data: dict) -> Responses:
    response = Responses()
    cc = CostosConstruccion()
    registro = data.get("registro")
    tipo_servicio = data.get("tipo_servicio")
    if (registro is not None and tipo_servicio is not None) and (
        cc.filter(registro=registro, tipo_servicio=tipo_servicio) is not None
    ):
        return response.error(
            message=f"Existe ya un registro o no se proporcionaron los parametros adecuados( {registro=} y {tipo_servicio=} ) de Costos de Construccion, verifique su informacion.",
            status_code=409,
        )
    if cc.create(**data) is None:
        return response.error(
            message="No se pudo crear el registro de Costos de Construccion, verifique su informacion.",
            status_code=422,
        )
    return response.success(data=cc.to_dict())


def patch(data: dict) -> Responses:
    response = Responses()
    cc = CostosConstruccion()
    registro = data.get("registro")
    tipo_servicio = data.get("tipo_servicio")
    if (registro is not None and tipo_servicio is not None) and (
        cc.filter(registro=registro, tipo_servicio=tipo_servicio) is None
    ):
        return response.error(
            message=f"No existe un registro o no se proporcionaron los parametros adecuados( {registro=} y {tipo_servicio=} ) de Costos de Construccion, verifique su informacion.",
            status_code=404,
        )
    if cc.update(**data) is None:
        return response.error(
            message="No se pudo actualizar el registro de Costos de Construccion, verifique su informacion.",
            status_code=422,
        )
    return response.success(data=cc.to_dict())
