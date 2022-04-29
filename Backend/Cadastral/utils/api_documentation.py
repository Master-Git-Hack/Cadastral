from flask_restx import fields


def getDocumentation(params, example):
    return {
        "params": params,
        "responses": {
            201: "Regresa la respuesta esperada del cliente",
            401: "No se encontro el registro o algo fallo durante el proceso de ejecución",
        },
        "example": example,
    }


class DictItem(fields.Raw):
    def output(self, key, obj, *args, **kwargs):
        try:
            dct = getattr(obj, self.attribute)
        except AttributeError:
            return {}
        return dct or {}
