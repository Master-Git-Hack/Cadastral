/** @format */

import { properties } from "../state";

export interface resultsStateProperties extends properties {
	name: string;
	tag: string;
	isUsed: boolean;
	data: Array<properties>;
}

const template = (id: number) => ({
	id,
	value: 1,
});
const operation = (data: any, factors: any) =>
	data.map((item: any, index: number) => {
		item.value = 1;
		for (const key in factors) {
			if (key !== "location" && key !== "zone" && key !== "surface" && key !== "commercial") {
				item.value *= factors[key].data[index].result;
			} else if (key === "surface" || key === "commercial") {
				item.value *= factors[key].data[index].value;
			} else item.value *= factors[key].results[index].value;
		}
		return item;
	});
const insertion = (data: any) => {
	const length = data.length;
	return data.push(template(length));
};
export const resultsState: resultsStateProperties = {
	name: "Homologación Resultante",
	tag: "F.Ho.Re.",
	isUsed: false,
	data: [template(1)],
	operation,
	insertion,
	template,
};
