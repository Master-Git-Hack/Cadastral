/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
import { IMetadatos } from "./types";
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
				url: `metadatos`,
				method: "GET",
			}),
		}),
		getMetadato: query<IMetadatos, { uid: string }>({
			query: ({ uid }) => ({
				url: `metadatos/${uid}`,
				method: "GET",
			}),
		}),

		postMetadato: mutation<IMetadatos, { data: IMetadatos }>({
			query: ({ data }) => ({
				url: `metadatos`,
				method: "POST",
				body: data,
			}),
		}),
		patchMetadato: mutation<IMetadatos, { data: IMetadatos }>({
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
