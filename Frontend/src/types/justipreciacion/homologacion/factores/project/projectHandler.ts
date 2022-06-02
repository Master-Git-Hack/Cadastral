/** @format */

import { defaultFactorStorage, insertion, operation } from "../../properties";

const options = [
	{
		type: "EXCELENTE",
		value: 1.06,
	},
	{
		type: "MUY BUENO",
		value: 1.03,
	},
	{
		type: "FUNCIONAL",
		value: 1.0,
	},
	{
		type: "ADECUADO",
		value: 0.98,
	},
	{
		type: "REGULAR",
		value: 0.96,
	},
	{
		type: "INADECUADO",
		value: 0.94,
	},
	{
		type: "DEFICIENTE",
		value: 0.92,
	},
	{
		type: "OBSOLETO",
		value: 0.9,
	},
	{
		type: "INEXISTENTE",
		value: 0.88,
	},
];
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
const initialState: defaultFactorStorage = {
    name: "Proyecto",
	tag: "FProy.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
}
export const projectHandler = {
    template,
    operation,
    options,
    insertion,
    initialState
}