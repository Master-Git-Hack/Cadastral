ALTER TABLE root.pgmetadata.v_dataset
ADD COLUMN purpose TEXT,
ADD COLUMN MD_DataIdentification_language TEXT,
ADD COLUMN topicCategory TEXT,
ADD COLUMN groupCategory TEXT,
ADD COLUMN presentationForm TEXT,
ADD COLUMN CI_OnlineResource_linkage TEXT,
ADD COLUMN maintenanceAndUpdateFrequency TEXT,
ADD COLUMN MD_DataIdentification_characterSet TEXT,
ADD COLUMN specuse TEXT,
ADD COLUMN dateStamp TIMESTAMP,
ADD COLUMN dateType TEXT,
ADD COLUMN date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN inpname TEXT,
ADD COLUMN CI_ResponsibleParty_individualName TEXT,
ADD COLUMN CI_ResponsibleParty_organisationName TEXT,
ADD COLUMN CI_ResponsibleParty_positionName TEXT,
ADD COLUMN CI_ResponsibleParty_linkage TEXT,
ADD COLUMN CI_ResponsibleParty_role TEXT,
ADD COLUMN westBoundLongitude FLOAT8,
ADD COLUMN eastBoundLongitude FLOAT8,
ADD COLUMN southBoundLatitude FLOAT8,
ADD COLUMN northBoundLatitude FLOAT8,
ADD COLUMN spatialRepresentationType TEXT,
ADD COLUMN latres FLOAT8,
ADD COLUMN longres FLOAT8,
ADD COLUMN geogunit TEXT,
ADD COLUMN lambertc_stdparll FLOAT8,
ADD COLUMN lambertc_longcm FLOAT8,
ADD COLUMN mercatort_latprjo FLOAT8,
ADD COLUMN mercator_feast FLOAT8,
ADD COLUMN mercator_fnorth FLOAT8,
ADD COLUMN mercator_sfec FLOAT8,
ADD COLUMN coord_repres TEXT,
ADD COLUMN ordres FLOAT8,
ADD COLUMN absres FLOAT8,
ADD COLUMN distance_res FLOAT8,
ADD COLUMN bearing_res FLOAT8,
ADD COLUMN bearing_uni TEXT,
ADD COLUMN ref_bearing_dir TEXT,
ADD COLUMN ref_bearing_mer TEXT,
ADD COLUMN plandu TEXT,
ADD COLUMN local_desc TEXT,
ADD COLUMN local_geo_inf TEXT,
ADD COLUMN horizdn TEXT,
ADD COLUMN ellips TEXT,
ADD COLUMN semiaxis FLOAT8,
ADD COLUMN altenc TEXT,
ADD COLUMN altres FLOAT8,
ADD COLUMN altunits TEXT,
ADD COLUMN altdatum TEXT,
ADD COLUMN depthdn TEXT,
ADD COLUMN depthres FLOAT8,
ADD COLUMN depthdu TEXT,
ADD COLUMN "level" TEXT,
ADD COLUMN DQ_QuantitativeResult TEXT,
ADD COLUMN DQ_Completeness_nameOfMeasure TEXT,
ADD COLUMN DQ_LogicConsistency_nameOfMeasure TEXT,
ADD COLUMN PositionalAccuracy_nameOfMeasure TEXT,
ADD COLUMN TemporalAccuracy_nameOfMeasure TEXT,
ADD COLUMN ThematicAccuracy_nameOfMeasure TEXT,
ADD COLUMN DQ_Completeness_measureDescription TEXT,
ADD COLUMN DQ_LogicConsistency_measureDescription TEXT,
ADD COLUMN PositionalAccuracy_measureDescription TEXT,
ADD COLUMN TemporalAccuracy_measureDescription TEXT,
ADD COLUMN ThematicAccuracy_measureDescription TEXT,
ADD COLUMN PositionalAccuracy_valueUnit TEXT,
ADD COLUMN TemporalAccuracy_valueUnit TEXT,
ADD COLUMN ThematicAccuracy_valueUnit TEXT,
ADD COLUMN "statement" TEXT,
ADD COLUMN entity_detail TEXT,
ADD COLUMN graphfilename TEXT,
ADD COLUMN MD_Format TEXT,
ADD COLUMN edition TEXT,
ADD COLUMN metadataStandardName TEXT,
ADD COLUMN metadataStandardVersion TEXT,
ADD COLUMN "date" TIMESTAMP,
ADD COLUMN MD_ReferenceSystem TEXT,
ADD COLUMN geographicElement TEXT,
ADD COLUMN planar TEXT,
ADD COLUMN mapprojn TEXT,
ADD COLUMN gridcoordinatessystem text,
add column utm_zone int4;

-- Agrega las restricciones de comprobación
ALTER TABLE root.pgmetadata.dataset
ADD CONSTRAINT MD_DataIdentification_language CHECK (
    MD_DataIdentification_language IN ('ES-Español', 'EN-Inglés')
),
ADD CONSTRAINT westBoundLongitude CHECK (westBoundLongitude BETWEEN -180 AND 180),
ADD CONSTRAINT eastBoundLongitude CHECK (eastBoundLongitude BETWEEN -180 AND 180),
ADD CONSTRAINT southBoundLatitude CHECK (southBoundLatitude BETWEEN -90 AND 90),
ADD CONSTRAINT northBoundLatitude CHECK (northBoundLatitude BETWEEN -90 AND 90),
ADD CONSTRAINT latres CHECK (latres > 0.0),
ADD CONSTRAINT longres CHECK (longres > 0.0),
ADD CONSTRAINT geogunit CHECK (
    geogunit IN (
        'Grados decimales',
        'Minutos decimales',
        'Segundos decimales',
        'Grados y minutos decimales',
        'Grados, minutos y segundos decimales',
        'Radianes',
        'Grados'
    )
),
ADD CONSTRAINT lambertc_stdparll CHECK (lambertc_stdparll BETWEEN -90 AND 90),
ADD CONSTRAINT lambertc_longcm CHECK (lambertc_longcm BETWEEN -180 AND 180),
ADD CONSTRAINT mercatort_latprjo CHECK (mercatort_latprjo BETWEEN -90 AND 90),
ADD CONSTRAINT mercator_sfec CHECK (mercator_sfec > 0.0),
ADD CONSTRAINT utm_zone CHECK (utm_zone BETWEEN 1 AND 60),
ADD CONSTRAINT coord_repres CHECK (
    coord_repres IN (
        'par coordenado',
        'distancia y rumbo',
        'líneas y columnas'
    )
),
ADD CONSTRAINT ordres CHECK (ordres > 0.0),
ADD CONSTRAINT absres CHECK (absres > 0.0),
ADD CONSTRAINT distance_res CHECK (distance_res > 0.0),
ADD CONSTRAINT bearing_res CHECK (bearing_res > 0.0),
ADD CONSTRAINT bearing_uni CHECK (
    bearing_uni IN (
        'Grados decimales',
        'Minutos decimales',
        'Segundos decimales',
        'Grados y minutos decimales',
        'Grados, minutos y segundos decimales',
        'Radianes',
        'Grados'
    )
),
ADD CONSTRAINT ref_bearing_dir CHECK (ref_bearing_dir IN ('Norte', 'Sur')),
ADD CONSTRAINT ref_bearing_mer CHECK (
    ref_bearing_mer IN (
        'Asumida',
        'Cuadrícula',
        'Magnético',
        'Astronómico',
        'Geodésico'
    )
),
ADD CONSTRAINT semiaxis CHECK (semiaxis > 0.0),
ADD CONSTRAINT depthres CHECK (depthres > 0.0);