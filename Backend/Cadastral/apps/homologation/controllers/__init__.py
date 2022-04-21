from Cadastral.apps.homologation.models import Homologation, homologationSchema, session
from Cadastral.apps.homologation.controllers.indicadores_municipales import (
    getIndicadoresMunicipales,
)
from Cadastral.apps.homologation.controllers.justipreciacion import (
    getJustipreciacion,
    patchJustipreciacion,
)


def getHomologation(register, type):
    return homologationSchema.dump(
        session.query(Homologation).filter_by(registro=register, tipo=type).first()
    )


def postHomologation(collection):
    homologation = Homologation(collection)
    session.add(homologation)
    session.commit()
    return homologationSchema.dump(homologation)


def patchHomologation(
    id, tipo, factores, resultado, valor_unitario, registro, tipo_servicio
):
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
    response = postHomologation(data)
    if response is not None and bool(response):
        if bool(patchJustipreciacion(id, type, data)):
            return True
        else:
            return None
    else:
        return None


def update(id, type, data):
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
