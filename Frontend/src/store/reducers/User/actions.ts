/** @format */

import { UserState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import ls from "@utils/localstorage";
export const initialState: UserState = {
	group: 0,
	name: "Invitado",
	reviewer: null,
	username: "invitado",
	token: null,
};
export const reducers = {
	setUser: (state: UserState, { payload }: PayloadAction<UserState>) => {
		state.group = payload.group;
		state.name = payload.name;
		state.reviewer = payload.reviewer;
		state.username = payload.username;
		state.token = ls.get("token");
		ls.rm("token");
	},
	logOut: (state: UserState) => {
		state.group = 0;
		state.name = "Invitado";
		state.reviewer = null;
		state.username = "invitado";
		state.token = null;
		ls.rm("token");
	},
};
