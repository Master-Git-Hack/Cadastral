/** @format */

import { StateProps } from "../state";
import {handleOperationForFactors as handleOperation} from "../../../features/homologation/handler"
interface State extends StateProps {
	id?: number;
	type:
		| "PRECARIA"
		| "BAJA"
		| "ECONOMICA"
		| "COMERCIAL"
		| "MEDIA COMÚN"
		| "MEDIA ALTA"
		| "ALTA"
		| "LUJO";
	value: 0.91 | 0.94 | 0.97 | 1 | 1.03 | 1.06 | 1.09 | 1.12;
	result?: number;
}
export interface QualityProps {
	name: string;
	tag: string;
	subject: State;
	data: Array<State>;
	isUsed: boolean;
	handleInsert:Function;
}
export const qualityOptions: Array<State> = [
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
export const qualityData = (id: number): State => ({
	id,
	...qualityOptions[0],
	result: 1,
});
export const qualityTemplate: QualityProps = {
	name: "Calidad",
	tag: "FCal.",
	subject: {...qualityOptions[0],handleOperation},
	data: [qualityData(1)],
	isUsed: true,
	handleInsert:qualityData
};
