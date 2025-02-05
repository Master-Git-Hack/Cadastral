from datetime import datetime
from typing import Any, Dict, Optional

from sqlalchemy import (
    JSON,
    BigInteger,
    Column,
    DateTime,
    Integer,
    SmallInteger,
    text,
    String,
)

from .. import config, database
from ..middlewares.database import Template
from datetime import datetime, timezone

from sqlmodel import Field, Session, SQLModel

from . import response_model


class Model(SQLModel, table=True):
    __tablename__ = "metadatos_temporales"
    uid: Optional[str] = Field(
        default=None,
        primary_key=True,
        sa_column_kwargs={
            "server_default": text("uuid_generate_v4()"),
        },
    )
    datos: Optional[Dict[str, Any]] = Field(default=None, sa_column=Column(JSON))
    estatus: int = Field(default=1, sa_column=Column(SmallInteger))
    date: datetime = Field(
        default=datetime.now(), sa_column=Column(DateTime, name="fecha_creacion")
    )
    update_date: datetime = Field(
        default=datetime.now(),
        sa_column=Column(DateTime, onupdate=datetime.now, name="fecha_modificacion"),
    )
    username: str = Field(default=None, sa_column=Column(String))


class MetadatosTemporales(Template):
    response_model = response_model(Model=Model)

    def __init__(self, Session: Session) -> None:
        super().__init__(Model=Model, Session=Session)
