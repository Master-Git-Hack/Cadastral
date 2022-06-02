import { properties } from "../../properties";

/** @format */
export interface resultsStorage extends properties {
	name: string;
	tag: string;
	isUsed: boolean;
	data: Array<properties>;
}