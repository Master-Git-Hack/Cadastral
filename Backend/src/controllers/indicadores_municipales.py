from ..models.indicadores_municipales import IndicadoresMunicipales
from ..utils.response import Responses


def all() -> Responses:
    indicadores = IndicadoresMunicipales()
    response = Responses()
    if indicadores.all() is None:
        return response.error(
            message="No se pudo recuperar la información de los indicadores municipales",
            status_code=404,
        )
    if len(indicadores.current) == 0:
        return response.error(
            message="No se pudo recuperar la información de los indicadores municipales",
            status_code=404,
        )
    return response.success(
        data=[
            {
                "id": current.id,
                "name": current.municipio,
                "totalPopulation": current.poblacion_total,
                "percentage": current.porcentaje,
                "populationDensity": current.densidad_poblacion,
                "economicallyActivePopulation": current.pob_econom_activa,
                "inhabitedDwellings": current.viviendas_habitadas,
                "annualCensus": current.anualidad_censo,
            }
            for current in indicadores.current
        ]
    )
