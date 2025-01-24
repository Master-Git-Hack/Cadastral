from datetime import datetime
from typing import Any, Dict, Optional, List
from xml.etree.ElementTree import fromstring, parse

from geoalchemy2 import WKBElement
from geoalchemy2.types import Geometry
from shapely.geometry import shape
from sqlalchemy import (
    ARRAY,
    Column,
    DateTime,
    Float,
    Index,
    Integer,
    PrimaryKeyConstraint,
    String,
    UniqueConstraint,
    create_engine,
    Boolean,
    text,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlmodel import Field, Session, SQLModel

from .. import config, database
from ..middlewares.database import Template
from . import response_model

from pydantic import BaseModel, validator
from typing import List, Optional


class Config:
    arbitrary_types_allowed = True


# O utiliza validadores explícitos
@validator("categories", pre=True, always=True)
def validate_categories(cls, value):
    if isinstance(value, str):
        return value.split(",")  # Ejemplo para convertir cadenas en listas
    return value


class Model(SQLModel, table=True):
    __tablename__ = "dataset"
    __table_args__ = {"schema": "pgmetadata"}

    id: Optional[int] = Field(sa_column=Column(Integer, primary_key=True))
    uid: str = Field(
        sa_column=Column(
            UUID, server_default=text("public.uuid_generate_v4()"), nullable=False
        )
    )
    table_name: str = Field(sa_column=Column(String, nullable=False))
    schema_name: str = Field(sa_column=Column(String, nullable=False))
    categories: List[str] = Field(
        sa_column=Column(ARRAY(String), nullable=True)
    )  # delete
    minimum_optimal_scale: int = Field(sa_column=Column(Integer, nullable=True))
    maximum_optimal_scale: int = Field(sa_column=Column(Integer, nullable=True))
    license: str = Field(sa_column=Column(String, nullable=True))
    confidentiality: str = Field(sa_column=Column(String, nullable=True))
    feature_count: int = Field(sa_column=Column(Integer, nullable=True))
    geometry_type: str = Field(sa_column=Column(String, nullable=True))
    projection_name: str = Field(sa_column=Column(String, nullable=True))
    projection_authid: str = Field(sa_column=Column(String, nullable=True))
    spatial_extent: str = Field(sa_column=Column(String, nullable=True))
    update_date: datetime = Field(
        sa_column=Column(DateTime, default=datetime.now, nullable=False)
    )
    geom: Optional[Any] = Field(
        sa_column=Column(Geometry("POLYGON", srid=4326), nullable=True)
    )
    # newones---------------------------------------------------------------------
    db_name: str = Field(sa_column=Column(String, nullable=True))
    username: str = Field(sa_column=Column(String, nullable=True))
    # mod---------------------------------------------------------------------
    title: str = Field(
        sa_column=Column(
            String,
            nullable=False,
            comment="1.1	Título del conjunto de datos espaciales o  producto (O) | previous pg_metadata: title",
        )
    )
    purpose: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="1.3	Descripción del conjunto de datos espaciales o producto (O) | previous pg_metadata: purpose",
        )
    )
    abstract: str = Field(
        sa_column=Column(String, nullable=False, comment="1.3	Resumen (O)")
    )
    md_dataidentification_language = Field(
        sa_column=Column(String, comment="1.4	Idioma (O)", default="ES-Español.")
    )
    topiccategory: List[str] = Field(
        sa_column=Column(
            ARRAY(String),
            nullable=True,
            comment="1.5.1	Tema principal del conjunto de datos espaciales o producto (O, repetible)",
        )
    )
    groupcategory: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="1.5.2	Grupo de temas del conjunto de datos espaciales o producto (O, repetible)",
        )
    )
    keyword: List[str] = Field(
        sa_column=Column(
            ARRAY(String),
            nullable=True,
            comment="1.6	Palabras clave (O, repetible) | previous pg_metadata: keywords",
            name="keywords",
        )
    )
    presentationform: List[str] = Field(
        sa_column=Column(
            ARRAY(String),
            nullable=True,
            comment="1.10	Forma de presentación de los datos espaciales (O, repetible)",
        )
    )
    ci_onlineresource_linkage: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="1.11.1	URL del recurso (O)",
        )
    )
    ci_onlineresource_description: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="1.11.2	Descripción del acceso al recurso (Opc)",
        )
    )
    maintenanceandupdatefrequency: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="1.12	Frecuencia de mantenimiento y actualización (O) | previous pg_metadata: maintenance_frequency",
            name="publication_frequency",
        )
    )
    md_dataidentification_characterset: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="1.13	Conjunto de caracteres (O) | 9.6 Conjunto de caracteres",
            default="4. Utf8. Formato de Transferencia UCS de tamaño variable de 8-bit, basado en ISO/IEC 10646.",
        )
    )
    specuse: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="1.15	Uso especifico (O)",
        )
    )
    date: datetime = Field(
        sa_column=Column(
            DateTime,
            nullable=True,
            comment="2.1.1	Fecha de referencia del conjunto de datos espaciales o producto (O)",
            default=datetime.now,
        )
    )
    datetype: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="2.1.2	Tipo de fecha(O)",
        )
    )
    date_creation: datetime = Field(
        sa_column=Column(
            DateTime,
            default=datetime.now,
            nullable=False,
            comment="2.2.1	Fecha de creación de los insumos (O)| previous pg_metadata: creation_date",
            name="creation_date",
        )
    )
    inpname: str = Field(
        sa_column=Column(
            String, nullable=True, comment="2.2.2	Nombre del insumo (O)", name="inpname"
        )
    )
    ci_responsibleparty_individualname: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="3.1	Nombre de la persona de contacto (C)",
        )
    )
    ci_responsibleparty_organisationname: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="3.2	Nombre de la organización de contacto (C)",
        )
    )
    ci_responsibleparty_positionname: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="3.3	Cargo de la persona de contacto (C)",
        )
    )
    ci_responsibleparty_voice: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="3.4	Teléfono (Opc, repetible) | 9.4.4	Teléfono (Opc, repetible)",
        )
    )
    ci_responsibleparty_administrativearea: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="3.8	Área administrativa (Opc) | 9.4.8	Área administrativa (Opc)",
        )
    )
    ci_responsibleparty_linkage: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="3.12	Enlace en línea (dirección de Internet de referencia) (O)",
        )
    )
    ci_responsibleparty_role: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="3.13	Rol (O)",
        )
    )
    westboundlongitude: float = Field(
        sa_column=Column(
            Float,
            nullable=True,
            comment="4.1.1	Coordenada límite al Oeste (O)",
        )
    )
    eastboundlongitude: float = Field(
        sa_column=Column(
            Float,
            nullable=True,
            comment="4.1.2	Coordenada límite al Este (O)",
        )
    )
    southboundlatitude: float = Field(
        sa_column=Column(
            Float,
            nullable=True,
            comment="4.1.3	Coordenada límite al Sur (O)",
        )
    )
    northboundlatitude: float = Field(
        sa_column=Column(
            Float,
            nullable=True,
            comment="4.1.4	Coordenada límite al Norte (O)",
        )
    )
    spatialrepresentationtype: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="4.2	Tipo de representación espacial (O, repetible)",
        )
    )
    utm_zone: int = Field(
        sa_column=Column(
            Integer,
            default=14,
            comment="5.1.2.2.1.1 Número de zona UTM",
        )
    )
    utm_sfctrmer: float = Field(
        sa_column=Column(
            Float,
            nullable=True,
            comment="5.1.2.2.1.2 Factor de escala en el meridiano central",
        )
    )
    utm_longcm: float = Field(
        sa_column=Column(
            Float,
            nullable=True,
            comment="5.1.2.2.1.3 Longitud del meridiano central",
        )
    )
    utm_latprjo: float = Field(
        sa_column=Column(
            Float, nullable=True, comment="5.1.2.2.1.4 Latitud del origen de proyección"
        )
    )
    utm_feast: float = Field(
        sa_column=Column(Float, nullable=True, comment="5.1.2.2.1.5 Falso este")
    )
    utm_fnorth: float = Field(
        sa_column=Column(Float, nullable=True, comment="5.1.2.2.1.6 Falso norte")
    )
    horizdn: str = Field(
        sa_column=Column(
            String, nullable=True, comment="5.1.4.1 Nombre del datum horizontal"
        )
    )
    ellips: str = Field(
        sa_column=Column(String, nullable=True, comment="5.1.4.2 Nombre del elipsoide")
    )
    semiaxis: str = Field(
        sa_column=Column(Float, nullable=True, comment="5.1.4.3 Semieje mayor")
    )
    denflat: float = Field(
        sa_column=Column(
            Float,
            nullable=True,
            comment="5.1.4.4 Factor de denominador de achatamiento",
        )
    )
    level: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            name="spatial_level",
            comment="6.1.1 Nivel (O) | previous pg_metadata: spatial_level",
        )
    )
    li_source_description: Optional[str] = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="6.3.1 Enunciado (C)",
            name="statement",  # Column name in the database
        )
    )
    li_processstep_description: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="6.3.2.1	Descripción del proceso (O)",
        )
    )
    schemaascii: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="7.1	Descripción general de entidades y atributos",
        )
    )
    entity_detail: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="7.2	Cita del detalle de entidades y atributos",
        )
    )
    accessconstraints: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="8.1	Restricciones de acceso (Opc, repetible)",
        )
    )
    useconstraints: List[str] = Field(
        sa_column=Column(
            ARRAY(String),
            nullable=True,
            comment="8.2	Restricciones de uso (Opc, repetible)",
        )
    )
    otherconstraints: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="8.3	Responsabilidad de distribución (Opc, repetible)",
        )
    )
    metadatastandardname: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="9.1	Nombre del estándar de metadatos (O)",
        )
    )
    inf_metadata_ci_responsibleparty_organisationname: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="9.4.2	Nombre de la organización (C)",
        )
    )
    inf_metadata_ci_responsibleparty_voice: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="9.4.4	Teléfono (Opc, repetible)",
        )
    )
    ci_responsibleparty_deliverypoint: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="9.4.6	Dirección (Opc)",
        )
    )
    ci_responsibleparty_city: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            default="Guanaajuato",
            comment="9.4.7	Ciudad (Opc)",
        )
    )
    ci_responsibleparty_postalcode: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="9.4.9	Código postal (Opc)",
        )
    )
    ci_responsibleparty_country: str = Field(
        sa_column=Column(String, comment="9.4.10	País (Opc)", default="México")
    )
    ci_responsibleparty_electronicmailaddress: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="9.4.11	Dirección de correo electrónico del contacto (Opc, repetible)",
        )
    )
    inf_metadata_ci_responsibleparty_role: str = Field(
        sa_column=Column(
            String,
            nullable=True,
            comment="9.4.12	Rol (O)",
        )
    )
    datestamp: datetime = Field(
        sa_column=Column(
            DateTime, default=datetime.now, nullable=True, name="publication_date"
        )
    )
    metadata_xml: str = Field(
        sa_column=Column(String, comment="XML document containing the entire metadata")
    )
    themes: List[str] = Field(sa_column=Column(ARRAY(String), comment="List of themes"))
    parent_id: Optional[int] = Field(default=None, foreign_key="pgmetadata.dataset.id")
    version: int = Field(
        default=1, sa_column=Column(Integer, nullable=False, default=1)
    )
    is_latest: bool = Field(
        default=True, sa_column=Column(Boolean, nullable=False, default=True)
    )

    class Config:
        arbitrary_types_allowed = True


class Dataset(Template):
    response_model = response_model(Model=Model)

    def __init__(self, Session: Session) -> None:
        super().__init__(Model=Model, Session=Session)
