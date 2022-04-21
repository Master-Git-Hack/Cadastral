from Cadastral.apps.homologation.models.justipreciacion import (
    Justipreciacion,
    justipreciacionSchema,
    session,
)


def getJustipreciacion(id):
    return Justipreciacion.query.get(id)


def patchJustipreciacion(id, type, data):
    """
    (function) patchJustipreciacion: (id: Number, type: String, data: Dict) -> (Dict | None)\n
    type:
        HOMOLOGATION:"TERRENO" or "RENTA"
        OBRAS_COMPLEMENTARIAS:"OC"
    """
    record = getJustipreciacion(id)
    if record is not None and bool(record):
        if type.upper() == "TERRENO":
            record.sp1_vu = data["valor_unitario"]
        else:
            record.comparativo_mercado = data["valor_unitario"]

        if type.upper() == "OC":
            record.valor_total_obras_comp = data["valor_unitario"]
        session.commit()
        return justipreciacionSchema.dump(record)
    else:
        return None
