/** @format */

import { properties } from "../properties";

export interface StateOfConservationProperties extends properties {
	id: number;
	value: number;
	type: string;
}
export interface AgeProperties extends properties {
	value: number;
	factor: number;
}
export interface calculousStorage extends properties {
	id: number;
	type: string;
	stateOfConservation: StateOfConservationProperties;
	vut: number;
	age: AgeProperties;
	subTotal: number;
	total: number;
}
