from ..models.justipreciacion import (
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

    value = float(f'{data["valor_unitario"]:.2f}')

    if record is not None and bool(record):
        if type.upper() == "TERRENO":
            record.sp1_vu = value
        elif type.upper() == "RENTA":
            record.comparativo_mercado = value
        if type.upper() == "OC":
            record.valor_total_obras_comp = value
        session.commit()
        return justipreciacionSchema.dump(record)
    else:
        return None
