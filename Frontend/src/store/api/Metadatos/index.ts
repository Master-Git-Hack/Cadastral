/** @format */

import { saveAs } from "file-saver";
/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
import { IMetadatos } from "./types";
import { saveAs } from "file-saver";
export const MetadatosApi = createApi({
	reducerPath: "Metadatos",
	baseQuery,
	endpoints: ({ query, mutation }) => ({
		getMetadatosPreview: query<IMetadatos[], null>({
			query: () => ({
				url: `metadatos/preview`,
				method: "GET",
			}),
		}),
		getMetadatos: query<IMetadatos[], null>({
			query: () => ({
				url: `metadatos/complete`,
				method: "GET",
			}),
			transformResponse: ({ data, ...response }: any) => ({
				data: data.reduce((acc, obj) => {
					if (obj.features && Array.isArray(obj.features)) {
						acc.push(...obj.features);
						delete obj.features;
					}
					return acc;
				}, []),
				...response,
			}),
		}),
		getMetadatoReport: mutation<File, { uid: string }>({
			query: ({ uid }) => ({
				url: `metadatos/${uid}/report`,
				method: "GET",
			}),
		}),
		viewMetadatoReport: query<Blob, { uid: string }>({
			query: ({ uid }) => ({
				url: `metadatos/${uid}/report`,
				method: "GET",
			}),
			transformResponse: ({ file, ...response }: any) => {
				saveAs(file, file?.name ?? "reporte.pdf");
				return { ...response, file };
			},
		}),
		getMetadato: query<IMetadatos, { uid: string }>({
			query: ({ uid }) => ({
				url: `metadatos/${uid}`,
				method: "GET",
			}),
			transformResponse: ({ data, ...response }: any) => ({
				data: data[0],
				...response,
			}),
		}),

		postMetadato: mutation<IMetadatos, { data: IMetadatos }>({
			query: ({ data }) => ({
				url: `metadatos/create/${data.table_name}`,
				method: "POST",
				data,
			}),
		}),
		patchMetadato: mutation<IMetadatos, { data: IMetadatos }>({
			query: ({ data }) => ({
				url: `metadatos/${data.id}`,
				method: "PATCH",
				data,
			}),
		}),
		getAllTemporal: query<IMetadatos[], null>({
			query: () => ({
				url: `metadatos/temporal`,
				method: "GET",
			}),
		
		}),
		getTemporal: query<IMetadatos, { uid: string }>({
			query: ({ uid }) => ({
				url: `metadatos/temporal/${uid}`,
				method: "GET",
			}),
			
		
		}),
		postTemporal: mutation<IMetadatos, { data: IMetadatos }>({
			query: ({ data }) => ({
				url: `metadatos/temporal/create`,
				method: "POST",
				data,
			}),
		
		}),
		patchTemporal: mutation<IMetadatos, { data: IMetadatos }>({
			query: ({ data }) => ({
				url: `metadatos/temporal/${data.uid}`,
				method: "PATCH",
				data,
			}),
		
		
		}),
		deleteTemporal: mutation<IMetadatos, { uid: string }>({
			query: ({ uid }) => ({
				url: `metadatos/temporal/${uid}`,
				method: "DELETE",
			}),
		
		
		}),
	}),
});

export const {
	useGetMetadatosPreviewQuery,
	useGetMetadatosQuery,
	useGetMetadatoQuery,
	usePostMetadatoMutation,
	usePatchMetadatoMutation,
	useGetMetadatoReportMutation,
	useViewMetadatoReportQuery,
	useGetAllTemporalQuery,
	useGetTemporalQuery,
	usePostTemporalMutation,
	usePatchTemporalMutation,
	useDeleteTemporalMutation,
} = MetadatosApi;
