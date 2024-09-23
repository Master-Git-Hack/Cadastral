/** @format */

import { create } from "zustand";
import { CreateAxiosDefaults } from "axios";
import LS from "@utils/localStorage";
import { now } from "@utils/time";
import { api } from "../api.config";
const useUser = create((set) => ({
	timeStamp: LS.get("lastRequest") || now(),
	token: LS.get("token") || null,
	group: 0,
	name: "",
	username: "",
	reviewer: null,

	signIn: async (auth: CreateAxiosDefaults["auth"]={username:"",password:""}) => {
		const { data, headers, ...response } = await api.get("aouth2/sign-in", {
			headers: { auth },
		});
		set({ timeStamp: now(), token: headers.authorization, ...data });
	},
}));

export default useUser;
