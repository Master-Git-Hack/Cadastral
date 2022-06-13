/** @format */

import { properties } from "../properties";

/** @format */
export interface AreaProperties {
	description?: string;
	value: number;
	unity: string;
}
export interface CalculationProperties extends properties {
	id: number;
	quantity: AreaProperties;
	value: {
		unitary: number;
		ind: {
			value: number;
			unitary: number;
		};
		total: number;
	};
}
export interface ValueProperties {
	subTotal: number;
	total: number;
	gtoFactor: number;
	result: AreaProperties;
}
export interface dataStorage extends properties {
	id: number;
	show: boolean;
	name: string;
	area: {
		data: Array<AreaProperties>;
		total: number;
		unity: string;
	};
	calculation: Array<CalculationProperties>;
	value: ValueProperties;
}
