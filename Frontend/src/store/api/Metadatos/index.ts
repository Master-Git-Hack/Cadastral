/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
import { IMetadatos } from "./types";
export const MetadatosApi = createApi({
	reducerPath: "Metadatos",
	baseQuery,
	endpoints: (builder) => ({
		getMetadatosPreview: builder.query<IMetadatos[], null>({
			query: () => `metadatos/preview`,
		}),
		getMetadatos: builder.query<IMetadatos[], null>({
			query: () => `metadatos`,
		}),
		getMetadato: builder.query<IMetadatos, { uid: string }>({
			query: ({ uid }) => {
				console.log(uid)
				return `metadatos/${uid}`;
			},
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
	useGetMetadatosPreviewQuery,
	useGetMetadatosQuery,
	useGetMetadatoQuery,
	usePostMetadatoMutation,
	usePatchMetadatoMutation,
} = MetadatosApi;
