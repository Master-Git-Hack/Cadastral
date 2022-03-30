/** @format */

import { properties, operation  } from "../state";
export const options = [
	{
		type: "HABITACIONAL",
		value: 1.0,
	},
	{
		type: "COMERCIAL",
		value: 1.03,
	},
	{
		type: "MIXTO H-C",
		value: 1.05,
	},
	{
		type: "INDUSTRIAL",
		value: 1.07,
	},
	{
		type: "MIXTO I-H",
		value: 0.97,
	},
	{
		type: "MIXTO I-C",
		value: 1.09,
	},
	{
		type: "SERVICIOS",
		value: 1.04,
	},
];

export interface usageStateProperties extends properties {
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
export const usageState: usageStateProperties = {
	name: "Uso",
	tag: "FUso.",
	isUsed: true,
	position: 9,
	subject: options[0],
	data: [template(1)],
	operation,
	insertion,
	template,
	options,
};
