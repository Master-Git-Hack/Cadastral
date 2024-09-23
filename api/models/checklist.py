from datetime import datetime
from typing import Any, Dict

from sqlalchemy import JSON, BigInteger, Column, DateTime, Float, ForeignKey, String

from .. import config, database
from ..middlewares.database import Template


class Model(database.BASE):
    __tablename__ = "checklist"

    id = Column(BigInteger, primary_key=True)
    tipo = Column(String)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    registro = Column(String)
    tipo_bien = Column(String)
    observaciones = Column(String, nullable=True)
    requerimientos = Column(JSON)
    total_ponderacion_documental = Column(Float)
    total_ponderacion_tecnico = Column(Float)
    resultado_ponderado = Column(Float)
    valuador = Column(BigInteger, ForeignKey("usuarios.id"))

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            if key == "tipo" or key == "tipo_bien":
                value = value.lower()
            setattr(self, key, value)


class Checklist(Template):
    def __init__(self, db) -> None:
        super().__init__(Model, db)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
