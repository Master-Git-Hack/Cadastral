from datetime import datetime
from typing import Any, Dict

from sqlalchemy import JSON, BigInteger, Column, DateTime, Integer, SmallInteger

from .. import config
from . import Template

db = config.db.catastro_v2


class Model(db.Model):
    __tablename__ = "metadatos"
    # __table_args__ = {"schema": "pgmetadata"}
    id = Column(
        Integer, name="id", primary_key=True, comment="Internal automatic integer ID"
    )
    datos = Column(JSON)
    encargado = Column(BigInteger)
    estatus = Column(SmallInteger, default=1)
    fecha_creacion = Column(DateTime, default=datetime.now)
    fecha_modificacion = Column(DateTime, default=datetime.now)

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)


class Metadatos(Template):
    def __init__(self) -> None:
        super().__init__(Model, db)
