/** @format */

import { ageHandler } from "./factores/factor.age";
import { buildingHandler } from "./factores/factor.building";
import { classificationHandler } from "./factores/factor.classification";
import { commercialHandler } from "./factores/factor.commercial";
import { levelHandler } from "./factores/factor.level";
import { locationHandler } from "./factores/factor.location";
import { projectHandler } from "./factores/factor.project";
import { insertion, operation } from "./factores/factor.props";
import { qualityHandler } from "./factores/factor.quality";
import { resultsHandler } from "./factores/factor.results";
import { surfaceHandler } from "./factores/factor.surface";
import { topographyHandler } from "./factores/factor.topography";
import { typeFormHandler } from "./factores/factor.typeForm";
import { usageHandler } from "./factores/factor.usage";
import { zoneHandler } from "./factores/factor.zone";
import { InitialStateProps, zoneInformation } from "./homologaciones.props";
import { areaHandler } from "./registros/registro.area";
import { indivisoHandler } from "./registros/registro.indiviso";
import { reFactorHandler } from "./registros/registro.reFactor";
import { salesCostHandler } from "./registros/registro.salesCosts";
import { weightingPercentageHandler } from "./registros/registro.weightingPercentage";

export const initialState = (type: string, appraisalPurpose: string): InitialStateProps => ({
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
		status: "new",
	},
	handlers: {
		common: { insertion, operation },
		zoneInformation,
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
