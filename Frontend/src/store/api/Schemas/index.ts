/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";

export const SchemasApi = createApi({
	reducerPath: "DBInfo",
	baseQuery,
	endpoints: ({query,mutation}) => ({
		// getSchemas: builder.query<unknown, { db: string }>({
		// 	query: ({ db }) => `db-info/${db}/schemas`,
		// 	transformResponse: ({ data: { schemas, tables }, ...response }) => {
		// 		let tablesBySchema = {};
		// 		for (const [key, value] of Object.entries(tables)) {
		// 			tablesBySchema = {
		// 				...tablesBySchema,
		// 				[key]: value?.map((value: string) => ({
		// 					label: value
		// 						.split("_")
		// 						?.map(
		// 							(word: string) => word.charAt(0).toUpperCase() + word.slice(1),
		// 						)
		// 						.join(" "),
		// 					value,
		// 				})),
		// 			};
		// 		}
		// 		return {
		// 			data: {
		// 				schemas:
		// 					schemas?.map((value: string) => ({
		// 						label: value
		// 							.split("_")
		// 							?.map(
		// 								(word: string) =>
		// 									word.charAt(0).toUpperCase() + word.slice(1),
		// 							)
		// 							.join(" ") as string,
		// 						value,
		// 					})) ?? [],
		// 				tables: tablesBySchema,
		// 			},
		// 			...response,
		// 		};
		// 	},
		// }),
		getCatastro: query<unknown, null>({
			query: () => ({
				url: `db-info/schemas/catastro`,
				method: "GET",
			}),
			transformResponse: ({ data, ...response }: any) => {
				
				const tables = Object.entries(data?.tables).map(([parent, items]: any) => ({
					label:parent,
					items: items.map((label: string) => ({ label,parent })),
					
				}));
				return ({
					data: {
						schemas: data?.schemas.map((label: string, code: number) => ({ label, code })),
						tables
					},
					...response
				})
			}
			
		}),
	})
	
});

export const { useGetCatastroQuery } = SchemasApi;
