/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@redux/index";
import { reducers, initialState } from "./actions";

const slice = createSlice({
	name: "Notifications",
	initialState,
	reducers,
});
export const { addNotification, rmNotification } = slice.actions;
export const getNotifications = (state: RootState) => state.Notifications;
export default slice.reducer;
