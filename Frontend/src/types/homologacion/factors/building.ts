/** @format */

import { properties, operation } from "../state";
export const options = [
	{
		type: "RESIDENCIAL PLUS",
		value: 1.08,
	},
	{
		type: "RESIDENCIAL",
		value: 1.06,
	},
	{
		type: "SEMILUJO",
		value: 1.04,
	},
	{
		type: "MEDIA",
		value: 1.02,
	},
	{
		type: "MEDIA COMÚN",
		value: 1.0,
	},
	{
		type: "INTERÉS SOCIAL ALTA",
		value: 0.98,
	},
	{
		type: "INTERÉS SOCIAL MEDIA",
		value: 0.96,
	},
	{
		type: "INTERÉS SOCIAL BAJA",
		value: 0.94,
	},
	{
		type: "ECONÓMICA ALTA",
		value: 0.92,
	},
	{
		type: "ECONÓMICA BAJA",
		value: 0.9,
	},
	{
		type: "MÍNIMA",
		value: 0.88,
	},
];
export interface buildingStateProperties extends properties {
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
	result: 1,
});
const insertion = (data: any) => {
	const length = data.length;
	return data.push(template(length));
};
export const buildingState: buildingStateProperties = {
	name: "Construcción",
	tag: "FCons.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
	operation,
	insertion,
	template,
	options,
};
