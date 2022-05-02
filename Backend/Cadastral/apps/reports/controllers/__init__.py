from Cadastral.apps.reports.models.catastral import (
    Catastral,
    catastralSchema,
    manyCatastralSchema,
    session,
)
from Cadastral.apps.reports.models.dep_solicitante import DepSolicitante
from Cadastral.apps.reports.models.municipios import Municipios
from Cadastral.utils.local import (
    asCompleteDate,
    asCurrency,
    asPercentage,
    withDecimals,
)
from Cadastral.apps.reports.controllers.template import createPDF, mergePDF


def create(data: dict):
    filename = data["filename"]
    zoom = data["zoom"]
    moreProperties = data["moreProperties"]
    watermark = data["watermark"]
    data = get(data)
    data = {
        "data": data,
        "zoom": zoom,
        "pageSize": moreProperties["pageSize"],
        "margins": moreProperties["margins"],
        "dpi": moreProperties["dpi"],
        "watermark": watermark,
        "filename": filename,
    }
    return createPDF(data)


def merge(files):
    return mergePDF(files)


coordinates = ["x_utm", "y_utm"]
servicios = [
    "agua",
    "drenaje",
    "energia_electrica",
    "telefonia",
    "tipo_pavimento",
    "alumbrado_publico",
    "banqueta",
]
moneda = [
    "incr_esq_vu",
    "incr_esq_valor_parcial" "valor_total_terreno",
    "valor_total_construccion",
    "vt_catastral",
    "sp1_vu",
    "sp2_vu",
    "sp3_vu",
    "sp4_vu",
    "sp1_valor_parcial",
    "sp2_valor_parcial",
    "sp3_valor_parcial",
    "sp4_valor_parcial",
    "cna_vu",
    "cna_valor_parcial",
    "cnb_vu",
    "cnb_valor_parcial",
    "cnc_vu",
    "cnc_valor_parcial",
    "cnd_vu",
    "cnd_valor_parcial",
]
decimales2 = [
    "incr_esq_superficie",
    "sup_total_construccion",
    "cna_superficie",
    "cnb_superficie",
    "cnc_superficie",
    "cnd_superficie",
]
decimales3 = [
    "sup_total_terreno",
    "sp1_superficie",
    "sp2_superficie",
    "sp3_superficie",
    "sp4_superficie",
]
tipo = ["cna_tipo", "cnb_tipo", "cnc_tipo", "cnd_tipo"]


def check(collection, begin, end, year):
    if begin < 10:
        begin = f"0{begin}"
    if end < 10:
        end = f"0{end}"
    return manyCatastralSchema.dump(
        Catastral.query.filter(Catastral.estatus != 0)
        .filter(
            Catastral.registro.between(
                f"{collection}-{begin}_{year}", f"{collection}-{end}_{year}"
            )
        )
        .order_by(Catastral.registro)
        .all()
    )


def get(data):
    records = check(
        collection=data["collection"],
        begin=data["limits"]["min"],
        end=data["limits"]["max"],
        year=data["year"],
    )
    payload = []
    for record in records:
        query = (
            session.query(Catastral, Municipios.nombre_utf, DepSolicitante.secretaria)
            .join(DepSolicitante, Catastral.solicitante == DepSolicitante.descripcion)
            .join(Municipios, Catastral.municipio == Municipios.nombre)
            .filter(Catastral.estatus != 0)
            .filter(Catastral.id == record["id"])
            .first()
        )
        payload.append(formatResponse(query))

    return payload


def concat(itemA, itemB, itemC, itemD):
    text = ""
    list = [
        "A.",
        ", B.",
        ", C.",
        ", D.",
    ]

    if itemA != "":
        text += f"{list[0]}{itemA}"
        list.pop(0)
    if itemB != "":
        text += f"{list[0]}{itemB}"
        list.pop(0)
    if itemC != "":
        text += f"{list[0]}{itemC}"
        list.pop(0)
    if itemD != "":
        text += f"{list[0]}{itemD}"
        list.pop(0)
    return f"{text}."


