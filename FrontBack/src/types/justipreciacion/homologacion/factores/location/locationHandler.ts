/** @format */

import { locationStorage } from "./locationStorage";
import { symbolsOptions as options } from "../../properties";

const operation = (items: any) => {
	const columns = Object.keys(items[0]).filter((key: string) => key.includes("C"));
	const results = columns.map((column: string) =>
		items
			.map((item: any) => ({
				percentage: item.percentage,
				[column]: item[column],
			}))
			.reduce(
				(previous: number, current: any) =>
					previous + (current.percentage / 100) * current[column].value,
				1,
			),
	);
	return results.map((item: number, index: number) => ({ id: index + 1, value: item }));
};
const templateSubject = (id: number) => ({
	id,
	C1: options[0],
	percentage: 10,
	observations: "",
	insertion: insertColumn,
});
const templateData = (id: number) => ({
	id,
	value: 1.1,
});
const insertColumn = (columnName: string, item: any) => {
	item[columnName] = options[0];
	return item;
};
const insertionSubject = (data: any) => {
	const id = data.length + 1;

	const keys = Object.keys(data[id - 2]).filter((name: string) => name.includes("C"));
	let newRow = templateSubject(id);
	for (let i = 2; i <= keys.length; i++) {
		newRow = newRow.insertion(`C${i}`, newRow);
	}
	data.push(newRow);
	data.map((item: any) => (item.percentage = Number((10 / id).toFixed(4))));
	return data;
};
const insertionData = (id: number) => ({
	id,
	value: 1,
});

const initialState: locationStorage = {
	name: "Ubicación",
	tag: "FUbic.",
	isUsed: false,
	position: 0,
	subject: [templateSubject(1)],
	data: [templateData(1)],
};

export const locationHandler = {
	initialState,
	operation,
	insertColumn,
	insertionSubject,
	insertionData,
	templateSubject,
	templateData,
	options,
};
