/** @format */

import { properties } from "../state";

export interface commercialStateProperties extends properties {
	name: string;
	tag: string;
	isUsed: boolean;
	position: number;
	data: Array<properties>;
}
const template = (id: number) => ({
	id,
	value: 0.95,
});
const insertion = (data: any) => {
	const length = data.length;
	return data.push(template(length));
};
export const commercialState: commercialStateProperties = {
	name: "Comercialización",
	tag: "FCom.",
	isUsed: true,
	position: 13,
	data: [template(1)],
	insertion,
	template,
};
