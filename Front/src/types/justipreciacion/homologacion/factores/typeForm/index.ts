/** @format */

import { FactorsProps } from "../";
const options = [
	{
		label: "REGULAR",
		value: 1.0,
	},
	{
		label: "IRREGULAR LIGERO",
		value: 0.98,
	},
	{
		label: "P.I. DE 4 LADOS",
		value: 0.96,
	},
	{
		label: "P.I. DE 5 LADOS",
		value: 0.94,
	},
	{
		label: "P.I. DE 6 LADOS",
		value: 0.92,
	},
	{
		label: "IRREGULAR PESADO",
		value: 0.9,
	},
];

const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
const initialState: FactorsProps = {
	name: "Forma",
	tag: "FFo.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
};
export const typeForm = {
	template,
	options,
	initialState,
};
