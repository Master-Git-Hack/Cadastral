/** @format */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * It creates an axios instance with the baseURL, timeout, headers, responseType, and paramsSerializer
 * @param {"blob" | "json"} responseType - "blob" | "json"
 */
export const consume = (
	responseType: "blob" | "json" = "json",
	headers?: AxiosRequestConfig["headers"],
	auth?: AxiosRequestConfig["auth"],
): AxiosInstance =>
	axios.create({
		baseURL:
			process.env.NODE_ENV === "development"
				? process.env.REACT_APP_DEV_API_URL
				: process.env.REACT_APP_PROD_API_URL,
		responseType,
		timeout: 30000,
		headers: {
			Accept: `application/${responseType}`,
			Authorization: "",
			Protected: false,
			...(headers || {}),
		},
		auth,
	});
