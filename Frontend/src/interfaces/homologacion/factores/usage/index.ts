/** @format */

import { FactorsProps } from "../";
export const options = [
	{
		label: "HABITACIONAL",
		value: 1.0,
	},
	{
		label: "COMERCIAL",
		value: 1.03,
	},
	{
		label: "MIXTO H-C",
		value: 1.05,
	},
	{
		label: "INDUSTRIAL",
		value: 1.07,
	},
	{
		label: "MIXTO I-H",
		value: 0.97,
	},
	{
		label: "MIXTO I-C",
		value: 1.09,
	},
	{
		label: "SERVICIOS",
		value: 1.04,
	},
];
export const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
export const initialState: FactorsProps = {
	name: "Uso",
	tag: "FUso.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
};
export default initialState;
export const usage = {
	template,
	options,
	initialState,
};
