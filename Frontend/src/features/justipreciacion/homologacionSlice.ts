/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { request } from "../../api/request";
import { initialState, Storage } from "../../types/justipreciacion/homologacion/storage";
import {

} from "./homologacionHandlers";
const name = "Homologacion";
export const consumeHomologacion = request(name);

export const slice = createSlice({
	name,
	initialState,
	reducers: {
		
	},
	extraReducers: (builder) => {
		//get method
		builder
			.addCase(consumeHomologacion.get.rejected, (state: Storage) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeHomologacion.get.pending, (state: Storage) => {
				state.status = "loading";
			})
			.addCase(
				consumeHomologacion.get.fulfilled,
				(state: Storage, action: PayloadAction<any>) => {
					const { status, operation, message, data } = action.payload;
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
		//post method
		builder
			.addCase(consumeHomologacion.post.rejected, (state: Storage) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeHomologacion.post.pending, (state: Storage) => {
				state.status = "loading";
			})
			.addCase(consumeHomologacion.post.fulfilled, (state, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
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
			});

		//patch method
		builder
			.addCase(consumeHomologacion.patch.rejected, (state: Storage) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeHomologacion.patch.pending, (state: Storage) => {
				state.status = "loading";
			})
			.addCase(consumeHomologacion.patch.fulfilled, (state, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
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
			});
	},
});

export const {
	UpdateOperationValues,
	addRow,
	setIndiviso,
	updateReFactor,
	addRowLocationZone,
	removeRow,
	updateIndiviso,
	removeRowLocationZone,
	updateFactorStateAge,
	updateFactorStateCommon,
	setVisibilityOrderFactors,
	updateDocumentationStateRoundedTo,
	updateFactorStateLocationZone,
	updateDocumentationStateArea,
	updateDocumentationStateSalesCost,
	updateDocumentationStateWeightingPercentage,
	isLoading,
} = slice.actions;
export const getHomologacion = (state: RootState) => state.homologacion;
export default slice.reducer;
