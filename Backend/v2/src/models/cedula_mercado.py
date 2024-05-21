from datetime import datetime

from sqlalchemy import Column, Date, Integer, String
from sqlalchemy.orm import relationship

from .. import database
from ..middlewares.database import Template


class Model(database.BASE):
    """Cedula Mercado model"""

    __tablename__ = "cedula_mercado"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    fecha = Column(Date, default=datetime.now)
    registro = Column(String)
    usuario = Column(String)
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
