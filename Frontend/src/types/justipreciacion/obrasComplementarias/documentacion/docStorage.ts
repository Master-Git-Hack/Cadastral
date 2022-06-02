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
	name: string;
	area: AreaProperties;
	calculation: Array<CalculationProperties>;
	value: ValueProperties;
}