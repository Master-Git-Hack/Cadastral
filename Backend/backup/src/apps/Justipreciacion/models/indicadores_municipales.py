"""Model for the IndicadoresMunicipales table"""
from sqlalchemy import Column, Float, Integer, Text

from .... import db, ma


class IndicadoresMunicipales(db.Model):
    """Class for the IndicadoresMunicipales table"""

    __tablename__ = "indicadores_municipales"

    id = Column(Integer, primary_key=True)
    municipio = Column(Text)
    poblacion_total = Column(Integer)
    densidad_poblacion = Column(Float)
    pob_econom_activa = Column(Integer)
    viviendas_habitadas = Column(Integer)
    anualidad_censo = Column(Integer)
    porcentaje = Column(Float)

    def __init__(self, collection: dict) -> None:
        """
        Constructor
        Args:
            collection (dict): The collection to be added
        Returns:
            None
        """
        self.municipio = collection["municipio"]
        self.poblacion_total = collection["poblacion_total"]
        self.densidad_poblacion = collection["densidad_poblacion"]
        self.pob_econom_activa = collection["pob_econom_activa"]
        self.viviendas_habitadas = collection["viviendas_habitadas"]
        self.anualidad_censo = collection["anualidad_censo"]
        self.porcentaje = collection["porcentaje"]


db.create_all()


class IndicadoresMunicipalesSchema(ma.Schema):
    """Class for serializing IndicadoresMunicipales data"""

    class Meta:
        """Meta class for serializing IndicadoresMunicipales data"""

        fields = (
            "id",
            "municipio",
            "poblacion_total",
            "densidad_poblacion",
            "pob_econom_activa",
            "viviendas_habitadas",
            "anualidad_censo",
            "porcentaje",
        )


indicadores_municipales_schema = IndicadoresMunicipalesSchema(many=True)
