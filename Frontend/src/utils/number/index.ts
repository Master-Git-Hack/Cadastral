/** @format */

import { FancyProps } from "./number.types";
/**
 * It takes a number and returns with the number of decimals given, by default it returns with 3 decimals.
 *
 * @format
 * @param {number} value - The number to be formatted.
 * @param {number} decimals - The number of decimals to be returned.
 * @returns {number} - The number with the given decimals.
 */

export const formatNumb = (value: number, decimals: number = 3): number =>
	Number(value.toFixed(decimals));
/**
 * It takes a number with optional properties and returns a number with the same properties.
 *
 * @format
 * @param {number} value - The value of the number.
 * @optional {object}  - The properties of the decoration {
 * @optionsProperties {string} style - "decimal" | "currency" | "percent";
 * @optionsProperties {boolean} isCurrency - specifies if the number is currency.;
 * @optionsProperties {boolean} isPercentage - specifies if the number is a percentage.;
 * @optionsProperties {number}decimals - number of decimals to show}
 */

export const asFancyNumber = (value: number, properties?: FancyProps): string => {
	const {
		style = "decimal",
		isCurrency = false,
		isPercentage = false,
		decimals = 2,
	} = properties || {};
	const _style = isCurrency ? "currency" : isPercentage ? "percent" : style;
	const _decimals = !String(_style).includes("percent") ? decimals : 0;
	const currency = String(_style).includes("currency") ? "MXN" : undefined;
	const unit = String(_style).includes("percent") ? 100 : 1;
	const format = new Intl.NumberFormat("es-MX", {
		style: _style,
		minimumFractionDigits: _decimals,
		currency,
	});
	const current = value?.toFixed(_decimals);
	if (properties === undefined) return current;
	return format.format(Number(current) / unit);
};
/**
 * Using 10 power to the rounded value given as parameter to get the first decimal place and round it to the nearest value,
 * check if the digit is greater than 5, if true, applies a ceiling otherwise floor,
 * in case decimals not found retrieves value with the default round function.
 * In case the rounded value given as parameter equals -1,
 * retrieves the value as a number with 2 decimals using fixed-point notation (toFixed).
 * @param {number} [decimals=-1] - The number of decimals to round to.
 * @returns Function takes two parameters, value and decimals, and returns a number.
 */
export const roundNumber = (value: number, round: number = -1): number => {
	if (round > -1) {
		const roundType = 10 ** round;
		const reducedValue = value / roundType;
		const decimal = reducedValue.toString().split(".")[1];
		const action = decimal ? (Number(decimal[0]) >= 5 ? "ceil" : "floor") : "round";
		return Math[action](reducedValue) * roundType;
	}
	return Number(value.toFixed(2));
};
/**
 * It takes an array of numbers and returns its sum divided by the length of the array.
 * @param {Array<number>} numbers - The array of numbers to sum.
 * @returns number - The average of the values given.
 */
export const average = (values: Array<number>): number =>
	values.reduce((previous: number, current: number) => previous + current, 0) / values.length;

/**
 * It takes an array of numbers and returns its standard deviation.
 * @param {Array<number>} numbers - The array of numbers to calculate the standard deviation.
 * @returns number - The standard deviation of the values given.
 */
export const standardDeviation = (values: Array<number>): number => {
	const avg = average(values);
	const preResult =
		values.reduce((previous: number, current: number) => previous + (current - avg) ** 2, 0) /
			values.length -
		1;
	return Math.sqrt(preResult);
};
/** merge sort*/
export const mergeSort = (values: Array<number>): Array<number> => {
	if (values.length < 2) return values;

	const middle = values.length >> 1;
	const left = values.slice(0, middle);
	const right = values.slice(middle);

	return merge(mergeSort(left), mergeSort(right));
};
const merge = (left: Array<number>, right: Array<number>): Array<number> => {
	const result: Array<number> = [];
	while (left.length && right.length) {
		result.push((left[0] < right[0] ? left.shift() : right.shift()) ?? 0);
	}
	return [...result, ...left, ...right];
};
