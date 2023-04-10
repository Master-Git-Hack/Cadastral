/** @format */

import { FactorsProps } from "../";
export const template = (id: number) => ({
	id,
	value: 0.95,
});

export const initialState: FactorsProps = {
	name: "Comercialización",
	tag: "FCom.",
	isUsed: true,
	position: 13,
	data: [template(1)],
};

export default initialState;