def yesNo(item):
    return "Sí" if item else "No"


def formatResponse(data):
    nombreUTF = data.nombre_utf or ""
    secretaria = data.secretaria or ""
    data = catastralSchema.dump(data.Catastral)

    for key, value in data.items():
        if type(value) is str:
            data[key] = value.strip() or ""
        elif type(value) is int:
            data[key] = value or 0
        elif type(value) is bool:
            data[key] = value or 0
        else:
            data[key] = value or ""

        if key in coordinates:
            data[key] = withDecimals(value, 0)
        if key in servicios:
            data[key] = yesNo(value)
        if key in moneda:
            data[key] = asCurrency(value)
        if key in decimales2:
            data[key] = withDecimals(value, 2)
        if key in decimales3:
            data[key] = withDecimals(value, 3)
        if key in tipo:
            item = str(value or "").split("|")
            data[key] = item[0] if str(value or "").find("|") != -1 else ""
    data["indice_saturacion"] = asPercentage(data["indice_saturacion"])
    data["nombre_utf"] = nombreUTF
    data["secretaria"] = secretaria
    data["muros"] = concat(
        data["muros"],
        data["cnb_muros"],
        data["cnc_muros"],
        data["cnd_muros"],
    )
    data["carpinteria"] = concat(
        data["carpinteria"],
        data["cnb_carpinteria"],
        data["cnc_carpinteria"],
        data["cnd_carpinteria"],
    )
    data["estructura"] = concat(
        data["estructura"],
        data["cnb_estructura"],
        data["cnc_estructura"],
        data["cnd_estructura"],
    )
    data["inst_electrica"] = concat(
        data["inst_electrica"],
        data["cnb_inst_electrica"],
        data["cnc_inst_electrica"],
        data["cnd_inst_electrica"],
    )
    data["entrepisos"] = concat(
        data["entrepisos"],
        data["cnb_entrepisos"],
        data["cnc_entrepisos"],
        data["cnd_entrepisos"],
    )
    data["inst_sanitaria"] = concat(
        data["inst_sanitaria"],
        data["cnb_inst_sanitaria"],
        data["cnc_inst_sanitaria"],
        data["cnd_inst_sanitaria"],
    )
    data["techos"] = concat(
        data["techos"],
        data["cnb_techos"],
        data["cnc_techos"],
        data["cnd_techos"],
    )
    data["inst_especial"] = concat(
        data["inst_especial"],
        data["cnb_inst_especial"],
        data["cnc_inst_especial"],
        data["cnd_inst_especial"],
    )
    data["pisos"] = concat(
        data["pisos"],
        data["cnb_pisos"],
        data["cnc_pisos"],
        data["cnd_pisos"],
    )
    data["acabado_exterior"] = concat(
        data["acabado_exterior"],
        data["cnb_acabado_exterior"],
        data["cnc_acabado_exterior"],
        data["cnd_acabado_exterior"],
    )
    data["puertas"] = concat(
        data["puertas"],
        data["cnb_puertas"],
        data["cnc_puertas"],
        data["cnd_puertas"],
    )
    data["acabado_interior"] = concat(
        data["acabado_interior"],
        data["cnb_acabado_interior"],
        data["cnc_acabado_interior"],
        data["cnd_acabado_interior"],
    )
    data["ventanas"] = concat(
        data["ventanas"],
        data["cnb_ventanas"],
        data["cnc_ventanas"],
        data["cnd_ventanas"],
    )
    data["muebles_sanitarios"] = concat(
        data["muebles_sanitarios"],
        data["cnb_muebles_sanitarios"],
        data["cnc_muebles_sanitarios"],
        data["cnd_muebles_sanitarios"],
    )
    data[
        "croquis"
    ] = f'http://172.31.113.151/reportes_avaluos/imagenes/{data["croquis"]}'
    data["foto"] = f'http://172.31.113.151/reportes_avaluos/imagenes/{data["foto"]}'
    data["fecha_emision"] = asCompleteDate(data["fecha_emision"])
    return data
