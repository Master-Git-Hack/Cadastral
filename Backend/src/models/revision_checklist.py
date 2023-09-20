from datetime import datetime
from typing import Any, Dict

from sqlalchemy import JSON, BigInteger, Column, DateTime, Float, ForeignKey, String

from .. import config
from . import Template

db = config.db.valuaciones


class Model(db.Model):
    __tablename__ = "revision_checklist"

    id = Column(BigInteger, primary_key=True)
    checklist = Column(BigInteger, ForeignKey("checklist.id"))
    revisor = Column(BigInteger, ForeignKey("usuarios.id"))
    tipo_revisor = Column(String)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    requerimientos = Column(JSON)
    observaciones = Column(String, nullable=True)
    total = Column(Float)
    estatus = Column(String, default="pendiente")
    parent = Column(
        BigInteger,
        ForeignKey("revision_checklist.id"),
        nullable=True,
        default=None,
        index=True,
    )

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)


class RevisionChecklist(Template):
    def __init__(self) -> None:
        super().__init__(Model, db)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
