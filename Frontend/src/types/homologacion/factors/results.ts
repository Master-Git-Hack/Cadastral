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
			if (factors[key].isUsed) {
				if (
					!key.includes("Location") &&
					!key.includes("Zone") &&
					!key.includes("Surface") &&
					!key.includes("Commercial") &&
					!key.includes("Results")
				) {
					item.value *= factors[key].data[index].result;
				}
				if (
					key.includes("Surface") ||
					key.includes("Commercial") ||
					key.includes("Location")
				) {
					item.value *= factors[key].data[index].value;
				}

				if (key.includes("Zone")) {
					item.value *= factors[key].results[index].factor1;
				}
			}
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
