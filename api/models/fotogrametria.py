from datetime import datetime
from typing import Any, Dict, Optional

from geoalchemy2 import WKBElement
from geoalchemy2.types import Geometry
from shapely.geometry import shape
from sqlalchemy import Column, Float
from sqlmodel import Field, Session, SQLModel

from ..middlewares.database import Template
from . import response_model


class AreaEstudioModel(SQLModel):
    __tablename__ = "area_de_estudio"

    id: Optional[int] = Field(default=None, primary_key=True)
    geom: Any = Field(sa_column=Column(Geometry("MULTIPOLYGON")), default=None)
    nombre: str = Field(default=None)
    sup_elipso: float = Field(default=None, sa_column=Float(precision=70))
    sup_has: float = Field(default=None, sa_column=Float(precision=70))
    nota: str = Field(default=None)


class CurvasNivelModel(SQLModel):
    __tablename__ = "curvas_nivel"

    id: Optional[int] = Field(default=None, primary_key=True)
    geom: Any = Field(sa_column=Column(Geometry("MULTILINESTRING")), default=None)
    geografica: str = Field(default=None)
    elevacion: float = Field(default=None, sa_column=Float(precision=70))
    tipo: str = Field(default=None)
    codigo: str = Field(default=None)
    carta: str = Field(default=None)
    identica: str = Field(default=None)
    objectid: int = Field(default=None)
    st_length_: float = Field(default=None, sa_column=Float(precision=70))


class EstacionesVueloModel(SQLModel):
    __tablename__ = "estaciones_vuelo"

    id: Optional[int] = Field(default=None, primary_key=True)
    geom: Any = Field(sa_column=Column(Geometry("POINT")), default=None)
    poligonos: str = Field(default=None)
    estacion: str = Field(default=None)
    etapa: str = Field(default=None)


class MatrizVueloModel(SQLModel):
    __tablename__ = "matriz_vuelo"

    id: Optional[int] = Field(default=None, primary_key=True)
    geom: Any = Field(sa_column=Column(Geometry("POLYGON")), default=None)
    municipio: str = Field(default=None)
    localidad: str = Field(default=None)
    sup_has: float = Field(default=None, sa_column=Float(precision=70))
    nombre: str = Field(default=None)
    etapa: str = Field(default=None)


class PuntosControlModel(SQLModel):
    __tablename__ = "puntos_control"
    id: Optional[int] = Field(default=None, primary_key=True)
    geom: Any = Field(sa_column=Column(Geometry("POINT")), default=None)
    municipio: str = Field(default=None)
    punto: str = Field(default=None)
    etapa: str = Field(default=None)


class PuntosControllGNSSModel(SQLModel):
    __tablename__ = "puntos_control_gnss"

    id: Optional[int] = Field(default=None, primary_key=True)
    geom: Any = Field(sa_column=Column(Geometry("POINT")), default=None)
    pto: str = Field(default=None)
    x: str = Field(default=None)
    y: str = Field(default=None)
    z: str = Field(default=None)
    etapa: str = Field(default=None)


class UbicacionEstacionesVueloModel(SQLModel):
    id: Optional[int] = Field(default=None, primary_key=True)
    geom: Any = Field(sa_column=Column(Geometry("POINT")), default=None)
    poligonos: str = Field(default=None)
    etapa: str = Field(default=None)
    ubicacion: str = Field(default=None)
    latlong: str = Field(default=None)


