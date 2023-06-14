from flask import Blueprint, request

from ..utils.response import Responses

costos_construccion_api: Blueprint = Blueprint(
    "Costos Construccion", __name__, url_prefix="/costos-construccion"
)


@costos_construccion_api.get("/<int:justipreciacion>")
def get_costos_construccion(
    justipreciacion: int, response: Responses = Responses()
) -> Responses:
    """
    Returns the data of the homologacion given the tipo and justipreciacion, if not found returns 404
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    if justipreciacion is None:
        return response.error()
    return response.success()


@costos_construccion_api.post("/<int:justipreciacion>")
def post_costos_construccion(
    justipreciacion: int,
    data: request = request.json,
    response: Responses = Responses(),
) -> Responses:
    """
    Returns the data of the homologacion given the tipo and justipreciacion, if not found returns 404
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    if justipreciacion is None:
        return response.error()
    return response.success()


@costos_construccion_api.patch("/<int:justipreciacion>")
def patch_costos_construccion(
    justipreciacion: int,
    data: request = request.json,
    response: Responses = Responses(),
) -> Responses:
    """
    Returns the data of the homologacion given the tipo and justipreciacion, if not found returns 404
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    if justipreciacion is None:
        return response.error()
    return response.success()


@costos_construccion_api.patch("/justipreciacion/<int:justipreciacion>")
def path_justipreciacion(
    justipreciacion: int,
    data: request = request.json,
    response: Responses = Responses(),
):
    """
    Creates a patch CostosConstruccion
    Returns:
        response (dict): response to the request
        status_code (int): status code of the response
    """
    if justipreciacion is None:
        return response.error()
    return response.success()
