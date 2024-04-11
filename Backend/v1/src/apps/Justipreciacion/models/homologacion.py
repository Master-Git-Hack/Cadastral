""" Model for the Homologacion table """
from sqlalchemy import JSON, BigInteger, Column, Float, String

from .... import db, ma


class Homologation(db.Model):

    __tablename__ = "homologacion"

    id = Column(BigInteger, primary_key=True)
    tipo = Column(String)
    factores = Column(JSON)
    resultado = Column(JSON)
    valor_unitario = Column(Float)
    registro = Column(String())
    tipo_servicio = Column(String())

    def __init__(self, collection: dict) -> None:
        """
        Constructor
        Args:
            collection (dict): The collection to be added
        Returns:
            None
        """
        self.tipo = collection["tipo"].lower()
        self.factores = collection["factores"]
        self.resultado = collection["resultado"]
        self.valor_unitario = collection["valor_unitario"]
        self.registro = collection["registro"]
        self.tipo_servicio = collection["tipo_servicio"].lower()


db.create_all()


class HomologationSchema(ma.Schema):
    """Class for serializing homologation data"""

    class Meta:
        """Meta class for serializing homologation data"""

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
