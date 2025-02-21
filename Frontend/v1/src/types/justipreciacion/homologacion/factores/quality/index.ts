/** @format */

import type { FactorsProps } from "../";

// const options = [
// 	{
// 		label: "PRECARIA",
// 		value: 0.91,
// 	},
// 	{
// 		label: "BAJA",
// 		value: 0.94,
// 	},
// 	{
// 		label: "ECONOMICA",
// 		value: 0.97,
// 	},
// 	{
// 		label: "COMERCIAL",
// 		value: 1.0,
// 	},
// 	{
// 		label: "MEDIA COMÚN",
// 		value: 1.03,
// 	},
// 	{
// 		label: "MEDIA ALTA",
// 		value: 1.06,
// 	},
// 	{
// 		label: "ALTA",
// 		value: 1.09,
// 	},
// 	{
// 		label: "LUJO",
// 		value: 1.12,
// 	},
// ];
// PRECARIA	0.91
// BAJA	0.94
// ECONÓMICA	0.97
// COMERCIAL	1.00
// INTERÉS SOCIAL	1.03
// MEDIA COMÚN	1.06
// MEDIA ALTA	1.09
// ALTA	1.12
// LUJO	1.15
// RESIDENCIAL	1.20
const options = [
	{
		label: "PRECARIA",
		value: 0.91,
	},
	{
		label: "BAJA",
		value: 0.94,
	},
	{
		label: "ECONÓMICA",
		value: 0.97,
	},
	{
		label: "COMERCIAL",
		value: 1.0,
	},
	{
		label: "INTERÉS SOCIAL",
		value: 1.03,
	},
	{
		label: "MEDIA COMÚN",
		value: 1.06,
	},
	{
		label: "MEDIA ALTA",
		value: 1.09,
	},
	{
		label: "ALTA",
		value: 1.12,
	},
	{
		label: "LUJO",
		value: 1.15,
	},
	{
		label: "RESIDENCIAL",
		value: 1.2,
	},
];
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
const initialState: FactorsProps = {
	name: "Calidad",
	tag: "FCal.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1), template(2), template(3), template(4)],
};
export const quality = {
	template,
	options,
	initialState,
};
