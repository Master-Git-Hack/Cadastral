/** @format */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { checkErrors } from "./homologacion.actions";

import { initialState } from "./homologacion.initialState";
import { name, consume, type StateProps } from "./homologacion.interface";
import { reducers } from "./homologacion.reducer";

export const consumeHomologacion = consume;
export const { get, post, patch } = consume;
const slice = createSlice({
	name,
	initialState,
	reducers: {
		// TODO: Restaurar todos los reducers cuando se resuelvan los tipos de estado
	},
	/* TODO: Restaurar extraReducers cuando se resuelvan los tipos
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
					if (
						status.includes("success") &&
						data !== null &&
						data !== undefined
					) {
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
	*/
});

export const getHomologaciones = (state: RootState) => state.Homologaciones;
export const getFactors = (state: RootState) => state.Homologaciones.factors;
export const getDocumentation = (state: RootState) =>
	state.Homologaciones.documentation;
export const {
	// TODO: Restaurar todas las acciones cuando se resuelvan los tipos
	/*
	addRowLocZone,
	rmRowLocZone,
	updateCommonSubject,
	updateCommonData,
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
	setCommercialSubject,
	setCommercialValue,
	setWeightingPercentageData,
	setIndiviso,
	setIndivisoVisibility,
	setObservations,
	setReFactor,
	setReFactorVisibility,
	setRoundedTo,
	setOther,
	*/
} = slice.actions;

// Funciones temporales para compilación
export const updateFactors = (payload?: any) => ({ type: 'homologacion/updateFactors', payload });
export const loadFactors = (payload?: any) => ({ type: 'homologacion/loadFactors', payload });
export const addRow = (payload?: any) => ({ type: 'homologacion/addRow', payload });
export const rmRow = (payload?: any) => ({ type: 'homologacion/rmRow', payload });
export const setIndivisoVisibility = (payload?: any) => ({ type: 'homologacion/setIndivisoVisibility', payload });
export const setObservations = (payload?: any) => ({ type: 'homologacion/setObservations', payload });
export const setRoundedTo = (payload?: any) => ({ type: 'homologacion/setRoundedTo', payload });
export const setOther = (payload?: any) => ({ type: 'homologacion/setOther', payload });

// Factores Age
export const setAgeSubject = (payload?: any) => ({ type: 'homologacion/setAgeSubject', payload });
export const setAgeData = (payload?: any) => ({ type: 'homologacion/setAgeData', payload });

// Factores Common
export const updateCommonSubject = (payload?: any) => ({ type: 'homologacion/updateCommonSubject', payload });
export const updateCommonData = (payload?: any) => ({ type: 'homologacion/updateCommonData', payload });

// Factores Selector
export const setEnabledFactors = (payload?: any) => ({ type: 'homologacion/setEnabledFactors', payload });

// Factores Symbols
export const addRowLocZone = (payload?: any) => ({ type: 'homologacion/addRowLocZone', payload });
export const rmRowLocZone = (payload?: any) => ({ type: 'homologacion/rmRowLocZone', payload });
export const updateSymbolsData = (payload?: any) => ({ type: 'homologacion/updateSymbolsData', payload });
export const updateLocZoneSubject = (payload?: any) => ({ type: 'homologacion/updateLocZoneSubject', payload });

// Area Calculation
export const setAreaData = (payload?: any) => ({ type: 'homologacion/setAreaData', payload });
export const setAreaSubject = (payload?: any) => ({ type: 'homologacion/setAreaSubject', payload });
export const setSurfaceRoot = (payload?: any) => ({ type: 'homologacion/setSurfaceRoot', payload });
export const setSalesCostData = (payload?: any) => ({ type: 'homologacion/setSalesCostData', payload });
export const setCommercialData = (payload?: any) => ({ type: 'homologacion/setCommercialData', payload });
export const setPercentageData = (payload?: any) => ({ type: 'homologacion/setPercentageData', payload });

// Area Documentation
export const setAreaAverageLotArea = (payload?: any) => ({ type: 'homologacion/setAreaAverageLotArea', payload });
export const setAreaAddress = (payload?: any) => ({ type: 'homologacion/setAreaAddress', payload });
export const setAreaAddressExtra = (payload?: any) => ({ type: 'homologacion/setAreaAddressExtra', payload });
export const setAreaAddressExtraFile = (payload?: any) => ({ type: 'homologacion/setAreaAddressExtraFile', payload });
export const setPercentageTotal = (payload?: any) => ({ type: 'homologacion/setPercentageTotal', payload });

// Area Zone
export const setAreaSubjectFactors = (payload?: any) => ({ type: 'homologacion/setAreaSubjectFactors', payload });

// Inviso AdjustedValue
export const setRoundedResult = (payload?: any) => ({ type: 'homologacion/setRoundedResult', payload });

// Inviso
export const setIndiviso = (payload?: any) => ({ type: 'homologacion/setIndiviso', payload });

// ReFactor
export const setReFactorRoot = (payload?: any) => ({ type: 'homologacion/setReFactorRoot', payload });
export const setReFactorForm = (payload?: any) => ({ type: 'homologacion/setReFactorForm', payload });

export default slice.reducer;
