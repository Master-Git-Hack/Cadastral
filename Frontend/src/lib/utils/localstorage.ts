/** @format */

export const deleteLSAll = () => typeof localStorage.clear();

export const removeLSItem = (item: string): any => {
	localStorage.removeItem(item);
};

export const getLSItem = (item: string): any => {
	if (typeof window === "undefined") return undefined;
	try {
		if (item === "token") return localStorage.getItem(item);
		const data = localStorage.getItem(item);
		if (data === null) return undefined;
		// Check if data is an object or a string
		if (/^\{.*\}$/.test(data)) {
			return JSON.parse(data);
		} else if (/^\".*\"$/.test(data)) {
			return data.slice(1, -1);
		} else {
			return data;
		}
	} catch (error) {
		console.error(`Error getting localStorage item '${item}':`, error);
		return undefined;
	}
};

export const setLSItem = (key: string, value: any): void => {
	if (typeof window === "undefined") return undefined;
	if (typeof key !== "string") {
		throw new Error("The key must be a string");
	}
	const jsonValue = JSON.stringify(value);
	localStorage.removeItem(key);
	localStorage.setItem(key, key !== "token" ? jsonValue : value);
};

export const ls = {
	get: getLSItem,
	set: setLSItem,
	rm: removeLSItem,
	clean: deleteLSAll,
};
export default ls;
