from typing import Optional

from flask_restx import fields


def getDocumentation(params: dict, example: Optional[str] = None):
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
    def output(self, key, obj, *args, **kwargs):
        try:
            dct = getattr(obj, self.attribute)
        except AttributeError:
            return {}
        return dct or {}
