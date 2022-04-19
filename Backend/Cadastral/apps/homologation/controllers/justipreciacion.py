from Cadastral.apps.homologation.models.justipreciacion import (
    Justipreciacion,
    justipreciacionSchema,
    session,
)


def getJustipreciacion(id):
    return Justipreciacion.query.get(id)


def patchJustipreciacion(id, type, data):
    record = getJustipreciacion(id)
    if record is not None and bool(record):
        if type == "TERRENO":
            record.comparativo_mercado = data["valor_unitario"]
        else:
            record.sp1_vu = data["valor_unitario"]
        session.commit()

        return justipreciacionSchema.dump(record)
    else:
        return None
