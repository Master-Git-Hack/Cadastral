/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
import { IMetadatos } from "./types";
export const MetadatosApi = createApi({
	reducerPath: "Metadatos",
	baseQuery,
	endpoints: (builder) => ({
		getMetadatos: builder.query<IMetadatos[], null>({
			query: () => `metadatos`,
		}),
		getMetadato: builder.query<IMetadatos, { table_name: string }>({
			query: ({ table_name }) => `metadatos/${table_name}`,
		}),

		postMetadato: builder.mutation<IMetadatos, { data: IMetadatos }>({
			query: ({ data }) => ({
				url: `metadatos`,
				method: "POST",
				body: data,
			}),
		}),
		patchMetadato: builder.mutation<IMetadatos, { data: IMetadatos }>({
			query: ({ data }) => ({
				url: `metadatos/${data.uid}`,
				method: "PATCH",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetMetadatosQuery,
	useGetMetadatoQuery,
	usePostMetadatoMutation,
	usePatchMetadatoMutation,
} = MetadatosApi;
