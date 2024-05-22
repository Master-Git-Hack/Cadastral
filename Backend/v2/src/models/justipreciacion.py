from typing import Any, Dict

from geoalchemy2.shape import to_shape
from geoalchemy2.types import Geometry
from marshmallow_sqlalchemy import fields
from sqlalchemy import (
    BigInteger,
    Column,
    Date,
    Float,
    Integer,
    SmallInteger,
    String,
    text,
)

from .. import config, database
from ..middlewares.database import Template

float8 = Float(precision=8)
float8_30 = Float(precision=30)
float8_70 = Float(precision=70)


class Model(database.BASE):
    """Justipreciacion model"""

    __tablename__ = "justipreciacion"

    id = Column(
        Integer,
        primary_key=True,
    )

    registro = Column(String, unique=True)
    solicitante = Column(String)
    oficio_solicitud = Column(String)
    fecha_solicitud = Column(Date)
    objetivo_avaluo = Column(String)
    proposito_avaluo = Column(String)
    inmueble_valua = Column(String)
    ubicacion = Column(String)
    colonia_poblacion = Column(String)
    municipio = Column(String)
    propietario = Column(String)
    x_utm = Column(float8)
    y_utm = Column(float8)
    zona_utm = Column(SmallInteger)
    cuenta_predial = Column(String)
    cuc = Column(String)
    clasificacion_zona = Column(String)
    agua = Column(SmallInteger)
    drenaje = Column(SmallInteger)
    energia_electrica = Column(SmallInteger)
    telefonia = Column(SmallInteger)
    tipo_pavimento = Column(String)
    alumbrado_publico = Column(SmallInteger)
    banqueta = Column(SmallInteger)
    indice_saturacion = Column(String)
    topografia = Column(String)
    col1 = Column(String)
    med1 = Column(String)
    col2 = Column(String)
    med2 = Column(String)
    col3 = Column(String)
    med3 = Column(String)
    col4 = Column(String)
    med4 = Column(String)
    col5 = Column(String)
    med5 = Column(String)
    col6 = Column(String)
    med6 = Column(String)
    sp1_superficie = Column(float8)
    sp1_vu = Column(float8)
    sp1_factor = Column(float8)
    sp1_valor_parcial = Column(float8)
    sp2_superficie = Column(float8)
    sp2_vu = Column(float8)
    sp2_factor = Column(float8)
    sp2_valor_parcial = Column(float8)
    sp3_superficie = Column(float8)
    sp3_vu = Column(float8)
    sp3_factor = Column(float8)
    sp3_valor_parcial = Column(float8)
    sp4_superficie = Column(float8)
    sp4_vu = Column(float8)
    sp4_factor = Column(float8)
    sp4_valor_parcial = Column(float8)
    incr_esq_superficie = Column(float8)
    incr_esq_vu = Column(float8)
    incr_esq_factor = Column(float8)
    incr_esq_valor_parcial = Column(float8)
    sup_total_terreno = Column(float8)
    valor_total_terreno = Column(float8)
    uso_dominante = Column(String)
    tipo_constr_dominante = Column(String)
    muros = Column(String)
    estructura = Column(String)
    entrepisos = Column(String)
    techos = Column(String)
    pisos = Column(String)
    puertas = Column(String)
    ventanas = Column(String)
    carpinteria = Column(String)
    inst_electrica = Column(String)
    inst_sanitaria = Column(String)
    inst_especial = Column(String)
    acabado_exterior = Column(String)
    acabado_interior = Column(String)
    muebles_sanitarios = Column(String)
    cna_tipo = Column(String)
    cna_vida_util = Column(SmallInteger)
    cna_estado = Column(float8)
    cna_edad = Column(SmallInteger)
    cna_superficie = Column(float8)
    cna_vu = Column(float8)
    cna_factor = Column(float8)
    cna_valor_parcial = Column(float8)
    cnb_tipo = Column(String)
    cnb_vida_util = Column(SmallInteger)
    cnb_estado = Column(float8)
    cnb_edad = Column(SmallInteger)
    cnb_superficie = Column(float8)
    cnb_vu = Column(float8)
    cnb_factor = Column(float8)
    cnb_valor_parcial = Column(float8)
    cnc_tipo = Column(String)
    cnc_vida_util = Column(SmallInteger)
    cnc_estado = Column(float8)
    cnc_edad = Column(SmallInteger)
    cnc_superficie = Column(float8)
    cnc_vu = Column(float8)
    cnc_factor = Column(float8)
    cnc_valor_parcial = Column(float8)
    cnd_tipo = Column(String)
    cnd_vida_util = Column(SmallInteger)
    cnd_estado = Column(float8)
    cnd_edad = Column(SmallInteger)
    cnd_superficie = Column(float8)
    cnd_vu = Column(float8)
    cnd_factor = Column(float8)
    cnd_valor_parcial = Column(float8)
    sup_total_construccion = Column(float8)
    valor_total_construccion = Column(float8)
    vt_comercial_fisico = Column(float8)
    capitalizacion_valor_fisico = Column(float8)
    comparativo_mercado = Column(float8)
    renta_comparativo = Column(float8)
    indicador_capitalizacion = Column(float8)
    indicador_comparativo = Column(float8)
    renta_minima = Column(float8)
    renta_maxima = Column(float8)
    renta_m2_minima = Column(float8)
    renta_m2_maxima = Column(float8)
    domicilio_geografico = Column(String)
    observaciones = Column(String)
    usuario = Column(String)
    fecha_emision = Column(Date)
    myc_segun = Column(String)
    calle = Column(String)
    numero = Column(String)
    lat = Column(float8)
    long = Column(float8)
    croquis = Column(String)
    foto = Column(String)
    geom = Column(
        Geometry("POINT", 32614, from_text="ST_GeomFromEWKT", name="geometry"),
        index=True,
    )
    google = Column(String)
    firmante = Column(String)
    puesto = Column(String)
    estatus = Column(Integer)
    url_docs_entrada = Column(String)
    id_entrada = Column(Integer)
    expediente = Column(String)
    asignado_por = Column(String)
    cnb_muros = Column(String)
    cnb_estructura = Column(String)
    cnb_entrepisos = Column(String)
    cnb_techos = Column(String)
    cnb_pisos = Column(String)
    cnb_puertas = Column(String)
    cnb_ventanas = Column(String)
    cnb_carpinteria = Column(String)
    cnb_inst_electrica = Column(String)
    cnb_inst_sanitaria = Column(String)
    cnb_inst_especial = Column(String)
    cnb_acabado_exterior = Column(String)
    cnb_acabado_interior = Column(String)
    cnb_muebles_sanitarios = Column(String)
    cnc_muros = Column(String)
    cnc_estructura = Column(String)
    cnc_entrepisos = Column(String)
    cnc_techos = Column(String)
    cnc_pisos = Column(String)
    cnc_puertas = Column(String)
    cnc_ventanas = Column(String)
    cnc_carpinteria = Column(String)
    cnc_inst_electrica = Column(String)
    cnc_inst_sanitaria = Column(String)
    cnc_inst_especial = Column(String)
    cnc_acabado_exterior = Column(String)
    cnc_acabado_interior = Column(String)
    cnc_muebles_sanitarios = Column(String)
    cnd_muros = Column(String)
    cnd_estructura = Column(String)
    cnd_entrepisos = Column(String)
    cnd_techos = Column(String)
    cnd_pisos = Column(String)
    cnd_puertas = Column(String)
    cnd_ventanas = Column(String)
    cnd_carpinteria = Column(String)
    cnd_inst_electrica = Column(String)
    cnd_inst_sanitaria = Column(String)
    cnd_inst_especial = Column(String)
    cnd_acabado_exterior = Column(String)
    cnd_acabado_interior = Column(String)
    cnd_muebles_sanitarios = Column(String)
    gid_domicilio = Column(BigInteger)
    valor_total_obras_comp = Column(float8)
    obras_comp_descripcion = Column(String)
    oficio_respuesta = Column(String)
    tasa_capitalizacion = Column(float8)
    pct_indicador_capitalizacion = Column(float8_30)
    pct_indicador_comparativo = Column(float8_70)
    planta_arquitectonica = Column(String)
    medidas_reverso = Column(SmallInteger)

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)


class Justipreciacion(Template):
    def __init__(self, db) -> None:
        super().__init__(Model, db)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)