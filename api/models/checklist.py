from datetime import datetime
from typing import Optional

from sqlalchemy import JSON, Float
from sqlmodel import Field, Session, SQLModel

from ..middlewares.database import Template


class Model(SQLModel, table=True):
    __table_args__ = {"extend_existing": True}
    __tablename__ = "checklist"

    id: Optional[int] = Field(
        default=None, primary_key=True, sa_column_kwargs={"autoincrement": True}
    )
    fecha_creacion: datetime = Field(default=None)
    registro: str = Field(default=None)
    tipo: str = Field(default=None)
    tipo_bien: str = Field(default=None)
    observaciones: str = Field(default=None)
    requerimientos: dict = Field(default=None, sa_column=JSON)
    total_ponderacion_documental: float = Field(
        default=None, sa_column=Float(precision=70)
    )
    total_ponderacion_tecnico: float = Field(
        default=None, sa_column=Float(precision=70)
    )
    resultado_ponderado: float = Field(default=None, sa_column=Float(precision=70))
    valuador: int = Field(
        default=None,
        foreign_key="usuarios.id",
    )


class Checklist(Template):
    def __init__(self, Session: Session) -> None:
        super().__init__(Model=Model, Session=Session)
