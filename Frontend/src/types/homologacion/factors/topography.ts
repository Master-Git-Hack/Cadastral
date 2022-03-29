/** @format */

import { properties } from "../state";
const options = [
	{
		type: "PLANA",
		value: 1.0,
	},
	{
		type: "PENDIENTE LIGERA",
		value: 0.98,
	},
	{
		type: "PENDIENTE INCLINADA",
		value: 0.96,
	},
	{
		type: "PENDIENTE ACCIDENTADA",
		value: 0.94,
	},
];

export interface topographyStateProperties extends properties {
	name: string;
	tag: string;
	isUsed: boolean;
	position: number;
	subject: properties;
	data: Array<properties>;
	options: any;
}
const operation = (data: any, subject: any) =>
	data.map((item: any) => {
		item.result = subject.value / item.value;
		return item;
	});
const template = (id: number) => ({
	id,
	...options[0],
});
const insertion = (data: any) => {
	const length = data.length;
	return data.push(template(length));
};
export const topographyState: topographyStateProperties = {
	name: "Topografía",
	tag: "FTop.",
	isUsed: true,
	position: 7,
	subject: options[0],
	data: [template(1)],
	operation,
	insertion,
	template,
	options,
};
