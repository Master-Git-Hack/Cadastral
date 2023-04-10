/** @format */

import { FactorsProps, symbolsOptions as options } from "../";

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
export const templateSubject = (id: number) => ({
	id,
	C1: options[0],
	percentage: 10,
	observations: "",
});
export const templateData = (id: number) => ({
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
		newRow = insertColumn(`C${i}`, newRow);
	}
	data.push(newRow);
	data.map((item: any) => (item.percentage = Number((10 / id).toFixed(4))));
	return data;
};
const insertionData = (id: number) => ({
	id,
	value: 1,
});

export const templateResults = (id: number) => ({ id, factor1: 1, factor2: 1 });

const handleResults = (area: any) =>
	area.map((item: any) => ({
		id: item.id,
		factor1: item.factorResult1,
		factor2: item.factorResult2,
	}));

export const initialState: FactorsProps = {
	name: "Zona",
	tag: "FZon.",
	isUsed: false,
	position: 0,
	subject: [templateSubject(1)],
	data: [templateData(1)],
	results: [templateResults(1)],
};
export default initialState;
export const zone = {
	operation,
	options,
	insertionSubject,
	insertionData,
	insertColumn,
	handleResults,
	initialState,
	templateData,
	templateSubject,
	templateResults,
};
