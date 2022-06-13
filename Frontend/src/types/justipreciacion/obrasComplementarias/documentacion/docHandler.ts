/** @format */
import { dataStorage, CalculationProperties } from "./docStorage";
const getResult = (value: number, total: number): number => total / value;
const getUnitaryInd = (ind: number = 1, unitary: number): number => unitary * ind;
const getSubTotal = (data: Array<CalculationProperties>) =>
	data.reduce(
		(previous: number, current: CalculationProperties) =>
			previous + Number(current.value.total),
		0,
	);

const calculationTemplate = (id: number): CalculationProperties => ({
	id,
	quantity: {
		description: "",
		value: 1,
		unity: "m2",
	},
	value: {
		unitary: 1,
		ind: {
			value: 1,
			unitary: 1,
		},
		total: 1,
	},
});
const appendCalculationTemplate = (data: Array<CalculationProperties>) => {
	data.push(calculationTemplate(data.length + 1));
	return data;
};
const areaTemplate = {
	data: [
		{
			description: "",
			value: 1,
			unity: "m2",
		},
	],
	total: 1,
	unity: "m2",
};
const template = (id: number): dataStorage => ({
	id,
	name: "",
	show: true,
	area: {
		data: [
			{
				description: "",
				value: 1,
				unity: "m2",
			},
		],
		total: 1,
		unity: "m2",
	},
	calculation: [calculationTemplate(1)],
	value: {
		subTotal: 1,
		total: 1,
		gtoFactor: 1,
		result: {
			value: 1,
			unity: "m2",
		},
	},
});
export const docHandler = {
	template,
	areaTemplate,
	calculationTemplate,
	appendCalculationTemplate,
	getResult,
	getUnitaryInd,
	getSubTotal,
	getFinalTotal: (factor: number, subTotal: number): number => subTotal * factor,
};
