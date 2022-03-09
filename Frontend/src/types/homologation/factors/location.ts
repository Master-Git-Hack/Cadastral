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
export interface LocationProps {
	name: string;
	tag: string;
	subject?: string;
	data: Array<Data>;
	isUsed: boolean;
}
const locationBasic = (id: number): Data => ({
	id,
	C1: symbolsOptions[0],
	percentage: 0,
	observations: "",
	result: 1,
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
	isUsed: true,
};
