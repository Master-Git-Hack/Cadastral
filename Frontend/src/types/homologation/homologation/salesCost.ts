/** @format */

import { StateProps } from "../state";

interface State extends StateProps {
	id: number;
	value: number;
	unitaryCost: number;
}

export interface SalesCostProps {
	data: Array<State>;
}
export const salesCostData = (id: number): State => ({
	id,
	value: 1,
	unitaryCost: 1,
});
export const salesCostTemplate: SalesCostProps = {
	data: [salesCostData(1)],
};
