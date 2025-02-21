/** @format */

import type { FactorsProps } from "../";
const options = [
	{
		label: "URBANO",
		value: 1.1,
	},
	{
		label: "SUBURBANO",
		value: 1.05,
	},
	{
		label: "RÚSTICO",
		value: 1.0,
	},
	{
		label: "RURAL",
		value: 0.95,
	},
];
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});

const initialState: FactorsProps = {
	name: "Clasificación",
	tag: "FClas.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1), template(2), template(3), template(4)],
};
export const classification = {
	options,
	template,
	initialState,
};
