/** @format */
import { insertion, operation, defaultFactorStorage } from "../../properties";
export const options = [
	{
		type: "HABITACIONAL",
		value: 1.0,
	},
	{
		type: "COMERCIAL",
		value: 1.03,
	},
	{
		type: "MIXTO H-C",
		value: 1.05,
	},
	{
		type: "INDUSTRIAL",
		value: 1.07,
	},
	{
		type: "MIXTO I-H",
		value: 0.97,
	},
	{
		type: "MIXTO I-C",
		value: 1.09,
	},
	{
		type: "SERVICIOS",
		value: 1.04,
	},
];
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
const initialState: defaultFactorStorage = {
	name: "Uso",
	tag: "FUso.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
};
export const usageHandler = {
	template,
	operation,
	options,
	insertion,
	initialState,
};
