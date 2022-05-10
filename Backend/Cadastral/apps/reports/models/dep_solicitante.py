from Cadastral import db
from sqlalchemy import BigInteger, Column, Text


class DepSolicitante(db.Model):
    """
    Departamentos Solicitantes
    Clase para la tabla dep_solicitante
    """

    __tablename__ = "dep_solicitante"

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
