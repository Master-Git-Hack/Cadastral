from Cadastral.apps.homologation.models import Homologation, homologationSchema, session
from Cadastral.apps.homologation.controllers.indicadores_municipales import (
    getIndicadoresMunicipales,
)
from Cadastral.apps.homologation.controllers.justipreciacion import getJustipreciacion


def getHomologation(register, type):
    return homologationSchema.dump(
        session.query(Homologation).filter_by(registro=register, tipo=type).first()
    )


def postHomologation(collection):
    homologation = Homologation(collection)
    session.add(homologation)
    session.commit()
    return homologationSchema.dump(homologation)


def patch(collection):
    homologation = Homologation.query.get(collection["id"])
    homologation.tipo = collection["tipo"]
    homologation.factores = collection["factores"]
    homologation.resultado = collection["resultado"]
    homologation.valor_unitario = collection["valor_unitario"]
    homologation.registro = collection["registro"]
    homologation.tipo_registro = collection["tipo_registro"]
    session.commit()
    return homologationSchema.dump(homologation)


def create(id, type):
    record = getJustipreciacion(id)
    if record is not None:
        if type.equals("TERRENO"):
            areaSubject = record.sp1_superficie
            item = record.sp1_factor
        else:
            areaSubject = record.cna_area
            item = record.cna_factor

        areaSubject = areaSubject if areaSubject is not None else 1
        item = item if item is not None else 1
        result = getHomologation(record.registro, type)
        if result is not None:
            return {
                "factors": result.factores,
                "documentation": result.resultado,
                "record": {
                    "justipreciacion": {
                        "id": id,
                    },
                    "homologacion": {
                        "id": result.id,
                        "type": type,
                        "appraisalPurpose": result.tipo_registro,
                        "status": "exists",
                    },
                },
                "areaOptions": getIndicadoresMunicipales(),
            }
        else:
            return {
                "factors": {"Age": {"subject": {"value": item}}},
                "documentation": {
                    "Area": {
                        "subject": {"value": areaSubject},
                        "options": getIndicadoresMunicipales(),
                    },
                    "ReFactor": {"surface": item},
                },
                "record": {
                    "justipreciacion": {
                        "id": id,
                    },
                    "homologacion": {
                        "type": type,
                        "status": "newOne",
                    },
                },
            }
    else:
        return None
