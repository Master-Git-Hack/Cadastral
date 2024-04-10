"""Model for Costos Construccion"""

from datetime import datetime

from sqlalchemy import Boolean, Column, Date, Float, Integer, String

from .... import db, ma


class CedulaComparables(db.Model):
    """Model for Costos Construccion"""

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


db.create_all()


class CedulaComparablesSchema(ma.Schema):
    """Class for serializing costo constuccion data"""

    fields = (
        "id",
        "tipo",
        "id_cedula_mercado",
        "id_comparables_catcom",
    )