class Fotogrametria:
    def __init__(self):
        self.schemas: dict = dict(
            Abasolo=self.Abasolo,
            Coroneo=self.Coroneo,
            Cueramaro=self.Cueramaro,
            Dr_Mora=self.DrMora,
            Guanajuato=self.Guanajuato,
            Huanimaro=self.Huanimaro,
            Irapuato=self.Irapuato,
            Juventino_Rosas=self.JuventinoRosas,
            Moroleon=self.Moroleon,
            Penjamo=self.Penjamo,
            Romita=self.Romita,
            Salamanca=self.Salamanca,
            San_Luis=self.SanLuis,
            San_Miguel_Allende=self.SanMiguelAllende,
            Santa_Catarina=self.SantaCatarina,
            Tarandacuao=self.Tarandacuao,
            Uriangato=self.Uriangato,
            Xichu=self.Xichu,
        )

    class Abasolo:
        def __init__(self):
            self.tables: dict = dict(
                area_estudio=self.AreaEstudio,
                curvas_nivel=self.CurvasNivel,
                estaciones_vuelo=self.EstacionesVuelo,
                matriz_vuelo=self.MatrizVuelo,
                puntos_control=self.PuntosControl,
                puntos_control_gnss=self.PuntosControlGNSS,
            )

        class AreaEstudio(Template):
            def __init__(self, Session: Session):
                class Model(AreaEstudioModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "abasolo"}

                super().__init__(Model=Model, Session=Session)

        class CurvasNivel(Template):
            def __init__(self, Session: Session):
                class Model(CurvasNivelModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "abasolo"}

                super().__init__(Model=Model, Session=Session)

        class EstacionesVuelo(Template):
            def __init__(self, Session: Session):
                class Model(EstacionesVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "abasolo"}

                super().__init__(Model=Model, Session=Session)

        class MatrizVuelo(Template):
            def __init__(self, Session: Session):
                class Model(MatrizVueloModel, table=True):
                    __tablename__ = "matriz_de_vuelo"
                    __table_args__ = {"extend_existing": True, "schema": "abasolo"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControl(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControlModel, table=True):
                    __tablename__ = "puntos_control_abasolo"
                    __table_args__ = {"extend_existing": True, "schema": "abasolo"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControlGNSS(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControllGNSSModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "abasolo"}
                    punto: str = Field(default=None)

                super().__init__(Model=Model, Session=Session)

    class Coroneo:

        class AreaEstudio(Template):
            def __init__(self, Session: Session):
                class Model(AreaEstudioModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "coroneo"}

                super().__init__(Model=Model, Session=Session)

        class CurvasNivel(Template):
            def __init__(self, Session: Session):
                class Model(CurvasNivelModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "coroneo"}

                super().__init__(Model=Model, Session=Session)

        class EstacionesVuelo(Template):
            def __init__(self, Session: Session):
                class Model(EstacionesVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "coroneo"}

                super().__init__(Model=Model, Session=Session)

        class MatrizVuelo(Template):
            def __init__(self, Session: Session):
                class Model(MatrizVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "coroneo"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControl(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControlModel, table=True):
                    __tablename__ = "puntos_control_coroneo"
                    __table_args__ = {"extend_existing": True, "schema": "coroneo"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControlGNSS(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControllGNSSModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "coroneo"}

                super().__init__(Model=Model, Session=Session)

        class AreaTotalEstudio2023:
            def __init__(self, Session: Session) -> None:
                class Model(SQLModel, table=True):
                    fid: int = Field(default=None, primary_key=True)
                    geom: Any = Field(sa_column=Column(Geometry("POINT")), default=None)
                    id: Optional[int] = Field(default=None)
                    nombre: str = Field(default=None)
                    sup_has: float = Field(default=None, sa_column=Float(precision=70))

                super().__init__(Model=Model, Session=Session)

    class Cueramaro:

        class AreaEstudio(Template):
            def __init__(self, Session: Session):
                class Model(AreaEstudioModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "cueramaro"}

                super().__init__(Model=Model, Session=Session)

        class CurvasNivel(Template):
            def __init__(self, Session: Session):
                class Model(CurvasNivelModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "cueramaro"}

                super().__init__(Model=Model, Session=Session)

        class EstacionesVuelo(Template):
            def __init__(self, Session: Session):
                class Model(EstacionesVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "cueramaro"}

                super().__init__(Model=Model, Session=Session)

        class MatrizVuelo(Template):
            def __init__(self, Session: Session):
                class Model(MatrizVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "cueramaro"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControl(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControlModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "cueramaro"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControlGNSS(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControllGNSSModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "cueramaro"}

                super().__init__(Model=Model, Session=Session)

    class DrMora:

        class AreaEstudio(Template):
            def __init__(self, Session: Session):
                class Model(AreaEstudioModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "drmora"}

                super().__init__(Model=Model, Session=Session)

        class CurvasNivel(Template):
            def __init__(self, Session: Session):
                class Model(CurvasNivelModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "drmora"}

                super().__init__(Model=Model, Session=Session)

        class EstacionesVuelo(Template):
            def __init__(self, Session: Session):
                class Model(EstacionesVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "drmora"}

                super().__init__(Model=Model, Session=Session)

        class MatrizVuelo(Template):
            def __init__(self, Session: Session):
                class Model(MatrizVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "drmora"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControl(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControlModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "drmora"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControlGNSS(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControllGNSSModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "drmora"}

                super().__init__(Model=Model, Session=Session)

        class UbicacionEstacionesVuelo(Template):
            def __init__(self, Session: Session):
                class Model(UbicacionEstacionesVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "drmora"}

                super().__init__(Model=Model, Session=Session)

    class Guanajuato:

        class AreaEstudio(Template):
            def __init__(self, Session: Session):
                class Model(AreaEstudioModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "guanajuato"}

                super().__init__(Model=Model, Session=Session)

        class MatrizVuelo(Template):
            def __init__(self, Session: Session):
                class Model(MatrizVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "guanajuato"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControl(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControlModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "guanajuato"}

                super().__init__(Model=Model, Session=Session)

    class Huanimaro:

        class AreaEstudio(Template):
            def __init__(self, Session: Session):
                class Model(AreaEstudioModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "huanimaro"}

                super().__init__(Model=Model, Session=Session)

        class CurvasNivel(Template):
            def __init__(self, Session: Session):
                class Model(CurvasNivelModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "huanimaro"}

                super().__init__(Model=Model, Session=Session)

        class EstacionesVuelo(Template):
            def __init__(self, Session: Session):
                class Model(EstacionesVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "huanimaro"}

                super().__init__(Model=Model, Session=Session)

        class MatrizVuelo(Template):
            def __init__(self, Session: Session):
                class Model(MatrizVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "huanimaro"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControlGNSS(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControllGNSSModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "huanimaro"}

                super().__init__(Model=Model, Session=Session)

    class Irapuato:
        def __init__(self):
            self.tables: dict = dict(
                area_estudio=self.AreaEstudio,
                curvas_nivel=self.CurvasNivel,
                estaciones_vuelo=self.EstacionesVuelo,
                matriz_vuelo=self.MatrizVuelo,
                puntos_control=self.PuntosControl,
                puntos_control_gnss=self.PuntosControlGNSS,
            )

        class AreaEstudio(Template):
            def __init__(self, Session: Session):
                class Model(SQLModel, table=True):

                    __tablename__ = "area_de_estudio"
                    __table_args__ = {"extend_existing": True, "schema": "irapuato"}
                    id: Optional[int] = Field(default=None, primary_key=True)
                    geom: Any = Field(
                        sa_column=Column(Geometry("MULTIPOLYGON")), default=None
                    )
                    claveinegi: str = Field(default=None)
                    estado: str = Field(default=None)
                    region_cat: str = Field(default=None)
                    municipio: str = Field(default=None)
                    zona_catas: str = Field(default=None)
                    localidad: str = Field(default=None)
                    sector_cat: str = Field(default=None)
                    area: float = Field(default=None, sa_column=Float(precision=70))
                    area_ha: float = Field(default=None, sa_column=Float(precision=70))

                super().__init__(Model=Model, Session=Session)

        class CurvasNivel(Template):
            def __init__(self, Session: Session):
                class Model(CurvasNivelModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "irapuato"}

                super().__init__(Model=Model, Session=Session)

        class EstacionesVuelo(Template):
            def __init__(self, Session: Session):
                class Model(EstacionesVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "irapuato"}

                super().__init__(Model=Model, Session=Session)

        class MatrizVuelo(Template):
            def __init__(self, Session: Session):
                class Model(MatrizVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "irapuato"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControl(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControlModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "irapuato"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControlGNSS(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControllGNSSModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "irapuato"}
                    pto: str = Field(default=None)

                super().__init__(Model=Model, Session=Session)

    class JuventinoRosas:

        class AreaEstudio(Template):
            def __init__(self, Session: Session):
                class Model(AreaEstudioModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "irapuato"}

                super().__init__(Model=Model, Session=Session)

        class CurvasNivel(Template):
            def __init__(self, Session: Session):
                class Model(CurvasNivelModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "irapuato"}

                super().__init__(Model=Model, Session=Session)

        class EstacionesVuelo(Template):
            def __init__(self, Session: Session):
                class Model(EstacionesVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "irapuato"}

                super().__init__(Model=Model, Session=Session)

        class MatrizVuelo(Template):
            def __init__(self, Session: Session):
                class Model(MatrizVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "irapuato"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControl(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControlModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "irapuato"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControlGNSS(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControllGNSSModel, table=True):
                    __tablename__ = "puntos_controlGNSS"
                    __table_args__ = {"extend_existing": True, "schema": "irapuato"}

                super().__init__(Model=Model, Session=Session)

    class Moroleon:

        class AreaEstudio(Template):
            def __init__(self, Session: Session):
                class Model(AreaEstudioModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "moroleon"}

                super().__init__(Model=Model, Session=Session)

        class CurvasNivel(Template):
            def __init__(self, Session: Session):
                class Model(CurvasNivelModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "moroleon"}

                super().__init__(Model=Model, Session=Session)

        class EstacionesVuelo(Template):
            def __init__(self, Session: Session):
                class Model(EstacionesVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "moroleon"}

                super().__init__(Model=Model, Session=Session)

        class MatrizVuelo(Template):
            def __init__(self, Session: Session):
                class Model(MatrizVueloModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "moroleon"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControl(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControlModel, table=True):
                    __table_args__ = {"extend_existing": True, "schema": "moroleon"}

                super().__init__(Model=Model, Session=Session)

        class PuntosControlGNSS(Template):
            def __init__(self, Session: Session):
                class Model(PuntosControllGNSSModel, table=True):
                    __tablename__ = "puntos_controlGNSS"
                    __table_args__ = {"extend_existing": True, "schema": "moroleon"}

                super().__init__(Model=Model, Session=Session)

    class Penjamo:
        pass

    class Romita:
        pass

    class Salamanca:
        pass

    class SanLuis:
        pass

    class SanMiguelAllende:
        pass

    class SantaCatarina:
        pass

    class Tarandacuao:
        pass

    class Uriangato:
        pass

    class Xichu:
        pass
