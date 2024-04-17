/** @format */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reducers } from "./catastral.reducer";
import { name, consume, initialState, StateProps } from "./catastral.interface";
import { RootState } from "../store";

export const consumeCatastral = consume;
export const { get, post, patch } = consumeCatastral;
export const slice = createSlice({
	name,
	initialState,
	reducers,
	extraReducers: (builder) => {
		//get method
		builder
			.addCase(get.rejected, (state: StateProps) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(get.pending, (state: StateProps) => {
				state.status = "loading";
			})
			.addCase(
				get.fulfilled,
				(
					state: StateProps,
					{ payload: { status, operation, message, data } }: PayloadAction<any>,
				) => {
					state.status = status;
					state.message = message;
					if (status.includes("success")) {
						switch (operation) {
							case "HOMOLOGACION/IndicadoresMunicipales":
								break;
							case "HOMOLOGACION/Justipreciacion":
								break;
							case "HOMOLOGACION":
								break;
						}
					}
				},
			);
	},
});
export const {
	addDocument,
	removeDocument,
	setLimits,
	setValues,
	setDefaultProperties,
	setMoreProperties,
	setMargins,
	setDocument,
	setLoading,
	handleProperties,
	handleMoreProperties,
	changeStatus,
} = slice.actions;
export const getAvaluos = (state: RootState) => state.AvaluosCatastrales;
export default slice.reducer;
