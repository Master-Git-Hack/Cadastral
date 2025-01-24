/** @format */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api } from "../api.config";
import { NextRouter } from "next/router";
import moment from "moment";
export interface IMetadatosState {
	id?: number;
	uid?: string;
	db_name: string;
	username?: string;
	table_name: string;
	schema_name: string;
	title?: string;
	purpose?: string;
	abstract?: string;
	md_dataidentification_language?: string;
	topiccategory?: string;
	groupcategory?: string;
	keyword?: string;
	presentationform?: string;
	ci_onlineresource_linkage?: string;
	maintenanceandupdatefrequency?: string;
	md_dataidentification_characterset?: string;

	specuse?: string;
	datestamp?: string;
	datetype?: string;
	date_creation?: string;
	inpname: string;
	inp_name?: string;
	ci_responsibleparty_individualname?: string;
	ci_responsibleparty_organisationname?: string;
	ci_responsibleparty_positionname?: string;
	ci_responsibleparty_linkage?: string;
	ci_responsibleparty_role?: string;
	westboundlongitude?: number;
	eastboundlongitude?: number;
	southboundlatitude?: number;
	northboundlatitude?: number;
	spatialrepresentationtype?: string;
	latres?: number;
	longres?: number;
	geogunit?: string;
	lambertc_stdparll?: string;
	lambertc_longcm?: string;
	mercatort_latprjo?: number;
	mercator_feast?: number;
	mercator_fnorth?: number;
	mercator_sfec?: number;

	ordres?: number;
	absres?: number;
	distance_res?: number;
	bearing_res?: number;
	bearing_uni?: string;
	ref_bearing_dir?: string;
	ref_bearing_mer?: string;
	plandu?: string;
	local_desc?: string;
	local_geo_inf?: string;
	horizdn?: string;
	ellips?: string;
	semiaxis?: number;
	altenc?: string;
	categories?: string[];
	altres?: number;
	altunits?: string;
	altdatum?: string;
	depthdn?: string;
	depthres?: number;
	depthdu?: string;
	level?: string;
	dq_quantitativeresult?: string;
	dq_completeness_nameofmeasure?: string;
	dq_logicconsistency_nameofmeasure?: string;
	positionalaccuracy_nameofmeasure?: string;
	temporalaccuracy_nameofmeasure?: string;
	thematicaccuracy_nameofmeasure?: string;
	dq_completeness_measuredescription?: string;
	dq_logicconsistency_measuredescription?: string;
	positionalaccuracy_measuredescription?: string;
	temporalaccuracy_measuredescription?: string;
	thematicaccuracy_measuredescription?: string;
	positionalaccuracy_valueunit?: string;
	temporalaccuracy_valueunit?: string;
	thematicaccuracy_valueunit?: string;
	li_source_description?: string;
	entity_detail?: string;
	graphfilename?: string;
	md_format?: string;
	edition?: string;
	metadatastandardname?: string;
	metadatastandardversion?: string;
	date?: string;
	md_referencesystem?: string;
	geographicelement?: string;
	planar?: string;
	mapprojn?: string;
	gridcoordinatessystem?: string;

	coord_repres?: string;

