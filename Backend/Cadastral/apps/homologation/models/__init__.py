from Cadastral import app, db, ma
from sqlalchemy import BigInteger, Column, Float, String
from sqlalchemy.dialects import postgresql as psql


class Homologation(db.Model):

    __tablename__ = "homologacion"

    id = Column(BigInteger, primary_key=True)
    tipo = Column(String)
    factores = Column(psql.JSON())
    resultado = Column(psql.JSON())
    valor_unitario = Column(Float)
    registro = Column(String())
    tipo_servicio = Column(String())

    def __init__(self, collection):
        self.tipo = collection["tipo"].lower()
        self.factores = collection["factores"]
        self.resultado = collection["resultado"]
        self.valor_unitario = collection["valor_unitario"]
        self.registro = collection["registro"]
        self.tipo_servicio = collection["tipo_servicio"].lower()


db.create_all()


class HomologationSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "tipo",
            "factores",
            "resultado",
            "valor_unitario",
            "registro",
            "tipo_servicio",
        )


homologationSchema = HomologationSchema()
session = db.session
