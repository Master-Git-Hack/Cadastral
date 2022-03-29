/** @format */

import { StateProps } from "../state";

import { handleOperation } from "../../../utils/utils";
interface State extends StateProps {
	id?: number;
	type: "PLANA" | "PENDIENTE LIGERA" | "PENDIENTE INCLINADA" | "PENDIENTE ACCIDENTADA";
	value: 1 | 0.98 | 0.96 | 0.94;
	result?: number;
}
export interface TopographyProps {
	name: string;
	tag: string;
	subject: State;
	data: Array<State>;
	isUsed: boolean;
	handleInsert: Function;
}

export const topographyOptions: Array<State> = [
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
export const topographyData = (id: number, type: string): State => ({
	id,
	...topographyOptions[0],
	result: 1,
});
export const topographyTemplate: TopographyProps = {
	name: "Topografía",
	tag: "FTop.",
	subject: { ...topographyOptions[0], handleOperation },
	data: [],
	isUsed: true,
	handleInsert: topographyData,
};
