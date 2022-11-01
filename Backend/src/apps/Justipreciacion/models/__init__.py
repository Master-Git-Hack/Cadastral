"""Model for Justipreciacion table"""
from geoalchemy2.types import Geometry
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

from .... import db, ma


class Justipreciacion(db.Model):
    """Justipreciacion model"""

    __tablename__ = "justipreciacion"

    id = Column(
        Integer,
        primary_key=True,
        # server_default=text("nextval('justipreciacion_id_seq'::regclass)"),
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
    x_utm = Column(Float(53))
    y_utm = Column(Float(53))
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
    sp1_superficie = Column(Float(53))
    sp1_vu = Column(Float(53))
    sp1_factor = Column(Float(53))
    sp1_valor_parcial = Column(Float(53))
    sp2_superficie = Column(Float(53))
    sp2_vu = Column(Float(53))
    sp2_factor = Column(Float(53))
    sp2_valor_parcial = Column(Float(53))
    sp3_superficie = Column(Float(53))
    sp3_vu = Column(Float(53))
    sp3_factor = Column(Float(53))
    sp3_valor_parcial = Column(Float(53))
    sp4_superficie = Column(Float(53))
    sp4_vu = Column(Float(53))
    sp4_factor = Column(Float(53))
    sp4_valor_parcial = Column(Float(53))
    incr_esq_superficie = Column(Float(53))
    incr_esq_vu = Column(Float(53))
    incr_esq_factor = Column(Float(53))
    incr_esq_valor_parcial = Column(Float(53))
    sup_total_terreno = Column(Float(53))
    valor_total_terreno = Column(Float(53))
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
    cna_estado = Column(Float(53))
    cna_edad = Column(SmallInteger)
    cna_superficie = Column(Float(53))
    cna_vu = Column(Float(53))
    cna_factor = Column(Float(53))
    cna_valor_parcial = Column(Float(53))
    cnb_tipo = Column(String)
    cnb_vida_util = Column(SmallInteger)
    cnb_estado = Column(Float(53))
    cnb_edad = Column(SmallInteger)
    cnb_superficie = Column(Float(53))
    cnb_vu = Column(Float(53))
    cnb_factor = Column(Float(53))
    cnb_valor_parcial = Column(Float(53))
    cnc_tipo = Column(String)
    cnc_vida_util = Column(SmallInteger)
    cnc_estado = Column(Float(53))
    cnc_edad = Column(SmallInteger)
    cnc_superficie = Column(Float(53))
    cnc_vu = Column(Float(53))
    cnc_factor = Column(Float(53))
    cnc_valor_parcial = Column(Float(53))
    cnd_tipo = Column(String)
    cnd_vida_util = Column(SmallInteger)
    cnd_estado = Column(Float(53))
    cnd_edad = Column(SmallInteger)
    cnd_superficie = Column(Float(53))
    cnd_vu = Column(Float(53))
    cnd_factor = Column(Float(53))
    cnd_valor_parcial = Column(Float(53))
    sup_total_construccion = Column(Float(53))
    valor_total_construccion = Column(Float(53))
    vt_comercial_fisico = Column(Float(53))
    capitalizacion_valor_fisico = Column(Float(53))
    comparativo_mercado = Column(Float(53))
    renta_comparativo = Column(Float(53))
    indicador_capitalizacion = Column(Float(53))
    indicador_comparativo = Column(Float(53))
    renta_minima = Column(Float(53))
    renta_maxima = Column(Float(53))
    renta_m2_minima = Column(Float(53))
    renta_m2_maxima = Column(Float(53))
    domicilio_geografico = Column(String)
    observaciones = Column(String)
    usuario = Column(String)
    fecha_emision = Column(Date)
    myc_segun = Column(String)
    calle = Column(String)
    numero = Column(String)
    lat = Column(Float(53))
    long = Column(Float(53))
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
    valor_total_obras_comp = Column(Float(53))
    obras_comp_descripcion = Column(String)
    oficio_respuesta = Column(String)
    tasa_capitalizacion = Column(Float(53))
    pct_indicador_capitalizacion = Column(Float(53), server_default=text("30"))
    pct_indicador_comparativo = Column(Float(53), server_default=text("70"))
    planta_arquitectonica = Column(String)
    medidas_reverso = Column(SmallInteger)

    def __init__(self, collection: dict) -> None:
        """
        Constructor
        Args:
            collection: Diccionario con los datos a cargar
        Returns:
            None
        """
        self.registro = collection["registro"]
        self.solicitante = collection["solicitante"]
        self.oficio_solicitud = collection["oficio_solicitud"]
        self.fecha_solicitud = collection["fecha_solicitud"]
        self.objetivo_avaluo = collection["objetivo_avaluo"]
        self.proposito_avaluo = collection["proposito_avaluo"]
        self.inmueble_valua = collection["inmueble_valua"]
        self.ubicacion = collection["ubicacion"]
        self.colonia_poblacion = collection["colonia_poblacion"]
        self.municipio = collection["municipio"]
        self.propietario = collection["propietario"]
        self.x_utm = collection["x_utm"]
        self.y_utm = collection["y_utm"]
        self.zona_utm = collection[""]
        self.cuenta_predial = collection
        self.cuc = collection["cuc"]
        self.clasificacion_zona = collection["clasificacion_zona"]
        self.agua = collection["agua"]
        self.drenaje = collection["drenaje"]
        self.energia_electrica = collection["energia_electrica"]
        self.telefonia = collection["telefonia"]
        self.tipo_pavimento = collection["tipo_pavimento"]
        self.alumbrado_publico = collection["alumbrado_publico"]
        self.banqueta = collection["banqueta"]
        self.indice_saturacion = collection["indice_saturacion"]
        self.topografia = collection["topografia"]
        self.col1 = collection["col1"]
        self.med1 = collection["med1"]
        self.col2 = collection["col2"]
        self.med2 = collection["med2"]
        self.col3 = collection["col3"]
        self.med3 = collection["med3"]
        self.col4 = collection["col4"]
        self.med4 = collection["med4"]
        self.col5 = collection["col5"]
        self.med5 = collection["med5"]
        self.col6 = collection["col6"]
        self.med6 = collection["med6"]
        self.sp1_superficie = collection["sp1_superficie"]
        self.sp1_vu = collection["sp1_vu"]
        self.sp1_factor = collection["sp1_factor"]
        self.sp1_valor_parcial = collection["sp1_valor_parcial"]
        self.sp2_superficie = collection["sp2_superficie"]
        self.sp2_vu = collection["sp2_vu"]
        self.sp2_factor = collection["sp2_factor"]
        self.sp2_valor_parcial = collection["sp2_valor_parcial"]
        self.sp3_superficie = collection["sp3_superficie"]
        self.sp3_vu = collection["sp3_vu"]
        self.sp3_factor = collection["sp3_factor"]
        self.sp3_valor_parcial = collection["sp3_valor_parcial"]
        self.sp4_superficie = collection["sp4_superficie"]
        self.sp4_vu = collection["sp4_vu"]
        self.sp4_factor = collection["sp4_factor"]
        self.sp4_valor_parcial = collection["sp4_valor_parcial"]
        self.incr_esq_superficie = collection["incr_esq_superficie"]
        self.incr_esq_vu = collection["incr_esq_vu"]
        self.incr_esq_factor = collection["incr_esq_factor"]
        self.incr_esq_valor_parcial = collection["incr_esq_valor_parcial"]
        self.sup_total_terreno = collection["sup_total_terreno"]
        self.valor_total_terreno = collection["valor_total_terreno"]
        self.uso_dominante = collection["uso_dominante"]
        self.tipo_constr_dominante = collection["tipo_constr_dominante"]
        self.muros = collection["muros"]
        self.estructura = collection["estructura"]
        self.entrepisos = collection["entrepisos"]
        self.techos = collection["techos"]
        self.pisos = collection["pisos"]
        self.puertas = collection["puertas"]
        self.ventanas = collection["ventanas"]
        self.carpinteria = collection["carpinteria"]
        self.inst_electrica = collection["inst_electrica"]
        self.inst_sanitaria = collection["inst_sanitaria"]
        self.inst_especial = collection["inst_especial"]
        self.acabado_exterior = collection["acabado_exterior"]
        self.acabado_interior = collection["acabado_interior"]
        self.muebles_sanitarios = collection["muebles_sanitarios"]
        self.cna_tipo = collection["cna_tipo"]
        self.cna_vida_util = collection["cna_vida_util"]
        self.cna_estado = collection["cna_estado"]
        self.cna_edad = collection["cna_edad"]
        self.cna_superficie = collection["cna_superficie"]
        self.cna_vu = collection["cna_vu"]
        self.cna_factor = collection["cna_factor"]
        self.cna_valor_parcial = collection["cna_valor_parcial"]
        self.cnb_tipo = collection["cnb_tipo"]
        self.cnb_vida_util = collection["cnb_vida_util"]
        self.cnb_estado = collection["cnb_estado"]
        self.cnb_edad = collection["cnb_edad"]
        self.cnb_superficie = collection["cnb_superficie"]
        self.cnb_vu = collection["cnb_vu"]
        self.cnb_factor = collection["cnb_factor"]
        self.cnb_valor_parcial = collection["cnb_valor_parcial"]
        self.cnc_tipo = collection["cnc_tipo"]
        self.cnc_vida_util = collection["cnc_vida_util"]
        self.cnc_estado = collection["cnc_estado"]
        self.cnc_edad = collection["cnc_edad"]
        self.cnc_superficie = collection["cnc_superficie"]
        self.cnc_vu = collection["cnc_vu"]
        self.cnc_factor = collection["cnc_factor"]
        self.cnc_valor_parcial = collection["cnc_valor_parcial"]
        self.cnd_tipo = collection["cnd_tipo"]
        self.cnd_vida_util = collection["cnd_vida_util"]
        self.cnd_estado = collection["cnd_estado"]
        self.cnd_edad = collection["cnd_edad"]
        self.cnd_superficie = collection["cnd_superficie"]
        self.cnd_vu = collection["cnd_vu"]
        self.cnd_factor = collection["cnd_factor"]
        self.cnd_valor_parcial = collection["cnd_valor_parcial"]
        self.sup_total_construccion = collection["sup_total_construccion"]
        self.valor_total_construccion = collection["valor_total_construccion"]
        self.vt_comercial_fisico = collection["vt_comercial_fisico"]
        self.capitalizacion_valor_fisico = collection["capitalizacion_valor_fisico"]
        self.comparativo_mercado = collection["comparativo_mercado"]
        self.renta_comparativo = collection["renta_comparativo"]
        self.indicador_capitalizacion = collection["indicador_capitalizacion"]
        self.indicador_comparativo = collection["indicador_comparativo"]
        self.renta_minima = collection["renta_minima"]
        self.renta_maxima = collection["renta_maxima"]
        self.renta_m2_minima = collection["renta_m2_minima"]
        self.renta_m2_maxima = collection["renta_m2_maxima"]
        self.domicilio_geografico = collection["domicilio_geografico"]
        self.observaciones = collection["observaciones"]
        self.usuario = collection["usuario"]
        self.fecha_emision = collection["fecha_emision"]
        self.myc_segun = collection["myc_segun"]
        self.calle = collection["calle"]
        self.numero = collection["numero"]
        self.lat = collection["lat"]
        self.long = collection["long"]
        self.croquis = collection["croquis"]
        self.foto = collection["foto"]
        self.geom = collection["geom"]
        self.google = collection["google"]
        self.firmante = collection["firmante"]
        self.puesto = collection["puesto"]
        self.estatus = collection["estatus"]
        self.url_docs_entrada = collection["url_docs_entrada"]
        self.id_entrada = collection["id_entrada"]
        self.expediente = collection["expediente"]
        self.asignado_por = collection["asignado_por"]
        self.cnb_muros = collection["cnb_muros"]
        self.cnb_estructura = collection["cnb_estructura"]
        self.cnb_entrepisos = collection["cnb_entrepisos"]
        self.cnb_techos = collection["cnb_techos"]
        self.cnb_pisos = collection["cnb_pisos"]
        self.cnb_puertas = collection["cnb_puertas"]
        self.cnb_ventanas = collection["cnb_ventanas"]
        self.cnb_carpinteria = collection["cnb_carpinteria"]
        self.cnb_inst_electrica = collection["cnb_inst_electrica"]
        self.cnb_inst_sanitaria = collection["cnb_inst_sanitaria"]
        self.cnb_inst_especial = collection["cnb_inst_especial"]
        self.cnb_acabado_exterior = collection["cnb_acabado_exterior"]
        self.cnb_acabado_interior = collection["cnb_acabado_interior"]
        self.cnb_muebles_sanitarios = collection["cnb_muebles_sanitarios"]
        self.cnc_muros = collection["cnc_muros"]
        self.cnc_estructura = collection["cnc_estructura"]
        self.cnc_entrepisos = collection["cnc_entrepisos"]
        self.cnc_techos = collection["cnc_techos"]
        self.cnc_pisos = collection["cnc_pisos"]
        self.cnc_puertas = collection["cnc_puertas"]
        self.cnc_ventanas = collection["cnc_ventanas"]
        self.cnc_carpinteria = collection["cnc_carpinteria"]
        self.cnc_inst_electrica = collection["cnc_inst_electrica"]
        self.cnc_inst_sanitaria = collection["cnc_inst_sanitaria"]
        self.cnc_inst_especial = collection["cnc_inst_especial"]
        self.cnc_acabado_exterior = collection["cnc_acabado_exterior"]
        self.cnc_acabado_interior = collection["cnc_acabado_interior"]
        self.cnc_muebles_sanitarios = collection["cnc_muebles_sanitarios"]
        self.cnd_muros = collection["cnd_muros"]
        self.cnd_estructura = collection["cnd_estructura"]
        self.cnd_entrepisos = collection["cnd_entrepisos"]
        self.cnd_techos = collection["cnd_techos"]
        self.cnd_pisos = collection["cnd_pisos"]
        self.cnd_puertas = collection["cnd_puertas"]
        self.cnd_ventanas = collection["cnd_ventanas"]
        self.cnd_carpinteria = collection["cnd_carpinteria"]
        self.cnd_inst_electrica = collection["cnd_inst_electrica"]
        self.cnd_inst_sanitaria = collection["cnd_inst_sanitaria"]
        self.cnd_inst_especial = collection["cnd_inst_especial"]
        self.cnd_acabado_exterior = collection["cnd_acabado_exterior"]
        self.cnd_acabado_interior = collection["cnd_acabado_interior"]
        self.cnd_muebles_sanitarios = collection["cnd_muebles_sanitarios"]
        self.gid_domicilio = collection["gid_domicilio"]
        self.valor_total_obras_comp = collection["valor_total_obras_comp"]
        self.obras_comp_descripcion = collection["obras_comp_descripcion"]
        self.oficio_respuesta = collection["oficio_respuesta"]
        self.tasa_capitalizacion = collection["tasa_capitalizacion"]
        self.pct_indicador_capitalizacion = collection["pct_indicador_capitalizacion"]
        self.pct_indicador_comparativo = collection["pct_indicador_comparativo"]
        self.planta_arquitectonica = collection["planta_arquitectonica"]


db.create_all()


class JustipreciacionSchema(ma.Schema):
    """class for mapping the json to the model"""

    class Meta:
        """Meta class for mapping the model"""

        fields = (
            "id",
            "registro",
            "tipo",
            "cna_superficie",
            "cna_edad",
            "sp1_superficie",
            "sp1_factor",
            "comparativo_mercado",
            "sp1_vu",
        )


justipreciacion_schema = JustipreciacionSchema()
