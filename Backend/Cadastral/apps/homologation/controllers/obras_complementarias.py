from ..controllers.justipreciacion import (getJustipreciacion,
                                           patchJustipreciacion)
from ..models.obras_complementarias import (ObrasComplementarias,
                                            obrasComplementariasSchema,
                                            session)

type = "OC"


def getById(id):
    """
    Get Obras Complementarias by ID
    :param id: ID
    :return: Obras Complementarias Object to work with
    """
    return ObrasComplementarias.query.get(id)


def getByRegister(type):
    """
    Get Obras Complementarias by Type of Register
    :param type: Type of Register
    :return: Obras Complementarias Object to work with
    """
    return obrasComplementariasSchema.dump(
        ObrasComplementarias.query.filter_by(registro=type).first()
    )


def create(id):
    """
    Create Obras Complementarias JSON Object
    :param id: ID
    :return: Obras Complementarias Object Serialized as result of operation
    """
    record = getJustipreciacion(id)
    if record is not None and bool(record):
        result = getByRegister(record.registro)
        if result is not None and bool(result):
            return {
                "record": {
                    "id": result["id"],
                    "register": result["registro"],
                    "type": "exists",
                },
                "data": result["datos"],
                "total": result["valor_unitario"],
            }
        else:
            return {
                "record": {
                    "id": 0,
                    "register": record.registro,
                    "type": "newOne",
                }
            }
    else:
        return None


def insert(id, data):
    """
    Create Obras Complementarias and update Justipreciacion
    :param id: ID
    :param data: Data to create Obras Complementarias
    :return: Obras Complementarias Object Serialized as result of operation
    """
    record = ObrasComplementarias(data)
    session.add(record)
    session.commit()
    response = obrasComplementariasSchema.dump(record)
    if bool(patchJustipreciacion(id, type, data)):
        if response is not None and bool(response):
            return True
        else:
            return None
    else:
        return None


def update(id, data):
    """
    Update Obras Complementarias and update Justipreciacion
    :param id: ID
    :param data: Data to update Obras Complementarias
    :return: Obras Complementarias Object Serialized as result of operation
    """
    record = getById(data["record"]["id"])
    if record is not None and bool(record):
        record.datos = data["datos"]
        record.valor_unitario = data["valor_unitario"]
        record.registro = data["record"]["register"]
        session.commit()
        response = obrasComplementariasSchema.dump(record)
        if bool(patchJustipreciacion(id, type, data)):
            if bool(response) and response is not None:
                return True
            else:
                return None
    else:
        return None
