/** @format */

import { getParams } from "../../../../../utils/utils";
import { reFactorStorage } from "./reFactorStorage";

const handleResult = (surface: number, form: number) => surface * form;
const operation = (average: number, subject: number, root: number) => {
	const response = Number((average / subject) ** (1 / root));

	return isNaN(response) ? 1 : response;
};
const initialState = (type: string) =>
	type.includes("TERRENO")
		? {
				surface: {
					name: "FACTOR DE SUPERFICIE",
					value: 1,
				},
				form: {
					name: "FACTOR DE FORMA",
					value: Number(getParams("sp1_factor")) || 1,
				},
				result: {
					name: "FACTOR DE RESULTANTE",
					value: 1,
				},
				root: 8,
				observation: "",
				isUsed: true,
		  }
		: {
				surface: {
					name: "FACTOR DE TERRENO",
					value: 1,
				},
				root: 8,
				observation: "",
				isUsed: true,
		  };
export const reFactorHandler = {
	operation,
	initialState,
	handleResult,
};
