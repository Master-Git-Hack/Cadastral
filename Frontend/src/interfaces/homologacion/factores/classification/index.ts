/** @format */

import { FactorsProps } from "../";
export const options = [
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
export const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});

export const initialState: FactorsProps = {
	name: "Clasificación",
	tag: "FClas.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
};
export default initialState;
