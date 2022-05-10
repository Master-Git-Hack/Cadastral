from Cadastral import db
from sqlalchemy import Column, Integer, Text


class Municipios(db.Model):
    """
    Municipios Model
    """

    __tablename__ = "municipios"

    id = Column(Integer, primary_key=True)
    nombre = Column(Text)
    nombre_utf = Column(Text)

    def __init__(self, collection):
        self.nombre = collection["nombre"]
        self.nombre_utf = collection["nombre_utf"]


db.create_all()
session = db.session
