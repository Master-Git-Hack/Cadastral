/** @format */

import { StateProps } from "../state";

interface State extends StateProps {
	id: number;
	value: number;
	unitaryCost?: number;
}

export interface SalesCostProps {
	data: Array<State>;
	results: Array<State>;
	averageUnitCost: any;
	tag: string;
}
export const salesCostData = (id: number): State => ({
	id,
	value: 1,
	unitaryCost: 1,
});
export const salesCostTemplate: any = (type: string = "TERRENO" || "RENTA"): SalesCostProps => ({
	tag: `Precio de ${type === "TERRENO" ? "Venta" : "Renta"}`,
	data: [salesCostData(1)],
	results: [
		{
			id: 1,
			value: 1,
		},
	],
	averageUnitCost: {
		value: 1,
		roundedValue: 1,
		result: 1,
		reFactor: 1,
	},
});
