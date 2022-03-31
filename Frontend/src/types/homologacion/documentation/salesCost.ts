/** @format */

import { properties } from "../state";

export interface salesCostStateProperties extends properties {
	data: Array<properties>;
	results: Array<properties>;
	averageUnitCost: Object;
	tag: string;
}
const templateData = (id: number) => ({
	id,
	value: 1,
	unitaryCost: 1,
});
const templateResults = (id: number) => ({ id, value: 1 });
export const salesCostState = (type: string): salesCostStateProperties => ({
	tag: `Precio de ${type === "TERRENO" ? "Venta" : "Renta"}`,
	data: [templateData(1)],
	results: [templateResults(1)],
	averageUnitCost: {
		value: 1,
		roundedValue: 1,
		result: 1,
		reFactor: 1,
	},
    template:templateData,
    templateResults
});
