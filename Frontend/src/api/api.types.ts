/** @format */
import { AxiosRequestConfig } from "axios";

export interface ApiProps {
	url: string;
	responseType?: "blob" | "json";
	payload?: any;
	headers?: AxiosRequestConfig["headers"];
	credentials?: "semi" | "full";
	auth?: AxiosRequestConfig["auth"];
	withCredentials?: AxiosRequestConfig["withCredentials"];
}
