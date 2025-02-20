"""Model File for the Municipios table."""
from sqlalchemy import BigInteger, Column, String

from ..... import db


class Municipios(db.Model):
    """
    Municipios Model
    """

    __tablename__ = "municipios"

    id = Column(BigInteger, primary_key=True)
    nombre = Column(String)
    nombre_utf = Column(String)

    def __init__(self, collection) -> None:
        """
        Constructor
        Args:
            collection: Diccionario con los datos de la tabla
        """
        self.nombre = collection["nombre"]
        self.nombre_utf = collection["nombre_utf"]


db.create_all()
