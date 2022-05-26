"""Model for the ObrasComplementarias table"""
from sqlalchemy import JSON, BigInteger, Column, Float, String

from .... import db, ma


class ObrasComplementarias(db.Model):
    """Model for the ObrasComplementarias table"""

    __tablename__ = "obras_complementarias"

    id = Column(BigInteger, primary_key=True)
    datos = Column(JSON)
    calculo = Column(JSON)
    valor_unitario = Column(Float)
    registro = Column(String())

    def __init__(self, collection: dict) -> None:
        """
        Constructor
        Args:
            collection (dict): The collection to be added
        Returns:
            None
        """
        self.datos = collection["datos"]
        self.calculo = collection["calculo"]
        self.valor_unitario = collection["valor_unitario"]
        self.registro = collection["record"]["register"]


db.create_all()


class ObrasComplementariasSchema(ma.Schema):
    """Class for serializing ObrasComplementarias data"""

    class Meta:
        """Meta class for serializing ObrasComplementarias data"""

        fields = (
            "id",
            "datos",
            "calculo",
            "valor_unitario",
            "registro",
        )


obras_complementarias_schema = ObrasComplementariasSchema()
