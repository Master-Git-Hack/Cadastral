/** @format */

import { getParams } from "../../utils/utils";
import { properties } from "./state";
//factors
import { ageStateProperties, ageState } from "./factors/ages";
import { buildingState, buildingStateProperties } from "./factors/building";
import { classificationStateProperties, classificationState } from "./factors/classification";
import { commercialStateProperties, commercialState } from "./factors/commercial";
import { levelStateProperties, levelState } from "./factors/level";
import { projectStateProperties, projectState } from "./factors/project";
import { qualityStateProperties, qualityState } from "./factors/quality";
import { resultsStateProperties, resultsState } from "./factors/results";
import { surfaceStateProperties, surfaceState } from "./factors/surface";
import { topographyStateProperties, topographyState } from "./factors/topography";
import { typeFormStateProperties, typeFormState } from "./factors/typeForm";
import { usageStateProperties, usageState } from "./factors/usage";
import { locationStateProperties, locationState } from "./factors/location";
import { zoneStateProperties, zoneState } from "./factors/zone";
//documentation
import { areaState, areaStateProperties } from "./documentation/area";
import { salesCostStateProperties, salesCostState } from "./documentation/salesCost";
import {
	weightingPercentageStateProperties,
	weightingPercentageState,
} from "./documentation/weightingPercentage";
import { reFactorStateProperties, reFactorState } from "./documentation/reFactor";
import { indivisoStateProperties, indivisoState } from "./documentation/indiviso";
//supplementary workspace
import { supplementaryWorksStateProperties, supplementaryWorksState } from "./supplementaryWorks";
interface Factors extends properties {
	[key: string]:
		| properties
		| ageStateProperties
		| buildingStateProperties
		| classificationStateProperties
		| commercialStateProperties
		| levelStateProperties
		| projectStateProperties
		| qualityStateProperties
		| resultsStateProperties
		| surfaceStateProperties
		| topographyStateProperties
		| typeFormStateProperties
		| usageStateProperties
		| locationStateProperties
		| zoneStateProperties;
}
interface Documentation extends properties {
	[key: string]:
		| properties
		| areaStateProperties
		| salesCostStateProperties
		| weightingPercentageStateProperties
		| reFactorStateProperties
		| indivisoStateProperties;
}

interface Record extends properties {
	justipreciacion: {
		id: number;
		register: string;
	};
	homologacion: {
		id: number;
		type: string;
		appraisalPurpose: string;
		status: "exists" | "newOne" | "deleted" | "updated";
	};
}
export interface Storage extends properties {
	status: "complete" | "loading" | "working" | "failed" | "exists";
	factors: Factors;
	documentation: Documentation;
	supplementaryWorks: supplementaryWorksStateProperties;
	errors: Array<string>;
	record: Record;
}
const type = (getParams("tipo") !== "" ? getParams("tipo")?.toUpperCase() : "TERRENO") as string;
export const initialState: Storage = {
	status: "working",
	factors: {
		Age: ageState,
		Building: buildingState,
		Classification: classificationState,
		Commercial: commercialState,
		Level: levelState,
		Project: projectState,
		Quality: qualityState,
		Results: resultsState,
		Surface: surfaceState,
		Topography: topographyState,
		TypeForm: typeFormState,
		Usage: usageState,
		Location: locationState,
		Zone: zoneState,
	},
	documentation: {
		Area: areaState(type),
		SalesCost: salesCostState(type),
		WeightingPercentage: weightingPercentageState,
		ReFactor: reFactorState(type),
		Indiviso: indivisoState(type),
	},
	supplementaryWorks: supplementaryWorksState,
	errors: [],
	record: {
		justipreciacion: {
			id: Number(getParams("id")),
			register:""
		},
		homologacion: {
			id: 0,
			type,
			appraisalPurpose: (getParams("tipo_servicio") !== ""
				? getParams("tipo_servicio")?.toUpperCase()
				: "justipreciacion") as string,
			status: "newOne",
		},
	},
};
