/** @format */

import { getURLParams } from "../../../../utils/url";


const handleResult = (surface: number, form: number) => surface * form;
const operation = (average: number, subject: number, root: any) => {
	const response = Number((average / subject) ** (1 / root.value));

	return isNaN(response) ? 1 : response;
};
export const initialState = (type: string) => ({
	...(type.includes("terreno")
		? {
				surface: {
					name: "FACTOR DE SUPERFICIE",
					value: 1,
				},
				form: {
					name: "FACTOR DE FORMA",
					value: 1,
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
	isUsed: true,
});
export default initialState;
export const reFactor = {
	operation,
	initialState,
	handleResult,
};
