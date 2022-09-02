/** @format */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import Homologaciones from "../justipreciacion/homologacion";
import Justipreciacion from "../justipreciacion";
import CostosConstruccion from "../justipreciacion/costosConstruccion";
import ObrasComplementarias from "../justipreciacion/obrasComplementarias";
import AvaluosCatastrales from "../catastral";
/* Creating a store with the reducers and middleware. */
export const store = configureStore({
	reducer: {
		Homologaciones,
		Justipreciacion,
		CostosConstruccion,
		ObrasComplementarias,
		AvaluosCatastrales,
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
