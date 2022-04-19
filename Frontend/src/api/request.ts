import { createAsyncThunk } from "@reduxjs/toolkit";
import { consume } from "./api.config";

export const request = (component:string)=>({
	get: createAsyncThunk(`${component}/get`, async (action: any) => {
		const { url, type } = action;
		try {
			return {
				response: await (await consume("json").get(url)).data,
				type,
			};
		} catch (err: any) {
			return null;
		}
	}),
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