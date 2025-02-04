from typing import Any, Dict, Optional

from sqlalchemy import MetaData, Table
from sqlmodel import Session, SQLModel

from .. import config, database
from ..middlewares.database import Template
from . import response_model


class Justipreciacion(Template):
    def __init__(self, db: Session) -> None:
        metadata = MetaData()
        table = Table("justipreciacion", metadata, autoload_with=db.get_bind())

        class Model(SQLModel, table=True):
            __table__ = table

        super().__init__(Model, db)
