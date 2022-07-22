/** @format */

import FileSaver from "file-saver";

/**
 * It takes two numbers and returns a number.
 * @param {number} subject - The first number in the operation.
 * @param {number} current - The current value of the accumulator.
 */
export const handleOperation = (subject: number, current: number): number => subject / current;
/**
 * It takes an array of options and a type, and returns the first option that matches the type
 * @param {any} options - The options array that is passed to the component.
 * @param {string} type - The type of the option you want to find.
 */
export const searchByType = (options: any, type: string) =>
	options.find((option: any) => option.type === type);

/**
 * It takes an array of objects and a value, and returns the object in the array that has a value
 * property equal to the value passed in
 * @param {any} options - The array of options to search through.
 * @param {number} value - The value of the selected option.
 */
export const searchByValue = (options: any, value: number) =>
	options.find((option: any) => option.value === value);

export const fixedNumber=(value:number, decimals:number=2) =>Number(value.toFixed(decimals));
/**
 * It takes a number with optional properties and returns a number with the same properties.
 * @param {number} value - The value of the number.
 * @optional {object}  - The properties of the decoration {
 * @optionsProperties {string} style - "decimal" | "currency" | "percent";
 * @optionsProperties {boolean} isCurrency - specifies if the number is currency.;
 * @optionsProperties {boolean} isPercentage - specifies if the number is a percentage.;
 * @optionsProperties {number}decimals - number of decimals to show}
**/ 
export const asFancyNumber: Function = (
	value: number = 0,
	options?: {
		style: "decimal" | "currency" | "percent";
		isCurrency: boolean;
		isPercentage: boolean;
		decimals: number;
		//unit: "kilometer-per-hour" | "meter" | "kilometer" | "centimeter" | "liter" | "literal" | "hour" | "minute" | "second";
	},
): string => {
	const isCurrency = options?.isCurrency ?? false;
	const isPercentage = options?.isPercentage ?? false;
	const style = isCurrency
		? "currency"
		: isPercentage
		? "percent"
		: options?.style === undefined
		? "decimal"
		: options.style;
	const decimals =
		options?.decimals ?? (!isPercentage || !String(style).includes("percent")) ? 2 : 0;
	const currency = isCurrency || String(style).includes("currency") ? "MXN" : undefined;
	const unit = (isPercentage && !isCurrency) || String(style).includes("percent") ? 100 : 1;
	const properties = new Intl.NumberFormat("es-MX", {
		style,
		minimumFractionDigits: decimals,
		currency,
	});
	const current = value.toFixed(decimals)
	return options !== undefined
		? properties.format(Number(current) / unit)
		: current;
};
/**
 * It formats a number to a fancy string as currency or percentage or just with decimal representation
 * @param {number} value - number: The number to format.
 * @param {boolean} [isCurrency=false] - boolean = false
 * @param {boolean} [isPercentage=false] - If true, the value will be divided by 100 before formatting.
 * @param {number} [decimals=2] - number = 2,
 */
export const toFancyNumber: Function = (
	value: number,
	isCurrency: boolean = false,
	isPercentage: boolean = false,
	decimals: number = 2,
	customStyle?: string,
): string =>
	new Intl.NumberFormat("es-MX", {
		style:
			customStyle !== undefined
				? customStyle
				: isCurrency
				? "currency"
				: isPercentage
				? "percent"
				: "decimal",
		minimumFractionDigits: decimals,
		currency: isCurrency ? "MXN" : undefined,
	}).format(Number(value.toFixed(decimals)) / (isPercentage && !isCurrency ? 100 : 1));

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
		const decimals = reducedValue.toString().split(".");
		const action =
			decimals.length === 1 ? "round" : Number(decimals[1][0]) < 5 ? "floor" : "ceil";
		return Math[action](reducedValue) * roundType;
	} else return Number(value.toFixed(2));
};
export const roundToTenth = (value: number, decimals: number = 1): number => {
	/**
	 * deprecated *
	 * It rounds a number to the nearest tenth
	 * @param {number} value - The number to be rounded.
	 * @param {number} [decimals=1] - The number of decimals to round to.
	 * @returns A function that takes two parameters, value and decimals, and returns a number.
	 */
	const aux = (value / 10).toString().split(".");
	if (aux.length === 1) return Math.round(value);
	else
		return Number(aux[1][0]) < 5
			? Math.floor(value / Math.pow(10, decimals)) * Math.pow(10, decimals)
			: Math.ceil(value / Math.pow(10, decimals)) * Math.pow(10, decimals);
};

/**
 * It takes a key as a parameter and returns the value of the key from the URL
 * @param {string} key - The key of the parameter you want to get.
 * @returns A function that takes a string as a parameter and returns a string.
 */
export const getParams = (key: string): string => {
	const params = new URLSearchParams(window.location.search);
	return params.get(key) || "";
};
/**
 * It takes a key and a value, creates a new URLSearchParams object, sets the key and value on that
 * object, and then returns the stringified version of that object
 * @param {string} key - The key of the parameter you want to set.
 * @param {any} value - The value to set the key to.
 * @returns A string
 */
export const setParams = (key: string, value: any) => {
	const params = new URLSearchParams();
	params.set(key, value);
	return params.toString();
};

/**
 * It takes a file and returns a promise that resolves to the base64 representation of the file
 * @param {any} file - The file to be converted to base64
 */
export const toBase64 = (file: any) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
export const exportDataAtFail = async (payload: any, url: string) =>
	window.confirm("Desea descargar el registro realizado?") &&
	FileSaver.saveAs(
		URL.createObjectURL(
			new Blob([JSON.stringify(payload)], {
				type: "application/json",
			}),
		),
		`${url}.json`,
	);

export const isUrlValid = (url: string): boolean => {
	let validator;
	try {
		validator = new URL(url);
	} catch (_) {
		return false;
	}
	return validator.protocol === "http:" || validator.protocol === "https:";
};
export const checkWords = (text: string) => {};

export const average = (values: number[]) =>
	values.reduce((a: number, b: number) => a + b, 0) / values.length;
export const standartDeviation = (values: number[]) => {
	const avg = average(values);
	const squareDiffs = values
		.map((value: number) => {
			const diff = value - avg;
			return diff * diff;
		})
		.reduce((a, b) => a + b, 0);
	return Math.sqrt(squareDiffs / (values.length - 1));
};
