/** @format */

import { properties, operation } from "../state";
const options = [
	{
		type: "URBANO",
		value: 1.1,
	},
	{
		type: "SUBURBANO",
		value: 1.05,
	},
	{
		type: "RÚSTICO",
		value: 1.0,
	},
	{
		type: "RURAL",
		value: 0.95,
	},
];
export interface classificationStateProperties extends properties {
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
export const classificationState: classificationStateProperties = {
	name: "Clasificación",
	tag: "FClas.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
	operation,
	insertion,
	template,
	options,
};
