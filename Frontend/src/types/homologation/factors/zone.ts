/** @format */

import { StateProps } from "../state";
import { State as SymbolsProps, symbolsOptions } from "./symbols";
interface State {
	[key: string]:
		| SymbolsProps
		| string
		| StateProps
		| number
		| Array<Data>
		| boolean
		| Array<Analytics>
		| Array<StateProps>
		| Subject;
}
interface Data extends State {
	id: number;
	C1: SymbolsProps;
	percentage: number;
	observations: string;
}
interface AnalyticsData extends StateProps {
	id: number;
	type: string;
	value: number;
	result: number;
}
interface Subject {
	district: string;
	factor1: {
		type: string;
		value: number;
	};
	factor2: {
		type: string;
		value?: number;
	};
}
interface Analytics {
	id: number;
	district: string;
	data: Array<AnalyticsData>;
}
export interface ZoneProps extends State {
	name: string;
	tag: string;
	subject: Subject;
	data: Array<Data>;
	results: Array<StateProps>;
	isUsed: boolean;
	analytics: any;
}

const zoneBasic = (id: number): Data => ({
	id,
	C1: symbolsOptions[0],
	percentage: 0,
	observations: "",
});
export const ZoneData = (id: number, lenght: number): Data => {
	const data = zoneBasic(id);
	for (let i = 2; i <= lenght; i++) data[`C${i}`] = symbolsOptions[0];
	return data;
};
export const ZoneTemplate: any = {
	name: "Zona",
	tag: "FZo.",
	results: [{ id: 1, value: 1 }],
	data: [ZoneData(1, 1)],
	isUsed: true,
	subject: {
		district: {
			annualCensus: 2020,
			district: "Abasolo",
			economicallyActivePopulation: 42110,
			id: 1,
			inhabitedDwellings: 22275,
			percentage: 45.75,
			populationDensity: 149.6,
			totalPopulation: 92040,
		},
		factor1: {
			type: "totalPopulation",
			root: 12,
		},
		factor2: {
			type: "totalPopulation",
			root: 12,
		},
	},
	analytics: [
		{
			id: 1,
			district: {
				annualCensus: 2020,
				district: "Abasolo",
				economicallyActivePopulation: 42110,
				id: 1,
				inhabitedDwellings: 22275,
				percentage: 45.75,
				populationDensity: 149.6,
				totalPopulation: 92040,
			},
			factor1: {
				value: 92040,
				result: 0,
			},
			factor2: {
				value: 92040,
				result: 0,
			},
		},
	],
};
interface District {
	[key: string]: any;
}
export interface DistrictsProps extends District {
	id: number;
	annualCensus: number;
	populationDensity: number;
	district: string;
	percentage: number;
	economicallyActivePopulation: number;
	totalPopulation: number;
	inhabitedDwellings: number;
}
export const districtOptions: Array<DistrictsProps> = [
	{
		annualCensus: 2020,
		district: "Abasolo",
		economicallyActivePopulation: 42110,
		id: 1,
		inhabitedDwellings: 22275,
		percentage: 45.75,
		populationDensity: 149.6,
		totalPopulation: 92040,
	},
	{
		annualCensus: 2020,
		district: "Acámbaro",
		economicallyActivePopulation: 51121,
		id: 2,
		inhabitedDwellings: 30171,
		percentage: 47.03,
		populationDensity: 123.8,
		totalPopulation: 108697,
	},
	{
		annualCensus: 2020,
		district: "Apaseo el Alto",
		economicallyActivePopulation: 29864,
		id: 3,
		inhabitedDwellings: 16165,
		percentage: 47.11,
		populationDensity: 169.6,
		totalPopulation: 63392,
	},
	{
		annualCensus: 2020,
		district: "Apaseo el Grande",
		economicallyActivePopulation: 54766,
		id: 4,
		inhabitedDwellings: 31264,
		percentage: 46.46,
		populationDensity: 280.4,
		totalPopulation: 117883,
	},
	{
		annualCensus: 2020,
		district: "Atarjea",
		economicallyActivePopulation: 1903,
		id: 5,
		inhabitedDwellings: 1558,
		percentage: 35.93,
		populationDensity: 16.9,
		totalPopulation: 5296,
	},
	{
		annualCensus: 2020,
		district: "Celaya",
		economicallyActivePopulation: 262642,
		id: 6,
		inhabitedDwellings: 143420,
		percentage: 50.39,
		populationDensity: 942.3,
		totalPopulation: 521169,
	},
	{
		annualCensus: 2020,
		district: "Comonfort",
		economicallyActivePopulation: 37053,
		id: 7,
		inhabitedDwellings: 19536,
		percentage: 45.07,
		populationDensity: 168.2,
		totalPopulation: 82216,
	},
	{
		annualCensus: 2020,
		district: "Coroneo",
		economicallyActivePopulation: 4976,
		id: 8,
		inhabitedDwellings: 3133,
		percentage: 44.9,
		populationDensity: 89.5,
		totalPopulation: 11083,
	},
	{
		annualCensus: 2020,
		district: "Cortazar",
		economicallyActivePopulation: 47608,
		id: 9,
		inhabitedDwellings: 25373,
		percentage: 48.62,
		populationDensity: 292.1,
		totalPopulation: 97928,
	},
	{
		annualCensus: 2020,
		district: "Cuerámaro",
		economicallyActivePopulation: 13379,
		id: 10,
		inhabitedDwellings: 8160,
		percentage: 43.36,
		populationDensity: 118.5,
		totalPopulation: 30857,
	},
	{
		annualCensus: 2020,
		district: "Doctor Mora",
		economicallyActivePopulation: 11632,
		id: 11,
		inhabitedDwellings: 6761,
		percentage: 42.47,
		populationDensity: 118.7,
		totalPopulation: 27390,
	},
	{
		annualCensus: 2020,
		district: "Dolores Hidalgo",
		economicallyActivePopulation: 76217,
		id: 12,
		inhabitedDwellings: 38964,
		percentage: 46.75,
		populationDensity: 98.5,
		totalPopulation: 163038,
	},
	{
		annualCensus: 2020,
		district: "Guanajuato",
		economicallyActivePopulation: 95753,
		id: 13,
		inhabitedDwellings: 51675,
		percentage: 49.23,
		populationDensity: 191.8,
		totalPopulation: 194500,
	},
	{
		annualCensus: 2020,
		district: "Huanímaro",
		economicallyActivePopulation: 8775,
		id: 14,
		inhabitedDwellings: 5372,
		percentage: 41.53,
		populationDensity: 165.7,
		totalPopulation: 21128,
	},
	{
		annualCensus: 2020,
		district: "Irapuato",
		economicallyActivePopulation: 285598,
		id: 15,
		inhabitedDwellings: 151888,
		percentage: 48.17,
		populationDensity: 696.7,
		totalPopulation: 592953,
	},
	{
		annualCensus: 2020,
		district: "Jaral del Progreso",
		economicallyActivePopulation: 17395,
		id: 16,
		inhabitedDwellings: 9994,
		percentage: 44.85,
		populationDensity: 221.1,
		totalPopulation: 38782,
	},
	{
		annualCensus: 2020,
		district: "Jerécuaro",
		economicallyActivePopulation: 21799,
		id: 17,
		inhabitedDwellings: 13760,
		percentage: 44.02,
		populationDensity: 56.1,
		totalPopulation: 49517,
	},
	{
		annualCensus: 2020,
		district: "León",
		economicallyActivePopulation: 900923,
		id: 18,
		inhabitedDwellings: 440662,
		percentage: 52.34,
		populationDensity: 1409,
		totalPopulation: 1721215,
	},
	{
		annualCensus: 2020,
		district: "Manuel Doblado",
		economicallyActivePopulation: 18933,
		id: 19,
		inhabitedDwellings: 11183,
		percentage: 45.91,
		populationDensity: 50.3,
		totalPopulation: 41240,
	},
	{
		annualCensus: 2020,
		district: "Moroleón",
		economicallyActivePopulation: 25507,
		id: 20,
		inhabitedDwellings: 14271,
		percentage: 53.97,
		populationDensity: 295.8,
		totalPopulation: 47261,
	},
	{
		annualCensus: 2020,
		district: "Ocampo",
		economicallyActivePopulation: 11790,
		id: 21,
		inhabitedDwellings: 6134,
		percentage: 44.69,
		populationDensity: 25.7,
		totalPopulation: 26383,
	},
	{
		annualCensus: 2020,
		district: "Pénjamo",
		economicallyActivePopulation: 69059,
		id: 22,
		inhabitedDwellings: 39604,
		percentage: 44.57,
		populationDensity: 99.3,
		totalPopulation: 154960,
	},
	{
		annualCensus: 2020,
		district: "Pueblo Nuevo",
		economicallyActivePopulation: 5185,
		id: 23,
		inhabitedDwellings: 3281,
		percentage: 41.8,
		populationDensity: 207.1,
		totalPopulation: 12403,
	},
	{
		annualCensus: 2020,
		district: "Purísima del Rincón",
		economicallyActivePopulation: 43493,
		id: 24,
		inhabitedDwellings: 19865,
		percentage: 51.87,
		populationDensity: 288.4,
		totalPopulation: 83842,
	},
	{
		annualCensus: 2020,
		district: "Romita",
		economicallyActivePopulation: 27889,
		id: 25,
		inhabitedDwellings: 16202,
		percentage: 42.41,
		populationDensity: 149.2,
		totalPopulation: 65766,
	},
	{
		annualCensus: 2020,
		district: "Salamanca",
		economicallyActivePopulation: 125419,
		id: 26,
		inhabitedDwellings: 74971,
		percentage: 45.87,
		populationDensity: 361.9,
		totalPopulation: 273417,
	},
	{
		annualCensus: 2020,
		district: "Salvatierra",
		economicallyActivePopulation: 43209,
		id: 27,
		inhabitedDwellings: 25786,
		percentage: 45.91,
		populationDensity: 158.8,
		totalPopulation: 94126,
	},
	{
		annualCensus: 2020,
		district: "San Diego de la Unión",
		economicallyActivePopulation: 17030,
		id: 28,
		inhabitedDwellings: 10165,
		percentage: 41.48,
		populationDensity: 40.5,
		totalPopulation: 41054,
	},
	{
		annualCensus: 2020,
		district: "San Felipe",
		economicallyActivePopulation: 51773,
		id: 29,
		inhabitedDwellings: 27991,
		percentage: 43.22,
		populationDensity: 39.8,
		totalPopulation: 119793,
	},
	{
		annualCensus: 2020,
		district: "San Francisco del Rincón",
		economicallyActivePopulation: 68824,
		id: 30,
		inhabitedDwellings: 32211,
		percentage: 52.59,
		populationDensity: 307.7,
		totalPopulation: 130871,
	},
	{
		annualCensus: 2020,
		district: "San José Iturbide",
		economicallyActivePopulation: 42361,
		id: 31,
		inhabitedDwellings: 22741,
		percentage: 47.3,
		populationDensity: 163.4,
		totalPopulation: 89558,
	},
	{
		annualCensus: 2020,
		district: "San Luis de la Paz",
		economicallyActivePopulation: 56086,
		id: 32,
		inhabitedDwellings: 30386,
		percentage: 43.63,
		populationDensity: 63.3,
		totalPopulation: 128536,
	},
	{
		annualCensus: 2020,
		district: "San Miguel de Allende",
		economicallyActivePopulation: 87924,
		id: 33,
		inhabitedDwellings: 44543,
		percentage: 50.35,
		populationDensity: 112.4,
		totalPopulation: 174615,
	},
	{
		annualCensus: 2020,
		district: "Santa Catarina",
		economicallyActivePopulation: 2219,
		id: 34,
		inhabitedDwellings: 1550,
		percentage: 38.77,
		populationDensity: 29.4,
		totalPopulation: 5723,
	},
	{
		annualCensus: 2020,
		district: "Santa Cruz de Juventino Rosas",
		economicallyActivePopulation: 36296,
		id: 35,
		inhabitedDwellings: 19426,
		percentage: 44.08,
		populationDensity: 191.9,
		totalPopulation: 82340,
	},
	{
		annualCensus: 2020,
		district: "Santiago Maravatío",
		economicallyActivePopulation: 2850,
		id: 36,
		inhabitedDwellings: 2002,
		percentage: 42.45,
		populationDensity: 80.3,
		totalPopulation: 6714,
	},
	{
		annualCensus: 2020,
		district: "Silao",
		economicallyActivePopulation: 93113,
		id: 37,
		inhabitedDwellings: 46602,
		percentage: 45.74,
		populationDensity: 378,
		totalPopulation: 203556,
	},
	{
		annualCensus: 2020,
		district: "Tarandacuao",
		economicallyActivePopulation: 4809,
		id: 38,
		inhabitedDwellings: 3189,
		percentage: 42.54,
		populationDensity: 93.6,
		totalPopulation: 11304,
	},
	{
		annualCensus: 2020,
		district: "Tarimoro",
		economicallyActivePopulation: 16362,
		id: 39,
		inhabitedDwellings: 10193,
		percentage: 45.57,
		populationDensity: 107.4,
		totalPopulation: 35905,
	},
	{
		annualCensus: 2020,
		district: "Tierra Blanca",
		economicallyActivePopulation: 8364,
		id: 40,
		inhabitedDwellings: 4904,
		percentage: 41.81,
		populationDensity: 48.9,
		totalPopulation: 20007,
	},
	{
		annualCensus: 2020,
		district: "Uriangato",
		economicallyActivePopulation: 33124,
		id: 41,
		inhabitedDwellings: 17350,
		percentage: 53.87,
		populationDensity: 528.6,
		totalPopulation: 61494,
	},
	{
		annualCensus: 2020,
		district: "Valle de Santiago",
		economicallyActivePopulation: 67924,
		id: 42,
		inhabitedDwellings: 37795,
		percentage: 45.27,
		populationDensity: 183.1,
		totalPopulation: 150054,
	},
	{
		annualCensus: 2020,
		district: "Victoria",
		economicallyActivePopulation: 9048,
		id: 43,
		inhabitedDwellings: 5471,
		percentage: 42.57,
		populationDensity: 20.3,
		totalPopulation: 21253,
	},
	{
		annualCensus: 2020,
		district: "Villagrán",
		economicallyActivePopulation: 29425,
		id: 44,
		inhabitedDwellings: 16398,
		percentage: 44.72,
		populationDensity: 512.1,
		totalPopulation: 65791,
	},
	{
		annualCensus: 2020,
		district: "Xichú",
		economicallyActivePopulation: 3664,
		id: 45,
		inhabitedDwellings: 3011,
		percentage: 32.88,
		populationDensity: 12.2,
		totalPopulation: 11143,
	},
	{
		annualCensus: 2020,
		district: "Yuriria",
		economicallyActivePopulation: 31945,
		id: 46,
		inhabitedDwellings: 19175,
		percentage: 46.47,
		populationDensity: 103.2,
		totalPopulation: 68741,
	},
];
