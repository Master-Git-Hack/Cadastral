from typing import Optional

from sqlmodel import Field, Session, SQLModel

from ..middlewares.database import Template
from . import response_model


class Model(SQLModel, table=True):
    __tablename__ = "dep_solicitante"
    id: Optional[int] = Field(
        default=None, primary_key=True, sa_column_kwargs={"autoincrement": True}
    )
    descripcion: str = Field(default=None)
    nombre_corto: str = Field(default=None)
    secretaria: str = Field(default=None)


class DepartamentosSolicitantes(Template):
    response_model = response_model(Model=Model)

    def __init__(self, Session: Session) -> None:
        super().__init__(Model=Model, Session=Session)
