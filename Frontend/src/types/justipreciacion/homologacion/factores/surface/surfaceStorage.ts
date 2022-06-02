/** @format */
import { properties } from "../../properties";

export interface surfaceStorage extends properties {
	name: string;
	tag: string;
	isUsed: boolean;
	position: number;
	root: properties;
	data: Array<properties>;
}