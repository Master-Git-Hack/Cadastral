from Cadastral.apps.homologation.controllers.indicadores_municipales import \
    getIndicadoresMunicipales
from Cadastral.apps.homologation.controllers.justipreciacion import (
    getJustipreciacion, patchJustipreciacion)

from ..models import Homologation, homologationSchema, session


def getHomologation(register, type):
    """
    Get Homologation
    :param register: Register
    :param type: Type
    :return: Homologation Object to work with"""
    return homologationSchema.dump(
        session.query(Homologation).filter_by(registro=register, tipo=type).first()
    )


def postHomologation(collection):
    """
    Create Homologation
    :param collection: data to create Homologation
    :return: Homologation Object Serialized as result of operation
    """
    homologation = Homologation(collection)
    session.add(homologation)
    session.commit()
    return homologationSchema.dump(homologation)


def patchHomologation(
    id, tipo, factores, resultado, valor_unitario, registro, tipo_servicio
):
    """
    Update Homologation
    :param id: Homologation ID
    :param tipo: Type
    :param factores: Factors
    :param resultado: Result
    :param valor_unitario: Unit Value
    :param registro: Register
    :param tipo_servicio: Appraisal Purpose
    :return: Homologation Object Serialized as result of operation
    """
    homologation = Homologation.query.get(id)
    homologation.tipo = tipo
    homologation.factores = factores
    homologation.resultado = resultado
    homologation.valor_unitario = valor_unitario
    homologation.registro = registro
    homologation.tipo_servicio = tipo_servicio
    session.commit()
    return homologationSchema.dump(homologation)


def create(id, type):
    """
    Create Homologation JSON Object
    :param id: ID
    :param type: Type
    :return: Homologation JSON Object with all elements required to create Homologation or update it
    """
    record = getJustipreciacion(id)
    if record is not None:
        if type.upper() == "TERRENO":
            areaSubject = record.sp1_superficie
            item = record.sp1_factor
        else:
            areaSubject = record.cna_superficie
            item = record.cna_edad
        areaSubject = areaSubject if areaSubject is not None else 1
        item = item if item is not None else 1

        result = getHomologation(record.registro, type)

        if result is not None and bool(result):
            return {
                "factors": result["factores"],
                "documentation": result["resultado"],
                "record": {
                    "justipreciacion": {
                        "id": id,
                        "register": result["registro"].upper(),
                    },
                    "homologacion": {
                        "id": result["id"],
                        "type": type.upper(),
                        "appraisalPurpose": result["tipo_servicio"],
                        "status": "exists",
                    },
                },
                "areaOptions": getIndicadoresMunicipales(),
            }
        else:
            return {
                "factors": {
                    "Age": {
                        "subject": {"value": item if type.upper() != "TERRENO" else 1}
                    }
                },
                "documentation": {
                    "Area": {
                        "subject": {"value": areaSubject},
                        "options": getIndicadoresMunicipales(),
                    },
                    "ReFactor": {"surface": item if type.upper() == "TERRENO" else 1},
                },
                "record": {
                    "justipreciacion": {
                        "id": id,
                        "register": record.registro,
                    },
                    "homologacion": {
                        "type": type.upper(),
                        "status": "newOne",
                    },
                },
            }
    else:
        return None


def insert(id, type, data):
    """
    Insert Homologation and update Justipreciacion Operation
    :param id: ID
    :param type: Type
    :param data: Data
    :return: Homologation Object Serialized as result of operation
    """
    response = postHomologation(data)
    if response is not None and bool(response):
        if bool(patchJustipreciacion(id, type, data)):
            return True
        else:
            return None
    else:
        return None


def update(id, type, data):
    """
    Update Homologation and update Justipreciacion Operation
    :param id: ID
    :param type: Type
    :param data: Data
    :return: Homologation Object Serialized as result of operation
    """
    tipo = data["tipo"].lower()
    factores = data["factores"]
    resultado = data["resultado"]
    valor_unitario = data["valor_unitario"]
    registro = data["registro"]
    tipo_servicio = data["tipo_servicio"].lower()
    response = patchHomologation(
        data["id"], tipo, factores, resultado, valor_unitario, registro, tipo_servicio
    )
    if response is not None and bool(response):
        response = patchJustipreciacion(id, type, data)

        if bool(response):
            return True
        else:
            return None
    else:
        return None
