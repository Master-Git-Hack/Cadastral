/** @format */
import { resultsStorage } from "./resultsStorage";
import { insertion } from "../../properties";
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
const initialState: resultsStorage = {
	name: "Homologación Resultante",
	tag: "F.Ho.Re.",
	isUsed: false,
	data: [template(1)],
};
export const resultsHandler = {
	template,
	operation,
	insertion,
	initialState,
};
