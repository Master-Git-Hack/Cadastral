/** @format */

import { FactorsProps } from "../";
// export const options = [
// 	{
// 		label: "RESIDENCIAL PLUS",
// 		value: 1.08,
// 	},
// 	{
// 		label: "RESIDENCIAL",
// 		value: 1.06,
// 	},
// 	{
// 		label: "SEMILUJO",
// 		value: 1.04,
// 	},
// 	{
// 		label: "MEDIA",
// 		value: 1.02,
// 	},
// 	{
// 		label: "MEDIA COMÚN",
// 		value: 1.0,
// 	},
// 	{
// 		label: "INTERÉS SOCIAL ALTA",
// 		value: 0.98,
// 	},
// 	{
// 		label: "INTERÉS SOCIAL MEDIA",
// 		value: 0.96,
// 	},
// 	{
// 		label: "INTERÉS SOCIAL BAJA",
// 		value: 0.94,
// 	},
// 	{
// 		label: "ECONÓMICA ALTA",
// 		value: 0.92,
// 	},
// 	{
// 		label: "ECONÓMICA BAJA",
// 		value: 0.9,
// 	},
// 	{
// 		label: "MÍNIMA",
// 		value: 0.88,
// 	},
// ];
// MODERNO SUPERIOR	1.08
// MODERNO MEDIO	1.06
// MODERNO ECONÓMICO	1.04
// MODERNO PRECARIO	1.02
// TRADICIONAL	1.00
// PREFABRICADO	0.98
// ANTIGUO SUPERIOR	0.96
// ANTIGUO MEDIO	0.94
// ANTIGUO ECONÓMICO	0.92
// ANTIGUO PRECARIO	0.90
// MIXTAS	0.88
const options=[
	{
		label: "MODERNO SUPERIOR",
		value: 1.08,
	},
	{
		label: "MODERNO MEDIO",
		value: 1.06,
	},
	{
		label: "MODERNO ECONÓMICO",
		value: 1.04,
	},
	{
		label: "MODERNO PRECARIO",
		value: 1.02,
	},
	{
		label: "TRADICIONAL",
		value: 1.0,
	},
	{
		label: "PREFABRICADO",
		value: 0.98,
	},
	{
		label: "ANTIGUO SUPERIOR",
		value: 0.96,
	},
	{
		label: "ANTIGUO MEDIO",
		value: 0.94,
	},
	{
		label: "ANTIGUO ECONÓMICO",
		value: 0.92,
	},
	{
		label: "ANTIGUO PRECARIO",
		value: 0.9,
	},
	{
		label: "MIXTAS",
		value: 0.88,
	}
]
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
const initialState: FactorsProps = {
	name: "Construcción",
	tag: "FCons.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1),template(2),template(3),template(4)],
};
export const building = {
	options,
	template,
	initialState,
};
