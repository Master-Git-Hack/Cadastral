/** @format */

import { Properties } from "..";

/** @format */
export interface OptionProps extends Properties {
	id: number;
	label: string;
	value: number;
}
const options: Array<OptionProps> = [
	{
		id: 1,
		value: 1,
		label: "EXCELENTE",
	},
	{
		id: 2,
		value: 0.99,
		label: "ÓPTIMO",
	},
	{
		id: 3,
		value: 0.975,
		label: "BUENO",
	},
	{
		id: 4,
		value: 0.92,
		label: "REGULAR",
	},
	{
		id: 5,
		value: 0.82,
		label: "REPARACIONES MENORES",
	},
	{
		id: 6,
		value: 0.64,
		label: "REPARACIONES REGULARES",
	},
	{
		id: 7,
		value: 0.47,
		label: "REPARACIONES MAYORES",
	},
	{
		id: 8,
		value: 0.25,
		label: "MUY MALO",
	},
	{
		id: 9,
		value: 0.14,
		label: "DESECHO",
	},
];
interface AgeProps extends Properties {
	factor: number;
	value: number;
}
export interface CalculationProps extends Properties {
	title: string;
	type:
		| "IE - Instalaciones Especiales"
		| "IA - Instalaciones Auxiliares"
		| "OC - Obras Complementarias"
		| string;
	conservation: OptionProps;
	age: AgeProps;
	vut: number;
	repositionValue: number;
	total: number;
	status: string | null;
}
export const calculationTemplate: CalculationProps = {
	title: "",
	type: "IE - Instalaciones Especiales",
	conservation: options[0],
	age: {
		factor: 1,
		value: 1,
	},
	vut: 1,
	repositionValue: 1,
	total: 1,
	status: null,
};
export const calculo = {
	calculationTemplate,
	options,
	getFactor: (age: number, vut: number) => 1 - (age / vut) ** 1.4,
};
