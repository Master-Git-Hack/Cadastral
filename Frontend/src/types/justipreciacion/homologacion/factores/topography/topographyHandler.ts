/** @format */
import { insertion, defaultFactorStorage } from "../../properties";
const options = [
	{
		type: "PLANA",
		value: 1.0,
	},
	{
		type: "PENDIENTE LIGERA",
		value: 0.98,
	},
	{
		type: "PENDIENTE INCLINADA",
		value: 0.96,
	},
	{
		type: "PENDIENTE ACCIDENTADA",
		value: 0.94,
	},
];
const template = (id: number) => ({
	id,
	...options[0],
	result: 1,
});
const initialState: defaultFactorStorage = {
    name: "Topografía",
	tag: "FTop.",
	isUsed: false,
	position: 0,
	subject: options[0],
	data: [template(1)],
} 
export const topographyHandler = {
    template,
    options,
    insertion,
    initialState
}