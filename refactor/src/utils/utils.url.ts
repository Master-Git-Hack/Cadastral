/**
 * It takes a key as a parameter and returns the value of the key from the URL
 *
 * @format
 * @param {string} key - The key of the parameter you want to get.
 * @returns A function that takes a string as a parameter and returns a string.
 */

export const getURLParams = (key: string): string => {
	if (typeof window !== "undefined") {
		const params = new URLSearchParams(window.location.search);
		return params.get(key) ?? "";
	} else return "";
};
export const isURLValid = (url: string): boolean => {
	let validator;
	try {
		validator = new URL(url);
	} catch (_) {
		return false;
	}
	return validator.protocol === "http:" || validator.protocol === "https:";
};
