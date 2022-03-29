/** @format */

import { properties } from "../state";

export interface ageStateProperties extends properties {
	name: string;
	tag: string;
	isUsed: boolean;
	position: number;
	subject: properties;
	data: Array<properties>;
}

const template = (id: number) => ({
	id,
	value: 0,
	result: 1,
});
const operation = (data: any, subject: any) =>
	data.map((item: any) => {
		item.result = 1 - (subject.value - item.value) * subject.operator;
		return item;
	});
const insertion = (data: any) => {
	const length = data.length;
	return data.push(template(length));
};
export const ageState: ageStateProperties = {
	name: "Edad",
	tag: "FEd.",
	isUsed: true,
	position: 0,
	subject: {
		value: 1,
		operator: 0.01,
	},
	data: [template(1)],
	operation,
	insertion,
	template,
};
