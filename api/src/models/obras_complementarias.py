from typing import Any, Dict, Optional

from sqlalchemy import JSON, BigInteger, Boolean, Column, Float, SmallInteger, String
from sqlmodel import Field, Session, SQLModel

from .. import config, database
from ..middlewares.database import Template
from . import response_model


class Model(SQLModel, table=True):
    __tablename__ = "obras_complementarias"
    id: Optional[int] = Field(
        default=None, primary_key=True, sa_column_kwargs={"autoincrement": True}
    )
    datos: Dict[str, Any] = Field(default=None)
    calculo: Dict[str, Any] = Field(default=None)
    valor_unitario: float = Field(default=None)
    registro: str = Field(default=None)
    calculo_completo: bool = Field(default=False)
    redondeo: int = Field(default=0)


class ObrasComplementarias(Template):
    response_model = response_model(Model=Model)

    def __init__(self, Session: Session) -> None:
        super().__init__(Model=Model, Session=Session)
