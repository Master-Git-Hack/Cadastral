/** @format */

import { FactorsProps } from "./factor.props";
const template = (id: number) => ({
	id,
	value: 0.95,
});

const initialState: FactorsProps = {
	name: "Comercialización",
	tag: "FCom.",
	isUsed: true,
	position: 13,
	data: [template(1)],
};

export const commercialHandler = {
	template,
	initialState,
};
