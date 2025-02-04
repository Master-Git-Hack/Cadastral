from typing import Optional

from sqlmodel import Field, Session, SQLModel

from ..middlewares.database import Template
from . import response_model


class Model(SQLModel, table=True):
    __tablename__ = "homologacion"
    id: Optional[int] = Field(
        default=None, primary_key=True, sa_column_kwargs={"autoincrement": True}
    )
    tipo: str = Field(default=None)
    factores: dict = Field(default=None)
    resultado: dict = Field(default=None)
    valor_unitario: float = Field(default=None)
    registro: str = Field(default=None)
    tipo_servicio: str = Field(default=None)


class Homologacion(Template):
    response_model = response_model(Model=Model)

    def __init__(self, Session: Session) -> None:
        super().__init__(Model=Model, Session=Session)
