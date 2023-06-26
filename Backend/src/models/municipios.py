from typing import Any, Dict

from sqlalchemy import BigInteger, Column, String

from .. import config
from . import Base

__db = config.db


class Model(__db.Model):
    """
    Municipios Model
    """

    __tablename__ = "municipios"

    id = Column(BigInteger, primary_key=True)
    nombre = Column(String)
    nombre_utf = Column(String)

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)


class Municipios(Base):
    def __init__(self) -> None:
        super().__init__(Model)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
