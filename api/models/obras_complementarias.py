from typing import Any, Dict, Optional

from sqlalchemy import JSON, BigInteger, Boolean, Column, Float, SmallInteger, String

from .. import config, database
from ..middlewares.database import Template


class Model(database.BASE):
    """Model for the ObrasComplementarias table"""

    __tablename__ = "obras_complementarias"

    id = Column(BigInteger, primary_key=True)
    datos = Column(JSON)
    calculo = Column(JSON)
    valor_unitario = Column(Float)
    registro = Column(String())
    calculo_completo = Column(Boolean)
    redondeo = Column(SmallInteger)

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)


from pydantic import BaseModel


class Schema(BaseModel):
    id: Optional[int]
    datos: Optional[Dict[str, Any]]
    calculo: Optional[Dict[str, Any]]
    valor_unitario: Optional[float]
    registro: Optional[str]
    calculo_completo: Optional[bool]
    redondeo: Optional[int]

    class Config:
        orm_mode = True


class ObrasComplementarias(Template):
    def __init__(self, db) -> None:
        super().__init__(Model=Model, db=db, Schema=Schema)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
