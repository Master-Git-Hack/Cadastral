/** @format */

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
import ls from "@utils/localstorage";
import Toast from "@components/Alerts";
export const AuthApi = createApi({
	reducerPath: "Auth",
	baseQuery,
	endpoints: ({ mutation }) => ({
		signIn: mutation<unknown, { username: string; password: string }>({
			query: ({ username, password }) => {
				const authToken = btoa(`${username.trim()}:${password}`);
				const Authorization = `Basic ${authToken}`;
				return {
					url: `auth/sign-in`,
					method: "get",
					headers: {
						Authorization,
					},
				};
			},
			transformResponse: ({ data, message }) => {
				ls.set("userData", data);
				Toast({ icon: "success", text: message ?? "Bienvenido!" });
				return data;
			},
			transformErrorResponse: ({ data, message }) => {
				Toast({ icon: "error", text: message ?? data?.message ?? "Error en el Servidor " });
			},
		}),
	}),
});

export const { useSignInMutation } = AuthApi;
