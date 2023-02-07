/** @format */

import { HeaderProps } from "./interfaces";
import axios from "axios";
//import { PathLike } from "fs";
import {parse,stringify} from "qs";
//create a const for this env vars URL, PORT, ENDPOINT, VERSION
const URL = process.env.URL;
const PORT = process.env.PORT;
const ENDPOINT = process.env.ENDPOINT;
const VERSION = process.env.VERSION;
export const consume = (
	responseType: "blob" | "json",
	headers?: HeaderProps,
	withCredentials = false,
) =>
	axios.create({
		baseURL: `http://${URL}:${PORT}/${ENDPOINT}/${VERSION}`,
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
		  },
	});
//(params: PathLike) =>
//stringify(params, { indices: false, arrayFormat: "brackets" })