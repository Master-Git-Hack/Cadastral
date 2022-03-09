/** @format */

import axios from "axios";
import * as qs from "qs";
import { PathLike } from "fs";
const baseURL = process.env.REACT_APP_API_URL;
export const consume = (responseType: "blob" | "json") =>
	axios.create({
		baseURL,
		withCredentials: true,
		timeout: 30000,
		headers: {
			Authorization: "Basic",
			"Cache-Control": "no-cache, no-store, must-revalidate",
			Pragma: "no-cache",
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		responseType,
		paramsSerializer: (params: PathLike) =>
			qs.stringify(params, { indices: false, arrayFormat: "brackets" }),
	});
