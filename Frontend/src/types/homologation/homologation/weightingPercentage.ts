/** @format */

import { StateProps } from "../state";

interface State extends StateProps {
	id: number;
	value: number;
}

export interface WeightingPercentageProps {
	total: number;
	data: Array<State>;
}
export const weightingPercentageData = (id: number): State => ({
	id,
	value: 100,
});
export const weightingPercentageTemplate: WeightingPercentageProps = {
	total: 1,
	data: [weightingPercentageData(1)],
};
