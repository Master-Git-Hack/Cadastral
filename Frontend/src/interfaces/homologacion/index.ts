/** @format */

import { age } from "./factores/age";
import { building } from "./factores/building/index";
import { classification } from "./factores/classification";
import { commercial } from "./factores/commercial";
import { location } from "./factores/location";
import { level } from "./factores/level";
import { project } from "./factores/project";
import { quality } from "./factores/quality";
import { results } from "./factores/results";
import { surface } from "./factores/surface";
import { topography } from "./factores/topography";
import { typeForm } from "./factores/typeForm";
import { usage } from "./factores/usage";
import { zone } from "./factores/zone";
import { area } from "./registros/area";
import { indiviso } from "./registros/indiviso";
import { reFactor } from "./registros/reFactor";
import { salesCost } from "./registros/salesCost";
import { weightingPercentage } from "./registros/weightingPercentage";
import { operation, insertion } from "./factores";
/** @format */
export const homologacion = {
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
	documentation: {
		area,
		indiviso,
		reFactor,
		salesCost,
		weightingPercentage,
	},
};
