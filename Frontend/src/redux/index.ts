/** @format */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import API from "./API";
import Notifications from "./Notifications";
import Homologacion from "./Homologacion";
import Justipreciacion from "./Justipreciacion";
/* Creating a store with the reducers and middleware. */
export const store = configureStore({
	reducer: {
		API,
		Notifications,
		Justipreciacion,
		Homologacion,
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
