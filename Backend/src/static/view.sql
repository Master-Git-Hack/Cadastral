
DROP VIEW IF EXISTS pgmetadata.v_export_table;
DROP VIEW IF EXISTS pgmetadata.v_dataset;

CREATE OR REPLACE VIEW pgmetadata.v_dataset
AS SELECT ss.id,
       ss.uid,
       string_agg(DISTINCT ss.cat, ', '::text ORDER BY ss.cat) AS categories,
       string_agg(DISTINCT ss.theme, ', '::text ORDER BY ss.theme) AS themes,
       ss.table_name,
       ss.schema_name,
       ss.title,
       ss.abstract,
       ss.keywords,
       ss.spatial_level,
       ss.minimum_optimal_scale,
       ss.maximum_optimal_scale,
       ss.publication_date,
       ss.publication_frequency,
       ss.license,
       ss.confidentiality,
       ss.feature_count,
       ss.geometry_type,
       ss.projection_name,
       ss.projection_authid,
       ss.spatial_extent,
       ss.creation_date,
       ss.update_date,
       ss.data_last_update,
       ss.purpose,
       ss.md_dataidentification_language,
       ss.topiccategory,
       ss.groupcategory,
       ss.presentationform,
       ss.ci_onlineresource_linkage,
       ss.maintenanceandupdatefrequency,
       ss.md_dataidentification_characterset,
       ss.specuse,
       ss.datestamp,
       ss.datetype,
       ss.date_creation,
       ss.inpname,
       ss.ci_responsibleparty_individualname,
       ss.ci_responsibleparty_organisationname,
       ss.ci_responsibleparty_positionname,
       ss.ci_responsibleparty_linkage,
       ss.ci_responsibleparty_role,
       ss.westboundlongitude,
       ss.eastboundlongitude,
       ss.southboundlatitude,
       ss.northboundlatitude,
       ss.spatialrepresentationtype,
       ss.latres,
       ss.longres,
       ss.geogunit,
       ss.lambertc_stdparll,
       ss.lambertc_longcm,
       ss.mercatort_latprjo,
       ss.mercator_feast,
       ss.mercator_fnorth,
       ss.mercator_sfec,
       ss.coord_repres,
       ss.ordres,
       ss.absres,
       ss.distance_res,
       ss.bearing_res,
       ss.bearing_uni,
       ss.ref_bearing_dir,
       ss.ref_bearing_mer,
       ss.plandu,
       ss.local_desc,
       ss.local_geo_inf,
       ss.horizdn,
       ss.ellips,
       ss.semiaxis,
       ss.altenc,
       ss.altres,
       ss.altunits,
       ss.altdatum,
       ss.depthdn,
       ss.depthres,
       ss.depthdu,
       ss.level,
       ss.dq_quantitativeresult,
       ss.dq_completeness_nameofmeasure,
       ss.dq_logicconsistency_nameofmeasure,
       ss.positionalaccuracy_nameofmeasure,
       ss.temporalaccuracy_nameofmeasure,
       ss.thematicaccuracy_nameofmeasure,
       ss.dq_completeness_measuredescription,
       ss.dq_logicconsistency_measuredescription,
       ss.positionalaccuracy_measuredescription,
       ss.temporalaccuracy_measuredescription,
       ss.thematicaccuracy_measuredescription,
       ss.positionalaccuracy_valueunit,
       ss.temporalaccuracy_valueunit,
       ss.thematicaccuracy_valueunit,
       ss.statement,
       ss.entity_detail,
       ss.graphfilename,
       ss.md_format,
       ss.edition,
       ss.metadatastandardname,
       ss.metadatastandardversion,
       ss.date,
       ss.md_referencesystem,
       ss.geographicelement,
       ss.planar,
       ss.mapprojn,
       ss.gridcoordinatessystem,
       ss.utm_zone,
       ss.li_processstep,
       ss.li_source
