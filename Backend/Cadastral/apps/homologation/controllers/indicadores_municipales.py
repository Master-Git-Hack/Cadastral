from Cadastral.apps.homologation.models.indicadores_municipales import (
    IndicadoresMunicipales,
)


def getIndicadoresMunicipales():
    records = IndicadoresMunicipales.query.all()
    return [
        {
            "id": record.id,
            "name": record.municipio,
            "totalPopulation": record.poblacion_total,
            "percentage": record.porcentaje,
            "populationDensity": record.densidad_poblacion,
            "economicallyActivePopulation": record.pob_econom_activa,
            "inhabitedDwellings": record.viviendas_habitadas,
            "annualCensus": record.anualidad_censo,
        }
        for record in records
    ]
