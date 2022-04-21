from Cadastral import db, ma
from sqlalchemy import Column, BigInteger, String, Float
from sqlalchemy.dialects import postgresql as psql


class ObrasComplementarias(db.Model):
    __tablename__ = "obras_complementarias"

    id = Column(BigInteger, primary_key=True)
    datos = Column(psql.JSON())
    valor_unitario = Column(Float)
    registro = Column(String())
    tipo_servicio = Column(String())

    def __init__(self, collection):
        self.datos = collection["datos"]
        self.valor_unitario = collection["valor_unitario"]
        self.registro = collection["record"]["register"]
        self.tipo_servicio = collection["record"]["appraisalPurpose"].lower()


db.create_all()


class ObrasComplementariasSchema(ma.Schema):
    class Meta:
        fields = (
            "id",
            "datos",
            "valor_unitario",
            "registro",
            "tipo_servicio",
        )


obrasComplementariasSchema = ObrasComplementariasSchema()
session = db.session
