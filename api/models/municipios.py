from typing import Any, Dict, Optional

from sqlalchemy import BigInteger, Column, String
from sqlmodel import Field, Session, SQLModel

from .. import config, database
from ..middlewares.database import Template
from . import response_model


class Model(SQLModel, table=True):
    __tablename__ = "municipios"
    id: Optional[int] = Field(
        default=None, primary_key=True, sa_column_kwargs={"autoincrement": True}
    )
    nombre: str = Field(default=None)
    nombre_utf: str = Field(default=None)


class Municipios(Template):
    response_model = response_model(Model=Model)

    def __init__(self, Session: Session) -> None:
        super().__init__(Model=Model, Session=Session)
