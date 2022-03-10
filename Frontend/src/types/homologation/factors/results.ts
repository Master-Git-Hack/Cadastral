/** @format */

import { StateProps } from "../state";
export interface ResultsProps {
	name: string;
	tag: string;
	data: Array<StateProps>;
	isUsed: boolean;
}
export const resultsTemplate: ResultsProps = {
	name: "Homologación Resultante",
	tag: "F.Ho.Re.",
	data: [{ id: 1, value: 1 }],
	isUsed: false,
};
