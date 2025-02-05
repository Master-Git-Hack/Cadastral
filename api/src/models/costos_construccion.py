from typing import Optional

from sqlmodel import Field, Session, SQLModel

from ..middlewares.database import Template
from . import response_model


class Model(SQLModel, table=True):
    __tablename__ = "calculo_valor_unitario_construccion"
    id: Optional[int] = Field(
        default=None, primary_key=True, sa_column_kwargs={"autoincrement": True}
    )
    descripcion: str = Field(default=None)
    costo_directo: float = Field(default=None)
    indirectos: float = Field(default=None)
    valor_neto: float = Field(default=None)
    m2: float = Field(default=None)
    factor_gto: bool = Field(default=False)
    valor_resultante: float = Field(default=None)
    total: float = Field(default=None)
    tipo_servicio: str = Field(default=None)
    registro: str = Field(default=None)
    redondeo: int = Field(default=0)


class CostosConstruccion(Template):
    response_model = response_model(Model=Model)

    def __init__(self, Session: Session) -> None:
        super().__init__(Model=Model, Session=Session)
