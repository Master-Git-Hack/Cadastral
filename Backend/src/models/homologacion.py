from marshmallow_mongoengine import ModelSchema
from mongoengine import Document
from sqlalchemy import JSON, BigInteger, Column, Float, String

from .. import config
from . import Base

__db = config.db
__ma = config.ma


class ModelHomologacion(__db.Model):
    __tablename__ = "homologacion"

    id = Column(BigInteger, primary_key=True)
    tipo = Column(String)
    factores = Column(JSON)
    resultado = Column(JSON)
    valor_unitario = Column(Float)
    registro = Column(String())
    tipo_servicio = Column(String())

    def __init__(self, **kwargs) -> None:
        """
        Constructor
        Args:
            kwargs (dict): Keywords arguments
        Returns:
            None
        """
        for key, value in kwargs.items():
            setattr(self, key, value)


__db.create_all()


class SchemaHomologacion(__ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ModelHomologacion


class HomologacionDocument(Document):
    ...


class Homologacion(Base):
    __model = ModelHomologacion
    __schema = SchemaHomologacion
    no_sql = HomologacionDocument

    def __init__(self) -> None:
        super().__init__(model=self.__model, schema=self.__schema)
