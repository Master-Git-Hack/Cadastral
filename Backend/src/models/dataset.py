from datetime import datetime
from typing import Any, Dict, Optional
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
    create_engine,
    text,
)
from sqlalchemy.dialects.postgresql import UUID

from .. import config, database
from ..middlewares.database import Template


class Model(database.BASE):
    __tablename__ = "dataset"
    __table_args__ = {"schema": "pgmetadata"}
    id = Column(
        Integer, name="id", primary_key=True, comment="Internal automatic integer ID"
    )
    uid = Column(
        UUID,
        name="uid",
        nullable=False,
        server_default=text("uuid_generate_v4()"),
        comment="Unique identifier of the data. E.g. 89e3dde9-3850-c211-5045-b5b09aa1da9a",
    )
    table_name = Column(
        Text,
        name="table_name",
        nullable=False,
        comment="Name of the related table in the database",
    )
    schema_name = Column(
        Text,
        name="schema_name",
        nullable=False,
        comment="Name of the related schema in the database",
    )
    title = Column(
        Text,
        name="title",
        nullable=False,
        comment="1.1 Título del conjunto de datos espaciales o producto",
    )
    purpose = Column(Text, name="purpose", comment="1.2 Propósito")
    abstract = Column(
        Text,
        name="abstract",
        nullable=False,
        comment="1.3 Descripción del conjunto de datos espaciales o producto",
    )
    md_dataidentification_language = Column(
        Text,
        name="md_dataidentification_language",
        comment="1.4 Idioma del conjunto de datos espaciales o producto",
    )
    topiccategory = Column(
        Text,
        name="topiccategory",
        comment="1.5.1 Tema principal del conjunto de datos espaciales o producto",
    )
    groupcategory = Column(
        Text,
        name="groupcategory",
        comment="1.5.2 Grupo de datos del conjunto de datos espaciales o producto",
    )
    keyword = Column(
        Text,
        name="keywords",
        comment="1.6 Palabra clave  List of keywords separated by comma. Ex: environment, paris, trees",
    )
    presentationform = Column(
        Text,
        name="presentationform",
        comment="1.10 Forma de presentación de los datos espaciales",
    )
    ci_onlineresource_linkage = Column(
        Text, name="ci_onlineresource_linkage", comment="1.11.1 URL del recurso"
    )
    maintenanceandupdatefrequency = Column(
        Text,
        name="maintenanceandupdatefrequency",
        comment="1.12 Frecuencia de mantenimiento y actualización",
    )
    md_dataidentification_characterset = Column(
        Text,
        name="md_dataidentification_characterset",
        comment="1.13 Conjunto de caracteres",
    )

    specuse = Column(Text, comment="1.15 Uso específico")
    datestamp = Column(
        DateTime,
        name="datestamp",
        comment="2.1.1 Fecha de referencia del conjunto de datos espaciales o producto",
    )
    datetype = Column(
        Text, name="datetype", comment="2.1.2 Tipo de fecha de referencia"
    )
    date_creation = Column(
        DateTime,
        default=datetime.now,
        comment="2.2.1 Fecha de creación de los insumos",
    )
    inpname = Column(Text, comment="2.2.4 Nombre del Insumo")
    ci_responsibleparty_individualname = Column(
        Text,
        name="ci_responsibleparty_individualname",
        comment="3.1 Nombre de la persona de contacto",
    )
    ci_responsibleparty_organisationname = Column(
        Text,
        name="ci_responsibleparty_organisationname",
        comment="3.2 Nombre de la Organización",
    )
    ci_responsibleparty_positionname = Column(
        Text, name="ci_responsibleparty_positionname", comment="3.3 Puesto del contacto"
    )
    ci_responsibleparty_linkage = Column(
        Text,
        name="ci_responsibleparty_linkage",
        comment="3.12 Enlace en línea (dirección de Internet de referencia)",
    )
    ci_responsibleparty_role = Column(
        Text, name="ci_responsibleparty_role", comment="3.13 Rol"
    )
    westboundlongitude = Column(
        Float(precision=8),
        name="westboundlongitude",
        comment="4.1.1 Coordenada límite al Oeste",
    )
    eastboundlongitude = Column(
        Float(precision=8),
        name="eastboundlongitude",
        comment="4.1.2 Coordenada límite al Este",
    )
    southboundlatitude = Column(
        Float(precision=8),
        name="southboundlatitude",
        comment="4.1.3 Coordenada límite al Sur",
    )
    northboundlatitude = Column(
        Float(precision=8),
        name="northboundlatitude",
        comment="4.1.4 Coordenada límite al Norte",
    )
    spatialrepresentationtype = Column(
        Text,
        name="spatialrepresentationtype",
        comment="4.2 Tipo de representación espacial",
    )
    latres = Column(
        Float(precision=8), name="latres", comment="5.1.1.1 Resolución de latitud"
    )
    longres = Column(
        Float(precision=8), name="longres", comment="5.1.1.2 Resolución de longitud"
    )
    geogunit = Column(
        Text, name="geogunit", comment="5.1.1.3 Unidades de coordenadas geográficas"
    )
    lambertc_stdparll = Column(
        Float(precision=8),
        name="lambertc_stdparll",
        comment="5.1.2.1.1.1 Paralelo estándar",
    )
    lambertc_longcm = Column(
        Float(precision=8),
        name="lambertc_longcm",
        comment="5.1.2.1.1.2|5.1.2.1.2.2|5.1.2.1.3.3|5.1.2.1.4.2|5.1.2.2.1.3 Longitud del meridiano central",
    )
    mercatort_latprjo = Column(
        Float(precision=8),
        name="mercatort_latprjo",
        comment="5.1.2.1.1.3|5.1.2.1.2.3|5.1.2.1.4.3|5.1.2.2.1.4 Latitud del origen de proyección",
    )
    mercator_feast = Column(
        Float(precision=8),
        comment="5.1.2.1.1.4|5.1.2.1.2.4|5.1.2.1.3.4|5.1.2.1.4.4|5.1.2.2.1.5 Falso este",
    )
    mercator_fnorth = Column(
        Float(precision=8),
        comment="5.1.2.1.1.5|5.1.2.1.2.5|5.1.2.1.3.5|5.1.2.1.4.5|5.1.2.2.1.6 Falso norte",
    )
    mercator_sfec = Column(
        Float(precision=8),
        comment="5.1.2.1.2.1|5.1.2.1.4.1|5.1.2.2.1.2 Factor de escala en el meridiano central",
    )
    local_desc = Column(Text, comment="5.1.2.3.1 Descripción de la Plana Local")
    local_geo_inf = Column(
        Text, comment="5.1.2.3.2 Información de Georreferencia de la Plana Loca"
    )

    coord_repres = Column(
        Text, comment="5.1.2.3.4.1|5.1.2.3.4.2.1 Método codificado de coordenada plana"
    )
    ordres = Column(Float(precision=8), comment="5.1.2.3.4.2.2.1 Resolución de abscisa")
    absres = Column(
        Float(precision=8), comment="5.1.2.3.4.2.2.2 Resolución de ordenada"
    )
    distance_res = Column(
        Float(precision=8), comment="5.1.2.4.3.1 Resolución de distancia"
    )
    bearing_res = Column(Float(precision=8), comment="5.1.2.4.3.2 Resolución de rumbo")
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
    semiaxis = Column(Float(precision=8), comment="5.1.4.3 Semieje mayor")
    altenc = Column(Text, comment="5.2.1.1 Nombre del datum de altitud")
    categories = Column(ARRAY(Text()), comment="List of categories")
    altres = Column(Float(precision=8), comment="5.2.1.2 Resolución de altitud")
    altunits = Column(Text, comment="5.2.1.3 Unidades de distancia de altitud")
    altdatum = Column(Text, comment="5.2.1.4 Método codificado de altitud")
    depthdn = Column(Text, comment="5.2.2.1 Nombre del datum de profundidad")
    depthres = Column(Float(precision=8), comment="5.2.2.2 Resolución de profundidad")
    depthdu = Column(Text, comment="5.2.2.3 Unidades de distancia de profundidad")
    level = Column(Text, comment="6.1.1 Nivel")
    dq_quantitativeresult = Column(
        Text,
        name="dq_quantitativeresult",
        comment="6.2.1.1|6.2.3.1|6.2.4.1|6.2.5.1 Nombre del subcriterio de calidad evaluado",
    )
    dq_completeness_nameofmeasure = Column(
        Text,
        name="dq_completeness_nameofmeasure",
        comment="6.2.2.1.1|6.2.3.1.1|6.2.4.1.1|6.2.5.1.1 Nombre de la prueba",
    )
    dq_logicconsistency_nameofmeasure = Column(
        Text,
        name="dq_logicconsistency_nameofmeasure",
        comment="6.2.2.1.1|6.2.3.1.1|6.2.4.1.1|6.2.5.1.1 Nombre de la prueba",
    )
    positionalaccuracy_nameofmeasure = Column(
        Text,
        name="positionalaccuracy_nameofmeasure",
        comment="6.2.2.1.1|6.2.3.1.1|6.2.4.1.1|6.2.5.1.1 Nombre de la prueba",
    )
    temporalaccuracy_nameofmeasure = Column(
        Text,
        name="temporalaccuracy_nameofmeasure",
        comment="6.2.2.1.1|6.2.3.1.1|6.2.4.1.1|6.2.5.1.1 Nombre de la prueba",
    )
    thematicaccuracy_nameofmeasure = Column(
        Text,
        name="thematicaccuracy_nameofmeasure",
        comment="6.2.2.1.1|6.2.3.1.1|6.2.4.1.1|6.2.5.1.1 Nombre de la prueba",
    )
    dq_completeness_measuredescription = Column(
        Text,
        name="dq_completeness_measuredescription",
        comment="6.2.2.1.2|6.2.3.1.2|6.2.4.1.2|6.2.5.1.2 Descripción de la prueba",
    )
    dq_logicconsistency_measuredescription = Column(
        Text,
        name="dq_logicconsistency_measuredescription",
        comment="6.2.2.1.2|6.2.3.1.2|6.2.4.1.2|6.2.5.1.2 Descripción de la prueba",
    )
    positionalaccuracy_measuredescription = Column(
        Text,
        name="positionalaccuracy_measuredescription",
        comment="6.2.2.1.2|6.2.3.1.2|6.2.4.1.2|6.2.5.1.2 Descripción de la prueba",
    )
    temporalaccuracy_measuredescription = Column(
        Text,
        name="temporalaccuracy_measuredescription",
        comment="6.2.2.1.2|6.2.3.1.2|6.2.4.1.2|6.2.5.1.2 Descripción de la prueba",
    )
    thematicaccuracy_measuredescription = Column(
        Text,
        name="thematicaccuracy_measuredescription",
        comment="6.2.2.1.2|6.2.3.1.2|6.2.4.1.2|6.2.5.1.2 Descripción de la prueba",
    )
    positionalaccuracy_valueunit = Column(
        Text,
        name="positionalaccuracy_valueunit",
        comment="6.2.2.1.3.1.1|6.2.3.1.3.1.1|6.2.4.1.3.1.1|6.2.5.1.3.1.1 Unidad de valor",
    )
    temporalaccuracy_valueunit = Column(
        Text,
        name="temporalaccuracy_valueunit",
        comment="6.2.2.1.3.1.1|6.2.3.1.3.1.1|6.2.4.1.3.1.1|6.2.5.1.3.1.1 Unidad de valor",
    )
    thematicaccuracy_valueunit = Column(
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
    md_format = Column(Text, name="md_format", comment="8.4.1 Nombre del formato")
    edition = Column(Text, comment="8.4.2 Versión del formato")
    metadatastandardname = Column(
        Text,
        name="metadatastandardname",
        comment="9.1 Nombre del estándar de metadatos",
    )
    metadatastandardversion = Column(
        Text, name="metadatastandardversion", comment="9.3 Idioma de los Metadatos"
    )
    date = Column(DateTime, comment="9.5 Fecha")
    md_referencesystem = Column(
        Text,
        name="md_referencesystem",
        comment="Sistema de Referencia SI 4.2 es de tipo Vector/Raster/TIN",
    )
    geographicelement = Column(
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
    # local_planar = Column(
    #     Text, comment="5.1.2.3 Plana Local Si 5.1.2.1 o 5.1.2.2 no se capturan"
    # )
    coord_repres = Column(
        Text,
        comment="5.1.2.3.4.2|5.1.2.3.4.2.2 Representación de coordenadas Si 5.1.2.4.3 no se captura",
    )
    # distance_and_bearing_repres = Column(
    #     Text,
    #     comment="5.1.2.4.3 Representación de distancia y rumbo Si 5.1.2.4.2 no se captura",
    # )
    # local_coordinates = Column(
    #     Text, comment="5.1.3 Coordenadas Locales Si 5.1.1 o 5.1.2 no se capturan"
    # )
    # denflat = Column(Text, comment="5.1.4.4 Factor de denominador de achatamiento")
    li_processstep = Column(
        Text, name="li_processstep", comment="6.3.2 Pasos del proceso"
    )
    li_source = Column(Text, name="li_source", comment="6.3.3 Fuente")

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
        Geometry("POINT", 32614, name="geometry"),
        index=True,
        comment="Geometry defining the extent of the data. Can be any polygon.",
    )
    data_last_update = Column(
        DateTime,
        comment="Date of the last modification of the target data (not on the dataset item line)",
    )
    themes = Column(ARRAY(Text()), comment="List of themes")
    metadata_xml = Column(Text, comment="XML document containing the entire metadata")

    def __init__(self, xml_file: Optional[str] = None, **kwargs) -> None:
        if xml_file is not None:
            with open(xml_file, "r", encoding="utf-8") as file:
                metadata_xml = file.read()
            root_xml = fromstring(metadata_xml)
            kwargs |= {element.tag.lower(): element.text for element in root_xml.iter()}
            kwargs |= {"metadata_xml": metadata_xml}
        for key, value in kwargs.items():
            setattr(self, key, value)


class Dataset(Template):
    def __init__(self, db) -> None:
        super().__init__(Model, db)

    def __enter__(self):
        return super().__enter__()

    def __exit__(self, exc_type, exc_value, traceback):
        return super().__exit__(exc_type, exc_value, traceback)
