from typing import Any, Dict

from sqlalchemy import JSON, BigInteger, Column, Float, String

from .. import config
from . import Base

__db = config.db


class Model(__db.Model):
    __tablename__ = "homologacion"

    id = Column(BigInteger, primary_key=True)
    tipo = Column(String)
    factores = Column(JSON)
    resultado = Column(JSON)
    valor_unitario = Column(Float)
    registro = Column(String())
    tipo_servicio = Column(String())

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            if key == "tipo" or key == "tipo_servicio":
                value = value.lower()
            setattr(self, key, value)


__db.create_all()


class Homologacion(Base):
    def __init__(self) -> None:
        super().__init__(Model)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
