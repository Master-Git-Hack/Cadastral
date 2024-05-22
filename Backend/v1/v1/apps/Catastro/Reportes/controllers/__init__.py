"""File to controller functions of the reports module"""

from ..... import db
from .....utils.local import as_complete_date, as_currency, as_percentage, with_decimals
from ..helper import create_pdf, merge_pdf
from ..models.catastral import Catastral, catastral_schema, many_Catastral_Schema
from ..models.dep_solicitante import DepSolicitante
from ..models.municipios import Municipios


def create(data: dict) -> str:
    filename = data["filename"]
    zoom = data["zoom"]
    more_properties = data["moreProperties"]
    watermark = data["watermark"]
    data = get(data)
    data = {
        "data": data,
        "zoom": zoom,
        "pageSize": more_properties["pageSize"],
        "margins": more_properties["margins"],
        "dpi": more_properties["dpi"],
        "watermark": watermark,
        "filename": filename,
    }
    return create_pdf(data)


def merge(files: list) -> str:
    """Merge all the files in the list
    Args:
        files (list): a list with the files to merge
    Returns:
        str: path of the merged file
    """
    return merge_pdf(files)


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
    "incr_esq_valor_parcial",
    "valor_total_terreno",
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


def check(collection: list, begin: int, end: int, year: int) -> list:
    """Check if the records are in the database with the given year
    Args:
        collection (list): a list with the records to check
        begin (int): the first record to check
        end (int): the last record to check
        year (int): the year to check
    Returns:
        list: a list with the records that are in the database
    """
    return many_Catastral_Schema.dump(
        Catastral.query.filter(Catastral.estatus != 0)
        .filter(
            Catastral.registro.between(
                f"{collection}-{begin}_{year}", f"{collection}-{end}_{year}"
            )
        )
        .order_by(Catastral.registro)
        .all()
    )


def get(data: dict) -> list:
    """Get the data needed for the report
    Args:
        data: dict with the data needed for the report
    Returns:
        list: a list with the data needed for the report
    """
    records = check(
        collection=data["collection"],
        begin=data["limits"]["min"],
        end=data["limits"]["max"],
        year=data["year"],
    )
    payload = []
    for record in records:
        query = (
            db.session.query(
                Catastral, Municipios.nombre_utf, DepSolicitante.secretaria
            )
            .join(DepSolicitante, Catastral.solicitante == DepSolicitante.descripcion)
            .join(Municipios, Catastral.municipio == Municipios.nombre)
            .filter(Catastral.estatus != 0)
            .filter(Catastral.id == record["id"])
            .first()
        )
        payload.append(format_response(query))

    return payload


def concat(item_a: str, item_b: str, item_c: str, item_d: str) -> str:
    """Append all items together to create the string description needed for the report

    Args:
        item_a (str): some text
        item_b (str): some text
        item_c (str): some text
        item_d (str): some text

    Returns:
        str: the concatenated string
    """
    text = ""
    lista = [
        "A.",
        ", B.",
        ", C.",
        ", D.",
    ]

    if item_a != "":
        text += f"{lista[0]}{item_a}"
        lista.pop(0)
    if item_b != "":
        text += f"{lista[0]}{item_b}"
        lista.pop(0)
    if item_c != "":
        text += f"{lista[0]}{item_c}"
        lista.pop(0)
    if item_d != "":
        text += f"{lista[0]}{item_d}"
        lista.pop(0)
    return f"{text}."


def yes_no(item) -> str:
    """Convert a boolean to a string
    Args:
        item (bool): a boolean value
    Returns:
        str: a string with the value 'Si' or 'No'
    """
    return "Sí" if item else "No"


def format_response(data: dict) -> dict:
    """format the data to be used in the report

    Args:
        data (dict): raw data from the database

    Returns:
        dict: the formatted data
    """
    nombre_utf = data.nombre_utf if data.nombre_utf is not None else ""
    secretaria = data.secretaria if data.secretaria is not None else ""

    try:
        data = many_Catastral_Schema.dump(data.Catastral)
    except Exception as e:
        data = catastral_schema.dump(data.Catastral)

    for key, value in data.items():
        if isinstance(value, str):
            data[key] = value.strip() or ""
        elif isinstance(value, int):
            data[key] = value or 0
        elif isinstance(value, bool):
            data[key] = value or 0
        else:
            data[key] = value or ""

        if key in coordinates:
            data[key] = with_decimals(value, 0)
        if key in servicios:
            data[key] = yes_no(value)
        if key in moneda:
            data[key] = as_currency(value)
        if key in decimales2:
            data[key] = with_decimals(value, 2)
        if key in decimales3:
            data[key] = with_decimals(value, 3)
        if key in tipo:
            item = str(value or "").split("|")
            data[key] = item[0] if str(value or "").find("|") != -1 else ""
    data["indice_saturacion"] = as_percentage(data["indice_saturacion"])
    data["nombre_utf"] = nombre_utf
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
    data["fecha_emision"] = as_complete_date(data["fecha_emision"])
    return data
