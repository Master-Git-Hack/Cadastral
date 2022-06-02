/** @format */
import { insertion, operation, defaultFactorStorage } from "../../properties";

const options = [
	{
		type: "PRECARIA",
		value: 0.91,
	},
	{
		type: "BAJA",
		value: 0.94,
	},
	{
		type: "ECONOMICA",
		value: 0.97,
	},
	{
		type: "COMERCIAL",
		value: 1.0,
	},
	{
		type: "MEDIA COMÚN",
		value: 1.03,
	},
	{
		type: "MEDIA ALTA",
		value: 1.06,
	},
	{
		type: "ALTA",
		value: 1.09,
	},
	{
		type: "LUJO",
		value: 1.12,
	},
];
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
const initialState: defaultFactorStorage = {
    name: "Calidad",
	tag: "FCal.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
}
export const qualityHandler = {
    template,
    operation,
    options,
    insertion,
    initialState
}