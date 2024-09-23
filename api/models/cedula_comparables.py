from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .. import database
from ..middlewares.database import Template


class Model(database.BASE):
    """Cedula Comparables model"""

    __tablename__ = "cedula_comparable"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    tipo = Column(String)
    id_cedula_mercado = Column(
        Integer,
        # ForeignKey("_CedulaMercado.id"),
    )
    id_comparable_catcom = Column(
        Integer,
        # ForeignKey("_ComparablesCatCom.id"),
    )
    # zoom = Column(Integer, default=1)
    # margin_left = Column(Integer, default=0)
    # margin_right = Column(Integer, default=0)
    # margin_top = Column(Integer, default=0)
    # margin_bottom = Column(Integer, default=0)
    # dpi = Column(Integer, default=300)

    # cedula_mercado = relationship(
    #     "_CedulaMercado",
    #     primaryjoin="Model.id_cedula_mercado == _CedulaMercado.id",
    # )
    # comparable_catcom = relationship(
    #     "_ComparablesCatCom", primaryjoin="_ComparablesCatCom.id==_ComparablesCatCom.id"
    # )

    def __init__(self, **kwargs: dict) -> None:
        """Constructor de la tabla para el calculo del valor unitario de construccion.

        Args:
            collection (dict): data array with the values to be added
        Returns:
            None
        """
        for key, value in kwargs.items():
            setattr(self, key, value)


class CedulaComparables(Template):
    def __init__(self, db) -> None:
        super().__init__(Model, db)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
