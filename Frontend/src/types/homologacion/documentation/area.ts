/** @format */

import moment from "moment";
import { getParams } from "../../../utils/utils";
import { properties, zoneInformation } from "../state";
import { options as building } from "../factors/building";
import { options as usage } from "../factors/usage";
const date = moment();
/* A type definition for the areaState function. */
export interface areaStateProperties extends properties {
	name: string;
	tag: string;
	averageLotArea: Object;
	subject: Object;
	data: Array<properties>;
}
/**
 * It returns an object with the following properties:
 *
 * - id: number
 * - value: number
 * - surface: number
 * - address: object
 * - factorResult1: number
 * - factorResult2: number
 *
 * The address property is an object with the following properties:
 *
 * - street: string
 * - streetNumber: number
 * - hasNoStreetNumber: boolean
 * - colony: string
 * - zone: object
 * - extras: object
 *
 * The zone property is an object with the following properties:
 *
 * - id: number
 * - name: string
 * - value: number
 *
 * The extras property is an object with the following properties:
 *
 * - factor1: number
 * - factor2: number
 * - type: string
 * - date: string
 * - observations: string
 * - reference: string
 * - document: object
 *
 * The document property is an object with the following properties:
 *
 * - filename: string
 * - data: object
 * @param {number} id - The id of the property.
 * @param {string} type - The type of property, it can be one of the following:
 */
const template = (id: number, type: string) => ({
	id,
	value: 1,
	surface: 1,
	address: {
		street: "",
		streetNumber: 0,
		hasNoStreetNumber: false,
		colony: "",
		zone: zoneInformation[0],
		extras: {
			factor1: 1,
			factor2: 1,
			type: type.includes("TERRENO") ? usage[0].type : building[0].type,
			date: date.format("yyyy-MM-DD"),
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
/**
 * It takes an array of objects, and returns the average of the values of the objects
 * @param {any} data - any - the data that will be used to calculate the average
 */
const operationAverageLotArea = (data: any) =>
	data.reduce((previous: number, current: any) => previous + Number(current.value), 0) /
	data.length;

/**
 * Find the location in the district that has the same name as the name argument.
 * @param {string} name - string - The name of the location we're looking for
 * @param {any} disctrict - The array of locations
 */
const findLocation = (name: string, disctrict: any) =>
	disctrict.find((location: any) => location.name === name);

/**
 * It takes a subject, data, and zoneFactor as arguments and returns the data with the factorResult1
 * and factorResult2 properties added to each item in the data array
 * @param {any} subject - The subject object that contains the zone and factors.
 * @param {any} data - the data to be processed
 * @param {any} zoneFactor - This is the result of the zone factor calculation.
 * @returns The data is being returned.
 */
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

		item.factorResult1 = isNaN(extras.factor1 * extras.factor2)
			? 1
			: extras.factor1 * extras.factor2;
		item.factorResult2 = isNaN(item.factorResult1 * zoneFactor[index].value)
			? 1
			: item.factorResult1 * zoneFactor[index].value;
		return item;
	});
	return data;
};
/**
 * It returns an object with the following properties:
 *
 * name: A string that is either "Áreas " or "Sup. Const "
 * tag: A string that is either "Área de Lote Moda" or "Superficie del sujeto"
 * averageLotArea: An object with the following properties:
 *
 * name: A string that is either "SUPERFICIE LOTE MODA" or "SUPERFICIE DEL COMPARABLE"
 * value: A number with the value of 1
 * surface: A number with the value of 1
 * operation: A function that returns a number with the value of 1
 * subject: An object with the following properties:
 *
 * name: A string that is either "SUPERFICIE TOTAL DEL TERRENO" or "SUPERFICIE DEL SUJETO"
 * value: A number with the value of 1
 * zone: An object with the following
 * @param {string} type - string
 */
export const areaState = (type: string): areaStateProperties => ({
	name: type.includes("TERRENO") ? "Áreas " : "Sup. Const ",
	tag: type.includes("TERRENO") ? "Área de Lote Moda" : "Superficie del sujeto",
	averageLotArea: {
		name: type.includes("TERRENO") ? "SUPERFICIE LOTE MODA" : "SUPERFICIE DEL COMPARABLE",
		value: 1,
		surface: 1,
		operation: operationAverageLotArea,
	},
	subject: {
		name: type.includes("TERRENO") ? "SUPERFICIE TOTAL DEL TERRENO" : "SUPERFICIE DEL SUJETO",
		value:
			Number(
				type.includes("TERRENO")
					? getParams("sp1_superficie")
					: getParams("cna_superficie"),
			) || 1,
		zone: zoneInformation[0],
		factors: [
			{ id: 1, type: "totalPopulation", root: 12 },
			{ id: 2, type: "totalPopulation", root: 12 },
		],
	},
	data: [template(1, type)],
	template,
	options: zoneInformation,
	typeOptions: type.includes("TERRENO") ? usage : building,
	findLocation,
	handleDataFactors,
});
