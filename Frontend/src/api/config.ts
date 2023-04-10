/** @format */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
const _URL = process.env.URL;
const _PORT = process.env.PORT;
const _ENDPOINT = process.env.ENDPOINT;
const _VERSION = process.env.VERSION;
const baseURL = `http://${_URL}:${_PORT}/${_ENDPOINT}/${_VERSION}`;
export const consume = (
	responseType: "blob" | "json" = "json",
	headers?: AxiosRequestConfig["headers"],
	signal?: AbortSignal,
	auth?: AxiosRequestConfig["auth"],
): AxiosInstance => axios.create({
		baseURL,
		responseType,
		timeout: 30000,
		headers: {
			Accept: `application/${responseType}`,
			Authorization: "",
			Protected: false,
			...(headers || {}),
		},
		auth,
		signal
	});
	