/** @format */

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import LS from "@utils/localStorage";
import type { CreateAxiosDefaults } from "axios";
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
	signOut: () => Promise<void>;
	setExpiration: (minutes: number) => void;
	isExpired: () => boolean;
}

const initialState: IUserState = {
	timeStamp: LS.get("lastRequest") || Date.now(),
	token: LS.get("token") || null,
	groupo: 0,
	nombre: "",
	usuario: "",
	revisor: null,
	iniciales: "",
	expires: null,
};

const useUser = create<IUserState & IUserActions>()(
	persist(
		(set, get) => ({
			...initialState,

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
				set({
					...data,
					timeStamp: Date.now(),
					token: headers?.authorization ?? null,
					expires,
				});
			},

			signOut: async () => {
				try {
					await api.delete("oauth2/sign-out");
				} finally {
					set({ ...initialState });
					LS.clear();
				}
			},

			setExpiration: (minutes: number) => {
				set({ expires: Date.now() + minutes * 60 * 1000 });
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
