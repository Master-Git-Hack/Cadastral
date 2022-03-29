/** @format */

import { StateProps } from "../state";
import { State as SymbolsProps, symbolsOptions } from "./symbols";
interface State {
	[key: string]:
		| SymbolsProps
		| string
		| StateProps
		| number
		| Array<Data>
		| boolean
		| Array<any>
		| Function;
}
interface Data extends State {
	id: number;
	C1: SymbolsProps;
	percentage: number;
	observations: string;
}
export interface ZoneProps extends State {
	name: string;
	tag: string;
	data: Array<Data>;
	results: Array<StateProps>;
	isUsed: boolean;
	handleInsert: Function;
}

const zoneBasic = (id: number): Data => ({
	id,
	C1: symbolsOptions[0],
	percentage: 0,
	observations: "",
});

export const ZoneData = (id: number, length: number): Data => {
	const data = zoneBasic(id);
	for (let i = 2; i <= length; i++) data[`C${i}`] = symbolsOptions[0];
	return data;
};
export const ZoneTemplate: any = {
	name: "Zona",
	tag: "FZo.",
	results: [{ id: 1, value: 1, resultByFactor1: 1, resultByFactor2: 1 }],
	data: [ZoneData(1, 1)],
	isUsed: true,
	handleInsert: () => {},
};
