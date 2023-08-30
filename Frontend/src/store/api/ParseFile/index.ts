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
			query: (formData) => ({
				url: `parse/xml-to-json`,
				method: "POST",
				body: formData,
			}),
		}),
		json2xml: builder.mutation<unknown, FormData>({
			query: (formData) => ({
				url: `parse/json-to-xml`,
				method: "POST",
				body: formData,
				responseType: "blob",
			}),
		}),
	}),
});

export const { useXml2jsonMutation, useJson2xmlMutation } = ParseFilesApi;
