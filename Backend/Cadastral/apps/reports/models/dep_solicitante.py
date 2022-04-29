from Cadastral import db
from sqlalchemy import Column, BigInteger, Text


class DepSolicitante(db.Model):
    id = Column(BigInteger, primary_key=True)
    descripcion = Column(Text)
    nombre_corto = Column(Text)
    secretaria = Column(Text)

    def __init__(self, collection):
        self.descripcion = collection["descripcion"]
        self.nombre_corto = collection["nombre_corto"]
        self.secretaria = collection["secretaria"]


db.create_all()
session = db.session
