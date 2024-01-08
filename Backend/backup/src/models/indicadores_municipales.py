from typing import Any, Dict

from sqlalchemy import Column, Float, Integer, Text

from .. import config
from . import Template

db = config.db.valuaciones


class Model(db.Model):
    __tablename__ = "indicadores_municipales"

    id = Column(Integer, primary_key=True)
    municipio = Column(Text)
    poblacion_total = Column(Integer)
    densidad_poblacion = Column(Float)
    pob_econom_activa = Column(Integer)
    viviendas_habitadas = Column(Integer)
    anualidad_censo = Column(Integer)
    porcentaje = Column(Float)

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)


class IndicadoresMunicipales(Template):
    def __init__(self) -> None:
        super().__init__(Model, db)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
