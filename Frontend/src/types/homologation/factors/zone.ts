/** @format */

import { StateProps } from "../state";
import { State as SymbolsProps, symbolsOptions } from "./symbols";
interface State {
	[key: string]: SymbolsProps | string | StateProps | number;
}
interface Data extends State {
	id: number;
	C1: SymbolsProps;
	percentage: number;
	observations: string;
	result: number;
}
export interface ZoneProps {
	name: string;
	tag: string;
	subject?: string;
	data: Array<Data>;
	isUsed: boolean;
}
const zoneBasic = (id: number): Data => ({
	id,
	C1: symbolsOptions[0],
	percentage: 0,
	observations: "",
	result: 1,
});
export const ZoneData = (id: number, lenght: number): Data => {
	const data = zoneBasic(id);
	for (let i = 2; i <= lenght; i++) data[`C${i}`] = symbolsOptions[0];
	return data;
};
export const ZoneTemplate: ZoneProps = {
	name: "Zona",
	tag: "FZo.",
	data: [ZoneData(1, 1)],
	isUsed: true,
};
