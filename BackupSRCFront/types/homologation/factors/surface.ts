/** @format */

import { StateProps } from "../state";

interface State extends StateProps {
	id?: number;
	value: number;
	result?: number;
	handleOperation:Function
}
export interface SurfaceProps {
	name: string;
	tag: string;
	subject?: State;
	root: number;
	data: Array<State>;
	isUsed: boolean;
	handleInsert: Function;
}
export const surfaceData = (id: number) => ({
	id,
	value: 1,
	handleOperation: (items: any, root:number): number =>root,
});
//the result is 1/8 exponential value
export const surfaceTemplate: SurfaceProps = {
	name: "Superficie",
	tag: "FSup.",
	root: 8,
	data: [surfaceData(1)],
	isUsed: true,
	handleInsert: surfaceData,
};
