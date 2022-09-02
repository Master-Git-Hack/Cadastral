/** @format */

import axios from "axios";
import * as qs from "qs";
import { PathLike } from "fs";

/**
 * It creates an axios instance with the baseURL, timeout, headers, responseType, and paramsSerializer
 * @param {"blob" | "json"} responseType - "blob" | "json"
 */
export const consume = (responseType: "blob" | "json") =>
	axios.create({
		baseURL:
			process.env.NODE_ENV === "development"
				? process.env.REACT_APP_DEV_API_URL
				: process.env.REACT_APP_PROD_API_URL,
		// withCredentials: true,
		timeout: 30000,
		headers: {
			Authorization: "Basic",
			"Cache-Control": "no-cache, no-store, must-revalidate",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
			Pragma: "no-cache",
			"Content-Type": "application/json",
			Accept: `application/${responseType}`,
		},
		responseType,
		paramsSerializer: (params: PathLike) =>
			qs.stringify(params, { indices: false, arrayFormat: "brackets" }),
	});
