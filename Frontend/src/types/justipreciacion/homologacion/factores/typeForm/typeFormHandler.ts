/** @format */
import { insertion, defaultFactorStorage,operation } from "../../properties";
const options = [
	{
		type: "REGULAR",
		value: 1.0,
	},
	{
		type: "IRREGULAR LIGERO",
		value: 0.98,
	},
	{
		type: "P.I. DE 4 LADOS",
		value: 0.96,
	},
	{
		type: "P.I. DE 5 LADOS",
		value: 0.94,
	},
	{
		type: "P.I. DE 6 LADOS",
		value: 0.92,
	},
	{
		type: "IRREGULAR PESADO",
		value: 0.9,
	},
];

const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
const initialState: defaultFactorStorage = {
    name: "Forma",
	tag: "FFo.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
}
export const typeFormHandler = {
    template,
    options,
    insertion,
    initialState,
}