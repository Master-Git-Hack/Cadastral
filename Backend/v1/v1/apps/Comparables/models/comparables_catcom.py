"""Model for Costos Construccion"""

from datetime import datetime

from sqlalchemy import Boolean, Column, Date, Float, Integer, String

from .... import db, ma


class ComparablesCatCom(db.Model):
    """Model for Costos Construccion"""

    __tablename__ = "comparables_catcom"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    fecha_captura = Column(Date, default=datetime.now)
    tipo_inmueble = Column(String)
    tipo_operacion = Column(String)
    captura_pantalla = Column(String)
    imagen_1 = Column(String)
    imagen_2 = Column(String)
    url_fuente = Column(String)
    nombre_anunciante = Column(String)
    telefono_anunciante = Column(String)
    x_utm = Column(Float)
    y_utm = Column(Float)
    tipo_vialidad = Column(String)
    nombre_vialidad = Column(String)
    numero_exterior = Column(String)
    numero_interior = Column(String)
    edificio = Column(String)
    entrecalles = Column(String)
    nombre_asentamiento = Column(String)
    tipo_asentamiento = Column(String)
    localidad = Column(String)
    municipio = Column(String)
    estado = Column(String)
    regimen_propiedad = Column(String)
    tipo_zona = Column(String)
    uso_suelo_observado = Column(String)
    uso_suelo_oficial = Column(String)
    ubicacion_manzana = Column(String)
    numero_frentes = Column(Integer)
    longitud_frente = Column(Float)
    longitud_fondo = Column(Float)
    longitud_frente_tipo = Column(String)
    forma = Column(String)
    topografia = Column(String)
    superficie_terreno = Column(Float)
    superficie_construccion = Column(Float)
    calidad_proyecto = Column(String)
    estado_conservacion = Column(String)
    tipo_construccion = Column(String)
    calidad_construccion = Column(String)
    edad = Column(Integer)
    niveles = Column(String)
    unidades_rentables = Column(Integer)
    descripcion_espacios = Column(String)
    agua = Column(Integer)
    drenaje = Column(Integer)
    energia_electrica = Column(Integer)
    alumbrado_pubkico = Column(Integer)
    banqueta = Column(Integer)
    pavimento = Column(Integer)
    telefonia = Column(Integer)
    valor_total_mercado = Column(Float)
    valor_renta = Column(Float)
    valor_renta = Column(Float)
    precio_dolar = Column(Float)
    observaciones = Column(String)
    usuario = Column(String)
    fh_modificacion = Column(Date, default=datetime.now)
    # descripcion = Column(Text)
    # costo_directo = Column(Float)
    # indirectos = Column(Float)
    # valor_neto = Column(Float)
    # m2 = Column(Float)
    # factor_gto = Column(Boolean, unique=False, default=False, nullable=False)
    # valor_resultante = Column(Float)
    # total = Column(Float)
    # tipo_servicio = Column(String())
    # registro = Column(String())
    # redondeo = Column(Integer, default=0)

    def __init__(self, **kwargs: dict) -> None:
        """Constructor de la tabla para el calculo del valor unitario de construccion.

        Args:
            collection (dict): data array with the values to be added
        Returns:
            None
        """
        for key, value in kwargs.items():
            setattr(self, key, value)


db.create_all()


class ComparablesCatComSchema(ma.Schema):
    """Class for serializing costo constuccion data"""

    fields = (
        "id",
        "fecha_captura",
        "tipo_inmueble",
        "tipo_operacion",
        "captura_pantalla",
        "imagen_1",
        "imagen_2",
        "url_fuente",
        "nombre_anunciante",
        "telefono_anunciante",
        "x_utm",
        "y_utm",
        "tipo_vialidad",
        "nombre_vialidad",
        "numero_exterior",
        "numero_interior",
        "edificio",
        "entrecalles",
        "nombre_asentamiento",
        "tipo_asentamiento",
        "localidad",
        "municipio",
        "estado",
        "regimen_propiedad",
        "tipo_zona",
        "uso_suelo_observado",
        "uso_suelo_oficial",
        "ubicacion_manzana",
        "numero_frentes",
        "longitud_frente",
        "longitud_fondo",
        "longitud_frente_tipo",
        "forma",
        "topografia",
        "superficie_terreno",
        "superficie_construccion",
        "calidad_proyecto",
        "estado_conservacion",
        "tipo_construccion",
        "calidad_construccion",
        "edad",
        "niveles",
        "unidades_rentables",
        "descripcion_espacios",
        "agua",
        "drenaje",
        "energia_electrica",
        "alumbrado_publico",
        "banqueta",
        "pavimento",
        "telefonia",
        "valor_total_mercado",
        "valor_renta",
        "precio_dolar",
        "observaciones",
        "usuario",
    )


comparablesCatComSchema = ComparablesCatComSchema()
