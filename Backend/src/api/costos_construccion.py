from flask import Blueprint, request

from .. import config
from ..utils.response import Responses

costos_construccion_api: Blueprint = Blueprint(
    "Costos Construccion", __name__, url_prefix="/costos-construccion"
)


@costos_construccion_api.get("/<int:justipreciacion>")
def get_costos_construccion(
    justipreciacion: int, response: Responses = Responses()
) -> Responses:
    # @in Location of the parameter (query, path, body, header, formData).
    """Return a record of costos construccion by justipreciacion id
    ---
    tags:
        - Costos Construccion
    parameters:
      - name: justipreciacion
        in: path
        type: string
        required: true
    definitions:
        CostosConstruccion:
            type: object
        Response:
            type: object
    responses:
        200:
            description: A record by xx parameter of justipreciacion
            schema:
                $ref: '#/definitions/CostosConstruccion'
            examples:
                application/json: {'data':{},'message':'success'}
        404:
            description: Not found
            schema:
            $ref: '#/definitions/Response'
            examples:
                application/json: { 'message': 'Not found'}


    """
    if justipreciacion is None:
        return response.error()
    return response.success()


@costos_construccion_api.post("/<int:justipreciacion>")
def post_costos_construccion(
    justipreciacion: int,
    response: Responses = Responses(),
) -> Responses:
    """Inserta a new record of costos construccion by justipreciacion id
    ---
    tags:
        - Costos Construccion
    parameters:
      - name: data
        in: body
        type: object
        required: true
    definitions:
        CostosConstruccion:
            type: object
        Response:
            type: object
    responses:
        200:
            description: A record by xx parameter of justipreciacion
            schema:
                $ref: '#/definitions/CostosConstruccion'
            examples:
                application/json: {'data':{},'message':'success'}
        404:
            description: Not found
            schema:
            $ref: '#/definitions/Response'
            examples:
                application/json: { 'message': 'Not found'}


    """
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return response.success()


@costos_construccion_api.patch("/<int:justipreciacion>")
def patch_costos_construccion(
    justipreciacion: int,
    response: Responses = Responses(),
) -> Responses:
    """Patch a record of costos construccion by justipreciacion id
    ---
    tags:
        - Costos Construccion
    parameters:
       - name: data
         in: body
         type: object
         required: true
    definitions:
        CostosConstruccion:
            type: object
        Response:
            type: object
    responses:
        200:
            description: A record by xx parameter of justipreciacion
            schema:
                $ref: '#/definitions/CostosConstruccion'
            examples:
                application/json: {'data':{},'message':'success'}
        404:
            description: Not found
            schema:
            $ref: '#/definitions/Response'
            examples:
                application/json: { 'message': 'Not found'}


    """
    if justipreciacion is None:
        return response.error()
    data: request = request.json
    return response.success()


@costos_construccion_api.patch("/justipreciacion/<int:justipreciacion>")
def path_justipreciacion(
    justipreciacion: int,
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
    data: request = request.json
    return response.success()
