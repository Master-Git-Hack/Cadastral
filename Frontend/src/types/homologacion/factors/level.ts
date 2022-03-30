/** @format */

import { properties, operation  } from "../state";
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
export interface levelStateProperties extends properties {
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
export const levelState: levelStateProperties = {
	name: "Nivel",
	tag: "FNiv.",
	isUsed: true,
	position: 3,
	subject: options[0],
	data: [template(1)],
	operation,
	insertion,
	template,
	options,
};
