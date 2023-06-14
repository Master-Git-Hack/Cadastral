from typing import Any, Dict

from sqlalchemy import Column, Integer, String, text

from .. import config
from . import Base

__db = config.db


class Model(__db.Model):
    """
    Departamentos Solicitantes
    Clase para la tabla dep_solicitante
    """

    __tablename__ = "dep_solicitante"

    id = Column(
        Integer,
        primary_key=True,
        server_default=text("nextval('dep_solicitante_id_seq'::regclass)"),
    )
    descripcion = Column(String)
    nombre_corto = Column(String)
    secretaria = Column(String)

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)


__db.create_all()


class DepartamentosSolicitantes(Base):
    def __init__(self) -> None:
        super().__init__(Model)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
