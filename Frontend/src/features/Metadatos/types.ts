/** @format */
import { findBestMatch } from "string-similarity";
import { HTMLAtrributes, MouseEventHandler } from "react";
export const template = {
	table_name: "",
	schema_name: "",
	title: "",
	purpose: "",
	abstract: "",
	md_dataidentification_language: "",
	topiccategory: "",
	groupcategory: "",
	keyword: "",
	presentationform: "",
	ci_onlineresource_linkage: "",
	maintenanceandupdatefrequency: "",
	md_dataidentification_characterset: "",

	specuse: "",
	datestamp: "",
	datetype: "",
	date_creation: "",
	inpname: "",
	ci_responsibleparty_individualname: "",
	ci_responsibleparty_organisationname: "",
	ci_responsibleparty_positionname: "",
	ci_responsibleparty_linkage: "",
	ci_responsibleparty_role: "",
	westboundlongitude: 0,
	eastboundlongitude: 0,
	southboundlatitude: 0,
	northboundlatitude: 0,
	spatialrepresentationtype: "",
	latres: 0,
	longres: 0,
	geogunit: "",
	lambertc_stdparll: "",
	lambertc_longcm: "",
	mercatort_latprjo: 0,
	mercator_feast: 0,
	mercator_fnorth: 0,
	mercator_sfec: 0,

	ordres: 0,
	absres: 0,
	distance_res: 0,
	bearing_res: 0,
	bearing_uni: "",
	ref_bearing_dir: "",
	ref_bearing_mer: "",
	plandu: "",
	local_desc: "",
	local_geo_inf: "",
	horizdn: "",
	ellips: "",
	semiaxis: 0,
	altenc: "",
	categories: [],
	altres: 0,
	altunits: "",
	altdatum: "",
	depthdn: "",
	depthres: 0,
	depthdu: "",
	level: "",
	dq_quantitativeresult: "",
	dq_completeness_nameofmeasure: "",
	dq_logicconsistency_nameofmeasure: "",
	positionalaccuracy_nameofmeasure: "",
	temporalaccuracy_nameofmeasure: "",
	thematicaccuracy_nameofmeasure: "",
	dq_completeness_measuredescription: "",
	dq_logicconsistency_measuredescription: "",
	positionalaccuracy_measuredescription: "",
	temporalaccuracy_measuredescription: "",
	thematicaccuracy_measuredescription: "",
	positionalaccuracy_valueunit: "",
	temporalaccuracy_valueunit: "",
	thematicaccuracy_valueunit: "",
	statement: "",
	entity_detail: "",
	graphfilename: "",
	md_format: "",
	edition: "",
	metadatastandardname: "",
	metadatastandardversion: "",
	date: "",
	md_referencesystem: "",
	geographicelement: "",
	planar: "",
	mapprojn: "",
	gridcoordinatessystem: "",

	coord_repres: "",

	li_processstep: "",
	li_source: "",
	spatial_level: "",
	minimum_optimal_scale: 0,
	maximum_optimal_scale: 0,
	publication_date: "",
	publication_frequency: "",
	utm_zone: 0,
	license: "",
	confidentiality: "",
	feature_count: "",
	geometry_type: "",
	projection_name: "",
	projection_authid: "",
	spatial_extent: "",
	update_date: "",
	geom: undefined,
	data_last_update: "",
	metadata_xml: "",
};

