/** @format */

import { WeightingPercentageProps } from "..";

export const template = (id: number) => ({ id, value: 100 });
const insertion = (data: any) => {
	const id = data.length + 1;
	data.push(template(id));
	return data.map((item: any) => (item.value = 100 / id));
};
const calculation = (data: any) =>
	data.reduce((total: number, item: any) => (total += Number(item.value)), 0);

export const initialState: WeightingPercentageProps = {
	total: 100,
	data: [template(1)],
};
export default initialState;
export const weightingPercentage = {
	template,
	insertion,
	calculation,
	initialState,
};
