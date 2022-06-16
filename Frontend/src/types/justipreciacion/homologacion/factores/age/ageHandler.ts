/** @format */

import { getParams } from "../../../../../utils/utils";
import { insertion, defaultFactorStorage } from "../../properties";
const template = (id: number) => ({
	id,
	value: 1,
	result: 1,
});
const operation = (data: any, subject: any) =>
	data.map((item: any) => {
		const result = 1 - (subject.value - item.value) * subject.operator;
		item.result = isNaN(result) ? 1 : result;
		return item;
	});

const initialState: defaultFactorStorage = {
	name: "Edad",
	tag: "FEd.",
	isUsed: true,
	position: 0,
	subject: {
		value: Number(getParams("cna_edad") ||1,
		),
		operator: 0.01,
	},
	data: [template(1)],
};
export const ageHandler = {
	template,
	operation,
	insertion,
	initialState,
};
