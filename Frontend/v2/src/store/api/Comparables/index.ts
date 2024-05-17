/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
import { IComparables } from "./types";
import { saveAs } from "file-saver";
import { setComparables } from "../../reducers/Comparables";

export const ComparablesApi = createApi({
	reducerPath: "ComparablesApi",
	baseQuery,
	endpoints: ({ query, mutation }) => ({
		getCedulas: query<IComparables[], {username?:string}>({
			query: ({username}) => ({
				url: `${username?"un-auth/":""}comparables${username?`/${username}/`:"/"}cedulas`,
				method: "GET",
			}),
			transformResponse: ({ data, ...response }: any) => {
				return {
					data: data || [],
					...response,
				};
			},
		}),
		getCedula: mutation<IComparables, { id: string,username?:string }>({
			query: ({ id,username }) => ({
				url: `${username?"un-auth/":""}comparables${username?`/${username}/`:"/"}cedula/${id}`,
				method: "GET",
			}),
		}),
		postCedula: mutation<IComparables, { registro: string ,username?:string}>({
			query: ({ registro,username }) => ({
				url: `${username?"un-auth/":""}comparables${username?`/${username}/`:"/"}cedula/${registro}`,
				method: "POST",
			}),
		}),
		patchCedula: mutation<IComparables, { id: string; data: any,username?:string }>({
			query: ({ id, data,username }) => ({
				url: `${username?"un-auth/":""}comparables${username?`/${username}/`:"/"}cedula/${id}`,
				method: "PATCH",
				data,
			}),
		}),
		deleteCedula: mutation<IComparables, { id: string,username?:string }>({
			query: ({ id,username }) => ({
				url: `${username?"un-auth/":""}comparables${username?`/${username}/`:"/"}cedula/${id}`,
				method: "DELETE",
			}),
		}),
		getComparables: query<IComparables[], { cedula_mercado: number ,username?:string}>({
			query: ({ cedula_mercado,username }) => ({
				url: `${username?"un-auth/":""}comparables/${cedula_mercado}`,
				method: "GET",
			}),
			transformResponse: ({ data, ...response }: any) => {
				return {
					data: data?.features || [],
					...response,
				};
			},
		}),
		getComparable: mutation<IComparables, { id: string,username?:string }>({
			query: ({ id,username }) => ({
				url: `${username?"un-auth/":""}comparables/comparable/${id}`,
				method: "GET",
			}),
		}),
		comparableReport: mutation<
			IComparables,
			{ id: string; as_report: "mercado" | "cedula"; data: any }
		>({
			query: ({ id, as_report, data,username }) => ({
				url: `${username?"un-auth/":""}comparables/cedula/${id}/reporte/${as_report}`,
				method: "POST",
				responseType: "blob",
				data,
			}),
		}),
		postComparable: mutation<
			IComparables,
			{ tipo: string, id_cedula_mercado: number, id_comparable_catcom: number, username?:string }
		>({
			query: ({ tipo, id_cedula_mercado, id_comparable_catcom,username, ...data }) => ({
				url: `${username?"un-auth/":""}comparables/comparable/${id_cedula_mercado}/${tipo}/${id_comparable_catcom}`,
				method: "POST",
				data,
			}),
		}),
		patchComparable: mutation<IComparables, { id: string, data: any,username?:string }>({
			query: ({ id, data,username }) => ({
				url: `${username?"un-auth/":""}comparables/comparable/${id}`,
				method: "PATCH",
				data,
			}),
		}),
		deleteComparable: mutation<IComparables, { id: string ,username?:string}>({
			query: ({ id,username }) => ({
				url: `${username?"un-auth/":""}comparables/comparable/${id}`,
				method: "DELETE",
			}),
		}),
		reports: mutation<File, { cedula_mercado: number; as_report: string,username?:string }>({
			query: ({ cedula_mercado, as_report, data,username }) => ({
				url: `${username?"un-auth/":""}comparables/reports/${cedula_mercado}/${as_report}`,
				method: "POST",
				responseType: "blob",
				data,
			}),
		}),

		preview: mutation<
			IComparables,
			{
				cedula_mercado: number,
				data: any,username?:string
			}
		>({
			query: ({ cedula_mercado, data,username }) => ({
				url: `${username?"un-auth/":""}comparables/preview/${cedula_mercado}`,
				method: "POST",
				data,
			}),
		}),
		download: mutation<File, { cedula_mercado: number, data: any,username?:string }>({
			query: ({ cedula_mercado, data,username }) => ({
				url: `${username?"un-auth/":""}comparables/xlsx/${cedula_mercado}`,
				method: "POST",
				responseType: "blob",
				data,
			}),
			transformResponse: (response) => {
				//descargar archivo xlsx
				const blob = new Blob([response], {
					type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				});
				saveAs(blob, "comparables.xlsx");
				return response;
			},
		}),
		getImage: mutation<File, { fileName: string,username?:string }>({
			query: ({ fileName,username }) => ({
				url: `${username?"un-auth/":""}comparables/image/${fileName}`,
				method: "GET",
				responseType: "blob",
			}),
			transformResponse: (response) => {
				console.log(response);
			},
		}),
	}),
});

export const {
	useGetCedulasQuery,
	useGetCedulaMutation,
	usePostCedulaMutation,
	usePatchCedulaMutation,
	useDeleteCedulaMutation,
	useGetComparablesQuery,
	useGetComparableMutation,
	usePostComparableMutation,
	usePatchComparableMutation,
	useDeleteComparableMutation,
	useReportsMutation,
	usePreviewMutation,
	useComparableReportMutation,
	useDownloadMutation,
	useGetImageMutation,
} = ComparablesApi;
