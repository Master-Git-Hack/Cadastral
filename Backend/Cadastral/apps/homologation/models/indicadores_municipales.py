from Cadastral import db, ma
from sqlalchemy import Column, Integer, Text, Float


class IndicadoresMunicipales(db.Model):

    __tablename__ = "indicadores_municipales"

    id = Column(Integer, primary_key=True)
    municipio = Column(Text)
    poblacion_total = Column(Integer)
    densidad_poblacion = Column(Float)
    pob_econom_activa = Column(Integer)
    viviendas_habitadas = Column(Integer)
    anualidad_censo = Column(Integer)
    porcentaje = Column(Float)

    def __init__(self, collection):
        self.municipio = collection["municipio"]
        self.poblacion_total = collection["poblacion_total"]
        self.densidad_poblacion = collection["densidad_poblacion"]
        self.pob_econom_activa = collection["pob_econom_activa"]
        self.viviendas_habitadas = collection["viviendas_habitadas"]
        self.anualidad_censo = collection["anualidad_censo"]
        self.porcentaje = collection["porcentaje"]


db.create_all()


class IndicadoresMunicipalesSchema(ma.Schema):
    class Meta:
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


indicadoresMunicipalesSchema = IndicadoresMunicipalesSchema(many=True)
session = db.session
