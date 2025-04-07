/** @format */
"use client";
import LS from "@utils/localStorage";
import { now } from "@utils/time";
import axios, {
	type AxiosInstance,
	type CreateAxiosDefaults,
	type AxiosError,
} from "axios";
import { create } from "zustand";
import { useUser } from "./user";
const _URL = process.env.NEXT_PUBLIC_API_URL;
const _ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
const _VERSION = process.env.NEXT_PUBLIC_API_VERSION;
const baseURL = `${_URL}/${_ENDPOINT}/${_VERSION}`;
import { useRouter } from "next/navigation";
import type { NextRouter } from "next/router";
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
			...headers,
			Accept: `application/${responseType}`,
		},
		auth,
		cancelToken,
		signal,
		data,
		...config,
	});

	LS.set("lastRequest", now());
	instance.interceptors.request.use(
		(config) => {
			const user = LS.get("user-storage");
			const token = user?.state?.token;
			const url = config.url || "";
			if (token && !url.includes("sign-in") && !url.includes("legacy")) {
				const auth = `Bearer ${token}`;
				config.headers.Authorization = auth;
				config.headers["X-Cadastral-Signature"] = auth;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);
	instance.interceptors.response.use(
		(response) => response,
		(error: AxiosError) => {
			if (error.response?.status === 401) {
				const router = useRouter();
				LS.clear();
				router.push("/sign-in");
				if (typeof window !== "undefined") window.location.href = "/sign-in";
			}
			return Promise.reject(error);
		},
	);
	return instance;
};
const setConfig = (url: string, config?: CreateAxiosDefaults) => {
	if (config === undefined) config = {};
	let headers = {};

	if (url !== "oauth2/sign-in") {
		const user = LS.get("user-storage");
		const token = user?.state?.token;

		if (token) {
			headers = {
				...headers,
				Protected: true,
				"X-Cadastral-Signature": `Bearer ${token}`,
			};
			headers = { ...headers, Authorization: `Bearer ${token}` };
		}
		//check if data element on config delete it
		if (config?.data) {
			config.data = null;
		}
	}
	return { headers: { ...headers, ...config?.headers }, ...config };
};
export interface IStatusState {
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
	isUninitialized: boolean;
	message: string | null;
	data: unknown | null;
}
export interface IStatusActions {
	setLoading: () => void;
	setSuccess: (data: unknown, message: unknown) => void;
	setError: (message: string) => void;
	setDefault: () => void;
}
export const useStatusStore = create<IStatusState & IStatusActions>()(
	(set) => ({
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
			set({
				isLoading: false,
				isSuccess: false,
				isError: true,
				isUninitialized: false,
				message,
			}),
		setDefault: () =>
			set({
				isLoading: false,
				isSuccess: false,
				isError: false,
				isUninitialized: true,
				message: null,
				data: null,
			}),
	}),
);
export const api = {
	get: async (url: string, params?: CreateAxiosDefaults) => {
		const { setLoading, setSuccess, setError, setDefault } =
			useStatusStore.getState();
		const config = setConfig(url, params);
		setLoading();
		try {
			const response = await consume({ ...config }).get(url);
			setSuccess(response.data.data, response.data.message);
			return response;
		} catch (error: any) {
			const { response, message } = error;
			setError(response?.data?.message || message);
			return error;
		} finally {
			setTimeout(() => setDefault(), 500);
		}
	},
	post: async (
		url: string,
		data: CreateAxiosDefaults["data"] = {},
		formData = false,
		params?: CreateAxiosDefaults,
		router?: NextRouter,
	) => {
		const { setLoading, setSuccess, setError, setDefault } =
			useStatusStore.getState();
		const config = setConfig(url, params);
		setLoading();
		try {
			// 	if (formData) {
			// 		const formData = new FormData();
			// 		Object.keys(data).forEach((key) => {
			// 			formData.append(key, data[key]);
			// 		});
			// 		const response = await consume(config).post(url, formData, {
			// 			headers: {
			// 				"Content-Type": "multipart/form-data",
			// 			},
			// 		});
			// 		setSuccess(response.data.data, response.data.message);
			// 		return response;
			// 	} else {

			// 	}
			const response = await consume(config).post(url, data);
			setSuccess(response.data.data, response.data.message);
			return response;
		} catch (error: any) {
			const { response, message } = error;
			setError(response?.data?.message || message);
			return error;
		} finally {
			setTimeout(() => setDefault(), 1000);
		}
	},
	patch: async (
		url: string,
		data: CreateAxiosDefaults["data"] = {},
		params?: CreateAxiosDefaults,
	) => {
		const { setLoading, setSuccess, setError, setDefault } =
			useStatusStore.getState();
		const config = setConfig(url, params);
		setLoading();
		try {
			const response = await consume(config).patch(url, data);
			setSuccess(response.data.data, response.data.message);
			return response;
		} catch (error: any) {
			const { response, message } = error;
			setError(response?.data?.message || message);
			return error;
		} finally {
			setTimeout(() => setDefault(), 500);
		}
	},
	delete: async (url: string, params?: CreateAxiosDefaults) => {
		const { setLoading, setSuccess, setError, setDefault } =
			useStatusStore.getState();
		const config = setConfig(url, params);
		setLoading();
		try {
			const response = await consume(config).delete(url);
			setSuccess(response.data.data, response.data.message);
			return response;
		} catch (error: any) {
			const { response, message } = error;
			setError(response?.data?.message || message);
			return error;
		} finally {
			setTimeout(() => setDefault(), 500);
		}
	},
};

export default useStatusStore;
