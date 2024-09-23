/** @format */
"use client";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { create } from "zustand";

import LS from "@utils/localStorage";
import { now } from "@utils/time";
const _URL = process.env.NEXT_PUBLIC_API_URL;
const _ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
const _VERSION = process.env.NEXT_PUBLIC_API_VERSION;
// const baseURL = `${_URL}:${_PORT}/${_ENDPOINT}/${_VERSION}`;
const baseURL = `${_URL}/${_ENDPOINT}/${_VERSION}`;
const consume = ({
	headers = {},
	responseType = "json",
	auth = {
		username: "",
		password: "",
	},
	cancelToken,
	signal,
	data,
	...config
}: CreateAxiosDefaults): AxiosInstance => {
	const instance = axios.create({
		baseURL,
		responseType,
		timeout: 180000,
		headers: {
			Accept: `application/${responseType}`,
			Authorization: "",
			Protected: false,
			...headers,
		},
		auth,
		cancelToken,
		signal,
		data,
		...config,
	});
	LS.set("lastRequest", now());
	return instance;
};
const setConfig = (url: string, { headers = {}, ...config }: CreateAxiosDefaults) => {
	if (url !== "oauth2/sign-in") {
		const token = LS.get("token");
		if (token) {
			headers = {
				...headers,
				Authorization: `Bearer ${token}`,
				Protected: true,
			};
		}
		//check if data element on config delete it
		if (config?.data) {
			delete config.data;
		}
	}
	return { headers, ...config };
};
export const useStatusStore = create((set) => ({
	isLoading: false,
	isSuccess: false,
	isError: false,
	isUninitialized: true,

	message: null,
	data: null,

	// Funciones para actualizar el estado del fetch
	setLoading: () =>
		set({
			isLoading: true,
			isSuccess: false,
			isError: false,
			isUninitialized: false,
			message: null,
			data: null,
		}),
	setSuccess: (data: unknown, message: unknown = null) =>
		set({
			isLoading: false,
			isSuccess: true,
			isError: false,
			isUninitialized: false,
			data,
			message: null,
		}),
	setError: (message: string) =>
		set({ isLoading: false, isSuccess: false, isError: true, isUninitialized: false, message }),
	setDefault: () =>
		set({
			isLoading: false,
			isSuccess: false,
			isError: false,
			isUninitialized: true,
			message: null,
			data: null,
		}),
}));
export const api = {
	get: async (url: string, params: CreateAxiosDefaults) => {
		const { setLoading, setSuccess, setError, setDefault } = useStatusStore.getState();
		const config = setConfig(url, params);
		setLoading();
		try {
			const response = await consume(config).get(url);
			setSuccess(response.data.data, response.data.message);
			return response;
		} catch (error: any) {
			setError(error.message);
			return error;
		} finally {
			setTimeout(() => setDefault(), 500);
		}
	},
	post: async (
		url: string,
		data: CreateAxiosDefaults["data"] = {},
		params: CreateAxiosDefaults,
	) => {
		const { setLoading, setSuccess, setError, setDefault } = useStatusStore.getState();
		const config = setConfig(url, params);
		setLoading();
		try {
			const response = await consume(config).post(url, data);
			setSuccess(response.data.data, response.data.message);
			return response;
		} catch (error: any) {
			setError(error.message);
			return error;
		} finally {
			setTimeout(() => setDefault(), 500);
		}
	},
	patch: async (
		url: string,
		data: CreateAxiosDefaults["data"] = {},
		params: CreateAxiosDefaults,
	) => {
		const { setLoading, setSuccess, setError, setDefault } = useStatusStore.getState();
		const config = setConfig(url, params);
		setLoading();
		try {
			const response = await consume(config).put(url, data);
			setSuccess(response.data.data, response.data.message);
			return response;
		} catch (error: any) {
			setError(error.message);
			return error;
		} finally {
			setTimeout(() => setDefault(), 500);
		}
	},
	delete: async (url: string, params: CreateAxiosDefaults) => {
		const { setLoading, setSuccess, setError, setDefault } = useStatusStore.getState();
		const config = setConfig(url, params);
		setLoading();
		try {
			const response = await consume(config).delete(url);
			setSuccess(response.data.data, response.data.message);
			return response;
		} catch (error: any) {
			setError(error.message);
			return error;
		} finally {
			setTimeout(() => setDefault(), 500);
		}
	},
};

export default useStatusStore;
