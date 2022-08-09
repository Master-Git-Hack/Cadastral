/** @format */

import { getURLParams } from "../../../../utils/utils.url";
const handleResult = (surface: number, form: number) => surface * form;
const operation = (average: number, subject: number, root: number) => {
	const response = Number((average / subject) ** (1 / root));

	return isNaN(response) ? 1 : response;
};
const initialState = (type: string) => ({
	...(type.includes("TERRENO")
		? {
				surface: {
					name: "FACTOR DE SUPERFICIE",
					value: 1,
				},
				form: {
					name: "FACTOR DE FORMA",
					value: Number(getURLParams("sp1_factor")) || 1,
				},
				result: {
					name: "FACTOR DE RESULTANTE",
					value: 1,
				},
		  }
		: {
				surface: {
					name: "FACTOR DE TERRENO",
					value: 1,
				},
		  }),
	root: {
		enabled: false,
		value: 8,
		observations: "",
	},
});
export const reFactorHandler = {
	operation,
	initialState,
	handleResult,
};
