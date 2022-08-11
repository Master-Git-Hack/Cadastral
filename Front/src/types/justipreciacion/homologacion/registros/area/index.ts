/** @format */

import moment from "moment";
import { AreaProps } from "..";
import { zoneInformation } from "../../../../../redux/justipreciacion/homologacion/index.types";
import { getURLParams } from "../../../../../utils/url";

const date = moment().format("yyyy-MM-DD");
const zone = zoneInformation[0];
const template = (id: number, type: string) => ({
	id,
	value: 1,
	surface: 1,
	address: {
		street: "",
		streetNumber: 0,
		hasNoStreetNumber: false,
		colony: "",
		zone,
		extras: {
			factor1: 1,
			factor2: 1,
			date,
			observations: "",
			reference: "",
			document: {
				filename: "",
				data: null,
			},
		},
	},
	factorResult1: 1,
	factorResult2: 1,
});

const operationAverageLotArea = (data: any) =>
	data.reduce((previous: number, current: any) => previous + Number(current.value), 0) /
	data.length;
const findLocation = (name: string, disctrict: any) =>
	disctrict.find((location: any) => location.name === name);

const handleDataFactors = (subject: any, data: any, zoneFactor: any) => {
	const { zone, factors } = subject;
	data.map((item: any, index: number) => {
		item.factorResult1 = 1;
		item.factorResult2 = 1;
		const { extras } = item.address;
		let root = !factors[0].type.includes("percentage") ? factors[0].root : 1;
		let value = zone[factors[0].type] / item.address.zone[factors[0].type];
		extras.factor1 = value ** (1 / root);

		root = !factors[1].type.includes("percentage") ? factors[1].root : 1;
		value = zone[factors[1].type] / item.address.zone[factors[1].type];
		extras.factor2 = factors[1].type.includes("useZoneResults")
			? zoneFactor[index].value
			: value ** (1 / root);

		item.factorResult1 = !isNaN(extras.factor1 * extras.factor2)
			? extras.factor1 * extras.factor2
			: 1;
		item.factorResult2 = !isNaN(item.factorResult1 * zoneFactor[index].value)
			? item.factorResult1 * zoneFactor[index].value
			: 1;
		return item;
	});
	return data;
};
const initialState = (type: string): AreaProps => ({
	name: type.includes("TERRENO") ? "Áreas " : "Sup. Const ",
	tag: type.includes("TERRENO") ? "Área de Lote Moda" : "Superficie del sujeto",
	averageLotArea: {
		name: type.includes("TERRENO") ? "SUPERFICIE LOTE MODA" : "SUPERFICIE DEL COMPARABLE",
		value: 1,
		surface: 1,
	},
	subject: {
		name: type.includes("TERRENO") ? "SUPERFICIE TOTAL DEL TERRENO" : "SUPERFICIE DEL SUJETO",
		value:
			Number(
				type.includes("TERRENO")
					? getURLParams("sp1_superficie")
					: getURLParams("cna_superficie"),
			) || 1,
		zone,
		factors: [
			{ id: 1, type: "totalPopulation", root: 12 },
			{ id: 2, type: "totalPopulation", root: 12 },
		],
	},
	data: [template(1, type)],
});
export const area = {
	operationAverageLotArea,
	template,
	findLocation,
	handleDataFactors,
	initialState,
};
