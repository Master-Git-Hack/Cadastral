/** @format */

import { properties } from "../state";

export interface surfaceStateProperties extends properties {
	name: string;
	tag: string;
	isUsed: boolean;
	position: number;
	root: properties;
	data: Array<properties>;
}

const template = (id: number) => ({
	id,
	value: 1,
});
const operation = (area: any, surface: any) =>
	surface.data.map((item: any, index: number) => {
		item.value = 1;
		item.value = (area.data[index].value / area.subject.value) ** (1 / surface.root.value);
		return item;
	});
const insertion = (data: any) => {
	const length = data.length;
	return data.push(template(length));
};
export const surfaceState: surfaceStateProperties = {
	name: "Superficie",
	tag: "FSup.",
	isUsed: true,
	position: 6,
	root: {
		value: 8,
		enabled: false,
		observations: "",
	},
	data: [template(1)],
	operation,
	insertion,
	template,
};
