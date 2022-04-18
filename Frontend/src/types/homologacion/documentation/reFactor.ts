/** @format */

import { properties } from "../state";

export interface reFactorStateProperties extends properties {}

const operation = (average: number, subject: number, root: number) => {
	return Number((average / subject) ** (1 / root));
};

const handleResult = (surface: number, form: number) => surface * form;
export const reFactorState = (type: string): reFactorStateProperties => {
	const state = type.includes("TERRENO")
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
				handleResult,
		  }
		: {
				surface: {
					name: "FACTOR DE TERRENO",
					value: 1,
				},
		  };
	return { ...state, root: 8, operation, isUsed: true };
};
