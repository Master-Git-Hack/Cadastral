/** @format */

import { Comparable } from "./../../views/Comparables/comparable";
/** @format */

import {
	configureStore,
	type ThunkAction,
	type Action,
} from "@reduxjs/toolkit";
import Homologaciones from "../justipreciacion/homologacion";
import HomologacionRevisiones from "../justipreciacion/homologacion/revisiones";
import Justipreciacion from "../justipreciacion";
import CostosConstruccion from "../justipreciacion/costosConstruccion";
import ObrasComplementarias from "../justipreciacion/obrasComplementarias";
import AvaluosCatastrales from "../catastral";
import Comparables from "../comparables";
/* Creating a store with the reducers and middleware. */
export const store = configureStore({
	reducer: {
		Homologaciones,
		HomologacionRevisiones,
		Justipreciacion,
		CostosConstruccion,
		ObrasComplementarias,
		AvaluosCatastrales,
		Comparables,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
