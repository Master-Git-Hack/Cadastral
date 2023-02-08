/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { consume } from "./config";
import { ApiProps, ApiThunkProps } from "./interfaces";
import { AxiosResponse, all as make } from "axios";


export const request = () => (
	
	{
		get: async ({ url, responseType = "json", headers }: ApiProps) => {
			try {
			return await consume(responseType, headers).get(url);
			} catch (error: any) {
			return error.response;
			}
		},
		post: async ({ url, responseType = "json", headers, payload }: ApiProps) => {
			try {
			return await consume(responseType, headers).post(url, payload);
			} catch (error: any) {
			return error.response;
			}
		},
	 	patch: async ({ url, responseType = "json", headers, payload }: ApiProps) => {
			try {
			return await consume(responseType, headers).patch(url, payload);
			} catch (error: any) {
			return error.response;
			}
		},
		delete: async ({ url, responseType = "json", headers }: ApiProps) => {
			try {
			return await consume(responseType, headers).delete(url);
			} catch (error: any) {
			return error.response;
			}
		},
		all:async (requests: ApiProps[]) =>
		make(
			requests.map(async({ url, responseType = "json", headers, payload, method = "get" }: ApiProps) => consume(responseType, headers)[method](url, payload)
			),
	)
	
})

export const api = ({
	entity,
	method = "get",
	url,
	responseType = "json",
	headers,
	payload,
}: ApiThunkProps) =>
	createAsyncThunk(`${entity}/${method}`, async (_, { rejectWithValue, fulfillWithValue }) => {
		try {
			const response = await consume(responseType, headers)[method](url, payload);
			return fulfillWithValue(response);
		} catch (error: any) {
			return rejectWithValue(error.response);
		}
	});
export default api;
