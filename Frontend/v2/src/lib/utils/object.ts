/** @format */

export const flattenObject = (obj: any, parentKey = ""): { [key: string]: any } => {
	const result: { [key: string]: any } = {};

	for (const key in obj) {
		if (key === "type") continue;
		if (obj.hasOwnProperty(key)) {
			const newKey = Number.isInteger(parseInt(key))
				? `${parentKey}_${key}`
				: key.includes("#text")
					? parentKey
					: key;

			if (typeof obj[key] === "object" && obj[key] !== null) {
				const flatChild = flattenObject(obj[key], newKey);
				Object.assign(result, flatChild);
			} else {
				result[newKey] = obj[key];
			}
		}
	}

	return result;
};
