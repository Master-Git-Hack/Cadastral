/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { name, initialState, consume, StateProps } from "./costosConstruccion.interface";
import { reducers } from "./costosConstruccion.reducer";

export const consumeCC = consume;
export const { get, post, patch } = consumeCC;
export const slice = createSlice({
	name,
	initialState,
	reducers,
	extraReducers: (builder) => {
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
					const {
						handlers: { totalRows, getTotal },
					} = state;
					state.status = status;
					state.message = message;

					if (status.includes("success")) {
						switch (operation) {
							case "CostosConstruccion":
								const { factorGTO, redondeo, titulo, record } = data;
								state.titulo = titulo;
								const result = data.data.map((item: any, index: number) => ({
									...item,
									status: null,
									id: index + 1,
								}));

								state.data = totalRows(result);
								state.total = getTotal(state.data);
								state.factorGTO = factorGTO;
								state.redondeo = redondeo ?? 0;
								state.record = record;
								break;

							default:
								break;
						}
					}
				},
			);
	},
});
export const {
	addRow,
	removeRow,
	setValues,
	setTitle,
	setFactorGTO,
	updateTotalData,
	setRedondeo,
} = slice.actions;
export const getCC = (state: RootState) => state.CostosConstruccion;
export default slice.reducer;
