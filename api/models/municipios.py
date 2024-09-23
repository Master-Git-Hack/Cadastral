from typing import Any, Dict, Optional

from sqlalchemy import BigInteger, Column, String

from .. import config, database
from ..middlewares.database import Template


class Model(database.BASE):
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


from pydantic import BaseModel


class Schema(BaseModel):
    """
    Municipios Schema
    """

    id: Optional[int]
    nombre: Optional[str]
    nombre_utf: Optional[str]

    class Config:
        orm_mode = True


class Municipios(Template):
    def __init__(self, db) -> None:
        super().__init__(Model=Model, db=db, Schema=Schema)
