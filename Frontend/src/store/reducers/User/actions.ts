/** @format */

import { UserState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { idleTime } from "@utils/datetime";
import ls from "@utils/localstorage";

export const initialState = (): UserState => {
	const timeStamp = ls.get("timestamp");
	console.log("timeStamp", timeStamp, idleTime(timeStamp));
	console.log("token", ls.get("token"));
	console.log("userData", ls.get("userData"));
	const DEFAULT_STATE: UserState = {
		group: 0,
		name: "Invitado",
		reviewer: null,
		username: "invitado",
		token: null,
	};
	if (timeStamp) {
		if (idleTime(timeStamp)) {
			ls.clear();
			return DEFAULT_STATE;
		}
		{
			const token = ls.get("token");
			const payload = ls.get("userData");
			if (token && payload) {
				return { ...payload, token };
			}
		}
	} else {
		return DEFAULT_STATE;
	}
	return DEFAULT_STATE;
};

export const reducers = {
	setUser: (state: UserState) => {
		const token = ls.get("token");
		const payload = ls.get("userData");
		if (token && payload) {
			state.group = payload.group;
			state.name = payload.name;
			state.reviewer = payload.reviewer;
			state.username = payload.username;
			state.token = token;
		}
	},
	logOut: (state: UserState) => {
		state.group = 0;
		state.name = "Invitado";
		state.reviewer = null;
		state.username = "invitado";
		state.token = null;
		ls.clear();
	},
};
