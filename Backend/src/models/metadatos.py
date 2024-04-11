from datetime import datetime
from typing import Any, Dict

from sqlalchemy import JSON, BigInteger, Column, DateTime, Integer, SmallInteger, text
from sqlalchemy.dialects.postgresql import UUID

from .. import config, database
from ..middlewares.database import Template


class Model(database.BASE):
    __tablename__ = "metadatos_temporales"
    # __table_args__ = {"schema": "public"}
    uid = Column(
        UUID,
        name="uid",
        primary_key=True,
        server_default=text("uuid_generate_v4()"),
        comment="Unique identifier of the data. E.g. 89e3dde9-3850-c211-5045-b5b09aa1da9a",
    )
    datos = Column(JSON)
    encargado = Column(BigInteger)
    estatus = Column(SmallInteger, default=1)
    fecha_creacion = Column(DateTime, default=datetime.now)
    fecha_modificacion = Column(DateTime, default=datetime.now)

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)


class MetadatosTemporales(Template):
    def __init__(self, db) -> None:
        super().__init__(Model, db)
