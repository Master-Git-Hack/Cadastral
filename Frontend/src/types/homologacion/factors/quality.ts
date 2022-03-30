/** @format */

import { properties, operation  } from "../state";
const options = [
	{
		type: "PRECARIA",
		value: 0.91,
	},
	{
		type: "BAJA",
		value: 0.94,
	},
	{
		type: "ECONOMICA",
		value: 0.97,
	},
	{
		type: "COMERCIAL",
		value: 1.0,
	},
	{
		type: "MEDIA COMÚN",
		value: 1.03,
	},
	{
		type: "MEDIA ALTA",
		value: 1.06,
	},
	{
		type: "ALTA",
		value: 1.09,
	},
	{
		type: "LUJO",
		value: 1.12,
	},
];
export interface qualityStateProperties extends properties {
	name: string;
	tag: string;
	isUsed: boolean;
	position: number;
	subject: properties;
	data: Array<properties>;
	options: any;
}

const template = (id: number) => ({
	id,
	...options[0],
});
const insertion = (data: any) => {
	const length = data.length;
	return data.push(template(length));
};
export const qualityState: qualityStateProperties = {
	name: "Calidad",
	tag: "FCal.",
	isUsed: true,
	position: 5,
	subject: options[0],
	data: [template(1)],
	operation,
	insertion,
	template,
	options,
};
