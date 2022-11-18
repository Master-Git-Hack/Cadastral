"""Model for Justipreciacion table"""
from typing import Optional, Tuple

from fastapi_sqlalchemy import db
from geoalchemy2.types import Geometry
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy import (BigInteger, Column, Date, Float, Integer, SmallInteger,
                        String, text)

from ..middlewares.database import Base


class _Justipreciacion(Base):
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

    def __init__(self, data: dict) -> None:
        """
        Constructor
        Args:
            data (dict): Diccionario con los datos a cargar
        Returns:
            None
        """
        self.registro = data.get("registro")
        self.solicitante = data.get("solicitante")
        self.oficio_solicitud = data.get("oficio_solicitud")
        self.fecha_solicitud = data.get("fecha_solicitud")
        self.objetivo_avaluo = data.get("objetivo_avaluo")
        self.proposito_avaluo = data.get("proposito_avaluo")
        self.inmueble_valua = data.get("inmueble_valua")
        self.ubicacion = data.get("ubicacion")
        self.colonia_poblacion = data.get("colonia_poblacion")
        self.municipio = data.get("municipio")
        self.propietario = data.get("propietario")
        self.x_utm = data.get("x_utm")
        self.y_utm = data.get("y_utm")
        self.zona_utm = data.get("")
        self.cuenta_predial = data.get("cuenta_predial")
        self.cuc = data.get("cuc")
        self.clasificacion_zona = data.get("clasificacion_zona")
        self.agua = data.get("agua")
        self.drenaje = data.get("drenaje")
        self.energia_electrica = data.get("energia_electrica")
        self.telefonia = data.get("telefonia")
        self.tipo_pavimento = data.get("tipo_pavimento")
        self.alumbrado_publico = data.get("alumbrado_publico")
        self.banqueta = data.get("banqueta")
        self.indice_saturacion = data.get("indice_saturacion")
        self.topografia = data.get("topografia")
        self.col1 = data.get("col1")
        self.med1 = data.get("med1")
        self.col2 = data.get("col2")
        self.med2 = data.get("med2")
        self.col3 = data.get("col3")
        self.med3 = data.get("med3")
        self.col4 = data.get("col4")
        self.med4 = data.get("med4")
        self.col5 = data.get("col5")
        self.med5 = data.get("med5")
        self.col6 = data.get("col6")
        self.med6 = data.get("med6")
        self.sp1_superficie = data.get("sp1_superficie")
        self.sp1_vu = data.get("sp1_vu")
        self.sp1_factor = data.get("sp1_factor")
        self.sp1_valor_parcial = data.get("sp1_valor_parcial")
        self.sp2_superficie = data.get("sp2_superficie")
        self.sp2_vu = data.get("sp2_vu")
        self.sp2_factor = data.get("sp2_factor")
        self.sp2_valor_parcial = data.get("sp2_valor_parcial")
        self.sp3_superficie = data.get("sp3_superficie")
        self.sp3_vu = data.get("sp3_vu")
        self.sp3_factor = data.get("sp3_factor")
        self.sp3_valor_parcial = data.get("sp3_valor_parcial")
        self.sp4_superficie = data.get("sp4_superficie")
        self.sp4_vu = data.get("sp4_vu")
        self.sp4_factor = data.get("sp4_factor")
        self.sp4_valor_parcial = data.get("sp4_valor_parcial")
        self.incr_esq_superficie = data.get("incr_esq_superficie")
        self.incr_esq_vu = data.get("incr_esq_vu")
        self.incr_esq_factor = data.get("incr_esq_factor")
        self.incr_esq_valor_parcial = data.get("incr_esq_valor_parcial")
        self.sup_total_terreno = data.get("sup_total_terreno")
        self.valor_total_terreno = data.get("valor_total_terreno")
        self.uso_dominante = data.get("uso_dominante")
        self.tipo_constr_dominante = data.get("tipo_constr_dominante")
        self.muros = data.get("muros")
        self.estructura = data.get("estructura")
        self.entrepisos = data.get("entrepisos")
        self.techos = data.get("techos")
        self.pisos = data.get("pisos")
        self.puertas = data.get("puertas")
        self.ventanas = data.get("ventanas")
        self.carpinteria = data.get("carpinteria")
        self.inst_electrica = data.get("inst_electrica")
        self.inst_sanitaria = data.get("inst_sanitaria")
        self.inst_especial = data.get("inst_especial")
        self.acabado_exterior = data.get("acabado_exterior")
        self.acabado_interior = data.get("acabado_interior")
        self.muebles_sanitarios = data.get("muebles_sanitarios")
        self.cna_tipo = data.get("cna_tipo")
        self.cna_vida_util = data.get("cna_vida_util")
        self.cna_estado = data.get("cna_estado")
        self.cna_edad = data.get("cna_edad")
        self.cna_superficie = data.get("cna_superficie")
        self.cna_vu = data.get("cna_vu")
        self.cna_factor = data.get("cna_factor")
        self.cna_valor_parcial = data.get("cna_valor_parcial")
        self.cnb_tipo = data.get("cnb_tipo")
        self.cnb_vida_util = data.get("cnb_vida_util")
        self.cnb_estado = data.get("cnb_estado")
        self.cnb_edad = data.get("cnb_edad")
        self.cnb_superficie = data.get("cnb_superficie")
        self.cnb_vu = data.get("cnb_vu")
        self.cnb_factor = data.get("cnb_factor")
        self.cnb_valor_parcial = data.get("cnb_valor_parcial")
        self.cnc_tipo = data.get("cnc_tipo")
        self.cnc_vida_util = data.get("cnc_vida_util")
        self.cnc_estado = data.get("cnc_estado")
        self.cnc_edad = data.get("cnc_edad")
        self.cnc_superficie = data.get("cnc_superficie")
        self.cnc_vu = data.get("cnc_vu")
        self.cnc_factor = data.get("cnc_factor")
        self.cnc_valor_parcial = data.get("cnc_valor_parcial")
        self.cnd_tipo = data.get("cnd_tipo")
        self.cnd_vida_util = data.get("cnd_vida_util")
        self.cnd_estado = data.get("cnd_estado")
        self.cnd_edad = data.get("cnd_edad")
        self.cnd_superficie = data.get("cnd_superficie")
        self.cnd_vu = data.get("cnd_vu")
        self.cnd_factor = data.get("cnd_factor")
        self.cnd_valor_parcial = data.get("cnd_valor_parcial")
        self.sup_total_construccion = data.get("sup_total_construccion")
        self.valor_total_construccion = data.get("valor_total_construccion")
        self.vt_comercial_fisico = data.get("vt_comercial_fisico")
        self.capitalizacion_valor_fisico = data.get("capitalizacion_valor_fisico")
        self.comparativo_mercado = data.get("comparativo_mercado")
        self.renta_comparativo = data.get("renta_comparativo")
        self.indicador_capitalizacion = data.get("indicador_capitalizacion")
        self.indicador_comparativo = data.get("indicador_comparativo")
        self.renta_minima = data.get("renta_minima")
        self.renta_maxima = data.get("renta_maxima")
        self.renta_m2_minima = data.get("renta_m2_minima")
        self.renta_m2_maxima = data.get("renta_m2_maxima")
        self.domicilio_geografico = data.get("domicilio_geografico")
        self.observaciones = data.get("observaciones")
        self.usuario = data.get("usuario")
        self.fecha_emision = data.get("fecha_emision")
        self.myc_segun = data.get("myc_segun")
        self.calle = data.get("calle")
        self.numero = data.get("numero")
        self.lat = data.get("lat")
        self.long = data.get("long")
        self.croquis = data.get("croquis")
        self.foto = data.get("foto")
        self.geom = data.get("geom")
        self.google = data.get("google")
        self.firmante = data.get("firmante")
        self.puesto = data.get("puesto")
        self.estatus = data.get("estatus")
        self.url_docs_entrada = data.get("url_docs_entrada")
        self.id_entrada = data.get("id_entrada")
        self.expediente = data.get("expediente")
        self.asignado_por = data.get("asignado_por")
        self.cnb_muros = data.get("cnb_muros")
        self.cnb_estructura = data.get("cnb_estructura")
        self.cnb_entrepisos = data.get("cnb_entrepisos")
        self.cnb_techos = data.get("cnb_techos")
        self.cnb_pisos = data.get("cnb_pisos")
        self.cnb_puertas = data.get("cnb_puertas")
        self.cnb_ventanas = data.get("cnb_ventanas")
        self.cnb_carpinteria = data.get("cnb_carpinteria")
        self.cnb_inst_electrica = data.get("cnb_inst_electrica")
        self.cnb_inst_sanitaria = data.get("cnb_inst_sanitaria")
        self.cnb_inst_especial = data.get("cnb_inst_especial")
        self.cnb_acabado_exterior = data.get("cnb_acabado_exterior")
        self.cnb_acabado_interior = data.get("cnb_acabado_interior")
        self.cnb_muebles_sanitarios = data.get("cnb_muebles_sanitarios")
        self.cnc_muros = data.get("cnc_muros")
        self.cnc_estructura = data.get("cnc_estructura")
        self.cnc_entrepisos = data.get("cnc_entrepisos")
        self.cnc_techos = data.get("cnc_techos")
        self.cnc_pisos = data.get("cnc_pisos")
        self.cnc_puertas = data.get("cnc_puertas")
        self.cnc_ventanas = data.get("cnc_ventanas")
        self.cnc_carpinteria = data.get("cnc_carpinteria")
        self.cnc_inst_electrica = data.get("cnc_inst_electrica")
        self.cnc_inst_sanitaria = data.get("cnc_inst_sanitaria")
        self.cnc_inst_especial = data.get("cnc_inst_especial")
        self.cnc_acabado_exterior = data.get("cnc_acabado_exterior")
        self.cnc_acabado_interior = data.get("cnc_acabado_interior")
        self.cnc_muebles_sanitarios = data.get("cnc_muebles_sanitarios")
        self.cnd_muros = data.get("cnd_muros")
        self.cnd_estructura = data.get("cnd_estructura")
        self.cnd_entrepisos = data.get("cnd_entrepisos")
        self.cnd_techos = data.get("cnd_techos")
        self.cnd_pisos = data.get("cnd_pisos")
        self.cnd_puertas = data.get("cnd_puertas")
        self.cnd_ventanas = data.get("cnd_ventanas")
        self.cnd_carpinteria = data.get("cnd_carpinteria")
        self.cnd_inst_electrica = data.get("cnd_inst_electrica")
        self.cnd_inst_sanitaria = data.get("cnd_inst_sanitaria")
        self.cnd_inst_especial = data.get("cnd_inst_especial")
        self.cnd_acabado_exterior = data.get("cnd_acabado_exterior")
        self.cnd_acabado_interior = data.get("cnd_acabado_interior")
        self.cnd_muebles_sanitarios = data.get("cnd_muebles_sanitarios")
        self.gid_domicilio = data.get("gid_domicilio")
        self.valor_total_obras_comp = data.get("valor_total_obras_comp")
        self.obras_comp_descripcion = data.get("obras_comp_descripcion")
        self.oficio_respuesta = data.get("oficio_respuesta")
        self.tasa_capitalizacion = data.get("tasa_capitalizacion")
        self.pct_indicador_capitalizacion = data.get("pct_indicador_capitalizacion")
        self.pct_indicador_comparativo = data.get("pct_indicador_comparativo")
        self.planta_arquitectonica = data.get("planta_arquitectonica")


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


