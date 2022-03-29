/** @format */

import { properties } from "../state";
import { options } from "../symbols";

export interface zoneStateProperties extends properties {
	name: string;
	tag: string;
	isUsed: boolean;
	position: number;
	subject: Array<properties>;
	data: Array<properties>;
	options: any;
}
const operation = (data: any, subject: any) =>
	data.map((item: any) => {
		item.result = subject.value / item.value;
		return item;
	});
const templateSubject = (id: number) => ({
	id,
	C1: options[0],
	percentage: 0,
	observations: "",
	insertion: insertColumn,
});
const templateData = (id: number) => ({
	id,
	value: 1,
});
const insertColumn = (columnName: string, item: any) => {
	item[columnName] = options[0];
	return item;
};

const insertionSubject = (data: any) => {
	const id = data.length + 1;
	const keys = Object.keys(data[id - 1]).filter((name: string) => name.includes("C"));
	let newRow = templateSubject(id);
	for (let i = 2; i <= keys.length; i++) {
		newRow = newRow.insertion(`C${i}`, newRow);
	}
	return data.push(newRow);
};
const insertionData = (id: number) => ({
	id,
	value: 1,
});
export const zoneState: zoneStateProperties = {
	name: "Zona",
	tag: "FZon.",
	isUsed: true,
	position: 10,
	subject: [templateSubject(1)],
	data: [templateData(1)],
	operation,
	insertionSubject,
	insertionData,
	templateSubject,
	templateData,
	options,
};
