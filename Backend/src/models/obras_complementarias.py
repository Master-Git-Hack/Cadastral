from typing import Any, Dict

from sqlalchemy import JSON, BigInteger, Boolean, Column, Float, SmallInteger, String

from .. import config, database
from . import Template


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


class ObrasComplementarias(Template):
    def __init__(self, db) -> None:
        super().__init__(Model, db)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
