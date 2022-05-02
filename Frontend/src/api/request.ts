/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { consume } from "./api.config";

/**
 * It creates a set of thunks that can be used to make requests to the server
 * @param {string} component - string - The name of the component that will be used to create the
 * thunk.
 */
export const request = (component: string) => ({
	/* Creating a thunk that can be used to make a get request to the server. */
	get: createAsyncThunk(`${component}/get`, async (action: any) => {
		const { url } = action;
		try {
			return await (
				await consume("json").get(url)
			).data;
		} catch (err: any) {
			return null;
		}
	}),
	/* Creating a thunk that can be used to make a post request to the server. */
	post: createAsyncThunk(`${component}/post`, async (action: any) => {
		const { url, responseType, payload } = action;
		try {
			return await (
				await consume(responseType).post(url, payload)
			).data;
		} catch (err: any) {
			return null;
		}
	}),
	/* Creating a thunk that can be used to make a patch request to the server. */
	patch: createAsyncThunk(`${component}/patch`, async (action: any) => {
		const { url, responseType, payload } = action;
		try {
			return await (
				await consume(responseType).patch(url, payload)
			).data;
		} catch (err: any) {
			return null;
		}
	}),
});
