/** @format */

import { FactorsProps } from "../";

export const template = (id: number) => ({
	id,
	value: 1,
});
const operation = (area: any, surface: any) =>
	surface.data.map((item: any, index: number) => {
		const value =
			(area.data[index].value / area.averageLotArea.value) ** (1 / surface.root.value);
		item.value = !isNaN(value) ? value : 1;
		return item;
	});
export const initialState: FactorsProps = {
	name: "Superficie",
	tag: "FSup.",
	isUsed: true,
	position: 1,
	root: {
		value: 8,
		enabled: false,
		observations: "",
	},
	data: [template(1)],
};
export default initialState;
export const surface = {
	template,
	operation,
	initialState,
};
