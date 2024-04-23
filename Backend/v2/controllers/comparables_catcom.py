from datetime import datetime, timedelta
from os.path import exists
from typing import List, Optional, Set

from jinja2 import Template
from reportlab.lib.pagesizes import A4, letter
from reportlab.pdfgen import canvas
from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from .. import config
from ..models.cedula_comparables import CedulaComparables
from ..models.cedula_mercado import CedulaMercado
from ..models.comparables_catcom import ComparablesCatCom
from ..utils.local import as_complete_date, as_currency, as_percentage, with_decimals
from ..utils.pdf import PDFMaker as PDF
from ..utils.tmp import name_it as tmp_filename

# __session = config.db.valuaciones.create_session()
mercado_keys: set = {
    "FOLIO",
    "TIPO_INMUEBLE",
    "TIPO_OPERACION",
    "FECHA_CAPTURA",
    "URL_FUENTE",
    "INFORMANTE",
    "TELEFONO_INFORMANTE",
    "COORDENADAS_UTM_X",
    "COORDENADAS_UTM_Y",
    "ESTADO",
    "MUNICIPIO",
    "CIUDAD",
    "COLONIA",
    "CALLE",
    "NO_EXTERIOR",
    "NO_INTERIOR",
    "NOMBRE_EDIFICIO",
    "REGIMEN_PROPIEDAD",
    "CLASIFICACION_PERIFERICA",
    "CLASIFICACION_ECONOMICA",
    "USO_SUELO",
    "ENE_CALLES",
    "UBICACION_MANZANA",
    "NUMERO_FRENTES",
    "SUPERFICIE_TERRENO",
    "FRENTE",
    "FRENTE_TIPO",
    "FONDO",
    "FORMA",
    "TOPOGRAFIA",
    "SUPERFICIE_CONSUCCION",
    "PROYECTO",
    "EDO_CONSERVACION",
    "TIPO_CONSUCCION",
    "CALIDAD",
    "EDAD",
    "NIVELES",
    "UNIDADES_RENTABLES",
    "DESCRIPCION_ESPACIOS",
    "T_C",
    "SERVICIOS",
    "DESCRIPCION_SERVICIOS",
    "PRECIO",
    "PRECIO_UNITARIO",
    "PRECIO_TOTAL_USD",
    "PRECIO_UNITARIO_USD",
    "PRECIO_TOTAL_APLICABLE",
    "PRECIO_UNITARIO_APLICABLE",
    "OBSERVACIONES",
    "HOY",
    "DIAS",
    "CADUCA_MESES",
    "ELABORO",
}
cedulas_mercado_keys: set = {
    "COMERCIAL_FRENTE",
    "COMPARABLE",
    "FECHA_CAPTURA",
    "PERIFERIA",
    "TIPO_INMUEBLE",
    "ZONA_ECONOMICA",
    "INFORMANTE",
    "USO_SUELO",
    "TELEFONO_INFORMANTE",
    "ENTRE_CALLES",
    "URL_FUENTE",
    "UBICACACION_MZA",
    "SUPERFICIE",
    "TIPO_OPERACION",
    "NO_FRENTES",
    "FRENTE_ML",
    "FRENTE_TIPO",
    "FONDO",
    "ESTADO",
    "FORMA",
    "MUNICIPIO",
    "TOPOGRAFIA",
    "CIUDAD",
    "SERVICIOS",
    "ASENTAMIENTO",
    "REGIMEN_PROPIEDAD",
    "NOMBRE_VIALIDAD",
    "NO_EXTERIOR",
    "NO_INTERIOR",
    "EDIFICIO_PREDIO_PROTOTIPO",
    "PRECIO",
    "COORDENADA_X",
    "COORDENADA_Y",
    "PRECIO_UNITARIO",
    "PRECIO_USD",
    "PRECIO_UNITARIO_USD",
    "OBSERVACIONES",
    "INFRAESTRUCTURA",
    "ELABORO",
}


def render(data: List[dict] | dict, as_report: str = "mercado"):
    if as_report == "mercado":
        keys = mercado_keys
        html = "mercado"
    else:
        html = "cedulas_mercado"
        keys = cedulas_mercado_keys
    template: Template = Template(open(f"{config.PATHS.templates}/{html}.html").read())
    files: List[str] = []

    if isinstance(data, list):
        for predio in data:
            with open(f"{(filename:=tmp_filename())}.html", "w", encoding="UTF-8") as f:
                f.write(
                    template.render(
                        **{key.upper(): value for key, value in predio.items()}
                    )
                )
            files.append(filename)
    else:
        with open(f"{(filename:=tmp_filename())}.html", "w", encoding="UTF-8") as f:
            f.write(
                template.render(**{key.upper(): value for key, value in data.items()})
            )
        files.append(filename)
    return files


def check(db: Session, **kwargs):
    comparables = ComparablesCatCom(db)
    if comparables.filter(**kwargs) is None:
        return False
    return comparables.__dict__


def check2(db: Session, **kwargs):
    comparables = CedulaComparables(db)
    mercado = CedulaMercado(db)
    cat_com = ComparablesCatCom(db)
    query = (
        db.query(comparables.model, mercado.model, cat_com.model)
        .join(cat_com.model, cat_com.model.id == comparables.model.id_comparable_catcom)
        .join(mercado.model, mercado.model.id == comparables.model.id_cedula_mercado)
        .filter(**kwargs)
        .first()
    )
    print(query.__dict__)


class ComparablesCatComReport:
    files: Optional[List[str]] = None
    merged: Optional[str] = None
    current: Optional[str] = None
    __db = None

    def __init__(self, db) -> None:
        self.__db = db

    def __enter__(self, db):
        self.__db = db
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.files = None
        self.merged = None
        self.current = None

    # results = session.query(ComparablesCatcom).filter(func.DATE_PART('month', func.age(func.current_date(), ComparablesCatcom.fecha_captura)) <= 6).all()

    def preview(
        self,
        cedula_mercado: int,
        comparable: int,
        as_report: str = "mercado",
        tipo: str = "TERRENO",
        **kwargs,
    ):
        cedula = CedulaMercado(self.__db)
        comparables = ComparablesCatCom(self.__db)
        if cedula.get(cedula_mercado) is None:
            return False
        if comparables.filter(id=comparable) is None:
            return False
        if comparables.current.fecha_captura + timedelta(days=180) <= datetime.now():
            return None
        data = cedula.to_dict(["id"]) | comparables.to_dict() | {"tipo": tipo}
        data = {key.upper(): value for key, value in data.items()}
        url_base = "http://172.31.113.151/comparables/imagenes"
        data["CAPTURA_PANTALLA"] = f"{url_base}/{data['CAPTURA_PANTALLA']}"
        data["IMAGEN_1"] = f"{url_base}/{data['IMAGEN_1']}"
        data["IMAGEN_2"] = f"{url_base}/{data['IMAGEN_2']}"
        data["FECHA_CAPTURA"] = as_complete_date(data["FECHA_CAPTURA"])
        data["PREDIOS"] = []
        if as_report == "mercado":
            kwargs["orientation"] = "Landscape"
        pdf = PDF(templates=render(data=data, as_report=as_report), **kwargs)
        pdf.render()
        return pdf.files[0]
