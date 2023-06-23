from os.path import exists
from typing import List, Optional, Set

from jinja2 import Template
from reportlab.lib.pagesizes import A4, letters
from reportlab.pdfgen import canvas

from .. import config
from ..models.catastral import Catastral
from ..models.departamento_solicitante import DepartamentoSolicitante
from ..models.municipios import Municipios
from ..utils.local import as_complete_date, as_currency, as_percentage, with_decimals
from ..utils.pdf import PDF
from ..utils.tmp import name_it as tmp_filename

__session = config.db.session
upper_values: Set[str] = {"solicitante", "secretaria", "nombre_utf"}
rename_keys: dict = dict(
    oficio_solicitud="OFICIO_DE_SOLICITUD",
    fecha_solicitud="FECHA_DE_SOLICITUD",
    objetivo_avaluo="OBJETIVO_DEL_AVALUO",
    proposito_avaluo="PROPOSITO_DEL_AVALUO",
    inmueble_valua="INMUEBLE_QUE_SE_AVALUA",
    colonia_poblacion="COLONIA_O_POBLACION",
    nombre_utf="MUNICIPIO",
    x_utm="COORDENADAS_EN_X",
    y_utm="COORDENADAS_EN_Y",
    clasificacion_zona="CLASIFICACION_DE_ZONA",
    tipo_constr_dominante="TIPO_DE_CONSTRUCCION_DOMINANTE",
    tipo_pavimento="PAVIMENTO",
    indice_saturacion="INDICE_DE_SATURACION",
    myc_segun="MEDIDAS_Y_COLINDANCIAS",
    inst_electrica="INSTALACION_ELECTRICA",
    col1="ORIENTACION1",
    med1="MEDIDAS_ORIENTACION1",
    inst_sanitaria="INSTALACION_SANITARIA",
    col2="ORIENTACION2",
    med2="MEDIDAS_ORIENTACION2",
    inst_especial="ACCESORIOS",
    col3="ORIENTACION3",
    med3="MEDIDAS_ORIENTACION3",
    col4="ORIENTACION4",
    med4="MEDIDAS_ORIENTACION4",
    col5="ORIENTACION5",
    med5="MEDIDAS_ORIENTACION5",
    col6="ORIENTACION6",
    med6="MEDIDAS_ORIENTACION6",
    sp1_superficie="SUPERFICIE_TERRENO1",
    sp1_vu="VALOR_UNITARIO_TERRENO1",
    sp1_factor="FACTOR_TERRENO1",
    sp1_valor_parcial="VALOR_PARCIAL_TERRENO1",
    cna_vu="CNA_VALOR_UNITARIO",
    sp2_superficie="SUPERFICIE_TERRENO2",
    sp2_vu="VALOR_UNITARIO_TERRENO2",
    sp2_factor="FACTOR_TERRENO2",
    sp2_valor_parcial="VALOR_PARCIAL_TERRENO2",
    cnb_vu="CNB_VALOR_UNITARIO",
    sp3_superficie="SUPERFICIE_TERRENO3",
    sp3_vu="VALOR_UNITARIO_TERRENO3",
    sp3_factor="FACTOR_TERRENO3",
    sp3_valor_parcial="VALOR_PARCIAL_TERRENO3",
    cnc_vu="CNC_VALOR_UNITARIO",
    sp4_superficie="SUPERFICIE_TERRENO4",
    sp4_vu="VALOR_UNITARIO_TERRENO4",
    sp4_factor="FACTOR_TERRENO4",
    sp4_valor_parcial="VALOR_PARCIAL_TERRENO4",
    cnd_vu="CND_VALOR_UNITARIO",
    incr_esq_superficie="INCREMENTO_ESQUINA_SUPERFICIE",
    incr_esq_vu="INCREMENTO_ESQUINA_VALOR_UNITARIO",
    incr_esq_factor="INCREMENTO_ESQUINA_FACTOR",
    incr_esq_valor_parcial="INCREMENTO_ESQUINA_VALOR_PARCIAL",
    sup_total_terreno="SUPERFICIE_TOTAL_TERRENO",
    sup_total_construccion="SUPERFICIE_TOTAL_CONSTRUCCION",
    vt_catastral="VALOR_TOTAL_CATASTRAL",
    foto="IMAGEN_SATELITAL",
)


