"""Model for Costos Construccion"""

from sqlalchemy import Boolean, Column, Float, Integer, String, Text

from .... import db, ma


class CostosConstruccion(db.Model):
    """Model for Costos Construccion"""

    __tablename__ = "calculo_valor_unitario_construccion"

    id = Column(Integer, primary_key=True)
    descripcion = Column(Text)
    costo_directo = Column(Float)
    indirectos = Column(Float)
    valor_neto = Column(Float)
    m2 = Column(Float)
    factor_gto = Column(Boolean, unique=False, default=False, nullable=False)
    valor_resultante = Column(Float)
    total = Column(Float)
    tipo_servicio = Column(String())
    registro = Column(String())
    redondeo = Column(Integer, default=0)

    def __init__(self, collection: dict) -> None:
        """Constructor de la tabla para el calculo del valor unitario de construccion.

        Args:
            collection (dict): data array with the values to be added
        Returns:
            None
        """
        self.descripcion = collection["descripcion"]
        self.costo_directo = collection["costo_directo"]
        self.indirectos = collection["indirectos"]
        self.valor_neto = collection["valor_neto"]
        self.m2 = collection["m2"]
        self.factor_gto = collection["factor_gto"]
        self.valor_resultante = collection["valor_resultante"]
        self.total = collection["total"]
        self.tipo_servicio = collection["tipo_servicio"]
        self.registro = collection["registro"]
        self.redondeo = collection["redondeo"]


db.create_all()


class CostoConstuccionSchema(ma.Schema):
    """Class for serializing costo constuccion data"""

    fields = (
        "id",
        "descripcion",
        "costo_directo",
        "indirectos",
        "valor_neto",
        "valor_neto",
        "m2",
        "valor_resultante",
        "total",
        "tipo_servicio",
        "registro",
        "redondeo",
    )


costoConstuccionSchema = CostoConstuccionSchema()
