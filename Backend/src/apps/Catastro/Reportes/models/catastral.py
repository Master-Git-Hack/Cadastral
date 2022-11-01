"""Model File for the Catastro Reportes."""
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

from ..... import db, ma


class Catastral(db.Model):
    """
    Modelo para la tabla catastral
    """

    __tablename__ = "catastral"

    id = Column(
        Integer,
        primary_key=True,
        # server_default=text("nextval('catastral_id_seq'::regclass)"),
        # https://docs.sqlalchemy.org/en/13/core/defaults.html#executing-a-sequence-standalone
    )
    registro = Column(String, unique=True)
    solicitante = Column(String)
    oficio_solicitud = Column(String)
    fecha_solicitud = Column(Date)
    objetivo_avaluo = Column(String)
    proposito_avaluo = Column(String)
    inmueble_valua = Column(String)
    calle = Column(String)
    numero = Column(String)
    colonia_poblacion = Column(String)
    municipio = Column(String)
    propietario = Column(String)
    x_utm = Column(Float(53))
    y_utm = Column(Float(53))
    zona_utm = Column(SmallInteger)
    lat = Column(Float(53))
    long = Column(Float(53))
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
    myc_segun = Column(String)
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
    vt_catastral = Column(Float(53))
    croquis_reverso = Column(SmallInteger)
    myc_segunb = Column(String)
    colb1 = Column(String)
    medb1 = Column(String)
    colb2 = Column(String)
    medb2 = Column(String)
    colb3 = Column(String)
    medb3 = Column(String)
    colb4 = Column(String)
    domicilio_geografico = Column(String)
    observaciones = Column(String)
    usuario = Column(String)
    fecha_emision = Column(Date)
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
    zona_catastral = Column(String)
    med_col = Column(String)
    clave_avaluo = Column(BigInteger)
    asignado_por = Column(String)
    adquiriente = Column(String)
    teniente = Column(String)
    sector = Column(String)
    subsector = Column(String)
    tipo_construccion = Column(String)
    medb4 = Column(String)
    colb5 = Column(String)
    medb5 = Column(String)
    oficio_respuesta = Column(String)
    secretaria_solicitante = Column(String)
    medidas_reverso = Column(SmallInteger)
    sup_totalb = Column(Float(53))
    inst_esp_sup = Column(Float(53))
    inst_esp_vu = Column(Float(53))
    inst_esp_valor_parcial = Column(Float(53))
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
    colb6 = Column(String)
    medb6 = Column(String)
    avaluo = Column(String)
    cne_muros = Column(String)
    cne_estructura = Column(String)
    cne_entrepisos = Column(String)
    cne_techos = Column(String)
    cne_pisos = Column(String)
    cne_puertas = Column(String)
    cne_ventanas = Column(String)
    cne_carpinteria = Column(String)
    cne_inst_electrica = Column(String)
    cne_inst_sanitaria = Column(String)
    cne_inst_especial = Column(String)
    cne_acabado_exterior = Column(String)
    cne_acabado_interior = Column(String)
    cne_muebles_sanitarios = Column(String)
    cne_tipo = Column(String)
    cne_vida_util = Column(SmallInteger)
    cne_estado = Column(Float(53))
    cne_edad = Column(SmallInteger)
    cne_superficie = Column(Float(53))
    cne_vu = Column(Float(53))
    cne_factor = Column(Float(53))
    cne_valor_parcial = Column(Float(53))
    gid_domicilio = Column(BigInteger)
    num_r3 = Column(BigInteger)
    sub_num_r3 = Column(Integer, server_default=text("0"))
    folio_real = Column(String)

    def __init__(self, collection):
        """
        Constructor
        :param collection: json with all the data
        """
        self.registro = collection["registro"]
        self.solicitante = collection["solicitante"]
        self.oficio_solicitud = collection["oficio_solicitud"]
        self.fecha_solicitud = collection["fecha_solicitud"]
        self.objetivo_avaluo = collection["objetivo_avaluo"]
        self.proposito_avaluo = collection["proposito_avaluo"]
        self.inmueble_valua = collection["inmueble_valua"]
        self.calle = collection["calle"]
        self.numero = collection["numero"]
        self.colonia_poblacion = collection["colonia_poblacion"]
        self.municipio = collection["municipio"]
        self.propietario = collection["propietario"]
        self.x_utm = collection["x_utm"]
        self.y_utm = collection["y_utm"]
        self.zona_utm = collection["zona_utm"]
        self.lat = collection["lat"]
        self.long = collection["long"]
        self.cuenta_predial = collection["cuenta_predial"]
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
        self.myc_segun = collection["myc_segun"]
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
        self.vt_catastral = collection["vt_catastral"]
        self.croquis_reverso = collection["croquis_reverso"]
        self.myc_segunb = collection["myc_segunb"]
        self.colb1 = collection["colb1"]
        self.medb1 = collection["medb1"]
        self.colb2 = collection["colb2"]
        self.medb2 = collection["medb2"]
        self.colb3 = collection["colb3"]
        self.medb3 = collection["medb3"]
        self.colb4 = collection["colb4"]
        self.domicilio_geografico = collection["domicilio_geografico"]
        self.observaciones = collection["observaciones"]
        self.usuario = collection["usuario"]
        self.fecha_emision = collection["fecha_emision"]
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
        self.zona_catastral = collection["zona_catastral"]
        self.med_col = collection["med_col"]
        self.clave_avaluo = collection["clave_avaluo"]
        self.asignado_por = collection["asignado_por"]
        self.adquiriente = collection["adquiriente"]
        self.teniente = collection["teniente"]
        self.sector = collection["sector"]
        self.subsector = collection["subsector"]
        self.tipo_construccion = collection["tipo_construccion"]
        self.medb4 = collection["medb4"]
        self.colb5 = collection["colb5"]
        self.medb5 = collection["medb5"]
        self.oficio_respuesta = collection["oficio_respuesta"]
        self.secretaria_solicitante = collection["secretaria_solicitante"]
        self.medidas_reverso = collection["medidas_reverso"]
        self.sup_totalb = collection["sup_totalb"]
        self.inst_esp_sup = collection["inst_esp_sup"]
        self.inst_esp_vu = collection["inst_esp_vu"]
        self.inst_esp_valor_parcial = collection["inst_esp_valor_parcial"]
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
        self.colb6 = collection["colb6"]
        self.medb6 = collection["medb6"]
        self.avaluo = collection["avaluo"]
        self.cne_muros = collection["cne_muros"]
        self.cne_estructura = collection["cne_estructura"]
        self.cne_entrepisos = collection["cne_entrepisos"]
        self.cne_techos = collection["cne_techos"]
        self.cne_pisos = collection["cne_pisos"]
        self.cne_puertas = collection["cne_puertas"]
        self.cne_ventanas = collection["cne_ventanas"]
        self.cne_carpinteria = collection["cne_carpinteria"]
        self.cne_inst_electrica = collection["cne_inst_electrica"]
        self.cne_inst_sanitaria = collection["cne_inst_sanitaria"]
        self.cne_inst_especial = collection["cne_inst_especial"]
        self.cne_acabado_exterior = collection["cne_acabado_exterior"]
        self.cne_acabado_interior = collection["cne_acabado_interior"]
        self.cne_muebles_sanitarios = collection["cne_muebles_sanitarios"]
        self.cne_tipo = collection["cne_tipo"]
        self.cne_vida_util = collection["cne_vida_util"]
        self.cne_estado = collection["cne_estado"]
        self.cne_edad = collection["cne_edad"]
        self.cne_superficie = collection["cne_superficie"]
        self.cne_vu = collection["cne_vu"]
        self.cne_factor = collection["cne_factor"]
        self.cne_valor_parcial = collection["cne_valor_parcial"]
        self.gid_domicilio = collection["gid_domicilio"]
        self.num_r3 = collection["num_r3"]
        self.sub_num_r3 = collection["sub_num_r3"]
        self.folio_real = collection["folio_real"]