def render(data: List[dict]) -> list:
    template: Template = Template(
        open(
            f"{config.PATHS.templates}/avaluo_catastral_template.html", encoding="UTF-8"
        ).read()
    )
    files: List[str] = []
    for obj in data:
        template_data: dict = {}
        for key, value in obj.items():
            if key in upper_values:
                template_data[key.upper()] = value.upper()
                continue
            if key in set(rename_keys):
                template_data[rename_keys.get(key, key.upper())] = value
                continue
            template_data[key.upper()] = value
        if obj.get("registro") is None:
            continue
        filename = f"{config.PATHS.tmp}/{obj['registro']}"
        with open(f"{filename}.html", "w", encoding="UTF-8") as file:
            file.write(template.render(**template_data))
        files.append(filename)


def water_mark() -> str:
    """Checks if exists a watermark template in case it be needed,
    if exists returns its path, otherwise creates a newone and return it.

    Returns:
        path (str): return the path of the watermark to use.
    """
    watermark = f"{config.PATHS.templates}/watermark.pdf"
    if exists(watermark):
        return watermark

    gto_logo = f"{config.PATHS.images}/logo.png"
    gl_logo = f"{config.PATHS.images}/gl.png"
    secretary_information = f"{config.PATHS.images}/Sec.png"
    board = canvas.Canvas(filename=watermark, pagesize=A4)
    # draw images into the board
    board.drawImage(gto_logo, 0, 779, width=150, height=60, mask="auto")
    board.drawImage(gl_logo, 532, 779, width=60, height=60, mask="auto")
    board.drawImage(secretary_information, 0.5, 0.5, width=200, height=30, mask="auto")
    # save the board as watermark to work with in the future an reduce the time of the process
    board.save()
    return watermark


coordinates: Set[str] = {"x_utm", "y_utm"}
servicios: Set[str] = {
    "agua",
    "drenaje",
    "energia_electrica",
    "telefonia",
    "tipo_pavimento",
    "alumbrado_publico",
    "banqueta",
}

moneda: Set[str] = {
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
}

decimales2: Set[str] = {
    "incr_esq_superficie",
    "sup_total_construccion",
    "cna_superficie",
    "cnb_superficie",
    "cnc_superficie",
}
decimales3: Set[str] = {
    "sup_total_terreno",
    "sp1_superficie",
    "sp2_superficie",
    "sp3_superficie",
    "sp4_superficie",
}

tipo: Set[str] = {"cna_tipo", "cnb_tipo", "cnc_tipo", "cnd_tipo"}


def check(collection, begin: int, end: int, year: int, **kwargs) -> list:
    """Check if the records are in the database with the given year
    Args:
        collection (list): a list with the records to check
        begin (int): the first record to check
        end (int): the last record to check
        year (int): the year to check
    Returns:
        list: a list with the records that are in the database
    """
    catastral = Catastral()
    regex = catastral.__model.registro.between(
        f"{collection}-{begin}_{year}", f"{collection}-{end}_{year}"
    )
    catastral.current = (
        catastral.__session.filter(catastral.__model.estatus != 0)
        .filter(regex)
        .order_by(catastral.__model.registro)
        .all()
    )
    return catastral.to_list(**kwargs)


def yes_no(item) -> str:
    """Convert a boolean to a string
    Args:
        item (bool): a boolean value
    Returns:
        str: a string with the value 'Si' or 'No'
    """
    return "Sí" if item else "No"


def concat(*args: str) -> str:
    """Append all items together to create the string description needed for the report

    Args:
        *args (str): variable number of text items

    Returns:
        str: the concatenated string
    """
    items = (arg for arg in args if arg)  # Filter out empty strings
    text = " ".join(f"{char}.{item}," for char, item in zip("ABCD", items))
    return f"{text}."


