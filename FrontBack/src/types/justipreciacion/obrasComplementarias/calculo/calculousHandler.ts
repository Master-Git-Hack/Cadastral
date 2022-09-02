/** @format */
import { calculousStorage, StateOfConservationProperties } from "./calculousStorage";

const options: Array<StateOfConservationProperties> = [
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
const template = (id: number): calculousStorage => ({
	id,
	type: "IE - Instalaciones Especiales",
	stateOfConservation: options[0],
	vut: 1,
	age: {
		value: 1,
		factor: 1,
	},
	subTotal: 0,
	total: 0,
});
export const calculousHandler = {
	template,
	options,
	getFactor: (age: number, vut: number): number => 1 - (age / vut) ** 1.4,
	getSubTotal: (ageFactor: number, stateOfConservation: number, unitaryCost: number): number =>
		ageFactor * stateOfConservation * unitaryCost,
	getTotal: (subTotal: number, quantity: number): number => subTotal * quantity,
};
