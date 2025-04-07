import { Tipo, defaultFactorData } from "../base";
export const CatalogoUsoTerreno = {
	HABITACIONAL: 1.0,
	"HABITACIONAL SUPERIOR": 1.0,
	"HABITACIONAL MEDIO": 1.0,
	"HABITACIONAL INTERÉS SOCIAL": 1.0,
	"HABITACIONAL ECONÓMICA-POPULAR": 1.0,
	RESIDENCIAL: 1.0,
	"RESIDENCIAL SUPERIOR": 1.0,
	"RESIDENCIAL MEDIO": 1.0,
	COMERCIAL: 1.03,
	"COMERCIAL SUPERIOR": 1.03,
	"COMERCIAL MEDIO": 1.03,
	"COMERCIAL ECONÓMICO": 1.03,
	CENTRO: 1.05,
	"CENTRO SUPERIOR": 1.05,
	"CENTRO MEDIO": 1.05,
	"CENTRO ECONÓMICO": 1.05,
	INDUSTRIAL: 1.07,
	"INDUSTRIAL SUPERIOR": 1.07,
	"INDUSTRIAL MEDIO": 1.07,
	"INDUSTRIAL ECONÓMICO": 1.07,
	"MIXTO HABITACIONAL COMERCIAL": 0.97,
	"MIXTO HABITACIONAL SERVICIOS": 0.97,
	"MIXTO HABITACIONAL INDUSTRIAL": 0.97,
	"MIXTO HAB., COMERCIAL Y DE SERVICIOS": 0.97,
	"MIXTO COMERCIAL HABITACIONAL": 0.97,
	"MIXTO COMERCIAL SERVICIOS": 0.97,
	"MIXTO COMERCIAL INDUSTRIAL": 0.97,
	"MIXTO COMERCIAL Y EQUIPAMIENTO": 0.97,
	"MIXTO INDUSTRIAL HABITACIONAL": 0.97,
	"MIXTO INDUSTRIAL COMERCIAL": 0.97,
	"MIXTO INDUSTRIAL SERVICIOS": 0.97,
	"MIXTO INDUSTRIAL EQUIPAMIENTO": 0.97,
	"MIXTO SERVICIOS Y EQUIPAMIENTO": 0.97,
	"MARGINADO IRREGULAR": 1.1,
	SUBURBANA: 1.1,
	RÚSTICO: 1.1,
	"DE SERVICIOS": 1.04,
	CAMPESTRE: 1.1,
};

export const CatalogoUsoRenta = {
	HABITACIONAL: 1.0,
	COMERCIAL: 1.03,
	"MIXTO H-C": 1.05,
	INDUSTRIAL: 1.07,
	"MIXTO I-H": 0.97,
	"MIXTO I-C": 1.09,
	SERVICIOS: 1.04,
};
const enumToOptions = (enumObj: Record<string, number>) =>
	Object.entries(enumObj).map(([label, value]) => ({ label, value }));
export const optionRenta = enumToOptions(CatalogoUsoRenta);
export const optionTerreno = enumToOptions(CatalogoUsoTerreno);
export const defaultSubject = optionTerreno[0];
export default {
	catalogo: {
		[Tipo.TERRENO]: CatalogoUsoTerreno,
		[Tipo.RENTA]: CatalogoUsoRenta,
	},
	opciones: {
		[Tipo.TERRENO]: optionTerreno,
		[Tipo.RENTA]: optionRenta,
	},
	default: {
		subject: defaultSubject,
		data: defaultFactorData({ props: defaultSubject }),
	},
};
