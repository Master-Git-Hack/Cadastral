/** @format */

import { properties } from "./state";
const options = [
	{
		id: 1,
		value: 1,
		type: "EXCELENTE",
	},
	{
		id: 2,
		value: 0.99,
		type: "ÓPTIMO",
	},
	{
		id: 3,
		value: 0.975,
		type: "BUENO",
	},
	{
		id: 4,
		value: 0.92,
		type: "REGULAR",
	},
	{
		id: 5,
		value: 0.82,
		type: "REPARACIONES MENORES",
	},
	{
		id: 6,
		value: 0.64,
		type: "REPARACIONES REGULARES",
	},
	{
		id: 7,
		value: 0.47,
		type: "REPARACIONES MAYORES",
	},
	{
		id: 8,
		value: 0.25,
		type: "MUY MALO",
	},
	{
		id: 9,
		value: 0.14,
		type: "DESECHO",
	},
];
export interface supplementaryWorksStateProperties extends properties {
	data: Array<properties>;
}
const operation = (data: any) =>
	data.map((item: any) => {
		const { age, vut, unitCost, stateOfConservationFactor, quantity } = item;
		age.factor = 1 - (age.value / vut) ** 1.4;
		unitCost.net = stateOfConservationFactor.value * age.factor * unitCost.value;
		unitCost.result = unitCost.net * quantity.value;
		return item;
	});
const getTotal = (data: any) =>
	data.reduce((previous: number, current: any) => previous + Number(current.unitCost.result), 0);
const template = (id: number) => ({
	id,
	description: "",
	type: "IE - Instalaciones Especiales",
	vut: 1,
	quantity: {
		value: 1,
		unity: "m2",
	},
	age: {
		value: 1,
		factor: 1,
	},
	stateOfConservationFactor: options[0],
	unitCost: {
		value: 1,
		net: 1,
		result: 1,
	},
});
export const supplementaryWorksState: supplementaryWorksStateProperties = {
	data: [template(1)],
	total: 1,
	template,
	operation,
	options,
	getTotal,
};
