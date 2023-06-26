from typing import Any, Dict

from sqlalchemy import JSON, BigInteger, Boolean, Column, Float, SmallInteger, String

from .. import config
from . import Base

__db = config.db


class Model(__db.Model):

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


class ObrasComplementarias(Base):
    def __init__(self) -> None:
        super().__init__(Model)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
