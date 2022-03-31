/** @format */

import { properties, operation } from "../state";
const options = [
	{
		type: "REGULAR",
		value: 1.0,
	},
	{
		type: "IRREGULAR LIGERO",
		value: 0.98,
	},
	{
		type: "P.I. DE 4 LADOS",
		value: 0.96,
	},
	{
		type: "P.I. DE 5 LADOS",
		value: 0.94,
	},
	{
		type: "P.I. DE 6 LADOS",
		value: 0.92,
	},
	{
		type: "IRREGULAR PESADO",
		value: 0.9,
	},
];

export interface typeFormStateProperties extends properties {
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
export const typeFormState: typeFormStateProperties = {
	name: "Forma",
	tag: "FFo.",
	isUsed: true,
	position: 8,
	subject: options[0],
	data: [template(1)],
	operation,
	insertion,
	template,
	options,
};
