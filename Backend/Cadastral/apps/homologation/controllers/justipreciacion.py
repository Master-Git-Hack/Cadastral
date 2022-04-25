from Cadastral.apps.homologation.models.justipreciacion import (
    Justipreciacion,
    justipreciacionSchema,
    session,
)
from Cadastral.utils.locale import withDecimals


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
    value = withDecimals(data["valor_unitario"])
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
