"""File to use Indicadores Municipales model as reference"""
from flask_restx.fields import Float, Integer, List, Nested, String

from .homologacion import Homologacion

indicadores_municapales_model = Homologacion.ns.model(
    "Indicadores Municipales",
    dict(
        data=List(
            Nested(
                Homologacion.ns.model(
                    "Estructura de Datos de los Indicadores Municipales",
                    dict(
                        id=Integer(description="ID del Indicador", example=1),
                        name=String(
                            description="Nombre del Municipio", example="Guanajuato"
                        ),
                        totalPopulation=Float(
                            description="Poblacion Total", example=0.0
                        ),
                        percentage=Float(
                            description="Porcentaje de poblacion", example=0.0
                        ),
                        populationDensity=Float(
                            description="Densidad de Poblacion", example=0.0
                        ),
                        economicallyActivePopulation=Float(
                            description="Poblacion Economicamente Activa", example=0.0
                        ),
                        inhabitedDwellings=Float(
                            description="Numero de vivendas habitadas", example=0.0
                        ),
                        annualCensus=String(
                            description="Año del censo", example="2020"
                        ),
                    ),
                )
            )
        )
    ),
)
