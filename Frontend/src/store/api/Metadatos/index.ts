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
			transformResponse: ({ data, ...response }: any) => {
				console.log(data);
				return {
					data: data?.features,
					...response,
				};
			},
		}),
		getMetadatoReport: mutation<File, { uid: string }>({
			query: ({ uid }) => ({
				url: `metadatos/${uid}/report`,
				method: "GET",
			}),
		}),
		viewMetadatoReport: query<Blob, { uid: string }>({
			query: ({ uid }) => ({
				url: `metadatos/report/${uid}`,
				method: "GET",
				responseType: "blob",
			}),
			// transformResponse: (response: any) => {

			// 	return {  file:URL.createObjectURL(response) };
			// },
		}),
		getMetadato: query<IMetadatos, { uid: string; isTemporal: boolean }>({
			query: ({ uid, isTemporal }) => ({
				url: `metadatos${isTemporal ? "/temporal/" : "/"}${uid}`,
				method: "GET",
			}),
		}),

		postMetadato: mutation<IMetadatos, { data: IMetadatos }>({
			query: ({ data }) => ({
				url: `metadatos/create`,
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
			transformResponse: ({ data, ...response }: any) => ({
				data: data?.features ?? [],
				...response,
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
