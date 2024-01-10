/** @format */
import ls from "@utils/localstorage";
import { getNow } from "@utils/datetime";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { RootState } from "..";
const currentEnv = import.meta.env.MODE;
const devUrl = import.meta.env.VITE_API_URL_DEV;
const prodUrl = import.meta.env.VITE_API_URL_PROD;
export const baseUrl = currentEnv === "development" ? devUrl : prodUrl;
import Toast from "@components/Alerts";
const axiosBaseQuery =
	(
		{ baseUrl }: { baseUrl: string } = { baseUrl: "" },
	): BaseQueryFn<
		{
			url: string;
			method: AxiosRequestConfig["method"];
			data?: AxiosRequestConfig["data"];
			params?: AxiosRequestConfig["params"];
			headers?: AxiosRequestConfig["headers"];
		},
		unknown,
		unknown
	> =>
	async ({ url, method, data, params, headers }, { getState }) => {
		const timestamp = getNow();
		ls.set("lastRequest", { url, method, data, params, timestamp });
		ls.set("timestamp", timestamp);

		try {
			if (!headers) headers = {};
			if (url !== "auth/sign-in") {
				const state = getState() as RootState;
				const { token } = state.User;

				if (token) {
					headers["Authorization"] = `Bearer ${token}`;
					//headers["Protected"] = true;
					//headers["withCredentials"] = true;
				}
			}
			const result = await axios({ baseURL: baseUrl, url, method, data, params, headers });
			if (url === "auth/sign-in") {
				const { authorization } = result.headers;
				if (authorization) ls.set("token", authorization);
			}

			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as AxiosError;
			if (err.response?.status === 401) {
				Toast({
					icon: "error",
					text: "Su sesión ha expirado, será redirigido a su página de inicio.",
				})
					.then(() => {
						ls.clear();
						location.href = "/sign-in";
					})
					.catch(() => {
						ls.clear();
						location.href = "/sign-in";
					});
			}
			console.log(err);
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};
export const baseQuery = axiosBaseQuery({ baseUrl });
export default baseUrl;
