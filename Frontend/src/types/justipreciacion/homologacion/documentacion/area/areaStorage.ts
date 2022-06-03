/** @format */

import { properties } from "../../properties";

export interface areaStorage extends properties {
	name: string;
	tag: string;
	averageLotArea: Object;
	subject: Object;
	data: Array<properties>;
}
