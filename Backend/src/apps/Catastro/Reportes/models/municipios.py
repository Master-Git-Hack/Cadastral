"""Model File for the Municipios table."""
from sqlalchemy import Column, Integer, Text

from ..... import db


class Municipios(db.Model):
    """
    Municipios Model
    """

    __tablename__ = "municipios"

    id = Column(Integer, primary_key=True)
    nombre = Column(Text)
    nombre_utf = Column(Text)

    def __init__(self, collection) -> None:
        """
        Constructor
        Args:
            collection: Diccionario con los datos de la tabla
        """
        self.nombre = collection["nombre"]
        self.nombre_utf = collection["nombre_utf"]


db.create_all()