class _Schema(SQLAlchemyAutoSchema):
    """Class for schema.
    Example:
        >>> Schema().dump(model)->dict
        >>> Schema().load(model)
        >>> Schema(many=True).dump(model)->list
        >>> Schema(many=True).load(model)
    Args:
        SQLAlchemyAutoSchema (class): class for schema.
    Attributes:
        Meta (class): class for schema.
    """

    class Meta:
        """class to handle the metadata of the schema.
        Attributes:
            model (class): The model to use for the schema.
            load_instance (bool): Whether to load the instance.
            include_relationships (bool): Whether to include the relationships.
            include_fk (bool): Whether to include the foreign keys.
        """

        model = _Justipreciacion
        include_relationships = True
        load_instance = True
        include_fk = True
        excludes =("geom")


class _Read:
    """Class to handle read operations on the account model
    Example:
        >>> Read.all()
        >>> Read.by_id(id)
        >>> Read.by_company_id(company_id)
        >>> Read.by_parent_id(parent_id)
    Attributes:
        all (method): Return all accounts.
        by_id (method): Return an account by id.
        by_company_id (method): Return an account by company id.
        by_parent_id (method): Return an account by parent id.
    """

    @staticmethod
    async def all(
        to_list: Optional[bool] = False, exclude: Optional[list] = None
    ) -> _Justipreciacion or _Schema or None:
        """
        This method select all records from the database
        Args:
            to_list (bool, optional): If the result should be a list.
            exclude (list, optional): List of columns to exclude.
        Returns:
            response (model|dict|None): list of records
        """
        try:
            response = db.session.query(_Justipreciacion).all()
            if to_list:
                response = _Schema(many=True).dump(response)
            if exclude is not None:
                response = _Schema(many=True, exclude=exclude).dump(response)
            return response
        except (RuntimeError, TypeError, NameError):
            print(RuntimeError)
            return None

    @staticmethod
    async def by_id(
        _id: int, to_dict: Optional[bool] = False, exclude: Optional[list] = None
    ) -> _Justipreciacion or _Schema or None:
        """This method select a record from the database by id
        Args:
            _id (int): id to work with in the database
            to_dict (bool, optional): If the result should be a dict.
            exclude (list, optional): List of columns to exclude.
        Returns:
            response (model|dict|None): model instance
        """
        try:
            response = db.session.query(_Justipreciacion).get(_id)
            if to_dict:
                response = _Schema().dump(response)
            if exclude is not None:
                response = _Schema(exclude=exclude).dump(response)
            return response
        except (RuntimeError, TypeError, NameError):
            print(RuntimeError)
            return None