export const translateTags = {
	table_name: "Nombre de la Tabla",
	schema_name: "Nombre del Esquema",
	title: "Título",
	purpose: "Propósito",
	abstract: "Resumen",
	md_dataidentification_language: "Idioma de Identificación de Datos",
	topiccategory: "Categoría del Tema",
	groupcategory: "Categoría de Grupo",
	keyword: "Palabras Clave",
	presentationform: "Forma de Presentación",
	ci_onlineresource_linkage: "Enlace del Recurso en Línea de CI",
	maintenanceandupdatefrequency: "Frecuencia de Mantenimiento y Actualización",
	md_dataidentification_characterset: "Conjunto de Caracteres de Identificación de Datos",
	specuse: "Uso Específico",
	datestamp: "Sello de Fecha",
	datetype: "Tipo de Fecha",
	date_creation: "Fecha de Creación",
	inpname: "Nombre INP",
	ci_responsibleparty_individualname: "Nombre Individual de la Parte Responsable de CI",
	ci_responsibleparty_organisationname: "Nombre de la Organización de la Parte Responsable de CI",
	ci_responsibleparty_positionname: "Nombre del Puesto de la Parte Responsable de CI",
	ci_responsibleparty_linkage: "Enlace de la Parte Responsable de CI",
	ci_responsibleparty_role: "Rol de la Parte Responsable de CI",
	westboundlongitude: "Longitud Oeste",
	eastboundlongitude: "Longitud Este",
	southboundlatitude: "Latitud Sur",
	northboundlatitude: "Latitud Norte",
	spatialrepresentationtype: "Tipo de Representación Espacial",
	latres: "Resolución Latitudinal",
	longres: "Resolución Longitudinal",
	geogunit: "Unidad Geográfica",
	lambertc_stdparll: "Lambert C Paralelo Estándar",
	lambertc_longcm: "Lambert C Meridiano Central",
	mercatort_latprjo: "Latitud de Proyección de Mercator",
	mercator_feast: "Este de la Proyección de Mercator",
	mercator_fnorth: "Norte de la Proyección de Mercator",
	mercator_sfec: "Escala de Factor de Escala de la Proyección de Mercator",
	ordres: "Ordenada de Resolución",
	absres: "Resolución Absoluta",
	distance_res: "Resolución de Distancia",
	bearing_res: "Resolución de Rumbo",
	bearing_uni: "Unidad de Rumbo",
	ref_bearing_dir: "Dirección de Rumbo de Referencia",
	ref_bearing_mer: "Meridiano de Rumbo de Referencia",
	plandu: "Unidad de Plano",
	local_desc: "Descripción Local",
	local_geo_inf: "Información Geográfica Local",
	horizdn: "Datum Horizontal",
	ellips: "Elipsoide",
	semiaxis: "Semieje",
	altenc: "Codificación de Altitud",
	categories: "Categorías",
	altres: "Altura de Resolución",
	altunits: "Unidades de Altitud",
	altdatum: "Datum de Altitud",
	depthdn: "Profundidad Datum",
	depthres: "Resolución de Profundidad",
	depthdu: "Unidad de Profundidad",
	level: "Nivel",
	dq_quantitativeresult: "Resultado Cuantitativo DQ",
	dq_completeness_nameofmeasure: "Nombre de la Medida de Completitud DQ",
	dq_logicconsistency_nameofmeasure: "Nombre de la Medida de Coherencia Lógica DQ",
	positionalaccuracy_nameofmeasure: "Nombre de la Medida de Precisión Posicional",
	temporalaccuracy_nameofmeasure: "Nombre de la Medida de Precisión Temporal",
	thematicaccuracy_nameofmeasure: "Nombre de la Medida de Precisión Temática",
	dq_completeness_measuredescription: "Descripción de la Medida de Completitud DQ",
	dq_logicconsistency_measuredescription: "Descripción de la Medida de Coherencia Lógica DQ",
	positionalaccuracy_measuredescription: "Descripción de la Medida de Precisión Posicional",
	temporalaccuracy_measuredescription: "Descripción de la Medida de Precisión Temporal",
	thematicaccuracy_measuredescription: "Descripción de la Medida de Precisión Temática",
	positionalaccuracy_valueunit: "Unidad de Valor de Precisión Posicional",
	temporalaccuracy_valueunit: "Unidad de Valor de Precisión Temporal",
	thematicaccuracy_valueunit: "Unidad de Valor de Precisión Temática",
	statement: "Declaración",
	entity_detail: "Detalle de la Entidad",
	graphfilename: "Nombre del Archivo Gráfico",
	md_format: "Formato MD",
	edition: "Edición",
	metadatastandardname: "Nombre del Estándar de Metadatos",
	metadatastandardversion: "Versión del Estándar de Metadatos",
	date: "Fecha",
	md_referencesystem: "Sistema de Referencia MD",
	geographicelement: "Elemento Geográfico",
	planar: "Plano",
	mapprojn: "Proyección de Mapa",
	gridcoordinatessystem: "Sistema de Coordenadas de Cuadrícula",
	coord_repres: "Representación de Coordenadas",
	li_processstep: "Paso de Procesamiento LI",
	li_source: "Fuente LI",
	spatial_level: "Nivel Espacial",
	minimum_optimal_scale: "Escala Mínima Óptima",
	maximum_optimal_scale: "Escala Máxima Óptima",
	publication_date: "Fecha de Publicación",
	publication_frequency: "Frecuencia de Publicación",
	utm_zone: "Zona UTM",
	license: "Licencia",
	confidentiality: "Confidencialidad",
	feature_count: "Cantidad de Elementos",
	geometry_type: "Tipo de Geometría",
	projection_name: "Nombre de Proyección",
	projection_authid: "ID de Autorización de Proyección",
	spatial_extent: "Extensión Espacial",
	update_date: "Fecha de Actualización",
	geom: "Geometría",
	data_last_update: "Última Actualización de Datos",
	metadata_xml: "Metadatos XML",
};
export const typesTags = {
	table_name: "text",
	schema_name: "text",
	title: "text",
	purpose: "textarea",
	abstract: "textarea",
	md_dataidentification_language: "text",
	topiccategory: "text",
	groupcategory: "text",
	keyword: "text",
	presentationform: "text",
	ci_onlineresource_linkage: "text",
	maintenanceandupdatefrequency: "text",
	md_dataidentification_characterset: "text",
	specuse: "text",
	datestamp: "text",
	datetype: "text",
	date_creation: "text",
	inpname: "text",
	ci_responsibleparty_individualname: "text",
	ci_responsibleparty_organisationname: "text",
	ci_responsibleparty_positionname: "text",
	ci_responsibleparty_linkage: "text",
	ci_responsibleparty_role: "text",
	westboundlongitude: "number",
	eastboundlongitude: "number",
	southboundlatitude: "number",
	northboundlatitude: "number",
	spatialrepresentationtype: "text",
	latres: "number",
	longres: "number",
	geogunit: "text",
	lambertc_stdparll: "number",
	lambertc_longcm: "number",
	mercatort_latprjo: "number",
	mercator_feast: "number",
	mercator_fnorth: "number",
	mercator_sfec: "number",
	ordres: "number",
	absres: "number",
	distance_res: "number",
	bearing_res: "number",
	bearing_uni: "text",
	ref_bearing_dir: "text",
	ref_bearing_mer: "text",
	plandu: "text",
	local_desc: "textarea",
	local_geo_inf: "text",
	horizdn: "text",
	ellips: "text",
	semiaxis: "number",
	altenc: "text",
	categories: "array",
	altres: "number",
	altunits: "text",
	altdatum: "text",
	depthdn: "text",
	depthres: "number",
	depthdu: "text",
	level: "text",
	dq_quantitativeresult: "text",
	dq_completeness_nameofmeasure: "text",
	dq_logicconsistency_nameofmeasure: "text",
	positionalaccuracy_nameofmeasure: "text",
	temporalaccuracy_nameofmeasure: "text",
	thematicaccuracy_nameofmeasure: "text",
	dq_completeness_measuredescription: "textarea",
	dq_logicconsistency_measuredescription: "textarea",
	positionalaccuracy_measuredescription: "textarea",
	temporalaccuracy_measuredescription: "textarea",
	thematicaccuracy_measuredescription: "textarea",
	positionalaccuracy_valueunit: "text",
	temporalaccuracy_valueunit: "text",
	thematicaccuracy_valueunit: "text",
	statement: "text",
	entity_detail: "text",
	graphfilename: "text",
	md_format: "text",
	edition: "text",
	metadatastandardname: "text",
	metadatastandardversion: "text",
	date: "text",
	md_referencesystem: "text",
	geographicelement: "text",
	planar: "text",
	mapprojn: "text",
	gridcoordinatessystem: "text",
	coord_repres: "text",
	li_processstep: "text",
	li_source: "text",
	spatial_level: "text",
	minimum_optimal_scale: "number",
	maximum_optimal_scale: "number",
	publication_date: "text",
	publication_frequency: "text",
	utm_zone: "number",
	license: "text",
	confidentiality: "text",
	feature_count: "text",
	geometry_type: "text",
	projection_name: "text",
	projection_authid: "text",
	spatial_extent: "text",
	update_date: "text",
	geom: "undefined",
	data_last_update: "text",
	metadata_xml: "text",
};
export const transformKeys = (data) => {
	const keys = [
		"title",
		"purpose",
		"abstract",
		"md_dataidentification_language",
		"topiccategory",
		"groupcategory",
		"keyword",
		"presentationform",
		"ci_onlineresource_linkage",
		"maintenanceandupdatefrequency",
		"md_dataidentification_characterset",
		"specuse",
		"datestamp",
		"datetype",
		"date_creation",
		"inpname",
		"ci_responsibleparty_individualname",
		"ci_responsibleparty_organisationname",
		"ci_responsibleparty_positionname",
		"ci_responsibleparty_linkage",
		"ci_responsibleparty_role",
		"westboundlongitude",
		"eastboundlongitude",
		"southboundlatitude",
		"northboundlatitude",
		"spatialrepresentationtype",
		"latres",
		"longres",
		"geogunit",
		"lambertc_stdparll",
		"lambertc_longcm",
		"mercatort_latprjo",
		"mercator_feast",
		"mercator_fnorth",
		"mercator_sfec",
		"ordres",
		"absres",
		"distance_res",
		"bearing_res",
		"bearing_uni",
		"ref_bearing_dir",
		"ref_bearing_mer",
		"plandu",
		"local_desc",
		"local_geo_inf",
		"horizdn",
		"ellips",
		"semiaxis",
		"altenc",
		"categories",
		"altres",
		"altunits",
		"altdatum",
		"depthdn",
		"depthres",
		"depthdu",
		"level",
		"dq_quantitativeresult",
		"dq_completeness_nameofmeasure",
		"dq_logicconsistency_nameofmeasure",
		"positionalaccuracy_nameofmeasure",
		"temporalaccuracy_nameofmeasure",
		"thematicaccuracy_nameofmeasure",
		"dq_completeness_measuredescription",
		"dq_logicconsistency_measuredescription",
		"positionalaccuracy_measuredescription",
		"temporalaccuracy_measuredescription",
		"thematicaccuracy_measuredescription",
		"positionalaccuracy_valueunit",
		"temporalaccuracy_valueunit",
		"thematicaccuracy_valueunit",
		"statement",
		"entity_detail",
		"graphfilename",
		"md_format",
		"edition",
		"metadatastandardname",
		"metadatastandardversion",
		"date",
		"md_referencesystem",
		"geographicelement",
		"planar",
		"mapprojn",
		"gridcoordinatessystem",
		"coord_repres",
		"li_processstep",
		"li_source",
		"spatial_level",
		"minimum_optimal_scale",
		"maximum_optimal_scale",
		"publication_date",
		"publication_frequency",
		"utm_zone",
		"license",
		"confidentiality",
		"feature_count",
		"geometry_type",
		"projection_name",
		"projection_authid",
		"spatial_extent",
		"update_date",
		"geom",
		"data_last_update",
	];
	let transformed: any = {};
	for (const key in data) {
		const k = key.toLowerCase();
		let currentKey = "";
		if (k in keys) {
			currentKey = k;
		} else {
			const {
				bestMatch: { target },
			} = findBestMatch(k, keys);
			currentKey = target;
		}
		if (currentKey in keys) {
			if (key.includes("keyword")) {
				if (typeof transformed[currentKey] === "undefined") transformed[currentKey] = [];
				transformed[currentKey].push(data[key]);
			} else {
				transformed = {
					...transformed,
					[currentKey]: data[key],
				};
			}
		}
	}
	if (transformed["keyword"]) transformed["keyword"] = transformed["keyword"].slice(0, -2);
	return transformed;
};

//    {label:"",tooltip:""},
export interface SchemasProps extends HTMLAtrributes<HTMLDivElement> {
	db: string;
	schema_name: MouseEventHandler;
	table_name: MouseEventHandler;
	currentSchema?: string;
}
