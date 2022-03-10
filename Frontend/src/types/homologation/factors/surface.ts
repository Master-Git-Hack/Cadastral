/** @format */

import { StateProps } from "../state";

interface State extends StateProps {
	id?: number;
	value: number;
	result?: number;
}
export interface SurfaceProps {
	name: string;
	tag: string;
	subject?: State;
	data: Array<State>;
	isUsed: boolean;
}
export const surfaceData = (id: number) => ({
	id,
	value: 1,
});
export const surfaceTemplate: SurfaceProps = {
	name: "Superficie",
	tag: "FSup.",
	data: [surfaceData(1)],
	isUsed: true,
};
