/** @format */

import { getURLParams } from "../../../../utils/utils.url";
import { IndivisoProps } from "./registro.props";

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
				indiviso: Number(getURLParams("sp1_factor")) || 1,
				result: 1,
		  }
		: {};
export const indivisoHandler = {
	operation,
	initialState,
};
