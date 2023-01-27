/** @format */

import { homologacion } from "../../interfaces/homologacion";
import { getURLParams } from "../../utils/url";
import { StateProps, zoneInformation } from "./homologacion.interfaces";

const {
	factors: {
		age,
		building,
		classification,
		commercial,
		level,
		location,
		project,
		quality,
		results,
		surface,
		topography,
		typeForm,
		usage,
		zone,
	},
	documentation: { area, indiviso, reFactor, salesCost, weightingPercentage },
} = homologacion;

const tipo: string = getURLParams("tipo")?.toUpperCase() ?? "TERRENO";
const tipo_servicio: string = getURLParams("tipo_servicio")?.toUpperCase() ?? "justipreciacion";
export const initialState: Any = {
	factors: {
		Age: age.initialState,
		Building: building.initialState,
		Classification: classification.initialState,
		Commercial: commercial.initialState,
		Level: level.initialState,
		Project: project.initialState,
		Quality: quality.initialState,
		Results: results.initialState,
		Surface: surface.initialState,
		Topography: topography.initialState,
		TypeForm: typeForm.initialState,
		Usage: usage.initialState,
		Location: location.initialState,
		Zone: zone.initialState,
	},
	documentation: {
		Area: area.initialState(tipo),
		SalesCost: salesCost.initialState(tipo),
		WeightingPercentage: weightingPercentage.initialState,
		ReFactor: reFactor.initialState(tipo),
		Indiviso: indiviso.initialState(tipo),
		observations: "",
	},
	
};
