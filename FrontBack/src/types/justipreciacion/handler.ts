/** @format */

import { getParams } from "./../../utils/utils";
/** @format */

import { Storage } from "./storage";

const tipo = (): number | string => {
	const dato = getParams("tipo");
	const terreno = [1, 2, 3, 4]
		.map((item: number) => getParams(`sp${item}_superficie`))
		.filter((item: string) => item !== "");
	return 1;
};
export const initialState: Storage = {
	id: 0,
	status: "unset",
	message: "",
	registro: "",
	tipo: "",
};
