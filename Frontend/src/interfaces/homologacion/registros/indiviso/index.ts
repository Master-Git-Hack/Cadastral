/** @format */

import { IndivisoProps } from "../";
import { getURLParams } from "../../../../utils/url";

const operation = (indiviso: any, subject: number) => ({
	...indiviso,
	indiviso: indiviso.building / indiviso.surface,
	result: (indiviso.building / indiviso.surface) * subject,
});

export const initialState = (type: string): IndivisoProps =>
	type.includes("terreno")
		? {
				surface: 1,
				building: 1,
				indiviso: 1,
				result: 1,
		  }
		: {};
export default initialState;
export const indiviso = {
	operation,
	initialState,
};
