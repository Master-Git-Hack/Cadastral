/** @format */

export const handleOperation = (subject: number, current: number): number => subject / current;
export const searchByType = (options: any, type: string) =>
	options.find((option: any) => option.type === type);

export const searchByValue = (options: any, value: number) =>
	options.find((option: any) => option.value === value);
/**
 * @param value number that will be converted to a string displaying a representative character as $ or % in case you need it
 * @param isCurrency boolean that will be used to determine if the value will be converted to a currency or not
 * @param isPercentage boolean that will be used to determine if the value will be converted to a percentage or not
 * @param decimals number that will be used to determine the number of decimals to be displayed
 * @returns a string that represents the value in the desired format (currency or percentage or decimal)
 * @example toFancyNumber(123456789, true, false, 2) // returns "$1,234,567.89"
 * @example toFancyNumber(123456789, false, true, 2) // returns "1234567.89%"
 * @example toFancyNumber(123456789, false, false, 2) // returns "1234567.89"
 * @example toFancyNumber(123456789, false, false, 0) // returns "1234567"
 */
export const toFancyNumber: Function = (
	value: number,
	isCurrency: boolean = false,
	isPercentage: boolean = false,
	decimals: number = 2,
): string =>new Intl.NumberFormat("es-MX", {
	style: isCurrency ? "currency" : isPercentage ? "percent" : "decimal",
	minimumFractionDigits: decimals,
	currency: isCurrency ? "MXN" : undefined,
}).format(isPercentage && !isCurrency ? value / 100 : value)

/**
 * @param value number that will round to the nearest tenth
 * @param decimals number that will be used to determine the rounding precision
 * @returns a number that represents the value rounded to the nearest tenth
 * @example
 *
 */
export const roundToTenth = (value: number, decimals: number = 1): number => {
	const aux = (value / 10).toString().split(".");
	if (aux.length === 1) return Math.round(value);
	else
		return Number(aux[1][0]) <= 5
			? Math.floor(value / Math.pow(10, decimals)) * Math.pow(10, decimals)
			: Math.ceil(value / Math.pow(10, decimals)) * Math.pow(10, decimals);
};

export const getParams = (key: string) => {
	const params = new URLSearchParams(window.location.search);
	return params.get(key) !== null && params.get(key) !== undefined ? params.get(key) : "";
};
