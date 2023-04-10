/** @format */
import { AxiosRequestConfig } from "axios";
export interface ApiProps {
	url: string;
	responseType?: "blob" | "json";
	payload?: any;
	headers?: any;
	method?: "get" | "post" | "patch" | "delete";
	signal?: AbortSignal;
}
export interface ApiThunkProps extends ApiProps {
	entity: string;
}
