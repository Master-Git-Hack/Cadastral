/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { getURLParams } from "../../../utils/url";
import { RootState } from "../../store";
import { reducers } from "./index.reducer";
import { initialState as initial } from "./index.types";

const name = "homologacion";
const tipo: string = getURLParams("tipo")?.toUpperCase() ?? "TERRENO";
const tipo_servicio: string = getURLParams("tipo_servicio")?.toUpperCase() ?? "justipreciacion";
const initialState = initial(tipo, tipo_servicio);

export const consumeHomologacion = api(name);
const { get, post, put } = consumeHomologacion;

const slice = createSlice({ name, initialState, reducers });

export const getHomologaciones = (state: RootState) => state.Homologaciones;
export const getFactors = (state: RootState) => state.Homologaciones.Factors;
export const getDocumentation = (state: RootState) => state.Homologaciones.Documentation;
export const {
	addRow,
	rmRow,
	addRowLocZone,
	rmRowLocZone,
	updateCommonSubject,
	updateCommonData,
	updateSymbolsData,
	updateLocZoneSubject,
	loadFactors,
	setEnabledFactors,
} = slice.actions;

export default slice.reducer;
