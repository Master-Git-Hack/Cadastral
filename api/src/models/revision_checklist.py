from datetime import datetime
from typing import Any, Dict, Optional

from sqlalchemy import JSON, BigInteger, Column, DateTime, Float, ForeignKey, String

from .. import config, database
from ..middlewares.database import Template


class Model(database.BASE):
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


from typing import Optional

from pydantic import BaseModel


class Schema(BaseModel):
    id: Optional[int]
    checklist: Optional[int]
    revisor: Optional[int]
    tipo_revisor: Optional[str]
    fecha_creacion: Optional[datetime]
    requerimientos: Optional[Dict[str, Any]]
    observaciones: Optional[str]
    total: Optional[float]
    estatus: Optional[str]
    parent: Optional[int]

    class Config:
        orm_mode = True


class RevisionChecklist(Template):
    def __init__(self, db) -> None:
        super().__init__(Model=Model, db=db, Schema=Schema)
