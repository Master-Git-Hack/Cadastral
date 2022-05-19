/** @format */
interface Properties {
	[key: string | number]: any;
}
export const stateOfConservation: Array<StateOfConservationProperties> = [
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
export interface StateOfConservationProperties extends Properties {
	id: number;
	value: number;
	type: string;
}
interface AgeProperties extends Properties {
	value: number;
	factor: number;
	getFactor: Function;
}
export interface BigPictureProperties extends Properties {
	id: number;
	type: string;
	stateOfConservation: StateOfConservationProperties;
	vut: number;
	age: AgeProperties;
	subTotal: number;
	total: number;
	getSubTotal: Function;
	getTotal: Function;
}
export const bigPictureTemplate = (id: number): BigPictureProperties => ({
	id,
	type: "IE - Instalaciones Especiales",
	stateOfConservation: stateOfConservation[0],
	vut: 1,
	age: {
		value: 1,
		factor: 1,
		getFactor: (age: number, vut: number): number => 1 - (age / vut) ** 1.4,
	},
	subTotal: 0,
	total: 0,
	getSubTotal: (ageFactor: number, stateOfConservation: number, unitaryCost: number): number =>
		ageFactor * stateOfConservation * unitaryCost,
	getTotal: (subTotal: number, quantity: number): number => subTotal * quantity,
});
