/** @format */

import { FactorsProps } from "../";
const options = [
	{
		label: "PLANA",
		value: 1.0,
	},
	{
		label: "PENDIENTE LIGERA",
		value: 0.98,
	},
	{
		label: "PENDIENTE INCLINADA",
		value: 0.96,
	},
	{
		label: "PENDIENTE ACCIDENTADA",
		value: 0.94,
	},
];
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
const initialState: FactorsProps = {
	name: "Topografía",
	tag: "FTop.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
};
export const topography = {
	template,
	options,
	initialState,
};
