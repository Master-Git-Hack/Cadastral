from ..models.homologacion import Homologacion
from ..utils.response import Responses
from .justipreciacion import get as get_justipreciacion


def get(id: int, tipo: str) -> Responses:
    response = Responses()
    justipreciacion = get_justipreciacion(id=id)
    if justipreciacion is None:
        return response.error(
            message="No existe la justipreciacion a la cual desea aplicar la homologacion",
            status_code=404,
        )
    homologacion = Homologacion()
    if (
        homologacion.filter(registro=justipreciacion.current.registro, tipo=tipo)
        is None
    ):
        return response.error(
            message="No existe el registro actual de Homologacion",
            status_code=404,
        )
    return response.success(
        data={
            "factors": homologacion.current.factores,
            "documentation": homologacion.current.resultado,
            "record": {
                "id": homologacion.current.id,
                "type": homologacion.current.tipo.upper(),
                "appraisalPurpose": homologacion.current.tipo_servicio,
                "status": "exists",
            },
        }
    )


def post(data: dict) -> Responses:
    response = Responses()
    homologacion = Homologacion()
    registro = data.get("registro")
    tipo = data.get("tipo")
    if (
        registro is not None
        and tipo is not None
        and homologacion.filter(registro=registro, tipo=tipo) is not None
    ):
        return response.error(
            message=f"Existe ya un registro o no se proporcionaron los parametros adecuados( {registro=} y {tipo=} ) de Homologacion, verifique su informacion.",
            status_code=409,
        )
    if homologacion.create(**data) is None:
        return response.error(
            message="No se pudo crear el registro de Homologacion, verifique su informacion.",
            status_code=422,
        )
    return response.success(data=homologacion.to_dict())


def patch(data: dict) -> Responses:
    response = Responses()
    homologacion = Homologacion()
    registro = data.get("registro")
    tipo = data.get("tipo")
    if (
        registro is not None
        and tipo is not None
        and homologacion.filter(registro=registro, tipo=tipo) is None
    ):
        return response.error(
            message=f"No existe un registro o no se proporcionaron los parametros adecuados( {registro=} y {tipo=} ) de Homologacion, verifique su informacion.",
            status_code=404,
        )
    if homologacion.update(**data) is None:
        return response.error(
            message="No se pudo actualizar el registro de Homologacion, verifique su informacion.",
            status_code=422,
        )
    return response.success(data=homologacion.to_dict())
