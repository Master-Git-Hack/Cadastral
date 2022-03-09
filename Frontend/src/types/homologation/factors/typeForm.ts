/** @format */

import { StateProps } from "../state";

interface State extends StateProps {
	id?: number;
	type:
		| "REGULAR"
		| "IRREGULAR LIGERO"
		| "P.I. DE 4 LADOS"
		| "P.I. DE 5 LADOS"
		| "P.I. DE 6 LADOS"
		| "IRREGULAR PESADO";
	value: 1 | 0.98 | 0.97 | 0.96 | 0.95 | 0.94 | 0.93 | 0.92 | 0.9 | 0.85;
	result?: number;
}

export interface TypeFormProps {
	name: string;
	tag: string;
	subject: State;
	data: Array<State>;
	isUsed: boolean;
}
export const typeFormOptions = (type: string = "TERRENO" || "RENTA"): Array<State> => [
	{
		type: "REGULAR",
		value: 1.0,
	},
	{
		type: "IRREGULAR LIGERO",
		value: type === "TERRENO" ? 0.97 : 0.98,
	},
	{
		type: "P.I. DE 4 LADOS",
		value: type === "TERRENO" ? 0.95 : 0.96,
	},
	{
		type: "P.I. DE 5 LADOS",
		value: type === "TERRENO" ? 0.93 : 0.94,
	},
	{
		type: "P.I. DE 6 LADOS",
		value: type === "TERRENO" ? 0.9 : 0.92,
	},
	{
		type: "IRREGULAR PESADO",
		value: type === "TERRENO" ? 0.85 : 0.9,
	},
];
export const typeFormData = (id: number, type: string) => ({
	id,
	...typeFormOptions(type)[0],
	result: 1,
});
export const typeFormTemplate: TypeFormProps = {
	name: "Forma",
	tag: "FFo.",
	subject: {
		type: "REGULAR",
		value: 1.0,
	},
	data: [],
	isUsed: true,
};
