/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
import {
	IMunicipio,
	translateIndicador,
	IDepartamentoSolicitante,
	IIndicador,
	IIndicator,
	indicadores,
} from "./types";
export const MunicipiosApi = createApi({
	reducerPath: "Municipios",
	baseQuery,
	endpoints: ({ query }) => ({
		getMunicipios: query<IMunicipio[], null>({
			query: () => ({
				url: `municipios`,
				method: "GET",
			}),
		}),
		getMunicipio: query<IMunicipio, { municipio: string }>({
			query: ({ municipio }) => ({
				url: `municipios/${municipio}`,
				method: "GET",
			}),
		}),
		getIndicadores: query<IIndicator[], null>({
			query: () => ({
				url: `indicadores-municipales`,
				method: "GET",
			}),
			transformResponse: ({ data, ...response }: any) => ({
				data: translateIndicador(data?.features ?? []),
				...response,
			}),
			transformErrorResponse: (error) => ({ data: indicadores, ...error }),
		}),
		getRawIndicadores: query<IIndicador[], null>({
			query: () => ({
				url: `indicadores-municipales`,
				method: "GET",
			}),
		}),
		getDepartamentos: query<IDepartamentoSolicitante[], null>({
			query: () => ({
				url: `departamentos-solicitantes`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetMunicipiosQuery,
	useGetMunicipioQuery,
	useGetIndicadoresQuery,
	useGetRawIndicadoresQuery,
	useGetDepartamentosQuery,
} = MunicipiosApi;
