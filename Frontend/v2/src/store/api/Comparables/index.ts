/** @format */

import { saveAs } from "file-saver";
/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
import { IComparables} from "./types";
import { saveAs } from "file-saver";
export const ComparablesApi = createApi({
	reducerPath: "Comparables",
	baseQuery,
    endpoints: ({ query, mutation }) => ({
        getComparables: mutation<IComparables[], null>({
            query: () => ({
                url: `comparables/catastrales_comerciales`,
                method: "GET",
            }),
            
        }),
        getComparableId: mutation<IComparables, { id: string }>({
            query: ({ id }) => ({
                url: `comparables/catastrales_comerciales/${id}`,
                method: "GET",
            }),
        }),
        getCedulasMercado: query<IComparables[], null>({
            query: () => ({
                url: `comparables/cedulas/mercado`,
                method: "GET",
            }),
            transformResponse: ({ data, ...response }: any) => {
				
				return {
					data: data?.features ||[],
					...response,
				};
			},
        }),
        getCelulasMercadoId: mutation<IComparables, { id: string }>({
            query: ({ id }) => ({
                url: `comparables/cedulas/mercado/${id}`,
                method: "GET",
            }),
        }),
        getCelulasComparable: mutation<IComparables[], null>({
            query: () => ({
                url: `comparables/cedulas/comparable`,
                method: "GET",
            }),
        }),
        getCelulasComparableId: mutation<IComparables, { id: string }>({
            query: ({ id }) => ({
                url: `comparables/cedulas/comparable/${id}`,
                method: "GET",
            }),
        }),
        // requestReport: mutation<File, { id: string, data: any }>({
        //     query: ({ id, ...data }) => ({
        //         url: `comparables/catastrales_comerciales/${id}/report`,
        //         method: "POST",
        //         responseType: "blob",
		// 		data,
        //     }),
        // }),
        requestReport: mutation<File, { data: any }>({
            query: ({ type, ...data }) => ({
                url: `comparables/catastral_comercial/{type}/reporte`,
                method: "POST",
                responseType: "blob",
                data,
            }),
        }),
    }),
});

export const {
    useGetComparablesMutation,
    useGetComparableIdMutation,
    useGetCedulasMercadoQuery,
    useGetCelulasMercadoIdMutation,
    useGetCelulasComparableMutation,
    useGetCelulasComparableIdMutation,
    useRequestReportMutation,
} =ComparablesApi;
