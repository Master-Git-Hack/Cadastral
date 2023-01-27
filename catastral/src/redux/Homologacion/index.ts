/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./homologacion.initialState";
import { name, consume, StateProps } from "./homologacion.interfaces";
import { reducers } from "./homologacion.reducers";
import { RootState } from "..";

export const consumeHomologacion = consume;
export const { get, post, patch } = consume;
const slice = createSlice({
	name,
	initialState,
	reducers,
	extraReducers: (builder) => {
		//get method
		builder
			.addCase(get.rejected, (state: StateProps) => {
				state.status = "fail";
				state.message = "No fue posible establecer conexión con el servidor";
				state.record.status = "newOne";
			})
			.addCase(get.pending, (state: StateProps) => {
				state.status = "loading";
			})
			.addCase(
				get.fulfilled,
				(
					state: StateProps,
					{ payload: { operation, message, data, status } }: PayloadAction<any>,
				) => {
					state.message = message;
					state.status = status;
					if (status.includes("success") && data !== null && data !== undefined) {
						switch (operation) {
							case "HOMOLOGACION/IndicadoresMunicipales":
								break;
							case "HOMOLOGACION/Justipreciacion":
								break;
							case "HOMOLOGACION":
								const { record, factors, documentation } = data;
								state.factors = factors;
								state.documentation = documentation;
								state.record = record;
								state.errors = checkErrors(state);

								break;
						}
					}
				},
			);
		//post method
		builder
			.addCase(post.rejected, (state: StateProps) => {
				state.status = "fail";
				state.message = "No fue posible establer conexión con el servidor";
			})
			.addCase(post.pending, (state: StateProps) => {
				state.status = "loading";
			})
			.addCase(
				post.fulfilled,
				(
					state: StateProps,
					{ payload: { operation, message, data, status } }: PayloadAction<any>,
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

		//patch method
		builder
			.addCase(patch.rejected, (state: StateProps) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(patch.pending, (state: StateProps) => {
				state.status = "loading";
			})
			.addCase(
				patch.fulfilled,
				(
					state: StateProps,
					{ payload: { operation, message, data, status } }: PayloadAction<any>,
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

export const getHomologacion = (state: RootState) => state.Homologacion;
export const getFactors = (state: RootState) => state.Homologacion.factors;
export const getDocumentation = (state: RootState) => state.Homologacion.documentation;
export const {
	addRow,
	rmRow,
	addRowLocZone,
	rmRowLocZone,
	updateCommonSubject,
	updateCommonData,
	updateFactors,
	updateSymbolsData,
	updateLocZoneSubject,
	loadFactors,
	setEnabledFactors,
	setAgeSubject,
	setAgeData,
	setAreaSubject,
	setAreaSubjectFactors,
	setAreaAverageLotArea,
	setAreaData,
	setAreaAddress,
	setAreaAddressExtra,
	setAreaAddressExtraFile,
	setSurfaceRoot,
	setSalesCostData,
	setCommercialData,
	setPercentageData,
	setPercentageTotal,
	setObservations,
	setIndivisoVisibility,
	setRoundedTo,
	setRoundedResult,
	setReFactorRoot,
	setReFactorSurface,
	setReFactorForm,
	setIndiviso,
} = slice.actions;

export default slice.reducer;
