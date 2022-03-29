/** @format */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import homologationReducer from "../features/homologation/slice";
import reportsReducer from "../features/handleReports/slice";
export const store = configureStore({
	reducer: {
		homologation: homologationReducer,
		reports: reportsReducer,
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
