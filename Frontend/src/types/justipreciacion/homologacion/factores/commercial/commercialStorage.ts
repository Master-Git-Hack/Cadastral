import {properties} from "../../properties";
export interface commercialStorage extends properties {
	name: string;
	tag: string;
	isUsed: boolean;
	position: number;
	data: Array<properties>;
}