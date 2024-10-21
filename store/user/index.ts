/** @format */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { CreateAxiosDefaults } from "axios";
import LS from "@utils/localStorage";
import { now } from "@utils/time";
import { api } from "../api.config";
export interface IUserState {
	timeStamp: string;
	token: string | null;
	groupo: number;
	nombre: string;
	usuario: string;
	revisor: string | null;
	iniciales: string;
}

export interface IUserActions {
	signIn: (auth: CreateAxiosDefaults["auth"]) => Promise<void>;
}
const useUser = create<IUserState & IUserActions>()(
	persist(
		(set, get) => ({
			timeStamp: LS.get("lastRequest") || now(),
			token: LS.get("token") || null,
			groupo: 0,
			nombre: "",
			usuario: "",
			iniciales: "",
			revisor: null,

			signIn: async (auth: CreateAxiosDefaults["auth"]) => {
				const {
					headers,
					data: { data },
				} = await api.post(
					"oauth2/sign-in",
					new URLSearchParams({
						...auth,
						grant_type: "password",
						scope: "",
						client_id: "string",
						client_secret: "string",
					}),
					true,
				);

				set({ timeStamp: now(), token: headers?.authorization, ...data });
			},
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useUser;
