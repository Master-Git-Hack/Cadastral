from typing import Any, Dict

from sqlalchemy import Boolean, Column, Float, Integer, String, Text

from .. import config, database
from . import Template


class Model(database.BASE):
    __tablename__ = "calculo_valor_unitario_construccion"

    id = Column(Integer, primary_key=True)
    descripcion = Column(Text)
    costo_directo = Column(Float)
    indirectos = Column(Float)
    valor_neto = Column(Float)
    m2 = Column(Float)
    factor_gto = Column(Boolean, unique=False, default=False, nullable=False)
    valor_resultante = Column(Float)
    total = Column(Float)
    tipo_servicio = Column(String())
    registro = Column(String())
    redondeo = Column(Integer, default=0)

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)


class CostosConstruccion(Template):
    def __init__(self, db) -> None:
        super().__init__(Model, db)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
