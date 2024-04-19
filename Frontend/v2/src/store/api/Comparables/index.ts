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
        
        getCedulas: query<IComparables[], null>({
            query: () => ({
                url: `comparables/cedulas`,
                method: "GET",
            }),
            transformResponse: ({ data, ...response }: any) => {
                return {
                    data: data || [],
                    ...response,
                };
            },
        }),
        getCedula: mutation<IComparables, { id: string }>({
            query: ({ id }) => ({
                url: `comparables/cedula/${id}`,
                method: "GET",
            }),
        }),
        postCedula: mutation<IComparables, { registro: string }>({
            query: ({ registro }) => ({
                url: `comparables/cedula/${registro}`,
                method: "POST",
            }),
        }),
        patchCedula: mutation<IComparables, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `comparables/cedula/${id}`,
                method: "PATCH",
                data ,
            }),
        }),
        deleteCedula: mutation<IComparables, { id: string }>({
            query: ({ id }) => ({
                url: `comparables/cedula/${id}`,
                method: "DELETE",
            }),
        }),
        getComparables: query<IComparables[], {cedula_mercado:number}>({
            query: ({cedula_mercado}) => ({
                url: `comparables/${cedula_mercado}`,
                method: "GET",
            }),
            transformResponse: ({ data, ...response }: any) => {
                return {
                    data: data?.features || [],
                    ...response,
                };
            },
        }),
        getComparable: mutation<IComparables, { id: string }>({
            query: ({ id }) => ({
                url: `comparables/comparable/${id}`,
                method: "GET",
            }),
        }),
        comparableReport: mutation<IComparables, { id: string; as_report: "mercado" | "cedula";data:any }>({
            query: ({ id,as_report,data }) => ({
                url: `comparables/cedula/${id}/reporte/${as_report}`,
                method: "POST",
                data
            }),
        }),
        postComparable: mutation<IComparables, { tipo:string,id_cedula_mercado:number,id_comparable_catcom:number }>({
            query: ({ tipo,id_cedula_mercado,id_comparable_catcom,...data }) => ({
                url: `comparables/comparable/${id_cedula_mercado}/${tipo}/${id_comparable_catcom}`,
                method: "POST",
                data
            }),
        }),
        patchComparable: mutation<IComparables, { id: string, data: any }>({
            query: ({ id, data }) => ({
                url: `comparables/comparable/${id}`,
                method: "PATCH",
                data ,
            }),
        }),
        deleteComparable: mutation<IComparables, { id: string }>({
            query: ({ id }) => ({
                url: `comparables/comparable/${id}`,
                method: "DELETE",
            }),
        }),
        reports: mutation<File, { cedula_mercado: number }>({
            query: ({ cedula_mercado }) => ({
                url: `comparables/reports/${cedula_mercado}`,
                method: "GET",
                responseType: "blob",
            }),
        }),
        preview: mutation<IComparables, {  id_cedula_mercado: number, id_comparable_catcom: number,as_report:string }>({
            query: ({ id_cedula_mercado, id_comparable_catcom,as_report, ...data }) => ({
                url: `comparables/preview/${id_cedula_mercado}/${id_comparable_catcom}/${as_report}`,
                method: "POST",
                data
            }),
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
    useComparableReportMutation

} =ComparablesApi;
