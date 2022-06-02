/** @format */
import { salesCostStorage } from './salesCostStorage';
import { roundToTenth } from '../../../../../utils/utils';

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

const initialState = (type: string): salesCostStorage => ({
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
});
export const salesCostHandler = {
    template: templateData,
	templateResults,
	operation,
	operationResults,
	calculateAverageUnitCostValue,
    handleAverageUnitCostValue,
    initialState
}