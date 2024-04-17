/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@redux/index";
import { reducers, initialState } from "./actions";
import { UserState } from "./types";
const slice = createSlice({
	name: "User",
	initialState: initialState() as UserState,
	reducers,
});
export const { setUser, logOut } = slice.actions;
export const getUser = (state: RootState) => state.User;
export default slice.reducer;
