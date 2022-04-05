/** @format */

import { properties } from "../state";

export interface indivisoStateProperties extends properties {}
const operation = (indiviso: any, subject: number) => {
	const { surface, building } = indiviso;
	const indivisoResult = building / surface;
	const state = {
		...indiviso,
		surface,
		building,
		indiviso: indivisoResult,
		result: indivisoResult * subject,
	};
	console.log(state);
	return state;
};
export const indivisoState = (type: string) => {
	return type.includes("TERRENO")
		? {
				surface: 1,
				building: 1,
				indiviso: 1,
				result: 1,
				operation,
		  }
		: {};
};
