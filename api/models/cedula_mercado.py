from datetime import datetime
from typing import Optional

from sqlalchemy import Column, Float
from sqlmodel import Field, Session, SQLModel

from ..middlewares.database import Template


class Model(SQLModel, table=True):
    __table_args__ = {"extend_existing": True}
    """Cedula Mercado model"""

    __tablename__ = "cedula_mercado"
    id: Optional[int] = Field(
        default=None, primary_key=True, sa_column_kwargs={"autoincrement": True}
    )
    fecha: datetime = Field(default=None)
    registro: str = Field(default=None)
    usuario: str = Field(default=None)

    # cedula_comparables = relationship(
    #     "CedulaComparables", back_populates="cedula_mercado"
    # )

    def __init__(self, **kwargs: dict) -> None:
        """Constructor de la tabla para el calculo del valor unitario de construccion.

        Args:
            collection (dict): data array with the values to be added
        Returns:
            None
        """
        for key, value in kwargs.items():
            setattr(self, key, value)


class CedulaMercado(Template):
    def __init__(self, db) -> None:
        super().__init__(Model, db)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
