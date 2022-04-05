/** @format */

import { roundToTenth } from "../../../utils/utils";
import { properties } from "../state";

export interface salesCostStateProperties extends properties {
	data: Array<properties>;
	results: Array<properties>;
	averageUnitCost: Object;
	tag: string;
}
const templateData = (id: number) => ({
	id,
	value: 1,
	unitaryCost: 1,
});
const templateResults = (id: number) => ({ id, value: 1 });
const operation = (data: any, areas: any) =>
	data.map((item: any, index: number) => {
		const { value } = item;
		item.unitaryCost = value / areas[index].value;
		return item;
	});
const operationResults = (salesCost: any, factors: any) =>
	salesCost.results.map((item: any, index: number) => {
		item.value = factors[index].value * salesCost.data[index].unitaryCost;
		return item;
	});
const calculateAverageUnitCostValue = (data: any, percentages: any) =>
	data.reduce(
		(previous: number, current: any, index: number) =>
			previous + Number(current.value * (percentages[index].value / 100)),
		0,
	);

const handleAverageUnitCostValue = (value: number, factor: number = 1) => {
	const roundedValue = roundToTenth(value, 1);
	const result = roundedValue * factor;
	const adjustedValue = roundToTenth(result, 1);
	return {
		value,
		roundedValue,
		result,
		adjustedValue,
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
	},
	template: templateData,
	templateResults,
	operation,
	operationResults,
	calculateAverageUnitCostValue,
	handleAverageUnitCostValue,
});
