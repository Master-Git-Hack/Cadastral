/** @format */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import homologationReducer from "../features/homologation/slice";
import supplementaryWorksReducer from "../features/homologation/supplementaryWorks/slice2";
import reportsReducer from "../features/handleReports/slice";

/* Creating a store with the reducers and middleware. */
export const store = configureStore({
	reducer: {
		homologation: homologationReducer,
		supplementaryWorks: supplementaryWorksReducer,
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
