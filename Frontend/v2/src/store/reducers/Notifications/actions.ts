/** @format */

import { NotificationState, Notification, NotificationPayload } from "./types";
import { v4 as uuidv4 } from "uuid";
import { PayloadAction } from "@reduxjs/toolkit";

export const initialState: NotificationState = {
	notifications: [],
	badge: 0,
};
export const reducers = {
	addNotification: (
		state: NotificationState,
		{ payload }: PayloadAction<NotificationPayload>,
	) => {
		const id = payload?.id ?? uuidv4();
		const detail = payload?.detail ?? "";
		const { severity, summary } = payload;
		const closable = true;
		const sticky = true;
		state.notifications.push({ id, severity, summary, detail, closable, sticky });
		state.badge = state.notifications.length;
	},
	rmNotification: (state: NotificationState, { payload }: PayloadAction<string>) => {
		state.notifications = state.notifications.filter(
			(notification: Notification) => notification.id !== payload,
		);
		state.badge = state.notifications.length;
	},
};
