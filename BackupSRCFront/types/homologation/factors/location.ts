/** @format */

import { StateProps } from "../state";
import { State as SymbolsProps, symbolsOptions } from "./symbols";
interface State {
	[key: string]: SymbolsProps | string | StateProps | number | Function;
}
interface Data extends State {
	id: number;
	C1: SymbolsProps;
	percentage: number;
	observations: string;
	handleInsert: Function;
}
export interface LocationProps {
	name: string;
	tag: string;
	subject?: string;
	data: Array<Data>;
	results: Array<StateProps>;
	isUsed: boolean;
	handleInsert: Function;
}
const basicData = (id: number, item: Data) => ({ ...item, [`C${id}`]: symbolsOptions[0] });

const locationBasic = (id: number): Data => ({
	id,
	C1: symbolsOptions[0],
	percentage: 0,
	observations: "",
	handleInsert: basicData,
});


export const LocationData = (data:Array<Data>):Array<Data> => {
	const length = data.length;
	const keys = Object.keys(data[length - 1]).filter((name:string)=>name.includes("C"));
	const newRow = locationBasic(length);
	for(let i=2;i<=length;i++){
		newRow[`C${i}`] = symbolsOptions[0];
	}
	data.push(newRow);
	return data;
	
};
export const LocationTemplate: LocationProps = {
	name: "Ubicación",
	tag: "FUbic.",
	data: [locationBasic(1)],
	results: [{ id: 1, value: 1 }],
	isUsed: true,
	handleInsert: LocationData,
};