	li_processstep?: string;
	li_source?: string;
	spatial_level?: string;
	minimum_optimal_scale?: number;
	maximum_optimal_scale?: number;
	publication_date?: string;
	publication_frequency?: string;
	utm_zone?: number;
	license?: string;
	confidentiality?: string;
	feature_count?: string;
	geometry_type?: string;
	projection_name?: string;
	projection_authid?: string;
	spatial_extent?: string;
	update_date?: string;
	geom?: unknown;
	data_last_update?: string;
	themes?: string[];
	metadata_xml?: string;
	is_latest?: boolean;
	version?: number;
	parent_id?: number;
}
export interface IMetadatatosActions {
	getMetadatosPreview: (router?: NextRouter) => Promise<void>;
	getMetadatos: (router?: NextRouter) => Promise<IMetadatosState[]>;
	getMetadato: (uid: string, isTemporal?: boolean, router?: NextRouter) => Promise<void>;
	postMetadato: (router?: NextRouter) => Promise<void>;
	patchMetadato: (router?: NextRouter) => Promise<void>;
	getMetadatoReport: (uid: string, router?: NextRouter) => Promise<void>;
	viewMetadatoReport: (uid: string, router?: NextRouter) => Promise<Blob>;
	getAllTemporal: (router?: NextRouter) => Promise<void>;
	getTemporal: (uid: string, router?: NextRouter) => Promise<void>;
	postTemporal: (router?: NextRouter) => Promise<void>;
	patchTemporal: (router?: NextRouter) => Promise<void>;
	deleteTemporal: (uid: string, router?: NextRouter) => Promise<void>;
	clearMetadatos: (router?: NextRouter) => void;
	setMetadatos: (data: IMetadatosState, router?: NextRouter) => void;
	getResources: (router?: NextRouter) => Promise<void>;
	getPrevious: (id: number, router?: NextRouter) => Promise<void>;
	newVersion: (id: number, router?: NextRouter) => Promise<void>;
}
const useMetadatos = create<IMetadatosState & IMetadatatosActions>()(
	persist(
		(set, get) => ({
			db_name: "",
			table_name: "",
			schema_name: "",
			title: "",
			purpose: "",
			abstract: "",
			md_dataidentification_language: "ES-Español",
			topiccategory: [],
			groupcategory: "",
			keyword: [],
			presentationform: [],
			ci_onlineresource_linkage: "postgresql://user:password@server///",
			maintenanceandupdatefrequency: "",
			md_dataidentification_characterset:
				"4. Utf8. Formato de Transferencia UCS de tamaño variable de 8-bit, basado en ISO/IEC 10646",
			specuse: "",
			date: moment().format("YYYY-MM-DD"),
			datetype: "",
			date_creation: moment().format("YYYY-MM-DD"),
			inpname: "",
			inp_name: "",
			ci_responsibleparty_individualname: "",
			ci_responsibleparty_organisationname: "",
			ci_responsibleparty_positionname: "",
			ci_responsibleparty_voice: "",
			ci_responsibleparty_administrativearea: "",
			ci_responsibleparty_linkage: "",
			ci_responsibleparty_role: "",
			westboundlongitude: 0,
			eastboundlongitude: 0,
			southboundlatitude: 0,
			northboundlatitude: 0,
			spatialrepresentationtype:
				"1. Vector. Los datos vectoriales se utilizan para representar datos espaciales",
			utm_zone: 14,
			utm_sfctrmer: 0.9996,
			utm_longcm: -99.0,
			utm_latprjo: 1,
			utm_feast: 1,
			utm_fnorth: 1,
			horizdn: "",
			ellips: "",
			semiaxis: 0.0000001,
			denflat: 0,
			level: "",
			li_source_description: "",
			li_processstep_description: "",
			schemaascii: "",
			entity_detail: "postgresql://user:password@server///",
			accessconstraints: "",
			useconstraints: [],
			otherconstraints: "",
			metadatastandardname: "ISO 19115:2003 (Norma Técnica para Metadatos).",
			inf_metadata_ci_responsibleparty_organisationname:
				"Coordinación de Plataformas Geomáticas Catastrales",
			inf_metadata_ci_responsibleparty_voice: "473 7351500 Extensión 2404",
			ci_responsibleparty_deliverypoint: "Paseo de la Presa 172, Zona Centro.",
			ci_responsibleparty_city: "Guanajuato",
			ci_responsibleparty_postalcode: "36000",
			ci_responsibleparty_country: "México",
			ci_responsibleparty_electronicmailaddress: "catastro@guanajuato.gob.mx",
			inf_metadata_ci_responsibleparty_role:
				"2.Custodio.Parte que acepta la responsabilidad de los datos y asegura un cuidado apropiado y el mantenimiento del recurso",
			datestamp: moment().format("YYYY-MM-DD"),
			update_date: moment().format("YYYY-MM-DD"),
			geom: undefined,
			metadata_xml: "",
			is_latest: true,
			version: 1,
			parent_id: null,
			getMetadatosPreview: async (router?: NextRouter) =>
				await api.get("metadatos/preview", {}, router),
			getMetadatos: async (router?: NextRouter) =>
				await api.get("metadatos/complete", {}, router),
			getResources: async (router?: NextRouter) =>
				await api.get("metadatos/resources", {}, router),
			getMetadato: async (uid: string, isTemporal: boolean = false, router?: NextRouter) => {
				const {
					data: { data },
				} = await api.get(`metadatos${isTemporal ? "/temporal/" : "/"}${uid}`, {}, router);
				set(data);
			},
			postMetadato: async (router?: NextRouter) => {
				const {
					uid,
					db_name,
					table_name,
					schema_name,
					title,
					purpose,
					abstract,
					md_dataidentification_language,
					topiccategory,
					groupcategory,
					keyword,
					presentationform,
					ci_onlineresource_linkage,
					maintenanceandupdatefrequency,
					md_dataidentification_characterset,
					specuse,
					date,
					datetype,
					date_creation,
					inpname,
					inp_name,
					ci_responsibleparty_individualname,
					ci_responsibleparty_organisationname,
					ci_responsibleparty_positionname,
					ci_responsibleparty_voice,
					ci_responsibleparty_administrativearea,
					ci_responsibleparty_linkage,
					ci_responsibleparty_role,
					westboundlongitude,
					eastboundlongitude,
					southboundlatitude,
					northboundlatitude,
					spatialrepresentationtype,
					utm_zone4,
					utm_sfctrmer,
					utm_longcm,
					utm_latprjo,
					utm_feast,
					utm_fnorth,
					horizdn,
					ellips,
					semiaxis,
					denflat,
					level,
					li_source_description,
					li_processstep_description,
					schemaascii,
					entity_detail,
					accessconstraints,
					useconstraints,
					otherconstraints,
					metadatastandardname,
					inf_metadata_ci_responsibleparty_organisationname,
					inf_metadata_ci_responsibleparty_voice,
					ci_responsibleparty_deliverypoint,
					ci_responsibleparty_city,
					ci_responsibleparty_postalcode,
					ci_responsibleparty_country,
					ci_responsibleparty_electronicmailaddress,
					inf_metadata_ci_responsibleparty_role,
					datestamp,
					update_date,
					geom,
					metadata_xml,
					is_latest,
					version,
					parent_id,
				} = get();
				return await api.post(
					"metadatos/create",
					{
						uid,
						db_name,
						table_name,
						schema_name,
						title,
						purpose,
						abstract,
						md_dataidentification_language,
						topiccategory,
						groupcategory,
						keyword,
						presentationform,
						ci_onlineresource_linkage,
						maintenanceandupdatefrequency,
						md_dataidentification_characterset,
						specuse,
						date,
						datetype,
						date_creation,
						inpname,
						inp_name,
						ci_responsibleparty_individualname,
						ci_responsibleparty_organisationname,
						ci_responsibleparty_positionname,
						ci_responsibleparty_voice,
						ci_responsibleparty_administrativearea,
						ci_responsibleparty_linkage,
						ci_responsibleparty_role,
						westboundlongitude,
						eastboundlongitude,
						southboundlatitude,
						northboundlatitude,
						spatialrepresentationtype,
						utm_zone4,
						utm_sfctrmer,
						utm_longcm,
						utm_latprjo,
						utm_feast,
						utm_fnorth,
						horizdn,
						ellips,
						semiaxis,
						denflat,
						level,
						li_source_description,
						li_processstep_description,
						schemaascii,
						entity_detail,
						accessconstraints,
						useconstraints,
						otherconstraints,
						metadatastandardname,
						inf_metadata_ci_responsibleparty_organisationname,
						inf_metadata_ci_responsibleparty_voice,
						ci_responsibleparty_deliverypoint,
						ci_responsibleparty_city,
						ci_responsibleparty_postalcode,
						ci_responsibleparty_country,
						ci_responsibleparty_electronicmailaddress,
						inf_metadata_ci_responsibleparty_role,
						datestamp,
						update_date,
						geom,
						metadata_xml,
						is_latest,
						version,
						parent_id,
					},
					{},
					router,
				);
			},
			patchMetadato: async (router?: NextRouter) => {
				const {
					uid,
					db_name,
					table_name,
					schema_name,
					title,
					purpose,
					abstract,
					md_dataidentification_language,
					topiccategory,
					groupcategory,
					keyword,
					presentationform,
					ci_onlineresource_linkage,
					maintenanceandupdatefrequency,
					md_dataidentification_characterset,
					specuse,
					date,
					datetype,
					date_creation,
					inpname,
					inp_name,
					ci_responsibleparty_individualname,
					ci_responsibleparty_organisationname,
					ci_responsibleparty_positionname,
					ci_responsibleparty_voice,
					ci_responsibleparty_administrativearea,
					ci_responsibleparty_linkage,
					ci_responsibleparty_role,
					westboundlongitude,
					eastboundlongitude,
					southboundlatitude,
					northboundlatitude,
					spatialrepresentationtype,
					utm_zone4,
					utm_sfctrmer,
					utm_longcm,
					utm_latprjo,
					utm_feast,
					utm_fnorth,
					horizdn,
					ellips,
					semiaxis,
					denflat,
					level,
					li_source_description,
					li_processstep_description,
					schemaascii,
					entity_detail,
					accessconstraints,
					useconstraints,
					otherconstraints,
					metadatastandardname,
					inf_metadata_ci_responsibleparty_organisationname,
					inf_metadata_ci_responsibleparty_voice,
					ci_responsibleparty_deliverypoint,
					ci_responsibleparty_city,
					ci_responsibleparty_postalcode,
					ci_responsibleparty_country,
					ci_responsibleparty_electronicmailaddress,
					inf_metadata_ci_responsibleparty_role,
					datestamp,
					update_date,
					geom,
					metadata_xml,
					is_latest,
					version,
					parent_id,
				} = get();
				return await api.patch(
					`metadatos/${uid}`,
					{
						uid,
						db_name,
						table_name,
						schema_name,
						title,
						purpose,
						abstract,
						md_dataidentification_language,
						topiccategory,
						groupcategory,
						keyword,
						presentationform,
						ci_onlineresource_linkage,
						maintenanceandupdatefrequency,
						md_dataidentification_characterset,
						specuse,
						date,
						datetype,
						date_creation,
						inpname,
						inp_name,
						ci_responsibleparty_individualname,
						ci_responsibleparty_organisationname,
						ci_responsibleparty_positionname,
						ci_responsibleparty_voice,
						ci_responsibleparty_administrativearea,
						ci_responsibleparty_linkage,
						ci_responsibleparty_role,
						westboundlongitude,
						eastboundlongitude,
						southboundlatitude,
						northboundlatitude,
						spatialrepresentationtype,
						utm_zone4,
						utm_sfctrmer,
						utm_longcm,
						utm_latprjo,
						utm_feast,
						utm_fnorth,
						horizdn,
						ellips,
						semiaxis,
						denflat,
						level,
						li_source_description,
						li_processstep_description,
						schemaascii,
						entity_detail,
						accessconstraints,
						useconstraints,
						otherconstraints,
						metadatastandardname,
						inf_metadata_ci_responsibleparty_organisationname,
						inf_metadata_ci_responsibleparty_voice,
						ci_responsibleparty_deliverypoint,
						ci_responsibleparty_city,
						ci_responsibleparty_postalcode,
						ci_responsibleparty_country,
						ci_responsibleparty_electronicmailaddress,
						inf_metadata_ci_responsibleparty_role,
						datestamp,
						update_date,
						geom,
						metadata_xml,
						is_latest,
						version,
						parent_id,
					},
					{},
					router,
				);
			},
			getMetadatoReport: async (uid: string, router?: NextRouter) =>
				await api.get(`metadatos/report/${uid}`, {}, router),
			viewMetadatoReport: async (uid: string, router?: NextRouter) =>
				await api.get(`metadatos/report/${uid}`, { responseType: "blob" }, router),
			getAllTemporal: async (router?: NextRouter) =>
				await api.get(`metadatos/temporal`, {}, router),
			getTemporal: async (uid: string, router?: NextRouter) => {
				const {
					data: { data },
				} = await api.get(`metadatos/temporal/${uid}`, {}, router);
				set(data);
			},
			postTemporal: async (router?: NextRouter) => {
				const {
					uid,
					db_name,
					table_name,
					schema_name,
					title,
					purpose,
					abstract,
					md_dataidentification_language,
					topiccategory,
					groupcategory,
					keyword,
					presentationform,
					ci_onlineresource_linkage,
					maintenanceandupdatefrequency,
					md_dataidentification_characterset,
					specuse,
					date,
					datetype,
					date_creation,
					inpname,
					inp_name,
					ci_responsibleparty_individualname,
					ci_responsibleparty_organisationname,
					ci_responsibleparty_positionname,
					ci_responsibleparty_voice,
					ci_responsibleparty_administrativearea,
					ci_responsibleparty_linkage,
					ci_responsibleparty_role,
					westboundlongitude,
					eastboundlongitude,
					southboundlatitude,
					northboundlatitude,
					spatialrepresentationtype,
					utm_zone4,
					utm_sfctrmer,
					utm_longcm,
					utm_latprjo,
					utm_feast,
					utm_fnorth,
					horizdn,
					ellips,
					semiaxis,
					denflat,
					level,
					li_source_description,
					li_processstep_description,
					schemaascii,
					entity_detail,
					accessconstraints,
					useconstraints,
					otherconstraints,
					metadatastandardname,
					inf_metadata_ci_responsibleparty_organisationname,
					inf_metadata_ci_responsibleparty_voice,
					ci_responsibleparty_deliverypoint,
					ci_responsibleparty_city,
					ci_responsibleparty_postalcode,
					ci_responsibleparty_country,
					ci_responsibleparty_electronicmailaddress,
					inf_metadata_ci_responsibleparty_role,
					datestamp,
					update_date,
					geom,
					metadata_xml,
					is_latest,
					version,
					parent_id,
				} = get();
				return await api.post(
					"metadatos/temporal/create",
					{
						datos: {
							db_name,
							table_name,
							schema_name,
							title,
							purpose,
							abstract,
							md_dataidentification_language,
							topiccategory,
							groupcategory,
							keyword,
							presentationform,
							ci_onlineresource_linkage,
							maintenanceandupdatefrequency,
							md_dataidentification_characterset,
							specuse,
							date,
							datetype,
							date_creation,
							inpname,
							inp_name,
							ci_responsibleparty_individualname,
							ci_responsibleparty_organisationname,
							ci_responsibleparty_positionname,
							ci_responsibleparty_voice,
							ci_responsibleparty_administrativearea,
							ci_responsibleparty_linkage,
							ci_responsibleparty_role,
							westboundlongitude,
							eastboundlongitude,
							southboundlatitude,
							northboundlatitude,
							spatialrepresentationtype,
							utm_zone4,
							utm_sfctrmer,
							utm_longcm,
							utm_latprjo,
							utm_feast,
							utm_fnorth,
							horizdn,
							ellips,
							semiaxis,
							denflat,
							level,
							li_source_description,
							li_processstep_description,
							schemaascii,
							entity_detail,
							accessconstraints,
							useconstraints,
							otherconstraints,
							metadatastandardname,
							inf_metadata_ci_responsibleparty_organisationname,
							inf_metadata_ci_responsibleparty_voice,
							ci_responsibleparty_deliverypoint,
							ci_responsibleparty_city,
							ci_responsibleparty_postalcode,
							ci_responsibleparty_country,
							ci_responsibleparty_electronicmailaddress,
							inf_metadata_ci_responsibleparty_role,
							datestamp,
							update_date,
							geom,
							metadata_xml,
							is_latest,
							version,
							parent_id,
						},
					},
					{},
					router,
				);
			},
			patchTemporal: async (router?: NextRouter) => {
				const {
					uid,
					db_name,
					table_name,
					schema_name,
					title,
					purpose,
					abstract,
					md_dataidentification_language,
					topiccategory,
					groupcategory,
					keyword,
					presentationform,
					ci_onlineresource_linkage,
					maintenanceandupdatefrequency,
					md_dataidentification_characterset,
					specuse,
					date,
					datetype,
					date_creation,
					inpname,
					inp_name,
					ci_responsibleparty_individualname,
					ci_responsibleparty_organisationname,
					ci_responsibleparty_positionname,
					ci_responsibleparty_voice,
					ci_responsibleparty_administrativearea,
					ci_responsibleparty_linkage,
					ci_responsibleparty_role,
					westboundlongitude,
					eastboundlongitude,
					southboundlatitude,
					northboundlatitude,
					spatialrepresentationtype,
					utm_zone4,
					utm_sfctrmer,
					utm_longcm,
					utm_latprjo,
					utm_feast,
					utm_fnorth,
					horizdn,
					ellips,
					semiaxis,
					denflat,
					level,
					li_source_description,
					li_processstep_description,
					schemaascii,
					entity_detail,
					accessconstraints,
					useconstraints,
					otherconstraints,
					metadatastandardname,
					inf_metadata_ci_responsibleparty_organisationname,
					inf_metadata_ci_responsibleparty_voice,
					ci_responsibleparty_deliverypoint,
					ci_responsibleparty_city,
					ci_responsibleparty_postalcode,
					ci_responsibleparty_country,
					ci_responsibleparty_electronicmailaddress,
					inf_metadata_ci_responsibleparty_role,
					datestamp,
					update_date,
					geom,
					metadata_xml,
					is_latest,
					version,
					parent_id,
				} = get();
				return await api.patch(
					`metadatos/temporal/${uid}`,
					{
						datos: {
							uid,
							db_name,
							table_name,
							schema_name,
							title,
							purpose,
							abstract,
							md_dataidentification_language,
							topiccategory,
							groupcategory,
							keyword,
							presentationform,
							ci_onlineresource_linkage,
							maintenanceandupdatefrequency,
							md_dataidentification_characterset,
							specuse,
							date,
							datetype,
							date_creation,
							inpname,
							inp_name,
							ci_responsibleparty_individualname,
							ci_responsibleparty_organisationname,
							ci_responsibleparty_positionname,
							ci_responsibleparty_voice,
							ci_responsibleparty_administrativearea,
							ci_responsibleparty_linkage,
							ci_responsibleparty_role,
							westboundlongitude,
							eastboundlongitude,
							southboundlatitude,
							northboundlatitude,
							spatialrepresentationtype,
							utm_zone4,
							utm_sfctrmer,
							utm_longcm,
							utm_latprjo,
							utm_feast,
							utm_fnorth,
							horizdn,
							ellips,
							semiaxis,
							denflat,
							level,
							li_source_description,
							li_processstep_description,
							schemaascii,
							entity_detail,
							accessconstraints,
							useconstraints,
							otherconstraints,
							metadatastandardname,
							inf_metadata_ci_responsibleparty_organisationname,
							inf_metadata_ci_responsibleparty_voice,
							ci_responsibleparty_deliverypoint,
							ci_responsibleparty_city,
							ci_responsibleparty_postalcode,
							ci_responsibleparty_country,
							ci_responsibleparty_electronicmailaddress,
							inf_metadata_ci_responsibleparty_role,
							datestamp,
							update_date,
							geom,
							metadata_xml,
							is_latest,
							version,
							parent_id,
						},
						uid,
					},
					{},
					router,
				);
			},
			deleteTemporal: async (uid: string, router?: NextRouter) =>
				await api.delete(`metadatos/temporal/${uid}`, {}, router),
			clearMetadatos: () =>
				set({
					db_name: "",
					table_name: "",
					schema_name: "",
					title: "",
					purpose: "",
					abstract: "",
					md_dataidentification_language: "ES-Español",
					topiccategory: [],
					groupcategory: "",
					keyword: [],
					presentationform: [],
					ci_onlineresource_linkage: "postgresql://user:password@server///",
					maintenanceandupdatefrequency: "",
					md_dataidentification_characterset:
						"4. Utf8. Formato de Transferencia UCS de tamaño variable de 8-bit, basado en ISO/IEC 10646",
					specuse: "",
					date: moment().format("YYYY-MM-DD"),
					datetype: "",
					date_creation: moment().format("YYYY-MM-DD"),
					inpname: "",

					ci_responsibleparty_individualname: "",
					ci_responsibleparty_organisationname: "",
					ci_responsibleparty_positionname: "",
					ci_responsibleparty_voice: "",
					ci_responsibleparty_administrativearea: "",
					ci_responsibleparty_linkage: "",
					ci_responsibleparty_role: "",
					westboundlongitude: 0,
					eastboundlongitude: 0,
					southboundlatitude: 0,
					northboundlatitude: 0,
					spatialrepresentationtype:
						"1. Vector. Los datos vectoriales se utilizan para representar datos espaciales",
					utm_zone: 14,
					utm_sfctrmer: 0.9996,
					utm_longcm: -99.0,
					utm_latprjo: 1,
					utm_feast: 1,
					utm_fnorth: 1,
					horizdn: "",
					ellips: "",
					semiaxis: 0.0000001,
					denflat: 0,
					level: "",
					li_source_description: "",
					li_processstep_description: "",
					schemaascii: "",
					entity_detail: "postgresql://user:password@server///",
					accessconstraints: "",
					useconstraints: [],
					otherconstraints: "",
					metadatastandardname: "ISO 19115:2003 (Norma Técnica para Metadatos).",
					inf_metadata_ci_responsibleparty_organisationname:
						"Coordinación de Plataformas Geomáticas Catastrales",
					inf_metadata_ci_responsibleparty_voice: "473 7351500 Extensión 2404",
					ci_responsibleparty_deliverypoint: "Paseo de la Presa 172, Zona Centro.",
					ci_responsibleparty_city: "Guanajuato",
					ci_responsibleparty_postalcode: "36000",
					ci_responsibleparty_country: "México",
					ci_responsibleparty_electronicmailaddress: "catastro@guanajuato.gob.mx",
					inf_metadata_ci_responsibleparty_role:
						"2.Custodio.Parte que acepta la responsabilidad de los datos y asegura un cuidado apropiado y el mantenimiento del recurso",
					datestamp: moment().format("YYYY-MM-DD"),
					update_date: moment().format("YYYY-MM-DD"),
					geom: undefined,
					metadata_xml: "",
				}),
			setMetadatos: (data: IMetadatosState) => set(data),
			getPrevious: async (id: number, router?: NextRouter) =>
				await api.get(`metadatos/version/previous?id=${id}`, {}, router),
			newVersion: async (id: number, router?: NextRouter) =>
				await api.get(`metadatos/version/create?id=${id}`, {}, router),
		}),
		{
			name: "metadatos-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
export default useMetadatos;
