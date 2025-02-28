from typing import Optional, Dict, Any

from sqlmodel import Field, Session, SQLModel
from sqlalchemy import Column
from sqlalchemy import JSON # ✅ Correct import
from ..middlewares.database import Template
from . import response_model


class Model(SQLModel, table=True):
    __tablename__ = "homologacion"
    id: Optional[int] = Field(
        default=None, primary_key=True, sa_column_kwargs={"autoincrement": True}
    )
    tipo: str = Field(default=None)
    factores: Optional[Dict[str, Any]] = Field(
        default=None, sa_column=Column(
           sa_column=JSON
        )
    )  # ✅ Uses the correct JSON type
    resultado: Optional[Dict[str, Any]] = Field(
        default=None, sa_column=Column(
           sa_column=JSON
        )
    )  # ✅ Uses the correct JSON type
    valor_unitario: float = Field(default=None)
    registro: str = Field(default=None)
    tipo_servicio: str = Field(default=None)


class Homologacion(Template):
    response_model = response_model(Model=Model)

    def __init__(self, Session: Session) -> None:
        super().__init__(Model=Model, Session=Session)
