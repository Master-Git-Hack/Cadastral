/** @format */

import { StateProps } from "../state";

interface State extends StateProps {
	id?: number;
	value: number;
}

export interface ComparisonProps {
	name: string;
	tag: string;
	data: Array<State>;
	isUsed: boolean;
}
export const comparisonData = (id: number): State => ({
	id,
	value: 1,
});
export const comparisonTemplate: ComparisonProps = {
	name: "Comparacion",
	tag: "FCom.",
	data: [comparisonData(1)],
	isUsed: true,
};
