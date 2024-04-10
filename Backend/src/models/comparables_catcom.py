"""Model for Costos Construccion"""

from datetime import datetime
from typing import Any, Dict

from sqlalchemy import Boolean, Column, Date, Float, Integer, String

from .. import config, database
from ..middlewares.database import Template


class Model(database.BASE):
    """Model for Comparables Catastrales Comerciales"""

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
    dreanaje = Column(Integer)
    energia_electrica = Column(Integer)
    alumbrado_publico = Column(Integer)
    banqueta = Column(Integer)
    pavimento = Column(Integer)
    telefonia = Column(Integer)
    valor_total_mercado = Column(Float)
    valor_renta = Column(Float)
    valor_renta = Column(Float)
    precio_dolar = Column(Float)
    observaciones = Column(String)
    usuario = Column(String)

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        """Constructor de la tabla para el calculo del valor unitario de construccion.

        Args:
            collection (dict): data array with the values to be added
        Returns:
            None
        """
        for key, value in kwargs.items():
            setattr(self, key, value)


class ComparablesCatCom(Template):
    def __init__(self, db) -> None:
        super().__init__(Model, db)
