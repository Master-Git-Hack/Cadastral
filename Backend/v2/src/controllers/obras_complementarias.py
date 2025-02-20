from ..models.obras_complementarias import ObrasComplementarias
from ..utils.response import Responses
from .justipreciacion import get as get_justipreciacion


def get(id: int) -> Responses:
    response = Responses()
    justipreciacion = get_justipreciacion(id=id)

    if justipreciacion is None:
        return response.error(
            message="No existe la justipreciacion a la cual desea aplicar el calculo de Obras Complementarias.",
            status_code=404,
        )
    obra = ObrasComplementarias()
    if obra.filter(registro=justipreciacion.registro) is None:
        return response.error(
            message="No existe registro guardado, se creará uno nuevo.",
            status_code=404,
        )
    return response.success(
        data={
            "record": {
                "id": obra.current.id,
                "register": obra.current.registro,
                "status": "exists",
            },
            "documentation": obra.current.datos,
            "calculous": obra.current.calculo,
            "total": obra.current.valor_unitario,
            "isComplete": obra.current.calculo_completo,
            "rounded": obra.current.redondeo,
        }
    )


def post(id: int, data: dict) -> Responses:
    response = Responses()
    justipreciacion = get_justipreciacion(id=id)

    if justipreciacion is None:
        return response.error(
            message="No existe la justipreciacion a la cual desea aplicar el calculo de Obras Complementarias.",
            status_code=404,
        )
    obra = ObrasComplementarias()
    if obra.filter(registro=justipreciacion.registro) is not None:
        return response.error(
            message="Ya existe un registro de Obras Complementarias para esta justipreciacion.",
            status_code=409,
        )
    if obra.create(**data) is None:
        return response.error(
            message="No se pudo crear el registro de Obras Complementarias, verifique su informacion.",
            status_code=422,
        )
    return response.success(data=obra.to_dict())


def patch(id: int, data: dict) -> Responses:
    response = Responses()
    justipreciacion = get_justipreciacion(id=id)
    if justipreciacion is None:
        return response.error(
            message="No existe la justipreciacion a la cual desea aplicar el calculo de Obras Complementarias.",
            status_code=404,
        )
    obra = ObrasComplementarias()
    if obra.filter(registro=justipreciacion.registro) is None:
        return response.error(
            message="No existe registro guardado.",
            status_code=404,
        )
    if obra.update(id=obra.current.id, **data) is None:
        return response.error(
            message="No se pudo actualizar el registro de Obras Complementarias, verifique su informacion.",
            status_code=422,
        )
    return response.success(data=obra.to_dict())
