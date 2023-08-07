/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
import { IMunicipio,translateIndicador,IDepartamentoSolicitante,IIndicador,IIndicator,indicadores } from "./types";
export const MunicipiosApi = createApi({
	reducerPath: "Municipios",
	baseQuery,
	endpoints: (builder) => ({
		getMunicipios: builder.query<IMunicipio[], null>({
			query: () => `municipios`,
		}),
		getMunicipio: builder.query<IMunicipio, { municipio: string }>({
			query: ({ municipio }) => `municipios/${municipio}`,
		}),
		getIndicadores: builder.query<IIndicator[], null>({
			query: () => `indicadores-municipales`,
			transformResponse: ({ data, ...response }: any) => ({ data: translateIndicador(data?.features??[]), ...response }),
			transformErrorResponse: (error) => ({ data: indicadores, ...error })
		
		}),
		getRawIndicadores: builder.query<IIndicador[], null>({
			query: () => `indicadores-municipales`,
			
		}),
		getDepartamentos: builder.query<IDepartamentoSolicitante[], null>({
			query: () => `departamentos-solicitantes`,
		})
	}),
});

export const { useGetMunicipiosQuery, useGetMunicipioQuery, useGetIndicadoresQuery,useGetRawIndicadoresQuery,useGetDepartamentosQuery } = MunicipiosApi;