FROM
  (SELECT s.id,
          s.uid,
          s.table_name,
          s.schema_name,
          s.title,
          s.abstract,
          s.categories,
          s.keywords,
          s.spatial_level,
          s.feature_count,
          s.geometry_type,
          s.projection_authid,
          s.spatial_extent,
          s.creation_date,
          s.update_date,
          s.geom,
          s.data_last_update,
          s.purpose,
          s.md_dataidentification_language,
          s.topiccategory,
          s.groupcategory,
          s.presentationform,
          s.ci_onlineresource_linkage,
          s.maintenanceandupdatefrequency,
          s.md_dataidentification_characterset,
          s.specuse,
          s.datestamp,
          s.datetype,
          s.date_creation,
          s.inpname,
          s.ci_responsibleparty_individualname,
          s.ci_responsibleparty_organisationname,
          s.ci_responsibleparty_positionname,
          s.ci_responsibleparty_linkage,
          s.ci_responsibleparty_role,
          s.westboundlongitude,
          s.eastboundlongitude,
          s.southboundlatitude,
          s.northboundlatitude,
          s.spatialrepresentationtype,
          s.latres,
          s.longres,
          s.geogunit,
          s.lambertc_stdparll,
          s.lambertc_longcm,
          s.mercatort_latprjo,
          s.mercator_feast,
          s.mercator_fnorth,
          s.mercator_sfec,
          s.coord_repres,
          s.ordres,
          s.absres,
          s.distance_res,
          s.bearing_res,
          s.bearing_uni,
          s.ref_bearing_dir,
          s.ref_bearing_mer,
          s.plandu,
          s.local_desc,
          s.local_geo_inf,
          s.horizdn,
          s.ellips,
          s.semiaxis,
          s.altenc,
          s.altres,
          s.altunits,
          s.altdatum,
          s.depthdn,
          s.depthres,
          s.depthdu,
          s.level,
          s.dq_quantitativeresult,
          s.dq_completeness_nameofmeasure,
          s.dq_logicconsistency_nameofmeasure,
          s.positionalaccuracy_nameofmeasure,
          s.temporalaccuracy_nameofmeasure,
          s.thematicaccuracy_nameofmeasure,
          s.dq_completeness_measuredescription,
          s.dq_logicconsistency_measuredescription,
          s.positionalaccuracy_measuredescription,
          s.temporalaccuracy_measuredescription,
          s.thematicaccuracy_measuredescription,
          s.positionalaccuracy_valueunit,
          s.temporalaccuracy_valueunit,
          s.thematicaccuracy_valueunit,
          s.statement,
          s.entity_detail,
          s.graphfilename,
          s.md_format,
          s.edition,
          s.metadatastandardname,
          s.metadatastandardversion,
          (((glossary.dict -> 'dataset.categories'::text) -> s.cat) -> 'label'::text) ->> glossary.locale AS cat,
          gtheme.label AS theme,
          s.date,
          '1/'::text || s.minimum_optimal_scale AS minimum_optimal_scale,
          s.md_referencesystem,
          '1/'::text || s.maximum_optimal_scale AS maximum_optimal_scale,
          s.publication_date,
          s.geographicelement,
          (((glossary.dict -> 'dataset.publication_frequency'::text) -> s.publication_frequency) -> 'label'::text) ->> glossary.locale AS publication_frequency,
          s.planar,
          (((glossary.dict -> 'dataset.license'::text) -> s.license) -> 'label'::text) ->> glossary.locale AS license,
          s.mapprojn,
          (((glossary.dict -> 'dataset.confidentiality'::text) -> s.confidentiality) -> 'label'::text) ->> glossary.locale AS confidentiality,
          s.gridcoordinatessystem,
          (regexp_split_to_array(rs.srtext::text, 'd.'::text))[2] AS projection_name,
          s.utm_zone,
          s.li_processstep,
          s.li_source
   FROM
     (SELECT COALESCE(current_setting('pgmetadata.locale'::text, true), 'en'::text) AS locale,
             v_glossary.dict
      FROM pgmetadata.v_glossary) AS glossary,
     (SELECT d.id,
             d.uid,
             d.table_name,
             d.schema_name,
             d.title,
             d.abstract,
             d.categories,
             d.keywords,
             d.spatial_level,
             d.minimum_optimal_scale,
             d.maximum_optimal_scale,
             d.publication_date,
             d.publication_frequency,
             d.license,
             d.confidentiality,
             d.feature_count,
             d.geometry_type,
             d.projection_name,
             d.projection_authid,
             d.spatial_extent,
             d.creation_date,
             d.update_date,
             d.geom,
             d.data_last_update,
             d.purpose,
             d.md_dataidentification_language,
             d.topiccategory,
             d.groupcategory,
             d.presentationform,
             d.ci_onlineresource_linkage,
             d.maintenanceandupdatefrequency,
             d.md_dataidentification_characterset,
             d.specuse,
             d.datestamp,
             d.datetype,
             d.date_creation,
             d.inpname,
             d.ci_responsibleparty_individualname,
             d.ci_responsibleparty_organisationname,
             d.ci_responsibleparty_positionname,
             d.ci_responsibleparty_linkage,
             d.ci_responsibleparty_role,
             d.westboundlongitude,
             d.eastboundlongitude,
             d.southboundlatitude,
             d.northboundlatitude,
             d.spatialrepresentationtype,
             d.latres,
             d.longres,
             d.geogunit,
             d.lambertc_stdparll,
             d.lambertc_longcm,
             d.mercatort_latprjo,
             d.mercator_feast,
             d.mercator_fnorth,
             d.mercator_sfec,
             d.coord_repres,
             d.ordres,
             d.absres,
             d.distance_res,
             d.bearing_res,
             d.bearing_uni,
             d.ref_bearing_dir,
             d.ref_bearing_mer,
             d.plandu,
             d.local_desc,
             d.local_geo_inf,
             d.horizdn,
             d.ellips,
             d.semiaxis,
             d.altenc,
             d.altres,
             d.altunits,
             d.altdatum,
             d.depthdn,
             d.depthres,
             d.depthdu,
             d.level,
             d.dq_quantitativeresult,
             d.dq_completeness_nameofmeasure,
             d.dq_logicconsistency_nameofmeasure,
             d.positionalaccuracy_nameofmeasure,
             d.temporalaccuracy_nameofmeasure,
             d.thematicaccuracy_nameofmeasure,
             d.dq_completeness_measuredescription,
             d.dq_logicconsistency_measuredescription,
             d.positionalaccuracy_measuredescription,
             d.temporalaccuracy_measuredescription,
             d.thematicaccuracy_measuredescription,
             d.positionalaccuracy_valueunit,
             d.temporalaccuracy_valueunit,
             d.thematicaccuracy_valueunit,
             d.statement,
             d.entity_detail,
             d.graphfilename,
             d.md_format,
             d.edition,
             d.metadatastandardname,
             d.metadatastandardversion,
             d.date,
             d.md_referencesystem,
             d.geographicelement,
             d.planar,
             d.mapprojn,
             d.gridcoordinatessystem,
             d.utm_zone,
             d.li_processstep,
             d.li_source,
             cat.cat,
             theme.theme
      FROM pgmetadata.dataset d
      LEFT JOIN LATERAL unnest(d.categories) cat(cat) ON true
      LEFT JOIN LATERAL unnest(d.themes) theme(theme) ON true
      WHERE true
      ORDER BY d.id) AS s
LEFT JOIN pgmetadata.theme gtheme ON gtheme.code = s.theme
LEFT JOIN spatial_ref_sys rs ON concat(rs.auth_name, ':', rs.auth_srid) = s.projection_authid) AS ss
GROUP BY ss.id,
         ss.uid,
         ss.table_name,
         ss.schema_name,
         ss.title,
         ss.abstract,
         ss.keywords,
         ss.spatial_level,
         ss.minimum_optimal_scale,
         ss.maximum_optimal_scale,
         ss.publication_date,
         ss.publication_frequency,
         ss.license,
         ss.confidentiality,
         ss.feature_count,
         ss.geometry_type,
         ss.projection_name,
         ss.projection_authid,
         ss.spatial_extent,
         ss.creation_date,
         ss.update_date,
         ss.data_last_update,
         ss.purpose,
         ss.md_dataidentification_language,
         ss.topiccategory,
         ss.groupcategory,
         ss.presentationform,
         ss.ci_onlineresource_linkage,
         ss.maintenanceandupdatefrequency,
         ss.md_dataidentification_characterset,
         ss.specuse,
         ss.datestamp,
         ss.datetype,
         ss.date_creation,
         ss.inpname,
         ss.ci_responsibleparty_individualname,
         ss.ci_responsibleparty_organisationname,
         ss.ci_responsibleparty_positionname,
         ss.ci_responsibleparty_linkage,
         ss.ci_responsibleparty_role,
         ss.westboundlongitude,
         ss.eastboundlongitude,
         ss.southboundlatitude,
         ss.northboundlatitude,
         ss.spatialrepresentationtype,
         ss.latres,
         ss.longres,
         ss.geogunit,
         ss.lambertc_stdparll,
         ss.lambertc_longcm,
         ss.mercatort_latprjo,
         ss.mercator_feast,
         ss.mercator_fnorth,
         ss.mercator_sfec,
         ss.coord_repres,
         ss.ordres,
         ss.absres,
         ss.distance_res,
         ss.bearing_res,
         ss.bearing_uni,
         ss.ref_bearing_dir,
         ss.ref_bearing_mer,
         ss.plandu,
         ss.local_desc,
         ss.local_geo_inf,
         ss.horizdn,
         ss.ellips,
         ss.semiaxis,
         ss.altenc,
         ss.altres,
         ss.altunits,
         ss.altdatum,
         ss.depthdn,
         ss.depthres,
         ss.depthdu,
         ss.level,
         ss.dq_quantitativeresult,
         ss.dq_completeness_nameofmeasure,
         ss.dq_logicconsistency_nameofmeasure,
         ss.positionalaccuracy_nameofmeasure,
         ss.temporalaccuracy_nameofmeasure,
         ss.thematicaccuracy_nameofmeasure,
         ss.dq_completeness_measuredescription,
         ss.dq_logicconsistency_measuredescription,
         ss.positionalaccuracy_measuredescription,
         ss.temporalaccuracy_measuredescription,
         ss.thematicaccuracy_measuredescription,
         ss.positionalaccuracy_valueunit,
         ss.temporalaccuracy_valueunit,
         ss.thematicaccuracy_valueunit,
         ss.statement,
         ss.entity_detail,
         ss.graphfilename,
         ss.md_format,
         ss.edition,
         ss.metadatastandardname,
         ss.metadatastandardversion,
         ss.date,
         ss.md_referencesystem,
         ss.geographicelement,
         ss.planar,
         ss.mapprojn,
         ss.gridcoordinatessystem,
         ss.utm_zone,
         ss.li_processstep,
         ss.li_source;


