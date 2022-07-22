/** @format */

import { FactorsProps } from "./factor.props";
const options = [
	{
		type: "SOTANO 1",
		value: 0.9,
	},
	{
		type: "SOTANO 2",
		value: 0.95,
	},
	{
		type: "P.B. NIVEL DE CALLE",
		value: 1.0,
	},
	{
		type: "P.A. NIVEL DE CALLE",
		value: 0.95,
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
export const levelHandler = {
	template,
	options,
	initialState,
};
