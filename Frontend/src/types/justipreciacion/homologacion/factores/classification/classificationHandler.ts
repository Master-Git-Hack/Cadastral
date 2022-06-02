/** @format */

import { operation, insertion, defaultFactorStorage } from "../../properties";
const options = [
	{
		type: "URBANO",
		value: 1.1,
	},
	{
		type: "SUBURBANO",
		value: 1.05,
	},
	{
		type: "RÚSTICO",
		value: 1.0,
	},
	{
		type: "RURAL",
		value: 0.95,
	},
];
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});

const initialState: defaultFactorStorage = {
	name: "Clasificación",
	tag: "FClas.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
};
export const classificationHandler = {
	template,
	operation,
	insertion,
	initialState,
};
