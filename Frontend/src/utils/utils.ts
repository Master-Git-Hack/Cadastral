/**
 * @format
 * @author Einar Jhordany Serna Valdivia
 */
const addColumns = (object: any) => {
	const length = Object.keys(object).filter((key: string) => key.includes("C")).length;
	object[`C${length + 1}`] = object.C1;
	return object;
};
const deleteColumns = (object: any) => {
	const length = Object.keys(object).filter((key: string) => key.includes("C")).length;
	if (length > 1) {
		delete object[`C${length}`];
	}
	return object;
};
export const addValueToUsedFactors = (factors: any) => {
	for (const factor of Object.keys(factors)) {
		if (factor !== "location" && factor !== "zone") {
			const { length } = factors[factor].data;
			const { subject, isUsed } = factors[factor];
			if (isUsed) {
				factors[factor].data.push({ id: length, ...subject });
			}
		} else {
			const { data, isUsed } = factors[factor];
			if (isUsed) {
				factors[factor].data[0] = addColumns(data[0]);
			}
		}
	}
	return factors;
};
export const removeValueFromUsedFactors = (factors: any) => {
	for (const factor of Object.keys(factors)) {
		if (factor !== "location" && factor !== "zone") {
			const { length } = factors[factor].data;
			const { isUsed } = factors[factor];
			if (isUsed) if (length > 1) factors[factor].data.pop();
		} else {
			const { data, isUsed } = factors[factor];
			if (isUsed) factors[factor].data[0] = deleteColumns(data[0]);
		}
	}
	return factors;
};
export const addValueToHomologations = (homologation: any) => {
	for (const item of Object.keys(homologation)) {
		const length = homologation[item].data.length;
		homologation[item].data.push({ id: length + 1, value: 1 });
	}
	return homologation;
};
export const removeValueFromHomologations = (homologation: any) => {
	for (const item of Object.keys(homologation))
		if (homologation[item].data.length > 1) homologation[item].data.pop();
	return homologation;
};
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
): string =>
	new Intl.NumberFormat("es-MX", {
		style: isCurrency ? "currency" : isPercentage ? "percent" : "decimal",
		minimumFractionDigits: decimals,
		currency: isCurrency ? "MXN" : undefined,
	}).format(isPercentage && !isCurrency ? value / 100 : value);

/**
 * @param value number that will round to the nearest tenth
 * @param decimals number that will be used to determine the rounding precision
 * @returns a number that represents the value rounded to the nearest tenth
 * @example
 *
 */
export const roundToTenth = (value: number, decimals: number = 1): number =>
	Number((value / 10).toString().split(".")[1][0]) <= 5
		? Math.floor(value / Math.pow(10, decimals)) * Math.pow(10, decimals)
		: Math.ceil(value / Math.pow(10, decimals)) * Math.pow(10, decimals);
