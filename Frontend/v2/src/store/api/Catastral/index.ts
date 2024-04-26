/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
import { ICatastral } from "./types";
export const ReporteCatastralApi = createApi({
	reducerPath: "ReporteCatastral",
	baseQuery,
	endpoints: (builder) => ({
		getReporte: builder.mutation<Blob, { fileName: string }>({
			query: ({ fileName, ...data }) => ({
				url: `reporte-catastral/${fileName}`,
				method: "POST",
				responseType: "blob",
				data,
			}),
			transformResponse: async (response: any) => {
				if (!response.ok) {
					const blob = await response.blob();
					return Promise.reject(new Error(await blob.text()));
				}
				return response.blob();
			},
			transformErrorResponse: (error) => {
				if (error.data) {
					return error.data;
				}
				return error;
			},
		}),
	}),
});

export const { useGetReporteMutation } = ReporteCatastralApi;
//const { data, error, isLoading,isFetching } = useGetCatastralQuery();