/** @format */

import { StateProps } from "../state";

import {handleOperationForFactors as handleOperation} from "../../../features/homologation/handler"
interface State extends StateProps {
	id?: number;
	type:
		| "REGULAR"
		| "IRREGULAR LIGERO"
		| "P.I. DE 4 LADOS"
		| "P.I. DE 5 LADOS"
		| "P.I. DE 6 LADOS"
		| "IRREGULAR PESADO";
	value: 1 | 0.98 | 0.96 | 0.94 | 0.92 | 0.9;
	result?: number;
}

export interface TypeFormProps {
	name: string;
	tag: string;
	subject: State;
	data: Array<State>;
	isUsed: boolean;
	handleInsert:Function;
}
export const typeFormOptions: Array<State> = [
	{
		type: "REGULAR",
		value: 1.0,
	},
	{
		type: "IRREGULAR LIGERO",
		value:  0.98,
	},
	{
		type: "P.I. DE 4 LADOS",
		value:  0.96,
	},
	{
		type: "P.I. DE 5 LADOS",
		value: 0.94,
	},
	{
		type: "P.I. DE 6 LADOS",
		value:0.92,
	},
	{
		type: "IRREGULAR PESADO",
		value: 0.9,
	},
];
export const typeFormData = (id: number, type: string) => ({
	id,
	...typeFormOptions[0],
	result: 1,
});
export const typeFormTemplate: TypeFormProps = {
	name: "Forma",
	tag: "FFo.",
	subject: {
		...typeFormOptions[0],
	handleOperation
	},
	data: [],
	isUsed: true,
	handleInsert:typeFormData
};
