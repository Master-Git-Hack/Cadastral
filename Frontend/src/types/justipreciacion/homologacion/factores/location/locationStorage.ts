import { properties } from "../../properties";

export interface locationStorage extends properties {
	name: string;
	tag: string;
	isUsed: boolean;
	position: number;
	subject: Array<properties>;
	data: Array<properties>;
}
