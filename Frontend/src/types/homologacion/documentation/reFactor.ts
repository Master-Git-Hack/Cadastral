/** @format */

import { properties } from "../state";

export interface reFactorStateProperties extends properties {}

/**
 * It takes the average of a set of numbers, divides it by a subject number, and then takes the root of
 * the result
 * @param {number} average - The average of the grades.
 * @param {number} subject - The subject of the operation.
 * @param {number} root - The root of the average.
 * @returns The geometric mean of the average and subject.
 */
const operation = (average: number, subject: number, root: number) => {
	const response = Number((average / subject) ** (1 / root));

	return isNaN(response) ? 1 : response;
};

/**
 * HandleResult takes two numbers and returns the product of the two numbers.
 * @param {number} surface - the surface of the room, which is an integer
 * @param {number} form - the form of the shape
 */
const handleResult = (surface: number, form: number) => surface * form;
/**
 * It returns an object with the properties of the state of the reFactor component
 * @param {string} type - string - The type of the property.
 * @returns An object with the properties surface, form, average, subject, root, and operation.
 */

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
