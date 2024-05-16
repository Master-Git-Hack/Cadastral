/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
import { ICatastral } from "./types";
export const ReporteCatastralApi = createApi({
	reducerPath: "ReporteCatastral",
	baseQuery,
	endpoints: (builder) => ({
		getReporte: builder.mutation<
			unknown,
			{ year: number; collection: number; from: number; to: number }
		>({
			query: ({ year, collection, from, to }) => ({
				url: `/catastrales/registros/${year}/${collection}/${from}/${to}`,
				method: "GET",
			}),
			// transformResponse: async (response: any) => {
			// 	if (!response.ok) {
			// 		const blob = await response.blob();
			// 		return Promise.reject(new Error(await blob.text()));
			// 	}
			// 	return response.blob();
			// },
			// transformErrorResponse: (error) => {
			// 	if (error.data) {
			// 		return error.data;
			// 	}
			// 	return error;
			// },
		}),
	}),
});

export const { useGetReporteMutation } = ReporteCatastralApi;
//const { data, error, isLoading,isFetching } = useGetCatastralQuery();
