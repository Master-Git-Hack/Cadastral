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
const templateSubject = (id: number,percentage:number=10,observations:string="") => ({
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

	const keys = Object.keys(data[id - 2]).filter((name: string) => name.includes("C"));
	let newRow = templateSubject(id);
	for (let i = 2; i <= keys.length+1; i++) {
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

const templateResults = (id: number) => ({ id, factor1: 1, factor2: 1 });

const handleResults = (area: any) =>
	area.map((item: any) => ({
		id: item.id,
		factor1: item.factorResult1,
		factor2: item.factorResult2,
	}));

const initialState: FactorsProps = {
	name: "Zona",
	tag: "FZon.",
	isUsed: false,
	position: 0,
	subject: [templateSubject(1,2,"EQUIPAMIENTO"),templateSubject(2,2,"SERVICIOS"),templateSubject(3,2,"DESEABILIDAD"),templateSubject(4,2,"TRANSPORTE"),templateSubject(5,2,"PERIFERIA")],
	data: [templateData(1),templateData(2),templateData(3),templateData(4)],
	results: [templateResults(1),templateResults(2),templateResults(3),templateResults(4)],
};
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
