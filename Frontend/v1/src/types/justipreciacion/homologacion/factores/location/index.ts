/** @format */

import { symbolsOptions as options, FactorsProps } from "../";
const operation = (items: any) => {
	const columns = Object.keys(items[0]).filter((key: string) =>
		key.includes("C"),
	);
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
	return results.map((item: number, index: number) => ({
		id: index + 1,
		value: item,
	}));
};
const templateSubject = (
	id: number,
	percentage: number = 10,
	observations: string = "",
) => ({
	id,
	C1: options[0],
	C2: options[0],
	C3: options[0],
	C4: options[0],
	percentage,
	observations,
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

	const keys = Object.keys(data[id - 2]).filter((name: string) =>
		name.includes("C"),
	);
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

const initialState: FactorsProps = {
	name: "Ubicación",
	tag: "FUbic.",
	isUsed: false,
	position: 0,
	subject: [
		templateSubject(1, 2, "MANZANA"),
		templateSubject(2, 5, "VIALIDAD"),
		templateSubject(3, 3, "PAVIMENTO"),
	],
	data: [templateData(1), templateData(2), templateData(3), templateData(4)],
};

export const location = {
	initialState,
	operation,
	insertColumn,
	insertionSubject,
	insertionData,
	templateSubject,
	templateData,
	options,
};
