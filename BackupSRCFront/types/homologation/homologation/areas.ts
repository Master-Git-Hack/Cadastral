/** @format */

import { StateProps } from "../state";
import moment from "moment";
const date = moment();
interface State extends StateProps {
	id: number;
	value: number;
	surface: number;
	address: any;
}
export interface AreasProps {
	[key: string]: number | Array<State> | any;
}
export const areasData = (id: number): State => ({
	id,
	value: 1,
	surface: 1,
	address: {
		street: "",
		streetNumber: 0,
		streetWithoutNumber: false,
		suburb: "",
		district: {
			annualCensus: 2020,
			name: "Abasolo",
			economicallyActivePopulation: 42110,
			id: 1,
			inhabitedDwellings: 22275,
			percentage: 45.75,
			populationDensity: 149.6,
			totalPopulation: 92040,
		},
		type: "",
		date: date.format("yyyy-MM-D"),
		characteristics: "",
		documentation: {
			link: "",
			document: {
				filename: "",
				extension: "",
				data: "",
			},
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
});
export const areasTemplate: any = (type: string = "TERRENO" || "RENTA"): AreasProps => ({
	averageLotArea: {
		name: type === "TERRENO" ? "SUPERFICIE LOTE MODA" : "SUPERFICIE DEL COMPARABLE",
		value: 0,
	},
	subject: {
		name: type === "TERRENO" ? "SUPERFICIE TOTAL DEL TERRENO" : "SUPERFICIE DEL SUJETO",
		value: 0,
		district: {
			annualCensus: 2020,
			name: "Abasolo",
			economicallyActivePopulation: 42110,
			id: 1,
			inhabitedDwellings: 22275,
			percentage: 45.75,
			populationDensity: 149.6,
			totalPopulation: 92040,
		},
		factors: [
			{ id: 1, type: "totalPopulation", root: 12 },
			{ id: 2, type: "totalPopulation", root: 12 },
		],
	},
	data: [areasData(1)],
	tag: type === "TERRENO" ? "Área de Lote Moda" : "Superficie del sujeto",
	name: type === "TERRENO" ? "Áreas " : "Sup. Const ",
});

interface District {
	[key: string]: any;
}
export interface DistrictsProps extends District {
	id: number;
	annualCensus: number;
	populationDensity: number;
	name: string;
	percentage: number;
	economicallyActivePopulation: number;
	totalPopulation: number;
	inhabitedDwellings: number;
}
