/** @format */

import { reducers } from "./notifications.reducers";
import { initialState } from "./notifications.initialState";
import { RootState } from "..";
import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
	name: "Notifications",
	initialState,
	reducers,
});
export const getNotifications = ({ Notifications }: RootState) => Notifications;
export const { updateNotifications, addNotification, rmNotification, updateNotification } =
	slice.actions;
export default slice.reducer;
