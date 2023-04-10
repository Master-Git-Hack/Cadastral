/** @format */

import { FactorsProps } from "../";
export const options = [
	{
		label: "EXCELENTE",
		value: 1.06,
	},
	{
		label: "MUY BUENO",
		value: 1.03,
	},
	{
		label: "FUNCIONAL",
		value: 1.0,
	},
	{
		label: "ADECUADO",
		value: 0.98,
	},
	{
		label: "REGULAR",
		value: 0.96,
	},
	{
		label: "INADECUADO",
		value: 0.94,
	},
	{
		label: "DEFICIENTE",
		value: 0.92,
	},
	{
		label: "OBSOLETO",
		value: 0.9,
	},
	{
		label: "INEXISTENTE",
		value: 0.88,
	},
];
export const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
export const initialState: FactorsProps = {
	name: "Proyecto",
	tag: "FProy.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
};
export default initialState;