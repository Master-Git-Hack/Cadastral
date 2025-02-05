from typing import Optional

from sqlmodel import Field, Session, SQLModel

from ..middlewares.database import Template
from . import response_model


class Model(SQLModel, table=True):
    __tablename__ = "indicadores_municipales"
    id: Optional[int] = Field(
        default=None, primary_key=True, sa_column_kwargs={"autoincrement": True}
    )
    municipio: str = Field(default=None)
    poblacion_total: int = Field(default=None)
    densidad_poblacion: float = Field(default=None)
    pob_econom_activa: int = Field(default=None)
    viviendas_habitadas: int = Field(default=None)
    anualidad_censo: int = Field(default=None)
    porcentaje: float = Field(default=None)


class IndicadoresMunicipales(Template):
    response_model = response_model(Model=Model)

    def __init__(self, Session: Session) -> None:
        super().__init__(Model=Model, Session=Session)
