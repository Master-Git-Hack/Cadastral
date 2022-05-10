/** @format */
import { getParams } from "../../../utils/utils";
import { properties } from "../state";

export interface indivisoStateProperties extends properties {}
/**
 * It takes two numbers and returns an object with the two numbers and the result of their division
 * @param {any} indiviso - the object that contains the data for the indiviso
 * @param {number} subject - The subject of the operation.
 * @returns The state of the indiviso.
 */
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
	return state;
};
/**
 * It returns an object with a bunch of properties if the type string includes the word "TERRENO",
 * otherwise it returns an empty object
 * @param {string} type - string - the type of the property
 * @returns An object with the properties surface, building, indiviso, result, and operation.
 */
export const indivisoState = (type: string) => {
	return type.includes("TERRENO")
		? {
				surface: 1,
				building: 1,
				indiviso: Number(getParams("sp1_factor")) || 1,
				result: 1,
				operation,
		  }
		: {};
};
