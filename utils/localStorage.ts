/** @format */

export const clear = (): void => localStorage.clear();

export const rm = (item: string): void => localStorage.removeItem(item);

export const getItem = (item: string): string | object | undefined | null => {
	if (typeof window === "undefined") return undefined;
	try {
		const data = localStorage.getItem(item);
		if (data === null) return undefined;
		if (item === "token") return data;
		try {
			return JSON.parse(data);
		} catch {
			return data;
		}
	} catch (error) {
		console.error(`Error getting localStorage item '${item}':`, error);
		return undefined;
	}
};

export const setItem = (key: string, value: string | object | number | boolean | null): void => {
	if (typeof window === "undefined") return;
	if (typeof key !== "string") {
		throw new Error("The key must be a string");
	}
	const storedValue = key === "token" ? String(value) : JSON.stringify(value);
	localStorage.setItem(key, storedValue);
};

export const saveLocation = (path: string): void => setItem("location", path);

export const getLocation = (): string => getItem("location") as string || "";

export const LS = {
	get: getItem,
	set: setItem,
	rm,
	clear,
	location: {
		save: saveLocation,
		get: getLocation,
	},
};
export default LS;
