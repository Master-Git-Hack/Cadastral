from datetime import datetime
from typing import Any, Dict
from xml.etree.ElementTree import fromstring, parse

from geoalchemy2.types import Geometry
from sqlalchemy import (
    ARRAY,
    Column,
    DateTime,
    Float,
    Index,
    Integer,
    PrimaryKeyConstraint,
    Text,
    UniqueConstraint,
    text,
)
from sqlalchemy.dialects.postgresql import UUID

from .. import config
from . import Base

__db = config.db


class Model(__db.Model):
    __tablename__ = "dataset"
    __table_args__ = (
        PrimaryKeyConstraint("id", name="dataset_pkey"),
        UniqueConstraint(
            "table_name", "schema_name", name="dataset_table_name_schema_name_key"
        ),
        UniqueConstraint("uid", name="dataset_uid_key"),
        Index("dataset_id_idx", "id"),
        {
            "comment": "Main table for storing dataset about PostgreSQL vector layers.",
            "schema": "pgmetadata",
        },
    )

    id = Column(Integer, comment="Internal automatic integer ID")
    uid = Column(
        UUID,
        nullable=False,
        server_default=text("uuid_generate_v4()"),
        comment="Unique identifier of the data. E.g. 89e3dde9-3850-c211-5045-b5b09aa1da9a",
    )
    table_name = Column(
        Text, nullable=False, comment="Name of the related table in the database"
    )
    schema_name = Column(
        Text, nullable=False, comment="Name of the related schema in the database"
    )
    title = Column(
        Text,
        nullable=False,
        comment="1.1 Título del conjunto de datos espaciales o producto",
    )
    purpose = Column(Text, comment="1.2 Propósito")
    abstract = Column(
        Text,
        nullable=False,
        comment="1.3 Descripción del conjunto de datos espaciales o producto",
    )
    MD_DataIdentification_language = Column(
        Text,
        name="md_dataidentification_language",
        comment="1.4 Idioma del conjunto de datos espaciales o producto",
    )
    topicCategory = Column(
        Text,
        name="topiccategory",
        comment="1.5.1 Tema principal del conjunto de datos espaciales o producto",
    )
    groupCategory = Column(
        Text,
        name="groupcategory",
        comment="1.5.2 Grupo de datos del conjunto de datos espaciales o producto",
    )
    keyword = Column(
        Text,
        comment="1.6 Palabra clave  List of keywords separated by comma. Ex: environment, paris, trees",
    )
    presentationForm = Column(
        Text,
        name="presentationform",
        comment="1.10 Forma de presentación de los datos espaciales",
    )
    CI_OnlineResource_linkage = Column(
        Text, name="ci_onlineresource_linkage", comment="1.11.1 URL del recurso"
    )
    maintenanceAndUpdateFrequency = Column(
        Text,
        name="maintenanceandupdatefrequency",
        comment="1.12 Frecuencia de mantenimiento y actualización",
    )
    MD_DataIdentification_characterSet = Column(
        Text,
        name="md_dataidentification_characterset",
        comment="1.13 Conjunto de caracteres",
    )

    specuse = Column(Text, comment="1.15 Uso específico")
    dateStamp = Column(
        DateTime,
        name="datestamp",
        comment="2.1.1 Fecha de referencia del conjunto de datos espaciales o producto",
    )
    dateType = Column(
        Text, name="datetype", comment="2.1.2 Tipo de fecha de referencia"
    )
    date_creation = Column(
        DateTime,
        default=datetime.now,
        comment="2.2.1 Fecha de creación de los insumos",
    )
    inpname = Column(Text, comment="2.2.4 Nombre del Insumo")
    CI_ResponsibleParty_individualName = Column(
        Text,
        name="ci_responsibleparty_individualname",
        comment="3.1 Nombre de la persona de contacto",
    )
    CI_ResponsibleParty_organisationName = Column(
        Text,
        name="ci_responsibleparty_organizationname",
        comment="3.2 Nombre de la Organización",
    )
    CI_ResponsibleParty_positionName = Column(
        Text, name="ci_responsibleparty_positionname", comment="3.3 Puesto del contacto"
    )
    CI_ResponsibleParty_linkage = Column(
        Text,
        name="ci_responsibleparty_linkage",
        comment="3.12 Enlace en línea (dirección de Internet de referencia)",
    )
    CI_ResponsibleParty_role = Column(
        Text, name="ci_responsibleparty_role", comment="3.13 Rol"
    )
    westBoundLongitude = Column(
        float8, name="west_boundlongitude", comment="4.1.1 Coordenada límite al Oeste"
    )
    eastBoundLongitude = Column(
        float8, name="eastboundlongitude", comment="4.1.2 Coordenada límite al Este"
    )
    southBoundLatitude = Column(
        float8, name="southboundlatitude", comment="4.1.3 Coordenada límite al Sur"
    )
    northBoundLatitude = Column(
        float8, name="nortbondlatitude", comment="4.1.4 Coordenada límite al Norte"
    )
    spatialRepresentationType = Column(
        Text,
        name="spatialrepresentationtype",
        comment="4.2 Tipo de representación espacial",
    )
    latres = Column(float8, comment="5.1.1.1 Resolución de latitud")
    longres = Column(float8, comment="5.1.1.2 Resolución de longitud")
    geogunit = Column(Text, comment="5.1.1.3 Unidades de coordenadas geográficas")
    lambertc_stdparll = Column(float8, comment="5.1.2.1.1.1 Paralelo estándar")
    lambertc_longcm = Column(
        float8,
        comment="5.1.2.1.1.2|5.1.2.1.2.2|5.1.2.1.3.3|5.1.2.1.4.2|5.1.2.2.1.3 Longitud del meridiano central",
    )
    mercatort_latprjo = Column(
        float8,
        comment="5.1.2.1.1.3|5.1.2.1.2.3|5.1.2.1.4.3|5.1.2.2.1.4 Latitud del origen de proyección",
    )
    mercator_feast = Column(
        float8,
        comment="5.1.2.1.1.4|5.1.2.1.2.4|5.1.2.1.3.4|5.1.2.1.4.4|5.1.2.2.1.5 Falso este",
    )
    mercator_fnorth = Column(
        float8,
        comment="5.1.2.1.1.5|5.1.2.1.2.5|5.1.2.1.3.5|5.1.2.1.4.5|5.1.2.2.1.6 Falso norte",
    )
    mercator_sfec = Column(
        float8,
        comment="5.1.2.1.2.1|5.1.2.1.4.1|5.1.2.2.1.2 Factor de escala en el meridiano central",
    )
    local_desc = Column(Text, comment="5.1.2.3.1 Descripción de la Plana Local")
    local_geo_inf = Column(
        Text, comment="5.1.2.3.2 Información de Georreferencia de la Plana Loca"
    )

    coord_repres = Column(
        Text, comment="5.1.2.3.4.1|5.1.2.3.4.2.1 Método codificado de coordenada plana"
    )
    ordres = Column(float8, comment="5.1.2.3.4.2.2.1 Resolución de abscisa")
    absres = Column(float8, comment="5.1.2.3.4.2.2.2 Resolución de ordenada")
    distance_res = Column(float8, comment="5.1.2.4.3.1 Resolución de distancia")
    bearing_res = Column(float8, comment="5.1.2.4.3.2 Resolución de rumbo")
    bearing_uni = Column(Text, comment="5.1.2.4.3.3 Unidades de rumbo")
    ref_bearing_dir = Column(
        Text, comment="5.1.2.4.3.4 Dirección del rumbo de referencia"
    )
    ref_bearing_mer = Column(
        Text, comment="5.1.2.4.3.5 Meridiano del rumbo de referencia"
    )
    plandu = Column(Text, comment="5.1.2.4.4 Unidades de distancia plana")
    local_desc = Column(Text, comment="5.1.3.1 Descripción Local")
    local_geo_inf = Column(
        Text, comment="5.1.3.2 Información de Georreferenciación Local"
    )
    horizdn = Column(Text, comment="5.1.4.1 Nombre del datum horizontal")
    ellips = Column(Text, comment="5.1.4.2 Nombre del elipsoide")
    semiaxis = Column(float8, comment="5.1.4.3 Semieje mayor")
    altenc = Column(Text, comment="5.2.1.1 Nombre del datum de altitud")
    categories = Column(ARRAY(Text()), comment="List of categories")
    altres = Column(float8, comment="5.2.1.2 Resolución de altitud")
    altunits = Column(Text, comment="5.2.1.3 Unidades de distancia de altitud")
    altdatum = Column(Text, comment="5.2.1.4 Método codificado de altitud")
    depthdn = Column(Text, comment="5.2.2.1 Nombre del datum de profundidad")
    depthres = Column(float8, comment="5.2.2.2 Resolución de profundidad")
    depthdu = Column(Text, comment="5.2.2.3 Unidades de distancia de profundidad")
    level = Column(Text, comment="6.1.1 Nivel")
    DQ_QuantitativeResult = Column(
        Text,
        name="dq_quantitativeresult",
        comment="6.2.1.1|6.2.3.1|6.2.4.1|6.2.5.1 Nombre del subcriterio de calidad evaluado",
    )
    DQ_Completeness_nameOfMeasure = Column(
        Text,
        name="dq_completeness_nameofmeasure",
        comment="6.2.2.1.1|6.2.3.1.1|6.2.4.1.1|6.2.5.1.1 Nombre de la prueba",
    )
    DQ_LogicConsistency_nameOfMeasure = Column(
        Text,
        name="dq_logicconsistency_nameofmeasure",
        comment="6.2.2.1.1|6.2.3.1.1|6.2.4.1.1|6.2.5.1.1 Nombre de la prueba",
    )
    PositionalAccuracy_nameOfMeasure = Column(
        Text,
        name="positionalaccuracy_nameofmeasure",
        comment="6.2.2.1.1|6.2.3.1.1|6.2.4.1.1|6.2.5.1.1 Nombre de la prueba",
    )
    TemporalAccuracy_nameOfMeasure = Column(
        Text,
        name="temporalaccuracy_nameofmeasure",
        comment="6.2.2.1.1|6.2.3.1.1|6.2.4.1.1|6.2.5.1.1 Nombre de la prueba",
    )
    ThematicAccuracy_nameOfMeasure = Column(
        Text,
        name="thematicaccuracy_nameofmeasure",
        comment="6.2.2.1.1|6.2.3.1.1|6.2.4.1.1|6.2.5.1.1 Nombre de la prueba",
    )
    DQ_Completeness_measureDescription = Column(
        Text,
        name="dq_completeness_measuredescription",
        comment="6.2.2.1.2|6.2.3.1.2|6.2.4.1.2|6.2.5.1.2 Descripción de la prueba",
    )
    DQ_LogicConsistency_measureDescription = Column(
        Text,
        name="dq_logicconsistency_measuredescription",
        comment="6.2.2.1.2|6.2.3.1.2|6.2.4.1.2|6.2.5.1.2 Descripción de la prueba",
    )
    PositionalAccuracy_measureDescription = Column(
        Text,
        name="positionalaccuracy_measuredescription",
        comment="6.2.2.1.2|6.2.3.1.2|6.2.4.1.2|6.2.5.1.2 Descripción de la prueba",
    )
    TemporalAccuracy_measureDescription = Column(
        Text,
        name="temporalaccuracy_measuredescription",
        comment="6.2.2.1.2|6.2.3.1.2|6.2.4.1.2|6.2.5.1.2 Descripción de la prueba",
    )
    ThematicAccuracy_measureDescription = Column(
        Text,
        name="themathicaccuracy_measuredescription",
        comment="6.2.2.1.2|6.2.3.1.2|6.2.4.1.2|6.2.5.1.2 Descripción de la prueba",
    )
    PositionalAccuracy_valueUnit = Column(
        Text,
        name="positionalaccuracy_valueunit",
        comment="6.2.2.1.3.1.1|6.2.3.1.3.1.1|6.2.4.1.3.1.1|6.2.5.1.3.1.1 Unidad de valor",
    )
    TemporalAccuracy_valueUnit = Column(
        Text,
        name="temporalaccuracy_valueunit",
        comment="6.2.2.1.3.1.1|6.2.3.1.3.1.1|6.2.4.1.3.1.1|6.2.5.1.3.1.1 Unidad de valor",
    )
    ThematicAccuracy_valueUnit = Column(
        Text,
        name="thematicaccuracy_valueunit",
        comment="6.2.2.1.3.1.1|6.2.3.1.3.1.1|6.2.4.1.3.1.1|6.2.5.1.3.1.1 Unidad de valor",
    )
    statement = Column(Text, comment="6.3.1 Enunciado")
    entity_detail = Column(
        Text, comment="7.1 Descripción general de entidades y atributos"
    )
    graphfilename = Column(
        Text, comment="7.2 Cita del detalle de entidades y atributos"
    )
    MD_Format = Column(Text, name="", comment="8.4.1 Nombre del formato")
    edition = Column(Text, comment="8.4.2 Versión del formato")
    metadataStandardName = Column(
        Text,
        name="metadatastandardname",
        comment="9.1 Nombre del estándar de metadatos",
    )
    metadataStandardVersion = Column(
        Text, name="metadatastandardversion", comment="9.3 Idioma de los Metadatos"
    )
    date = Column(DateTime, comment="9.5 Fecha")
    MD_ReferenceSystem = Column(
        Text,
        name="md_referencesystem",
        comment="Sistema de Referencia SI 4.2 es de tipo Vector/Raster/TIN",
    )
    geographicElement = Column(
        Text,
        name="geographicelement",
        comment="5.1.1 Coordenadas Geográficas Si 5.1.2 o 5.1.3 no se capturan",
    )
    planar = Column(
        Text, comment="5.1.2 Coordenadas Planas Si 5.1.1 o 5.1.3 no se capturan"
    )
    mapprojn = Column(
        Text,
        comment="5.1.2.1	Proyección Cartográfica Si 5.1.2.1 o 5.1.2.2 no se capturan",
    )
    gridcoordinatessystem = Column(
        Text, comment="5.1.2.3 Plana Local Si 5.1.2.1 o 5.1.2.2 no se capturan"
    )
    local_planar = Column(
        Text, comment="5.1.2.3 Plana Local Si 5.1.2.1 o 5.1.2.2 no se capturan"
    )
    coord_repres = Column(
        Text,
        comment="5.1.2.3.4.2|5.1.2.3.4.2.2 Representación de coordenadas Si 5.1.2.4.3 no se captura",
    )
    distance_and_bearing_repres = Column(
        Text,
        comment="5.1.2.4.3 Representación de distancia y rumbo Si 5.1.2.4.2 no se captura",
    )
    local_coordinates = Column(
        Text, comment="5.1.3 Coordenadas Locales Si 5.1.1 o 5.1.2 no se capturan"
    )
    denflat = Column(Text, comment="5.1.4.4 Factor de denominador de achatamiento")
    LI_ProcessStep = Column(
        Text, name="li_processtep", comment="6.3.2 Pasos del proceso"
    )
    LI_Source = Column(Text, name="li_source", comment="6.3.3 Fuente")

    spatial_level = Column(
        Text, comment="Spatial level of the data. E.g. city, country, street"
    )
    minimum_optimal_scale = Column(
        Integer,
        comment='Minimum optimal scale denominator to view the data. E.g. 100000 for 1/100000. Most "zoomed out".',
    )
    maximum_optimal_scale = Column(
        Integer,
        comment='Maximum optimal scale denominator to view the data. E.g. 2000 for 1/2000. Most "zoomed in".',
    )
    publication_date = Column(
        DateTime,
        default=datetime.now,
        comment="Date of publication of the data",
    )
    publication_frequency = Column(
        Text, comment="Frequency of publication: how often the data is published."
    )
    utm_zone = Column(Integer)
    license = Column(Text, comment="License. E.g. Public domain")
    confidentiality = Column(Text, comment="Confidentiality of the data.")
    feature_count = Column(Integer, comment="Number of features of the data")
    geometry_type = Column(Text, comment="Geometry type. E.g. Polygon")
    projection_name = Column(
        Text, comment="Projection name of the dataset. E.g. WGS 84 - Geographic"
    )
    projection_authid = Column(Text, comment="Projection auth id. E.g. EPSG:4326")
    spatial_extent = Column(
        Text, comment="Spatial extent of the data. xmin,ymin,xmax,ymax."
    )
    update_date = Column(
        DateTime,
        default=datetime.now,
        comment="Date of update of the dataset item",
    )
    geom = Column(
        Geometry("POINT", 32614, from_text="ST_GeomFromEWKT", name="geometry"),
        index=True,
        comment="Geometry defining the extent of the data. Can be any polygon.",
    )
    data_last_update = Column(
        DateTime,
        comment="Date of the last modification of the target data (not on the dataset item line)",
    )
    themes = Column(ARRAY(Text()), comment="List of themes")
    metadata_xml = Column(Text, comment="XML document containing the entire metadata")

    def __init__(self, xml_file, **kwargs) -> None:
        with open(xml_file, "r", encoding="utf-8") as file:
            metadata_xml = file.read()
        root_xml = fromstring(metadata_xml)
        kwargs |= {element.tag: element.text for element in root_xml.iter()}
        kwargs |= {"metadata_xml": metadata_xml}
        for key, value in kwargs.items():
            setattr(self, key, value)


__db.create_all()


class Catastral(Base):
    def __init__(self) -> None:
        super().__init__(Model)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
