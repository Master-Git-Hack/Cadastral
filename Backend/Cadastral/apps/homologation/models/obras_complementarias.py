from Cadastral import db, ma
from sqlalchemy import BigInteger, Column, Float, String
from sqlalchemy.dialects import postgresql as psql


class ObrasComplementarias(db.Model):
    __tablename__ = "obras_complementarias"

    id = Column(BigInteger, primary_key=True)
    datos = Column(psql.JSON())
    valor_unitario = Column(Float)
    registro = Column(String())

    def __init__(self, collection):
        self.datos = collection["datos"]
        self.valor_unitario = collection["valor_unitario"]
        self.registro = collection["record"]["register"]


db.create_all()


class ObrasComplementariasSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "datos",
            "valor_unitario",
            "registro",
        )


obrasComplementariasSchema = ObrasComplementariasSchema()
session = db.session
