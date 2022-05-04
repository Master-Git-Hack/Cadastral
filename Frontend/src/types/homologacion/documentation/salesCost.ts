/** @format */

import { roundToTenth } from "../../../utils/utils";
import { properties } from "../state";

/* Defining the interface for the salesCostStateProperties. */
export interface salesCostStateProperties extends properties {
	data: Array<properties>;
	results: Array<properties>;
	averageUnitCost: Object;
	tag: string;
}
/**
 * It takes an id and returns an object with the id, value and unitaryCost properties
 * @param {number} id - The id of the item to be added to the cart.
 */
const templateData = (id: number) => ({
	id,
	value: 1,
	unitaryCost: 1,
});
/**
 * Given an id, return an object with an id and value property.
 * @param {number} id - number - The id of the result.
 */
const templateResults = (id: number) => ({ id, value: 1 });

/**
 * Given an array of objects with the id, value and unitaryCost properties, it returns an object with the unitaryCost updated.
 * @param {any} data is an array of objects with the id, value and unitaryCost properties
 * @param {any} areas is an array of objects with values needed to calculate the average unitary cost
 * @returns {any} data array object updated with the average unitary cost
 */
const operation = (data: any, areas: any) =>
	data.map((item: any, index: number) => {
		const { value } = item;
		const unitaryCost = value / areas[index].value;
		item.unitaryCost = isNaN(unitaryCost) ? 1 : unitaryCost;
		return item;
	});
/**
 * Given Objects as SalesCost with different properties as data and results and factors with value properties, it returns results with values updated.
 * @param {any} SalesCost is an object with the data and results properties
 * @param {any} factors is an array of objects with values needed to calculate the average unitary cost
 * @returns {any} results array object updated with the average unitary cost
 */
const operationResults = (salesCost: any, factors: any) =>
	salesCost.results.map((item: any, index: number) => {
		const value = factors[index].value * salesCost.data[index].unitaryCost;
		item.value = isNaN(value) ? 1 : value;
		return item;
	});

/**
 * Given an array of objects to applies reduce calculation to return the value of calculation of a sum of products between values of the data object and the percentages.
 * @param {any} data is an array of objects with the id, value properties
 * @param {any} percentages is an array of objects with the id, value properties
 * @returns {any} sum of products between values of the data object and the percentages
 */
const calculateAverageUnitCostValue = (data: any, percentages: any) =>
	data.reduce(
		(previous: number, current: any, index: number) =>
			previous + Number(current.value * (percentages[index].value / 100)),
		0,
	);

const handleAverageUnitCostValue = (value: number, factor: number = 1, roundedTo: any) => {
	const roundedValue =
		roundedTo.value !== 0 ? roundToTenth(value, roundedTo.value) : Number(value.toFixed(2));
	const result = roundedValue * factor;
	const adjustedValue =
		roundedTo.value !== 0 ? roundToTenth(result, roundedTo.value) : Number(result.toFixed(2));

	return {
		value,
		roundedValue,
		result,
		adjustedValue,
		roundedTo,
	};
};
export const salesCostState = (type: string): salesCostStateProperties => ({
	tag: `Precio de ${type === "TERRENO" ? "Venta" : "Renta"}`,
	data: [templateData(1)],
	results: [templateResults(1)],
	averageUnitCost: {
		value: 1,
		roundedValue: 1,
		result: 1,
		adjustedValue: 1,
		roundedTo: {
			value: 1,
			enabled: false,
			observations: "",
		},
	},
	template: templateData,
	templateResults,
	operation,
	operationResults,
	calculateAverageUnitCostValue,
	handleAverageUnitCostValue,
});
