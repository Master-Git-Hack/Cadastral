/** @format */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import API from "./API";
import Alerts from "./Alert";
import Notifications from "./Notifications";

import Justipreciacion from "./Justipreciacion";
import Homologacion from "./Homologacion";
/* Creating a store with the reducers and middleware. */
export const store = configureStore({
	reducer: {
		API,
		Alerts,
		Notifications,
		Justipreciacion,
		Homologacion
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
