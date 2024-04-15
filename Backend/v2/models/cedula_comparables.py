from sqlalchemy import Column, Integer, String

from .. import database
from ..middlewares.database import Template


class Model(database.BASE):
    """Cedula Comparables model"""

    __tablename__ = "cedula_comparables"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    tipo = Column(String)
    id_cedula_mercado = Column(Integer)
    id_comparables_catcom = Column(Integer)

    def __init__(self, **kwargs: dict) -> None:
        """Constructor de la tabla para el calculo del valor unitario de construccion.

        Args:
            collection (dict): data array with the values to be added
        Returns:
            None
        """
        for key, value in kwargs.items():
            setattr(self, key, value)


class CedulaComparables(Template):
    def __init__(self, db) -> None:
        super().__init__(Model, db)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
