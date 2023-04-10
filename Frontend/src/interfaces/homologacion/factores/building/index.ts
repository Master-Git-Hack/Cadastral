/** @format */

import { FactorsProps } from "../";
export const options = [
	{
		label: "RESIDENCIAL PLUS",
		value: 1.08,
	},
	{
		label: "RESIDENCIAL",
		value: 1.06,
	},
	{
		label: "SEMILUJO",
		value: 1.04,
	},
	{
		label: "MEDIA",
		value: 1.02,
	},
	{
		label: "MEDIA COMÚN",
		value: 1.0,
	},
	{
		label: "INTERÉS SOCIAL ALTA",
		value: 0.98,
	},
	{
		label: "INTERÉS SOCIAL MEDIA",
		value: 0.96,
	},
	{
		label: "INTERÉS SOCIAL BAJA",
		value: 0.94,
	},
	{
		label: "ECONÓMICA ALTA",
		value: 0.92,
	},
	{
		label: "ECONÓMICA BAJA",
		value: 0.9,
	},
	{
		label: "MÍNIMA",
		value: 0.88,
	},
];
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
export const initialState: FactorsProps = {
	name: "Construcción",
	tag: "FCons.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
};
export default initialState;

