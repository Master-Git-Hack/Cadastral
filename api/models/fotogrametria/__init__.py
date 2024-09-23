from typing import Any, Dict

from geoalchemy2.types import Geometry
from sqlalchemy import BigInteger, Column, Date, Float, Integer, SmallInteger, String

from ... import database
from ...middlewares.database import Template


class AreaEstudioModel(database.BASE):
    id = Column(
        Integer,
        primary_key=True,
    )
    geom = Column(
        Geometry("POINT", 32614, from_text="ST_GeomFromEWKT", name="geometry"),
        index=True,
    )
    nombre = Column(String)
    sup_elipso = Column(Float)
    sup_has = Column(Float)
    nota = Column(String)


class CurvasNivelModel(database.BASE):
    id = Column(
        Integer,
        primary_key=True,
    )
    geom = Column(
        Geometry("LINESTRING", 32614, from_text="ST_GeomFromEWKT", name="geometry"),
        index=True,
    )
    geografica = Column(String)
    elevacion = Column(Float)
    tipo = Column(String)
    codigo = Column(String)
    carta = Column(String)
    identica = Column(String)
    objectid = Column(Integer)
    st_length_ = Column(Float)


class EstacionesVueloModel(database.BASE):
    id = Column(
        Integer,
        primary_key=True,
    )
    geom = Column(
        Geometry("POINT", 32614, from_text="ST_GeomFromEWKT", name="geometry"),
        index=True,
    )
    poligonos = Column(String)
    estacion = Column(String)
    etapa = Column(String)


class MatrizVueloModel(database.BASE):
    id = Column(
        Integer,
        primary_key=True,
    )
    geom = Column(
        Geometry("POINT", 32614, from_text="ST_GeomFromEWKT", name="geometry"),
        index=True,
    )
    municipio = Column(String)
    localidad = Column(String)
    sup_has = Column(Float)
    nombre = Column(String)
    etapa = Column(String)


class PuntosControlModel(database.BASE):
    id = Column(
        Integer,
        primary_key=True,
    )
    geom = Column(
        Geometry("POINT", 32614, from_text="ST_GeomFromEWKT", name="geometry"),
        index=True,
    )
    municipio = Column(String)
    punto = Column(String)
    etapa = Column(String)


class PuntoControllGNSSModel(database.BASE):
    id = Column(
        Integer,
        primary_key=True,
    )
    geom = Column(
        Geometry("POINT", 32614, from_text="ST_GeomFromEWKT", name="geometry"),
        index=True,
    )
    pto = Column(String)
    x = Column(String)
    y = Column(String)
    z = Column(String)
    punto = Column(String)
    etapa = Column(String)