class Justipreciacion:
    """class to handle model operations.
    Example:
        >>> Model.create(data)->model
        >>> Model.create(data, to_dict=True)->dict
        >>> Model.update(id, data)->Tuple[bool, model]
        >>> Model.update(id, data, to_dict=True)->Tuple[bool,dict]
        >>> Model.delete(id)->Tuple[bool, model]
        >>> Model.delete(id, to_dict=True)->Tuple[bool, dict]
        >>> Model.to_dict(model)->dict
        >>> Model.to_list(model)->list

    Attributes:
        Table (class): The model class.
        Schema (class): The schema class.
        Read (class): The read class.
        create (method): The create method.
        update (method): The update method.
        delete (method): The delete method.
        to_dict (method): The to_dict method.
        to_list (method): The to_list method.
    """

    Table = _Justipreciacion
    Schema = _Schema
    read = _Read()

    @staticmethod
    async def create(
        data: dict, to_dict: Optional[bool] = False, exclude: Optional[list] = None
    ) -> Tuple[bool, _Justipreciacion or _Schema or None]:
        """
        This method creates a new record in the database with the current model.
        Receive a dict with the data to create the record and return a tuple
        Args:
            data (dict): data to work with
            to_dict (bool,optional): if True, return a dict, else return a model instance
            exclude (list, optional): List of columns to exclude.
        Returns:
            response (bool): True if success, False if not
            reponse_data (model): data to return
        """
        try:
            new = _Justipreciacion(data)
            db.session.add(new)
            db.session.commit()
            db.session.refresh(new)
            response = new
            if to_dict:
                response = _Schema().dump(new)
            if exclude is not None:
                response = _Schema(exclude=exclude).dump(response)
            return True, response
        except (RuntimeError, TypeError, NameError):
            print(RuntimeError)
            db.session.rollback()
            db.session.flush()
            return False, None

    @staticmethod
    async def update(
        _id: int,
        data: dict,
        to_dict: Optional[bool] = False,
        exclude: Optional[list] = None,
    ) -> Tuple[bool, _Justipreciacion or _Schema or None]:
        """This method updates the current model in the database
        Receive a id and a dict with the data to update\
in a loop check the items in the dict and update the record\
and return a tuple with the results
        Args:
            _id (int): id to work with in the database
            data (dict): data to work with
            to_dict (bool, optional): if True, return a dict, else return a model instance
            exclude (list, optional): List of columns to exclude.
        Returns:
            response (bool): True if success, False if not
            response_data (model): data to return
        """
        current_entity = db.session.query(_Justipreciacion).get(_id)
        if current_entity is None:
            return False, None
        try:
            for key, item in data.items():
                setattr(current_entity, key, item)
            db.session.merge(current_entity)
            db.session.commit()
            response = current_entity
            if to_dict:
                response = _Schema().dump(current_entity)
            if exclude is not None:
                response = _Schema(exclude=exclude).dump(response)
            return True, response
        except (RuntimeError, TypeError, NameError):
            print(RuntimeError)
            db.session.rollback()
            db.session.flush()
            return False, None

    @staticmethod
    async def delete(
        _id: int, to_dict: Optional[bool] = False, exclude: Optional[list] = None
    ) -> Tuple[bool, _Justipreciacion or _Schema or None]:
        """
        This method deletes a record from the database.
        Receive a id and return a tuple with the results.
        Args:
            _id (int): id to work with in the database
            to_dict (bool,optional): if True, return a dict, else return a model instance
            exclude (list, optional): List of columns to exclude.
        Returns:
            response (bool): True if success, False if not
            response_data (model): data to return
        """
        current_entity = db.session.query(_Justipreciacion).get(_id)
        if current_entity is None:
            return False, None
        try:
            db.session.delete(current_entity)
            db.session.commit()
            response = current_entity
            if to_dict:
                response = _Schema().dump(current_entity)
            if exclude is not None:
                response = _Schema(exclude=exclude).dump(response)
            return True, response
        except (RuntimeError, TypeError, NameError):
            print(RuntimeError)
            db.session.rollback()
            db.session.flush()
            return False, None

    @staticmethod
    def to_dict(entity: _Justipreciacion, exclude: Optional[list] = None) -> _Schema:
        """Pass a model instance to a dict
        Args:
            entity (model instance): data to work with
            exclude (list): list of fields to exclude
        Returns:
            response (dict): dict with data
        """
        if exclude is not None:
            _Schema(exclude=exclude).dump(entity)
        return _Schema().dump(entity)

    @staticmethod
    def to_list(entities: _Justipreciacion, exclude: Optional[list] = None) -> list:
        """Pass a model instance to a dict
        Args:
            entities (model): data to work with

        Returns:
            response (list): list with data
        """
        if exclude is not None:
            return _Schema(many=True, exclude=exclude).dump(entities)
        return _Schema(many=True).dump(entities)
