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
}
export interface LocationProps {
	name: string;
	tag: string;
	subject?: string;
	data: Array<Data>;
	results: Array<StateProps>;
	isUsed: boolean;
}
const locationBasic = (id: number): Data => ({
	id,
	C1: symbolsOptions[0],
	percentage: 0,
	observations: "",
});
export const LocationData = (id: number, lenght: number): Data => {
	const data = locationBasic(id);
	for (let i = 2; i <= lenght; i++) data[`C${i}`] = symbolsOptions[0];
	return data;
};
export const LocationTemplate: LocationProps = {
	name: "Ubicación",
	tag: "FUbic.",
	data: [LocationData(1, 1)],
	results: [{ id: 1, value: 1 }],
	isUsed: true,
};
