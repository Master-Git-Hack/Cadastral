/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { consume } from "./api.config";
import { ApiProps } from "./api.types";
/**
 * It creates a set of thunks that can be used to make requests to the server
 * @param {string} component - string - The name of the component that will be used to create the
 * thunk.
 */
export const api = (component: string) => ({
	/* Creating a thunk that can be used to make a get request to the server. */
	get: createAsyncThunk(
		`${component}/get`,
		async ({ url }: ApiProps, { rejectWithValue, fulfillWithValue }) => {
			try {
				const { data } = await consume("json").get(url);
				return fulfillWithValue(data);
			} catch (err: any) {
				return rejectWithValue(err.response.data);
				console.log(err.response.data);
			}
		},
	),
	/* Creating a thunk that can be used to make a post request to the server. */
	post: createAsyncThunk(
		`${component}/post`,
		async ({ url, responseType, payload }: ApiProps, { rejectWithValue, fulfillWithValue }) => {
			try {
				const { data } = await consume(responseType).post(url, payload);
				return fulfillWithValue(data);
			} catch (err: any) {
				return rejectWithValue(err.response.data);
			}
		},
	),
	/* Creating a thunk that can be used to make a patch request to the server. */
	patch: createAsyncThunk(
		`${component}/patch`,
		async ({ url, responseType, payload }: any, { rejectWithValue, fulfillWithValue }) => {
			try {
				const { data } = await consume(responseType).patch(url, payload);
				return fulfillWithValue(data);
			} catch (err: any) {
				return rejectWithValue(err.response.data);
			}
		},
	),
});
