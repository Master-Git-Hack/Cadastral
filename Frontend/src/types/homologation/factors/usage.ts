/** @format */

import { StateProps } from "../state";

import {handleOperationForFactors as handleOperation} from "../../../features/homologation/handler"
interface State extends StateProps {
	id?: number;
	type:
		| "HABITACIONAL"
		| "COMERCIAL"
		| "MIXTO H-C"
		| "INDUSTRIAL"
		| "MIXTO I-H"
		| "MIXTO I-C"
		| "SERVICIOS";
	value: 1.0 | 1.03 | 1.05 | 1.07 | 0.97 | 1.09 | 1.04;
	result?: number;
}
export interface UsageProps {
	name: string;
	tag: string;
	subject: State;
	data: Array<State>;
	isUsed: boolean;
	handleInsert:Function;
}
export const usageOptions: Array<State> = [
	{
		type: "HABITACIONAL",
		value: 1.0,
	},
	{
		type: "COMERCIAL",
		value: 1.03,
	},
	{
		type: "MIXTO H-C",
		value: 1.05,
	},
	{
		type: "INDUSTRIAL",
		value: 1.07,
	},
	{
		type: "MIXTO I-H",
		value: 0.97,
	},
	{
		type: "MIXTO I-C",
		value: 1.09,
	},
	{
		type: "SERVICIOS",
		value: 1.04,
	},
];
export const usageData = (id: number): State => ({
	id,
	...usageOptions[0],
	result: 1,
});
export const usageTemplate: UsageProps = {
	name: "Uso",
	tag: "FUso.",
	subject: {...usageOptions[0],handleOperation},
	data: [usageData(1)],
	isUsed: true,
	handleInsert:usageData
};
