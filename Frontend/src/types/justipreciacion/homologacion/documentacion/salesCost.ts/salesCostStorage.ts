import { properties } from "../../properties";

/** @format */
export interface salesCostStorage extends properties {
	data: Array<properties>;
	results: Array<properties>;
	averageUnitCost: Object;
	tag: string;
}