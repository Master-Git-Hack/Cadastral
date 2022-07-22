/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { consume } from "./api.config";

/**
 * It creates a set of thunks that can be used to make requests to the server
 * @param {string} component - string - The name of the component that will be used to create the
 * thunk.
 */
export const api = (component: string) => ({
	/* Creating a thunk that can be used to make a get request to the server. */
	get: createAsyncThunk(
		`${component}/get`,
		async (action: any, { rejectWithValue, fulfillWithValue }) => {
			const { url } = action;
			const response = await consume("json").get(url);
			try {
				return fulfillWithValue(response.data);
			} catch (err: any) {
				return rejectWithValue(err.response.data);
			}
		},
	),
	/* Creating a thunk that can be used to make a post request to the server. */
	post: createAsyncThunk(
		`${component}/post`,
		async (action: any, { rejectWithValue, fulfillWithValue }) => {
			const { url, responseType, payload } = action;
			const response = await consume(responseType).post(url, payload);
			try {
				return fulfillWithValue(response.data);
			} catch (err: any) {
				return rejectWithValue(err.response.data);
			}
		},
	),
	/* Creating a thunk that can be used to make a patch request to the server. */
	patch: createAsyncThunk(
		`${component}/patch`,
		async (action: any, { rejectWithValue, fulfillWithValue }) => {
			const { url, responseType, payload } = action;
			const response = await consume(responseType).patch(url, payload);
			try {
				return fulfillWithValue(response.data);
			} catch (err: any) {
				return rejectWithValue(err.response.data);
			}
		},
	),
});
