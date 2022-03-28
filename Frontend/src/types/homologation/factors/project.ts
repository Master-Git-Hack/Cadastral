/** @format */

import { StateProps } from "../state";
import {handleOperationForFactors as handleOperation} from "../../../features/homologation/handler"
interface State extends StateProps {
	id?: number;
	type:
		| "EXCELENTE"
		| "MUY BUENO"
		| "FUNCIONAL"
		| "ADECUADO"
		| "REGULAR"
		| "INADECUADO"
		| "DEFICIENTE"
		| "OBSOLETO"
		| "INEXISTENTE";
	value: 1.06 | 1.03 | 1 | 0.98 | 0.96 | 0.94 | 0.92 | 0.9 | 0.88;
	result?: number;
}

export interface ProjectProps {
	name: string;
	tag: string;
	subject: State;
	data: Array<State>;
	isUsed: boolean;
	handleInsert:Function;
}

export const projectOptions: Array<State> = [
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
export const projectData = (id: number): State => ({
	id,
	...projectOptions[0],
	result: 1,
});
export const projectTemplate: ProjectProps = {
	name: "Proyecto",
	tag: "FProy.",
	subject: {...projectOptions[0],handleOperation},
	data: [projectData(1)],
	isUsed: true,
	handleInsert:projectData
};
