/**
 * It takes a key as a parameter and returns the value of the key from the URL
 *
 * @format
 * @param {string} key - The key of the parameter you want to get.
 * @returns A function that takes a string as a parameter and returns a string.
 */

export const getURLParams = (key: string): string | undefined => {
	if (typeof window !== "undefined") {
		const params = new URLSearchParams(window.location.search);
		return params.get(key) ?? undefined;
	} else return undefined;
};
export const isURL = (url: string): boolean => {
	try {
		const { protocol } = new URL(url);
		return protocol.includes("http:") || protocol.includes("https:");
	} catch (_) {
		return false;
	}
};
