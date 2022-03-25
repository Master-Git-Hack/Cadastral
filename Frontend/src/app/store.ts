/** @format */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import homologationReducer from "../features/homologation/slice";
import reportsReducer from "../features/handleReports/slice";
export const store = configureStore({
	reducer: {
		counter: counterReducer,
		homologation: homologationReducer,
		reports: reportsReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
