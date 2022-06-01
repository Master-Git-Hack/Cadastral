/** @format */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import homologacionReducer from "../features/justipreciacion/homologacionSlice";
import obrasComplementariasReducer from "../features/justipreciacion/obrasComplementariasSlice";
import avaluosCatastralesReducer from "../features/catastral/avaluosSlice";
import justipreciacionReducer from "../features/justipreciacion/justipreciacionSlice";

/* Creating a store with the reducers and middleware. */
export const store = configureStore({
	reducer: {
		homologacion: homologacionReducer,
		obrasComplementarias: obrasComplementariasReducer,
		justipreciacion: justipreciacionReducer,
		avaluosCatastrales: avaluosCatastralesReducer,
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
