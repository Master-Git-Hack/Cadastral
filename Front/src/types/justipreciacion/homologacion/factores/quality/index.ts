/** @format */

import { FactorsProps } from "../";

const options = [
	{
		label: "PRECARIA",
		value: 0.91,
	},
	{
		label: "BAJA",
		value: 0.94,
	},
	{
		label: "ECONOMICA",
		value: 0.97,
	},
	{
		label: "COMERCIAL",
		value: 1.0,
	},
	{
		label: "MEDIA COMÚN",
		value: 1.03,
	},
	{
		label: "MEDIA ALTA",
		value: 1.06,
	},
	{
		label: "ALTA",
		value: 1.09,
	},
	{
		label: "LUJO",
		value: 1.12,
	},
];
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
const initialState: FactorsProps = {
	name: "Calidad",
	tag: "FCal.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
};
export const quality = {
	template,
	options,
	initialState,
};
