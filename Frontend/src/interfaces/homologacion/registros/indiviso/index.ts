/** @format */

import { IndivisoProps } from "../";
import { getURLParams } from "../../../../utils/url";

const operation = (indiviso: any, subject: number) => ({
	...indiviso,
	indiviso: indiviso.building / indiviso.surface,
	result: (indiviso.building / indiviso.surface) * subject,
});

const initialState = (type: string): IndivisoProps =>
	type.includes("TERRENO")
		? {
				surface: 1,
				building: 1,
				indiviso: Number(getURLParams("sp1_factor") ?? 1),
				result: 1,
		  }
		: {};
export const indiviso = {
	operation,
	initialState,
};
