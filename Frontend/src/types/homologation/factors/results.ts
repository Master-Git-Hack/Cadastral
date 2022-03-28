/** @format */

import { StateProps } from "../state";
export interface ResultsProps {
	name: string;
	tag: string;
	data: Array<StateProps>;
	isUsed: boolean;
	handleInsert:Function;
}
export const resultsData = (id: number): StateProps => ({
	id,
	value: 0.95,
});
export const resultsTemplate: ResultsProps = {
	name: "Homologación Resultante",
	tag: "F.Ho.Re.",
	data: [resultsData(1)],
	isUsed: false,
	handleInsert:resultsData
};
