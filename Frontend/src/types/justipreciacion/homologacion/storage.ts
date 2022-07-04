/** @format */

import { ageHandler } from "./factores/age/ageHandler";
import { buildingHandler } from "./factores/building/buildingHandler";
import { classificationHandler } from "./factores/classification/classificationHandler";
import { commercialHandler } from "./factores/commercial/commercialHandler";
import { levelHandler } from "./factores/level/levelHandler";
import { locationHandler } from "./factores/location/locationHandler";
import { projectHandler } from "./factores/project/projectHandler";
import { qualityHandler } from "./factores/quality/qualityHandler";
import { resultsHandler } from "./factores/results/resultsHandler";
import { surfaceHandler } from "./factores/surface/surfaceHandler";
import { topographyHandler } from "./factores/topography/topographyHandler";
import { typeFormHandler } from "./factores/typeForm/typeFormHandler";
import { usageHandler } from "./factores/usage/usageHandler";
import { zoneHandler } from "./factores/zone/zoneHandler";
import { indivisoHandler } from "./documentacion/indiviso/indivisoHandler";
import { reFactorHandler } from "./documentacion/reFactor/reFactorHandler";
import { salesCostHandler } from "./documentacion/salesCost.ts/salesCostHandler";
import { areaHandler } from "./documentacion/area/areaHandler";
import { weightingPercentageHandler } from "./documentacion/weightingPercentage/weightingPercentageHandler";
import { sortFactorsHandler } from "./documentacion/sortFactors/sortFactorsStorage";
import { properties } from "./properties";

interface recordStorage {
	id: number;
	type: string;
	appraisalPurpose: string;
	status: "exists" | "newOne";
}
export interface Storage extends properties {
	status: "success" | "loading" | "working" | "fail";
	factors: properties;
	documentation: properties;
	errors: Array<Object>;
	record: recordStorage;
	handlers: properties;
}
export const initialState = (type: string, appraisalPurpose: string): Storage => ({
	status: "working",
	factors: {
		Age: ageHandler.initialState,
		Building: buildingHandler.initialState,
		Classification: classificationHandler.initialState,
		Commercial: commercialHandler.initialState,
		Level: levelHandler.initialState,
		Project: projectHandler.initialState,
		Quality: qualityHandler.initialState,
		Results: resultsHandler.initialState,
		Surface: surfaceHandler.initialState,
		Topography: topographyHandler.initialState,
		TypeForm: typeFormHandler.initialState,
		Usage: usageHandler.initialState,
		Location: locationHandler.initialState,
		Zone: zoneHandler.initialState,
	},
	documentation: {
		Area: areaHandler.initialState(type),
		SalesCost: salesCostHandler.initialState(type),
		WeightingPercentage: weightingPercentageHandler.initialState,
		ReFactor: reFactorHandler.initialState(type),
		Indiviso: indivisoHandler.initialState(type),
		observations: "",
	},
	errors: [],
	record: {
		id: 0,
		type,
		appraisalPurpose,
		status: "newOne",
	},
	handlers: {
		Age: ageHandler,
		Building: buildingHandler,
		Classification: classificationHandler,
		Commercial: commercialHandler,
		Level: levelHandler,
		Project: projectHandler,
		Quality: qualityHandler,
		Results: resultsHandler,
		Surface: surfaceHandler,
		Topography: topographyHandler,
		TypeForm: typeFormHandler,
		Usage: usageHandler,
		Location: locationHandler,
		Zone: zoneHandler,
		Area: areaHandler,
		SalesCost: salesCostHandler,
		WeightingPercentage: weightingPercentageHandler,
		ReFactor: reFactorHandler,
		Indiviso: indivisoHandler,
	},
});
