/** @format */

import { properties } from "../state";
export interface weightingPercentageStateProperties extends properties {
	total: number;
	data: Array<properties>;
}
const template = (id: number) => ({ id, value: 100 });
const insertion = (data: any) => {
	const id = data.length + 1;
	data.push(template(id));
	return data.map((item: any) => (item.value = 100 / id));
};
const calculation = (data: any) =>
	data.reduce((total: number, item: any) => (total += Number(item.value)), 0);

export const weightingPercentageState: weightingPercentageStateProperties = {
	total: 100,
	data: [template(1)],
	template,
	insertion,
	calculation,
};
