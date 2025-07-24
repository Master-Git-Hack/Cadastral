"""Model for the Homologacion table"""

from sqlalchemy import JSON, BigInteger, Column, Float, String
from sqlalchemy.ext.mutable import MutableDict
from datetime import datetime, timezone
from .... import db, ma
from enum import StrEnum


class RevisionStatus(StrEnum):
    PENDIENTE = "PENDIENTE"
    EN_REVISION = "EN_REVISION"
    REVISADO_CON_ERRORES = "REVISADO_CON_ERRORES"
    REVISADO_APROBADO = "REVISADO_APROBADO"
    RECHAZADO = "RECHAZADO"
    OBSOLETO = "OBSOLETO"


def default_revision():
    return {
        "status": RevisionStatus.PENDIENTE.value,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "reviewed_at": datetime.now(timezone.utc).isoformat(),
        "revisiones": [],
    }


class Homologation(db.Model):
    __tablename__ = "homologacion"

    id = Column(BigInteger, primary_key=True)
    tipo = Column(String)
    factores = Column(JSON)
    resultado = Column(JSON)
    valor_unitario = Column(Float)
    registro = Column(String())
    tipo_servicio = Column(String())
    revisiones = Column(
        MutableDict.as_mutable(JSON), default=default_revision, nullable=False
    )

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
        self.revisiones = collection["revisiones"]


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
            "revisiones",
        )


homologationSchema = HomologationSchema()
