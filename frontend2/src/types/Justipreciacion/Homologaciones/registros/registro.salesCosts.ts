/** @format */
import { roundNumber } from "../../../../utils/utils.number";
import { SalesCostProps } from "./registro.props";
const templateData = (id: number) => ({
	id,
	value: 1,
	unitaryCost: 1,
});
const templateResults = (id: number) => ({ id, value: 1 });
const operation = (data: any, areas: any) =>
	data.map((item: any, index: number) => {
		const { value } = item;
		const unitaryCost = value / areas[index].value;
		item.unitaryCost = isNaN(unitaryCost) ? 1 : unitaryCost;
		return item;
	});
const operationResults = (salesCost: any, factors: any) =>
	salesCost.results.map((item: any, index: number) => {
		const value = factors[index].value * salesCost.data[index].unitaryCost;
		item.value = isNaN(value) ? 1 : value;
		return item;
	});
const calculateAverageUnitCostValue = (data: any, percentages: any) =>
	data.reduce(
		(previous: number, current: any, index: number) =>
			previous + Number(current.value * (percentages[index].value / 100)),
		0,
	);

const handleAverageUnitCostValue = (
	value: number,
	factor: number = 1,
	roundedTo: any,
	roundedResult: any,
) => {
	const roundedValue = roundNumber(value, roundedTo.value);
	const result = roundedValue * factor;
	const adjustedValue = roundNumber(result, roundedResult.value);

	return {
		value,
		roundedValue,
		result,
		adjustedValue,
		roundedTo,
		roundedResult,
	};
};

const initialState = (type: string): SalesCostProps => ({
	tag: `Precio de ${type === "TERRENO" ? "Venta" : "Renta"}`,
	data: [templateData(1)],
	results: [templateResults(1)],
	averageUnitCost: {
		value: 1,
		roundedTo: {
			results: 1,
			value: 1,
			enabled: false,
			observations: "",
		},
		roundedResult: {
			result: 1,
			value: 1,
			enabled: false,
			observations: "",
		},
	},
});
export const salesCostHandler = {
	template: templateData,
	templateResults,
	operation,
	operationResults,
	calculateAverageUnitCostValue,
	handleAverageUnitCostValue,
	initialState,
};