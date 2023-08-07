/** @format */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/dist/query"
import { ReporteCatastralApi } from "./api/Catastral";
import { MunicipiosApi } from "./api/Municipios";
/* Creating a store with the reducers and middleware. */
export const store = configureStore({
	reducer: {
		[ReporteCatastralApi.reducerPath]: ReporteCatastralApi.reducer,
		[MunicipiosApi.reducerPath]: MunicipiosApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat([ReporteCatastralApi.middleware,MunicipiosApi.middleware]),
});
setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
