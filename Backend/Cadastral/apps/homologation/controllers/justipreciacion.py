from ..models.justipreciacion import Justipreciacion, justipreciacionSchema, session


def getJustipreciacion(id):
    """
    Get Justipreciacion
    :param id: ID
    :return: Justipreciacion Object to work with
    """
    return Justipreciacion.query.get(id)


def patchJustipreciacion(id, type, data):
    """
    Update Justipreciacion
    :param id: ID
    :param type: Type
    :param data: Data
    :return: Justipreciacion Object Serialized as result of operation
    """
    record = getJustipreciacion(id)

    value = float(f'{data["valor_unitario"]:.2f}')
    if record is not None and bool(record):
        if type.upper() == "TERRENO":
            record.sp1_vu = value
            record.sp1_factor = data["sp1_factor"] or 1
            record.sp1_superficie = data["sp1_superficie"] or 1
        elif type.upper() == "RENTA":
            record.comparativo_mercado = value
            record.cna_edad = data["cna_edad"] or 1
            record.cna_superficie = data["cna_superficie"] or 1
        if type.upper() == "OC":
            record.valor_total_obras_comp = value
        session.commit()
        return justipreciacionSchema.dump(record)
    else:
        return None
