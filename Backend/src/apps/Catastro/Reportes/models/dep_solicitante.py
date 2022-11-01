"""Model file for the Departamento Solicitante table."""
from sqlalchemy import Column, Integer, String, text

from ..... import db


class DepSolicitante(db.Model):
    """
    Departamentos Solicitantes
    Clase para la tabla dep_solicitante
    """

    __tablename__ = "dep_solicitante"

    id = Column(
        Integer,
        primary_key=True,
        # server_default=text("nextval('dep_solicitante_id_seq'::regclass)"),
    )
    descripcion = Column(String)
    nombre_corto = Column(String)
    secretaria = Column(String)

    def __init__(self, collection) -> None:
        """
        Constructor
        Args:
            collection: Diccionario con los datos de la tabla
        """
        self.descripcion = collection["descripcion"]
        self.nombre_corto = collection["nombre_corto"]
        self.secretaria = collection["secretaria"]


db.create_all()
