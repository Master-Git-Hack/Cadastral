/** @format */

import { RootState } from "./../../store/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reducers } from "./obrasComplementarias.reducer";
import { name, initialState, consume, StateProps } from "./obrasComplementarias.interface";
export const consumeOC = consume;
export const { get, post, patch } = consumeOC;
export const slice = createSlice({
	name,
	initialState,
	reducers,
	extraReducers: (builder) => {
		//get method
		builder
			.addCase(
				get.rejected,
				(state: StateProps, { payload: { status, message } }: PayloadAction<any>) => {
					state.status = status ?? "fail";
					state.message = message ?? "No fue posible establer conexión con el servidor";
				},
			)
			.addCase(get.pending, (state: StateProps) => {
				state.status = "loading";
				state.message = "Cargando";
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
							case "HOMOLOGACION/ObrasComplementarias":
								const { record, documentation, calculous, total, area } = data;
								state.record = record;
								state.Documentation = documentation;
								state.Calculation = calculous;
								state.total = total;
								break;
							default:
								break;
						}
					}
				},
			);

		//post method
		builder
			.addCase(
				post.rejected,
				(state: StateProps, { payload: { status, message } }: PayloadAction<any>) => {
					state.status = status ?? "fail";
					state.message = message ?? "No fue posible establer conexión con el servidor";
				},
			)
			.addCase(post.pending, (state: StateProps) => {
				state.status = "loading";
				state.message = "Cargando";
			})
			.addCase(
				post.fulfilled,
				(
					state: StateProps,
					{ payload: { status, operation, message, data } }: PayloadAction<any>,
				) => {
					state.status = status;
					state.message = message;
					if (status.includes("success")) {
						switch (operation) {
							case "HOMOLOGACION/ObrasComplementarias":
								break;
							default:
								break;
						}
					}
				},
			);

		//patch method
		builder
			.addCase(
				patch.rejected,
				(state: StateProps, { payload: { status, message } }: PayloadAction<any>) => {
					state.status = status ?? "fail";
					state.message = message ?? "No fue posible establer conexión con el servidor";
				},
			)
			.addCase(patch.pending, (state: StateProps) => {
				state.status = "loading";
				state.message = "Cargando";
			})
			.addCase(
				patch.fulfilled,
				(
					state: StateProps,
					{ payload: { status, operation, message, data } }: PayloadAction<any>,
				) => {
					state.status = status;
					state.message = message;
					if (status.includes("success")) {
						switch (operation) {
							case "HOMOLOGACION/ObrasComplementarias":
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
	rmRow,
	addDataRow,
	rmDataRow,
	addAreaRow,
	rmAreaRow,
	setAreaData,
	setDoc,
	setDocData,
	setCalc,
	setAge,
	checkErrors,
} = slice.actions;
export const getOC = (state: RootState) => state.ObrasComplementarias;
export const getDocumentation = (state: RootState) => state.ObrasComplementarias.Documentation;
export const getCalculation = (state: RootState) => state.ObrasComplementarias.Calculation;
export default slice.reducer;
