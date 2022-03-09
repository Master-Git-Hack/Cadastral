/** @format */

import { StateProps } from "../state";

interface State extends StateProps {
	id?: number;
	type: "SOTANO 1" | "SOTANO 2" | "P.B. NIVEL DE CALLE" | "P.A. NIVEL DE CALLE";
	value: 0.9 | 0.95 | 1 | 1;
	result?: number;
}
export interface LevelProps {
	name: string;
	tag: string;
	subject: State;
	data: Array<State>;
	isUsed: boolean;
}

export const levelOptions: Array<State> = [
	{
		type: "SOTANO 1",
		value: 0.9,
	},
	{
		type: "SOTANO 2",
		value: 0.95,
	},
	{
		type: "P.B. NIVEL DE CALLE",
		value: 1.0,
	},
	{
		type: "P.A. NIVEL DE CALLE",
		value: 1.0,
	},
];
export const levelData = (id: number): State => ({
	id,
	...levelOptions[0],
	result: 1,
});
export const levelTemplate: LevelProps = {
	name: "Nivel",
	tag: "FNiv.",
	subject: levelOptions[0],
	data: [levelData(1)],
	isUsed: true,
};
