/** @format */

import { StateProps } from "../state";

interface State extends StateProps {
	id: number;
	value: number;
}

export interface SalesCostProps {
	unitaryCost: number;
	data: Array<State>;
}
export const salesCostData = (id: number): State => ({
	id,
	value: 1,
});
export const salesCostTemplate: SalesCostProps = {
	unitaryCost: 1,
	data: [salesCostData(1)],
};
