/** @format */

import { properties, operation } from "../state";
const options = [
	{
		type: "EXCELENTE",
		value: 1.06,
	},
	{
		type: "MUY BUENO",
		value: 1.03,
	},
	{
		type: "FUNCIONAL",
		value: 1.0,
	},
	{
		type: "ADECUADO",
		value: 0.98,
	},
	{
		type: "REGULAR",
		value: 0.96,
	},
	{
		type: "INADECUADO",
		value: 0.94,
	},
	{
		type: "DEFICIENTE",
		value: 0.92,
	},
	{
		type: "OBSOLETO",
		value: 0.9,
	},
	{
		type: "INEXISTENTE",
		value: 0.88,
	},
];
export interface projectStateProperties extends properties {
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
export const projectState: projectStateProperties = {
	name: "Proyecto",
	tag: "FProy.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
	operation,
	insertion,
	template,
	options,
};
