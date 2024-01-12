/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
// import {

// } from "./types";
export const ParseFilesApi = createApi({
	reducerPath: "ParseFiles",
	baseQuery,
	endpoints: ({mutation}) => ({
		xml2json: mutation<unknown, FormData>({
			query: (data) => ({
				url: `parser/xml-to-json`,
				method: "POST",
				data,
			}),
		}),
		json2xml: mutation<unknown, FormData>({
			query: (data) => ({
				url: `parser/json-to-xml`,
				method: "POST",
				data,
				responseType: "blob",
			}),
		}),
	}),
});

export const { useXml2jsonMutation, useJson2xmlMutation } = ParseFilesApi;
