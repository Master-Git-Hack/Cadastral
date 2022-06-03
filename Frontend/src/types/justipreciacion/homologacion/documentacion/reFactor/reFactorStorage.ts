/** @format */
interface properties {
	[key: string]: {
		name: string;
		value: number;
	};
}
export interface reFactorStorage {
	surface: properties;
	root: number;
	isUsed: boolean;
	form?: properties;
	result?: properties;
}