db.create_all()


class CatastralSchema(ma.Schema):
    """
    Catastral Schema
    genereate a json serializable object from the Catastral model
    """

    # geom = fields.Method("geom_to_dict")

    # @staticmethod
    # def geom_to_dict(obj):
    #    point = to_shape(obj.geom)
    #    return {"type": "Point", "coordinates": {"lat": point.y, "lon": point.x}}

    class Meta:
        """
        Meta class
        """

        # exclude = "geom"
        fields = (
            "id",
            "registro",
            "solicitante",
            "oficio_solicitud",
            "fecha_solicitud",
            "objetivo_avaluo",
            "proposito_avaluo",
            "inmueble_valua",
            "calle",
            "numero",
            "colonia_poblacion",
            "municipio",
            "propietario",
            "x_utm",
            "y_utm",
            "zona_utm",
            "lat",
            "long",
            "cuenta_predial",
            "cuc",
            "clasificacion_zona",
            "agua",
            "drenaje",
            "energia_electrica",
            "telefonia",
            "tipo_pavimento",
            "alumbrado_publico",
            "banqueta",
            "indice_saturacion",
            "topografia",
            "myc_segun",
            "col1",
            "med1",
            "col2",
            "med2",
            "col3",
            "med3",
            "col4",
            "med4",
            "col5",
            "med5",
            "col6",
            "med6",
            "sp1_superficie",
            "sp1_vu",
            "sp1_factor",
            "sp1_valor_parcial",
            "sp2_superficie",
            "sp2_vu",
            "sp2_factor",
            "sp2_valor_parcial",
            "sp3_superficie",
            "sp3_vu",
            "sp3_factor",
            "sp3_valor_parcial",
            "sp4_superficie",
            "sp4_vu",
            "sp4_factor",
            "sp4_valor_parcial",
            "incr_esq_superficie",
            "incr_esq_vu",
            "incr_esq_factor",
            "incr_esq_valor_parcial",
            "sup_total_terreno",
            "valor_total_terreno",
            "uso_dominante",
            "tipo_constr_dominante",
            "muros",
            "estructura",
            "entrepisos",
            "techos",
            "pisos",
            "puertas",
            "ventanas",
            "carpinteria",
            "inst_electrica",
            "inst_sanitaria",
            "inst_especial",
            "acabado_exterior",
            "acabado_interior",
            "muebles_sanitarios",
            "cna_tipo",
            "cna_vida_util",
            "cna_estado",
            "cna_edad",
            "cna_superficie",
            "cna_vu",
            "cna_factor",
            "cna_valor_parcial",
            "cnb_tipo",
            "cnb_vida_util",
            "cnb_estado",
            "cnb_edad",
            "cnb_superficie",
            "cnb_vu",
            "cnb_factor",
            "cnb_valor_parcial",
            "cnc_tipo",
            "cnc_vida_util",
            "cnc_estado",
            "cnc_edad",
            "cnc_superficie",
            "cnc_vu",
            "cnc_factor",
            "cnc_valor_parcial",
            "cnd_tipo",
            "cnd_vida_util",
            "cnd_estado",
            "cnd_edad",
            "cnd_superficie",
            "cnd_vu",
            "cnd_factor",
            "cnd_valor_parcial",
            "sup_total_construccion",
            "valor_total_construccion",
            "vt_catastral",
            "croquis_reverso",
            "myc_segunb",
            "colb1",
            "medb1",
            "colb2",
            "medb2",
            "colb3",
            "medb3",
            "colb4",
            "domicilio_geografico",
            "observaciones",
            "usuario",
            "fecha_emision",
            "croquis",
            "foto",
            "google",
            "firmante",
            "puesto",
            "estatus",
            "url_docs_entrada",
            "id_entrada",
            "expediente",
            "zona_catastral",
            "med_col",
            "clave_avaluo",
            "asignado_por",
            "adquiriente",
            "teniente",
            "sector",
            "subsector",
            "tipo_construccion",
            "medb4",
            "colb5",
            "medb5",
            "oficio_respuesta",
            "secretaria_solicitante",
            "medidas_reverso",
            "sup_totalb",
            "inst_esp_sup",
            "inst_esp_vu",
            "inst_esp_valor_parcial",
            "cnb_muros",
            "cnb_estructura",
            "cnb_entrepisos",
            "cnb_techos",
            "cnb_pisos",
            "cnb_puertas",
            "cnb_ventanas",
            "cnb_carpinteria",
            "cnb_inst_electrica",
            "cnb_inst_sanitaria",
            "cnb_inst_especial",
            "cnb_acabado_exterior",
            "cnb_acabado_interior",
            "cnb_muebles_sanitarios",
            "cnc_muros",
            "cnc_estructura",
            "cnc_entrepisos",
            "cnc_techos",
            "cnc_pisos",
            "cnc_puertas",
            "cnc_ventanas",
            "cnc_carpinteria",
            "cnc_inst_electrica",
            "cnc_inst_sanitaria",
            "cnc_inst_especial",
            "cnc_acabado_exterior",
            "cnc_acabado_interior",
            "cnc_muebles_sanitarios",
            "cnd_muros",
            "cnd_estructura",
            "cnd_entrepisos",
            "cnd_techos",
            "cnd_pisos",
            "cnd_puertas",
            "cnd_ventanas",
            "cnd_carpinteria",
            "cnd_inst_electrica",
            "cnd_inst_sanitaria",
            "cnd_inst_especial",
            "cnd_acabado_exterior",
            "cnd_acabado_interior",
            "cnd_muebles_sanitarios",
            "colb6",
            "medb6",
            "avaluo",
            "cne_muros",
            "cne_estructura",
            "cne_entrepisos",
            "cne_techos",
            "cne_pisos",
            "cne_puertas",
            "cne_ventanas",
            "cne_carpinteria",
            "cne_inst_electrica",
            "cne_inst_sanitaria",
            "cne_inst_especial",
            "cne_acabado_exterior",
            "cne_acabado_interior",
            "cne_muebles_sanitarios",
            "cne_tipo",
            "cne_vida_util",
            "cne_estado",
            "cne_edad",
            "cne_superficie",
            "cne_vu",
            "cne_factor",
            "cne_valor_parcial",
            "gid_domicilio",
            "num_r3",
            "sub_num_r3",
            "folio_real",
        )


catastral_schema = CatastralSchema()
many_Catastral_Schema = CatastralSchema(many=True)
