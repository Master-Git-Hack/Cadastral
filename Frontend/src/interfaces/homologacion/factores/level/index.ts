/** @format */

import { FactorsProps } from "../";
const options = [
	{
		label: "SOTANO 1",
		value: 0.9,
	},
	{
		label: "SOTANO 2",
		value: 0.95,
	},
	{
		label: "P.B. NIVEL DE CALLE",
		value: 1.0,
	},
	{
		label: "P.A. NIVEL DE CALLE",
		value: 1.05,
	},
];
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
const initialState: FactorsProps = {
	name: "Nivel",
	tag: "FNiv.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
};
export const level = {
	template,
	options,
	initialState,
};
