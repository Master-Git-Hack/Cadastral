/** @format */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { CreateAxiosDefaults } from "axios";
import LS from "@utils/localStorage";

import { api } from "../api.config";
export interface IUserState {
	timeStamp: number;
	token: string | null;
	groupo: number;
	nombre: string;
	usuario: string;
	revisor: string | null;
	iniciales: string;
	expires: number | null;
}

export interface IUserActions {
	signIn: (auth: CreateAxiosDefaults["auth"]) => Promise<void>;
	signOut: () => void;
	setExpiration: (minutes: number) => void;
	isExpired: () => boolean;
}
const useUser = create<IUserState & IUserActions>()(
	persist(
		(set, get) => ({
			timeStamp: LS.get("lastRequest") || Date.now(),
			token: LS.get("token") || null,
			groupo: 0,
			nombre: "",
			usuario: "",
			iniciales: "",
			revisor: null,
			expires: null,

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
				const expires = Date.now() + data.expires * 60 * 1000;
				set({ timeStamp: Date.now(), token: headers?.authorization, expires, ...data });
			},
			signOut: async () => {
				await api.delete("oauth2/sign-out");
				set({
					timeStamp: Date.now(),
					token: null,
					groupo: 0,
					nombre: "",
					usuario: "",
					iniciales: "",
					revisor: null,
					expires: null,
				});
				LS.clear();
			},
			setExpiration: (minutes: number) => {
				const expires = Date.now() + minutes * 60 * 1000;
				set({ expires });
			},

			isExpired: () => {
				const { expires } = get();
				return expires !== null && Date.now() > expires;
			},
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useUser;