def format_response(data) -> dict:
    """Format the data to be used in the report

    Args:
        data (dict): Raw data from the database

    Returns:
        dict: The formatted data
    """
    nombre_utf = data.get("nombre_utf", "")
    secretaria = data.get("secretaria", "")

    keys_to_concat = {
        "muros",
        "carpinteria",
        "estructura",
        "inst_electrica",
        "entrepisos",
        "inst_sanitaria",
        "techos",
        "inst_especial",
        "pisos",
        "acabado_exterior",
        "puertas",
        "acabado_interior",
        "ventanas",
        "muebles_sanitarios",
    }

    for key, value in data.items():
        if isinstance(value, str):
            data[key] = value.strip() or ""
        elif isinstance(value, int) or isinstance(value, bool):
            data[key] = value or 0
        else:
            data[key] = value or ""

        if key in coordinates:
            data[key] = with_decimals(value, 0)
        elif key in servicios:
            data[key] = yes_no(value)
        elif key in moneda:
            data[key] = as_currency(value)
        elif key in decimales2:
            data[key] = with_decimals(value, 2)
        elif key in decimales3:
            data[key] = with_decimals(value, 3)
        elif key in tipo:
            data[key] = (
                str(value or "").split("|")[0]
                if str(value or "").find("|") != -1
                else ""
            )

    data["indice_saturacion"] = as_percentage(data.get("indice_saturacion", ""))
    data["nombre_utf"] = nombre_utf
    data["secretaria"] = secretaria

    for key in keys_to_concat:
        data[key] = concat(
            data.get(key, ""),
            data.get(f"cnb_{key}", ""),
            data.get(f"cnc_{key}", ""),
            data.get(f"cnd_{key}", ""),
        )
    url = "http://172.31.113.151/reportes_avaluos/imagenes"
    data["croquis"] = f'url/{data["croquis"]}'
    data["foto"] = f'{url}/{data["foto"]}'
    data["fecha_emision"] = as_complete_date(data.get("fecha_emision", ""))

    return data


def get(data: dict) -> list:
    """Get all the records from the database and format them to be used in the report

    Returns:
        list: a list with all the formatted records
    """
    reportes = check(
        collection=data["collection"],
        begin=data["limits"]["min"],
        end=data["limits"]["max"],
        year=data["year"],
    )
    catastral = Catastral()
    municipio = Municipios()
    departamento = DepartamentoSolicitante()
    payload: List[dict] = []
    for reporte in reportes:
        if reporte.get("id") is None:
            continue
        query = (
            __session(
                catastral.__model,
                municipio.__model.nombre_utf,
                departamento.__model.secretaria,
            )
            .join(
                departamento.__model,
                catastral.__model.solicitante == departamento.__model.descripcion,
            )
            .join(
                municipio.__model,
                catastral.__model.municipio == municipio.__model.nombre,
            )
            .filter(catastral.__model.estatus != 0)
            .filter(catastral.__model.id == reporte["id"])
            .first()
        )
        payload.append(format_response(catastral.to_dict(query.Catastral)))


class ReportesCatastrales:
    files: Optional[List[str]] = None
    merged_file: Optional[str] = None
    current: Optional[object] = None

    def __init__(self):
        ...

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.files = None
        self.merged_file = None
        self.current = None

    def create(self, **kwargs) -> List[str]:
        data = []
        if "data" in kwargs.keys():
            data = kwargs.get("data", [])
            del kwargs["data"]
        watermark = water_mark() if kwargs.get("watermark", False) else None

        pdf = PDF(templates=render(data), watermark=watermark, **kwargs)
        pdf.render()
        self.files = pdf.files
        if kwargs.get("watermark", False):
            pdf.water_mark_it()
        self.merged_file = pdf.merge(
            output_filename=kwargs.get("filename", tmp_filename(extension="pdf"))
        )
        return self.merged_file

    def merge(self, files: Optional[List[str]] = None) -> str:
        if files is not None:
            self.files = files
        pdf = PDF(files=self.files)
        self.merged_file = pdf.merge()
        return self.merged_file


ReportesCatastrales.get = get
