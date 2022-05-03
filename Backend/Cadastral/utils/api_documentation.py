from typing import Optional

from flask_restx import fields


def getDocumentation(params: dict, example: Optional[str] = None):
    """
    Generates documentation for a given endpoint.
    :param params: Dictionary with the parameters of the endpoint.
    :param example: Example of the endpoint.
    :return: Dictionary with the documentation of the endpoint.
    """
    response: dict = {
        "params": params,
        "responses": {
            201: "Regresa la respuesta esperada del cliente",
            401: "No se encontro el registro o algo fallo durante el proceso de ejecución",
        },
        "example": example,
    }
    return response


class DictItem(fields.Raw):
    """
    This class is used to generate a json structure for documentation.
    """
    def output(self, key, obj, *args, **kwargs):
        try:
            dct = getattr(obj, self.attribute)
        except AttributeError:
            return {}
        return dct or {}
