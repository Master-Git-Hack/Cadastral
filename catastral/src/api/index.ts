/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { consume } from "./config";
import { ApiProps } from "./interfaces";

export const consumeApi =()=> ({
	get: async ({ url, responseType,headers }: ApiProps) => {
		try {
			return await consume(responseType ?? "json",headers).get(
				url
			);
		} catch (error) {
			throw error;
		}
	},
	post: async ({ url, responseType,headers,payload }: ApiProps) => {
		try {
			return await consume(responseType ?? "json",headers).post(
				url,payload
			);
		} catch (error) {
			throw error;
		}
	},
	patch: async ({ url, responseType,headers,payload }: ApiProps) => {
		try {
			return await consume(responseType ?? "json",headers).patch(
				url,payload
			);
		} catch (error) {
			throw error;
		}
	},
	delete: async ({ url, responseType,headers }: ApiProps) => {
		try {
			return await consume(responseType ?? "json",headers).delete(
				url
			);
		} catch (error) {
			throw error;
		}
	},
	
})
export const api = (entity: string) => ({
	get: createAsyncThunk(
		`${entity}/get`,
		async ({ url, responseType, headers }: ApiProps, { rejectWithValue, fulfillWithValue }) => {
			try {
				const response = await consume(responseType ?? "json", headers).get(url);
				return fulfillWithValue(response);
			} catch (error: any) {
				return rejectWithValue(error.response);
			}
		},
	),
	post: createAsyncThunk(
		`${entity}/post`,
		async (
			{ url, responseType, payload, headers }: ApiProps,
			{ rejectWithValue, fulfillWithValue },
		) => {
			try {
				const response = await consume(responseType ?? "json", headers).post(url, payload);
				return fulfillWithValue(response);
			} catch (error: any) {
				return rejectWithValue(error.response);
			}
		},
	),
	patch: createAsyncThunk(
		`${entity}/patch`,
		async (
			{ url, responseType, payload, headers }: ApiProps,
			{ rejectWithValue, fulfillWithValue },
		) => {
			if (payload === undefined) throw new Error("Payload is undefined");

			try {
				const response = await consume(responseType ?? "json", headers).patch(url, payload);
				return fulfillWithValue(response);
			} catch (error: any) {
				return rejectWithValue(error.response);
			}
		},
	),
	delete: createAsyncThunk(
		`${entity}/delete`,
		async ({ url, responseType, headers }: ApiProps, { rejectWithValue, fulfillWithValue }) => {
			try {
				const response = await consume(responseType ?? "json", headers).delete(url);
				return fulfillWithValue(response);
			} catch (error: any) {
				return rejectWithValue(error.response);
			}
		},
	),
});
export default api;
