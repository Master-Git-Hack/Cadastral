/** @format */

import { ageHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.age";
import { buildingHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.building";
import { classificationHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.classification";
import { commercialHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.commercial";
import { levelHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.level";
import { locationHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.location";
import { projectHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.project";
import { insertion, operation } from "../../../types/Justipreciacion/Homologaciones/factores/factor.props";
import { qualityHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.quality";
import { resultsHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.results";
import { surfaceHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.surface";
import { topographyHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.topography";
import { typeFormHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.typeForm";
import { usageHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.usage";
import { zoneHandler } from "../../../types/Justipreciacion/Homologaciones/factores/factor.zone";
import { InitialStateProps, zoneInformation } from "../../../types/Justipreciacion/Homologaciones/homologaciones.props";
import { areaHandler } from "../../../types/Justipreciacion/Homologaciones/registros/registro.area";
import { indivisoHandler } from "../../../types/Justipreciacion/Homologaciones/registros/registro.indiviso";
import { reFactorHandler } from "../../../types/Justipreciacion/Homologaciones/registros/registro.reFactor";
import { salesCostHandler } from "../../../types/Justipreciacion/Homologaciones/registros/registro.salesCosts";
import { weightingPercentageHandler } from "../../../types/Justipreciacion/Homologaciones/registros/registro.weightingPercentage";


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
