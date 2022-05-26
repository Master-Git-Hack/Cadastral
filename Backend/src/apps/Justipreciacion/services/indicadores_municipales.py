from typing import Dict, Tuple

from ..models.indicadores_municipales import IndicadoresMunicipales


def get_data_indicadores_municipales():
    """Recover from database the data of the Indicadores Municipales
    Returns:
        list: of dicts with Indicadores Municipales values
    """
    records = IndicadoresMunicipales.query.all()
    return [
        dict(
            id=record.id,
            name=record.municipio,
            totalPopulation=record.poblacion_total,
            percentage=record.porcentaje,
            populationDensity=record.densidad_poblacion,
            economicallyActivePopulation=record.pob_econom_activa,
            inhabitedDwellings=record.viviendas_habitadas,
            annualCensus=record.anualidad_censo,
        )
        for record in records
    ]


def get_indicadores_municipales() -> Tuple[Dict, int]:
    """
    Get Indicadores Municipales
    Returns:
        A list of dict with Indicadores Municipales values
    """
    records = IndicadoresMunicipales.query.all()
    if records:
        return (
            dict(
                status="success",
                message="Indicadores Municipales",
                operation="HOMOLOGACION/IndicadoresMunicipales",
                options=[
                    dict(
                        id=record.id,
                        name=record.municipio,
                        totalPopulation=record.poblacion_total,
                        percentage=record.porcentaje,
                        populationDensity=record.densidad_poblacion,
                        economicallyActivePopulation=record.pob_econom_activa,
                        inhabitedDwellings=record.viviendas_habitadas,
                        annualCensus=record.anualidad_censo,
                    )
                    for record in records
                ],
            ),
            201,
        )
    else:
        return (
            dict(
                status="fail",
                message="No se pudo recuperar la información de los indicadores municipales",
                operation="HOMOLOGACION/IndicadoresMunicipales",
            ),
            409,
        )
