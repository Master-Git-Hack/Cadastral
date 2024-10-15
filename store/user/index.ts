/** @format */

import { create } from "zustand";
import { CreateAxiosDefaults } from "axios";
import LS from "@utils/localStorage";
import { now } from "@utils/time";
import { api } from "../api.config";
export interface IUserState {
	timeStamp: string;
	token: string | null;
	group: number;
	name: string;
	username: string;
	reviewer: string | null;
}

export interface IUserActions {
	signIn: (auth: CreateAxiosDefaults["auth"]) => Promise<void>;
}
const useUser = create<IUserState & IUserActions>()((set) => ({
	timeStamp: LS.get("lastRequest") || now(),
	token: LS.get("token") || null,
	group: 0,
	name: "",
	username: "",
	reviewer: null,

	signIn: async (auth: CreateAxiosDefaults["auth"]) => {
		const {
			headers,
			data: { data },
		} = await api.post("oauth2/sign-in", auth, true);

		set({ timeStamp: now(), token: headers?.authorization, ...data });
	},
}));

export default useUser;
