/** @format */

import { getParams } from "../../../../../utils/utils";
import { indivisoStorage } from "./indivisoStorage";

/** @format */
const operation = (indiviso: any, subject: number) => ({
	...indiviso,
	indiviso: indiviso.building / indiviso.surface,
	result: (indiviso.building / indiviso.surface) * subject,
});
const initialState = (type: string): indivisoStorage =>
	type.includes("TERRENO")
		? {
				surface: 1,
				building: 1,
				indiviso: Number(getParams("sp1_factor")) || 1,
				result: 1,
		  }
		: {};
export const indivisoHandler = {
	operation,
	initialState,
};
