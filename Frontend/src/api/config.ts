/** @format */

import axios, { AxiosInstance, AxiosRequestConfig, ParamsSerializerOptions } from "axios";

import { stringify,parse } from "qs";
//create a const for this env vars URL, PORT, ENDPOINT, VERSION
const _URL = process.env.URL;
const _PORT = process.env.PORT;
const _ENDPOINT = process.env.ENDPOINT;
const _VERSION = process.env.VERSION;
export const consume = (
	responseType: "blob" | "json",
	headers?: AxiosRequestConfig["headers"],
	withCredentials = false,
): AxiosInstance =>
	axios.create({
		baseURL: `http://${_URL}:${_PORT}/${_ENDPOINT}/${_VERSION}`,
		withCredentials,
		timeout: 10000,
		headers: {
			Accept: `application/${responseType}`,
			...headers,
		},
		responseType,
		paramsSerializer:  {
			encode: parse,
			serialize: stringify,
		  }
		
	});

