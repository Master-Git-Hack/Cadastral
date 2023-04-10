/** @format */

import { FactorsProps } from "../";
export const template = (id: number) => ({
	id,
	value: 1,
	result: 1,
});
export const initialState: FactorsProps = {
	name: "Edad",
	tag: "FEd.",
	isUsed: false,
	position: 0,
	subject: {
		value: 1,
		operator: 0.01,
	},
	data: [template(1)],
};
export default initialState;

