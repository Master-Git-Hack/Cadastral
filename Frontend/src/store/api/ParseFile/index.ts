/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
// import {

// } from "./types";
export const ParseFilesApi = createApi({
	reducerPath: "ParseFiles",
	baseQuery,
	endpoints: (builder) => ({
		xml2json: builder.mutation<unknown, FormData>({
			query: (FormData) => ({
				url: `parse/xml-to-json`,
				method: "POST",
				data: FormData,
			}),
		}),
		json2xml: builder.mutation<unknown, FormData>({
			query: (FormData) => ({
				url: `parse/json-to-xml`,
				method: "POST",
				data: FormData,
				responseType: "blob",
			}),
		}),
	}),
});

export const { useXml2jsonMutation, useJson2xmlMutation } = ParseFilesApi;
