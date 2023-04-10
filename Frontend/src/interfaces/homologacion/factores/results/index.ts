/** @format */

import { FactorsProps } from "../";
export const template = (id: number) => ({
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
export const initialState: FactorsProps = {
	name: "Homologación Resultante",
	tag: "F.Ho.Re.",
	isUsed: true,
	data: [template(1)],
};
export default initialState;
export const results = {
	template,
	operation,
	initialState,
};
