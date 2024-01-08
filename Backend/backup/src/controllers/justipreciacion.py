from functools import wraps

from ..models.homologacion import Homologacion
from ..models.justipreciacion import Justipreciacion
from ..utils.response import Responses


def get_justipreciacion(method):
    @wraps(method)
    def wrapper(*args, **kwargs):
        response: Responses = Responses()
        justipreciacion = kwargs.get("justipreciacion")
        if justipreciacion is None:
            justipreciacion = response.error(
                message="No se proporciono el id de justipreciacion"
            )
        justipreciacion = get(id=justipreciacion)
        if justipreciacion is None:
            justipreciacion = response.error(
                message="No existe el registro de justipreciacion a consulta para la operacion de Costos de Construccion",
                status_code=404,
            )
        kwargs |= {"justipreciacion": justipreciacion}
        return method(*args, **kwargs)

    return wrapper


def __justipreciacion(method):
    @wraps(method)
    def wrapper(*args, **kwargs):
        response: Responses = Responses()
        id = kwargs.get("justipreciacion")
        error = None
        if id is None:
            error = response.error(message="No se proporciono el id de justipreciacion")
        justipreciacion = Justipreciacion()
        if justipreciacion.get(id=id) is None:
            error = response.error(
                message="No existe el registro de justipreciacion a consulta para la operacion de Costos de Construccion",
                status_code=404,
            )
        kwargs |= {"justipreciacion": justipreciacion.current, "error": error}

        new_data, action, avoid, error = method(*args, **kwargs)
        if error is not None:
            return error
        if avoid or not new_data:
            return response.error()
        if justipreciacion.update(**new_data) is None:
            return response.error(message=f"", status_code=422)
        return response.success(message=action)

    return wrapper


def get(**kwargs) -> Justipreciacion.get:
    """
    Get a record by id
    Args:
        id (int): The id of the record
        to_dict (bool): Whether to return a dictionary or an object
        exclude (list): List of fields to exclude
    Returns:
        object: The record
    """
    justipreciacion = Justipreciacion()
    return justipreciacion.get(**kwargs)


def get_registro(id: int) -> Responses:
    """
    Get registro of Justipreciacion
    Args:
        id (int): ID
    Returns:
        registro (str): registro
    """
    response = Responses()
    justipreciacion = Justipreciacion()
    if justipreciacion.get(id=id) is None:
        return response.error(
            message="No existe la justipreciacion a la cual desea aplicar la homologacion",
            status_code=404,
        )
    return response.success(
        data={
            "id": justipreciacion.current.id,
            "register": justipreciacion.current.registro,
        }
    )


def get_valor_especifico(id: int, key: str) -> Responses:
    """
    Get valor especifico of Justipreciacion
    Args:
        id (int): ID
        key (str): key
    Returns:
        valor especifico (str): valor especifico
    """
    response = Responses()
    justipreciacion = Justipreciacion()
    data = justipreciacion.get(id=id, to_dict=True)
    if justipreciacion.current is None:
        return response.error(message="No existe esta justipreciacion", status_code=404)
    return response.success(data=data.get(key))


def patch_by_homologacion(id: int, tipo: str, data: dict) -> Responses:
    """
    Update Justipreciacion from an homologacion request
    Args:
        _id (int): ID
        tipo (str): type of the data to be updated
        data (dict): data to be updated
    Returns:
        message (str): message
    """
    response = Responses()
    justipreciacion = Justipreciacion()
    tipo = tipo.upper()
    if justipreciacion.get(id=id) is None:
        return response.error(
            message="Registro de Justipreciacion no encontrado.",
            status_code=404,
        )
    try:
        value = float(f'{data.get("valor_unitario",0.0):.2f}')
    except ValueError:
        homologacion = Homologacion()
        current_homologacion = homologacion.filter(
            registro=justipreciacion.current.registro, tipo=tipo
        )
        value = float(f"{current_homologacion.valor_unitario:.2f}")
    if tipo == "TERRENO":
        data = {
            "sp1_vu": value,
            "sp1_factor": data.get("sp1_factor", 1),
            "sp1_superficie": data.get("sp1_superficie", 1),
        }
    elif tipo == "RENTA":
        data = {
            "comparativo_mercado": value,
            "cna_edad": data.get("cna_edad", 1),
            "cna_superficie": data.get("cna_superficie", 1),
        }

    if justipreciacion.update(id=id, **data) is None:
        return response.error(
            message="No se pudo actualizar la justipreciacion",
            status_code=422,
        )
    return response.success(message="Justipreciacion actualizada exitosamente")


def patch_by_obras_complementarias(id: int, data: dict) -> Responses:
    """
    Update Justipreciacion from an obras complementarias request
    Args:
        _id (int): ID
        data (dict): data to be updated
    Returns:
        message (str): message
    """
    response = Responses()
    justipreciacion = Justipreciacion()
    valor_total_obras_comp = float(f'{data.get("valor_total_obras_comp",0.0):.2f}')
    if justipreciacion.get(id=id) is None:
        return response.error(
            message="Registro de Justipreciacion no encontrado.",
            status_code=404,
        )
    if (
        justipreciacion.update(id=id, valor_total_obras_comp=valor_total_obras_comp)
        is None
    ):
        return response.error(
            message="No se pudo actualizar la justipreciacion",
            status_code=422,
        )
    return response.success(message="Justipreciacion actualizada exitosamente")


def patch_by_costos_construccion(id: int, data: dict) -> Responses:
    """
    Update Justipreciacion from an obras complementarias request
    Args:
        _id (int): ID
        data (dict): data to be updated
    Returns:
        message (str): message
    """
    response = Responses()
    justipreciacion = Justipreciacion()
    cna_vu = float(f'{data.get("cna_vu",0.0):.2f}')
    if justipreciacion.get(id=id) is None:
        return response.error(
            message="Registro de Justipreciacion no encontrado.",
            status_code=404,
        )
    if justipreciacion.update(id=id, cna_vu=cna_vu) is None:
        return response.error(
            message="No se pudo actualizar la justipreciacion",
            status_code=422,
        )
    return response.success(message="Justipreciacion actualizada exitosamente")