CREATE OR REPLACE VIEW pgmetadata.v_export_table
AS 
SELECT d.id,
             d.uid,
             d.table_name,
             d.schema_name,
             d.title,
             d.abstract,
             d.categories,
             d.keywords,
             d.spatial_level,
             d.minimum_optimal_scale,
             d.maximum_optimal_scale,
             d.publication_date,
             d.publication_frequency,
             d.license,
             d.confidentiality,
             d.feature_count,
             d.geometry_type,
             d.projection_name,
             d.projection_authid,
             d.spatial_extent,
             d.creation_date,
             d.update_date,
             d.data_last_update,
             d.themes,
             d.purpose,
             d.md_dataidentification_language,
             d.topiccategory,
             d.groupcategory,
             d.presentationform,
             d.ci_onlineresource_linkage,
             d.maintenanceandupdatefrequency,
             d.md_dataidentification_characterset,
             d.specuse,
             d.datestamp,
             d.datetype,
             d.date_creation,
             d.inpname,
             d.ci_responsibleparty_individualname,
             d.ci_responsibleparty_organisationname,
             d.ci_responsibleparty_positionname,
             d.ci_responsibleparty_linkage,
             d.ci_responsibleparty_role,
             d.westboundlongitude,
             d.eastboundlongitude,
             d.southboundlatitude,
             d.northboundlatitude,
             d.spatialrepresentationtype,
             d.latres,
             d.longres,
             d.geogunit,
             d.lambertc_stdparll,
             d.lambertc_longcm,
             d.mercatort_latprjo,
             d.mercator_feast,
             d.mercator_fnorth,
             d.mercator_sfec,
             d.coord_repres,
             d.ordres,
             d.absres,
             d.distance_res,
             d.bearing_res,
             d.bearing_uni,
             d.ref_bearing_dir,
             d.ref_bearing_mer,
             d.plandu,
             d.local_desc,
             d.local_geo_inf,
             d.horizdn,
             d.ellips,
             d.semiaxis,
             d.altenc,
             d.altres,
             d.altunits,
             d.altdatum,
             d.depthdn,
             d.depthres,
             d.depthdu,
             d.level,
             d.dq_quantitativeresult,
             d.dq_completeness_nameofmeasure,
             d.dq_logicconsistency_nameofmeasure,
             d.positionalaccuracy_nameofmeasure,
             d.temporalaccuracy_nameofmeasure,
             d.thematicaccuracy_nameofmeasure,
             d.dq_completeness_measuredescription,
             d.dq_logicconsistency_measuredescription,
             d.positionalaccuracy_measuredescription,
             d.temporalaccuracy_measuredescription,
             d.thematicaccuracy_measuredescription,
             d.positionalaccuracy_valueunit,
             d.temporalaccuracy_valueunit,
             d.thematicaccuracy_valueunit,
             d.statement,
             d.entity_detail,
             d.graphfilename,
             d.md_format,
             d.edition,
             d.metadatastandardname,
             d.metadatastandardversion,
             d.date,
             d.md_referencesystem,
             d.geographicelement,
             d.planar,
             d.mapprojn,
             d.gridcoordinatessystem,
             d.utm_zone,
             d.li_processstep,
             d.li_source,
    string_agg((l.name || ': '::text) || l.url, ', '::text) AS links,
    string_agg(((((c.name || ' ('::text) || c.organisation_name) || ')'::text) || ' - '::text) || c.contact_role, ', '::text) AS contacts
   FROM pgmetadata.v_dataset d
     LEFT JOIN pgmetadata.v_link l ON l.table_name = d.table_name AND l.schema_name = d.schema_name
     LEFT JOIN pgmetadata.v_contact c ON c.table_name = d.table_name AND c.schema_name = d.schema_name
 GROUP BY d.id,
         d.uid,
         d.table_name,
         d.schema_name,
         d.title,
         d.abstract,
         d.keywords,
         d.spatial_level,
         d.minimum_optimal_scale,
         d.maximum_optimal_scale,
         d.publication_date,
         d.publication_frequency,
         d.license,
         d.confidentiality,
         d.feature_count,
         d.geometry_type,
         d.projection_name,
         d.projection_authid,
         d.spatial_extent,
         d.creation_date,
         d.update_date,
         d.data_last_update,
         d.purpose,
         d.md_dataidentification_language,
         d.topiccategory,
         d.groupcategory,
         d.presentationform,
         d.ci_onlineresource_linkage,
         d.maintenanceandupdatefrequency,
         d.md_dataidentification_characterset,
         d.specuse,
         d.datestamp,
         d.datetype,
         d.date_creation,
         d.inpname,
         d.ci_responsibleparty_individualname,
         d.ci_responsibleparty_organisationname,
         d.ci_responsibleparty_positionname,
         d.ci_responsibleparty_linkage,
         d.ci_responsibleparty_role,
         d.westboundlongitude,
         d.eastboundlongitude,
         d.southboundlatitude,
         d.northboundlatitude,
         d.spatialrepresentationtype,
         d.latres,
         d.longres,
         d.geogunit,
         d.lambertc_stdparll,
         d.lambertc_longcm,
         d.mercatort_latprjo,
         d.mercator_feast,
         d.mercator_fnorth,
         d.mercator_sfec,
         d.coord_repres,
         d.ordres,
         d.absres,
         d.distance_res,
         d.bearing_res,
         d.bearing_uni,
         d.ref_bearing_dir,
         d.ref_bearing_mer,
         d.plandu,
         d.local_desc,
         d.local_geo_inf,
         d.horizdn,
         d.ellips,
         d.semiaxis,
         d.altenc,
         d.altres,
         d.altunits,
         d.altdatum,
         d.depthdn,
         d.depthres,
         d.depthdu,
         d.level,
         d.dq_quantitativeresult,
         d.dq_completeness_nameofmeasure,
         d.dq_logicconsistency_nameofmeasure,
         d.positionalaccuracy_nameofmeasure,
         d.temporalaccuracy_nameofmeasure,
         d.thematicaccuracy_nameofmeasure,
         d.dq_completeness_measuredescription,
         d.dq_logicconsistency_measuredescription,
         d.positionalaccuracy_measuredescription,
         d.temporalaccuracy_measuredescription,
         d.thematicaccuracy_measuredescription,
         d.positionalaccuracy_valueunit,
         d.temporalaccuracy_valueunit,
         d.thematicaccuracy_valueunit,
         d.statement,
         d.entity_detail,
         d.graphfilename,
         d.md_format,
         d.edition,
         d.metadatastandardname,
         d.metadatastandardversion,
         d.date,
         d.md_referencesystem,
         d.geographicelement,
         d.planar,
         d.mapprojn,
         d.gridcoordinatessystem,
         d.utm_zone, d.li_processstep,
         d.li_source,d.categories, d.themes  ORDER BY d.schema_name, d.table_name;

-- Permissions

ALTER TABLE pgmetadata.v_dataset OWNER TO root;
GRANT ALL ON TABLE pgmetadata.v_dataset TO root;