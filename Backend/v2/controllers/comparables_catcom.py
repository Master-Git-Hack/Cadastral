from os.path import exists
from typing import List, Optional, Set

from jinja2 import Template
from reportlab.lib.pagesizes import A4, letter
from reportlab.pdfgen import canvas

from .. import config
from ..models.comparables_catcom import ComparablesCatcom
from ..utils.local import as_complete_date, as_currency, as_percentage, with_decimals
from ..utils.pdf import PDFMaker as PDF
from ..utils.tmp import name_it as tmp_filename

__session = config.db.valuaciones.create_session()
mercado_keys: dict = {
    "": "FOLIO",
    "": "TIPO_INMUEBLE",
    "": "TIPO_OPERACION",
    "": "FECHA_CAPTURA",
    "": "URL_FUENTE",
    "": "INFORMANTE",
    "": "TELEFONO_INFORMANTE",
    "x_utm": "COORDENADAS_UTM_X",
    "y_utm": "COORDENADAS_UTM_Y",
    "": "ESTADO",
    "": "MUNICIPIO",
    "": "CIUDAD",
    "": "COLONIA",
    "": "CALLE",
    "": "NO_EXTERIOR",
    "": "NO_INTERIOR",
    "": "NOMBRE_EDIFICIO",
    "": "REGIMEN_PROPIEDAD",
    "": "CLASIFICACION_PERIFERICA",
    "": "CLASIFICACION_ECONOMICA",
    "": "USO_SUELO",
    "": "ENE_CALLES",
    "": "UBICACION_MANZANA",
    "": "NUMERO_FRENTES",
    "": "SUPERFICIE_TERRENO",
    "": "FRENTE",
    "": "FRENTE_TIPO",
    "": "FONDO",
    "": "FORMA",
    "": "TOPOGRAFIA",
    "": "SUPERFICIE_CONSUCCION",
    "": "PROYECTO",
    "": "EDO_CONSERVACION",
    "": "TIPO_CONSUCCION",
    "": "CALIDAD",
    "": "EDAD",
    "": "NIVELES",
    "": "UNIDADES_RENTABLES",
    "": "DESCRIPCION_ESPACIOS",
    "": "T_C",
    "": "SERVICIOS",
    "": "DESCRIPCION_SERVICIOS",
    "": "PRECIO",
    "": "PRECIO_UNITARIO",
    "": "PRECIO_TOTAL_USD",
    "": "PRECIO_UNITARIO_USD",
    "": "PRECIO_TOTAL_APLICABLE",
    "": "PRECIO_UNITARIO_APLICABLE",
    "": "OBSERVACIONES",
    "": "HOY",
    "": "DIAS",
    # "": "CADUCA_MESES",
    "usuario": "ELABORO",
}
cedulas_mercado_keys: dict = {
    "": "COMERCIAL_FRENTE",
    "": "COMPARABLE",
    "": "FECHA_CAPTURA",
    "": "PERIFERIA",
    "": "TIPO_INMUEBLE",
    "": "ZONA_ECONOMICA",
    "": "INFORMANTE",
    "": "USO_SUELO",
    "": "TELEFONO_INFORMANTE",
    "": "ENTRE_CALLES",
    "": "URL_FUENTE",
    "": "UBICACACION_MZA",
    "": "SUPERFICIE",
    "": "TIPO_OPERACION",
    "": "NO_FRENTES",
    "": "FRENTE_ML",
    "": "FRENTE_TIPO",
    "": "FONDO",
    "": "ESTADO",
    "": "FORMA",
    "": "MUNICIPIO",
    "": "TOPOGRAFIA",
    "": "CIUDAD",
    "": "SERVICIOS",
    "": "ASENTAMIENTO",
    "": "REGIMEN_PROPIEDAD",
    "": "NOMBRE_VIALIDAD",
    "": "NO_EXTERIOR",
    "": "NO_INTERIOR",
    "": "EDIFICIO_PREDIO_PROTOTIPO",
    "": "PRECIO",
    "": "COORDENADA_X",
    "": "COORDENADA_Y",
    "": "PRECIO_UNITARIO",
    "": "PRECIO_USD",
    "": "PRECIO_UNITARIO_USD",
    "": "OBSERVACIONES",
    "": "INFRAESTRUCTURA",
    "": "ELABORO",
}


def render(data: List[dict] | dict, type: str = "mercado"):
    template: Template = Template(open(f"{config.PATHS.templates}/{type}.html").read())
    files: List[str] = []
    if type == "mercado":
        keys = mercado_keys
    else:
        keys = cedulas_mercado_keys
    if isinstance(data, list):
        for predio in data:
            with open(f"{(filename:=tmp_filename())}.html", "w", encoding="UTF-8") as f:
                f.write(
                    template.render(
                        **{
                            keys.get(key, key.upper()): value
                            for key, value in predio.items()
                        }
                    )
                )
            files.append(filename)
    else:
        with open(f"{(filename:=tmp_filename())}.html", "w", encoding="UTF-8") as f:
            f.write(
                template.render(
                    **{keys.get(key, key.upper()): value for key, value in data.items()}
                )
            )
        files.append(filename)
    return files


def check(**kawrgs):
    comparables = ComparablesCatcom()
    if comparables.filter(**kawrgs) is None:
        return False
    return comparables.to_dict()


class ComparablesCatCom:
    files: Optional[List[str]] = None
    merged: Optional[str] = None
    current: Optional[str] = None

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.files = None
        self.merged = None
        self.current = None

    def create(self, **kwargs):
        if not (data := check(**kwargs)):
            return None
        self.files = render(data)
        return self.files
