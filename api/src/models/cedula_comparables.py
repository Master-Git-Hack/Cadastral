from typing import Optional

from sqlalchemy import Column, Float
from sqlmodel import Field, Session, SQLModel

from ..middlewares.database import Template


class Model(SQLModel, table=True):
    __table_args__ = {"extend_existing": True}
    """Cedula Comparables model"""

    __tablename__ = "cedula_comparable"
    id: Optional[int] = Field(
        default=None, primary_key=True, sa_column_kwargs={"autoincrement": True}
    )
    tipo: str = Field(default=None)
    id_cedula_mercado: int = Field(default=None)
    id_comparable_catcom: int = Field(default=None)


class CedulaComparables(Template):
    def __init__(self, Session: Session) -> None:
        super().__init__(Model=Model, Session=Session)
