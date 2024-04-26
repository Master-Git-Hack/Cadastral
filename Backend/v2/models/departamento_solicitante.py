from typing import Any, Dict

from sqlalchemy import Column, Integer, String

from .. import config, database
from ..middlewares.database import Template


class Model(database.BASE):
    """
    Departamentos Solicitantes
    Clase para la tabla dep_solicitante
    """

    __tablename__ = "dep_solicitante"

    id = Column(
        Integer,
        primary_key=True,
    )
    descripcion = Column(String)
    nombre_corto = Column(String)
    secretaria = Column(String)

    def __init__(self, **kwargs: Dict[str, Any]) -> None:
        for key, value in kwargs.items():
            setattr(self, key, value)


class DepartamentosSolicitantes(Template):
    def __init__(self, db) -> None:
        super().__init__(Model, db)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)