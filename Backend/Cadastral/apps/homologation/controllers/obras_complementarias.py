from Cadastral.apps.homologation.models.obras_complementarias import (
    ObrasComplementarias,
    obrasComplementariasSchema,
    session,
)
from Cadastral.apps.homologation.controllers.justipreciacion import (
    getJustipreciacion,
    patchJustipreciacion,
)

type = "OC"


def getById(id):
    return ObrasComplementarias.query.get(id)


def getByRegister(type):
    return obrasComplementariasSchema.dump(
        ObrasComplementarias.query.filter_by(registro=type).first()
    )


def create(id):
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
