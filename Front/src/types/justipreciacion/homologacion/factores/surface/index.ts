/** @format */

import { FactorsProps } from "../";

const template = (id: number) => ({
	id,
	value: 1,
});
const operation = (area: any, surface: any) =>
	surface.data.map((item: any, index: number) => {
		item.value = 1;
		item.value =
			(area.data[index].value / area.averageLotArea.value) ** (1 / surface.root.value);

		return item;
	});
const initialState: FactorsProps = {
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
export const surface = {
	template,
	operation,
	initialState,
};
