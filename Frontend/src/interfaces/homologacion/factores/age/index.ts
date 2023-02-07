/** @format */

import { FactorsProps } from "../";
import { getURLParams } from "../../../../utils/url";

const template = (id: number) => ({
	id,
	value: 1,
	result: 1,
});
const operation = (data: any, subject: any) =>
	data.map((item: any) => {
		const result = 1 - (subject.value - item.value) * subject.operator;
		item.result = result ?? 1;
		return item;
	});

const initialState: FactorsProps = {
	name: "Edad",
	tag: "FEd.",
	isUsed: false,
	position: 0,
	subject: {
		value: Number(getURLParams("cna_edad") ?? 1),
		operator: 0.01,
	},
	data: [template(1)],
};
export const age = {
	template,
	operation,
	initialState,
};
