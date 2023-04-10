/** @format */

import Age  from "./factores/age";
import Building  from "./factores/building/index";
import Classification  from "./factores/classification";
import Commercial  from "./factores/commercial";
import Location  from "./factores/location";
import Level  from "./factores/level";
import Project  from "./factores/project";
import Quality  from "./factores/quality";
import Results  from "./factores/results";
import Surface  from "./factores/surface";
import Topography  from "./factores/topography";
import TypeForm  from "./factores/typeForm";
import Usage  from "./factores/usage";
import Zone  from "./factores/zone";
import Area  from "./registros/area";
import Indiviso  from "./registros/indiviso";
import ReFactor  from "./registros/reFactor";
import SalesCost  from "./registros/salesCost";
import WeightingPercentage  from "./registros/weightingPercentage";

export const homologacion =(type:string="terreno")=> ({
	factors: {
		Age,
		Building,
		Classification,
		Commercial,
		Level,
		Location,
		Project,
		Quality,
		Results,
		Surface,
		Topography,
		TypeForm,
		Usage,
		Zone,
	},
	documentation: {
		Area:Area(type),
		Indiviso:Indiviso(type),
		ReFactor:ReFactor(type),
		SalesCost:SalesCost(type),
		WeightingPercentage,
	},
});
export default homologacion;
