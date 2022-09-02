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
	observation?: string;
	isUsed: boolean;
	form?: properties;
	result?: properties;
}
