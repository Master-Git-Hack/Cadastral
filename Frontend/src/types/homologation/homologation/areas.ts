/** @format */

import { StateProps } from "../state";

interface State extends StateProps {
	id: number;
	value: number;
	surface: number;
}
export interface AreasProps {
	[key: string]: number | Array<State> | any;
}
export const areasData = (id: number): State => ({
	id,
	value: 1,
	surface: 1,
});
export const areasTemplate: any = (type: string = "TERRENO" || "RENTA"): AreasProps => ({
	averageLotArea: {
		name: type === "TERRENO" ? "SUPERFICIE LOTE MODA" : "SUPERFICIE DEL COMPARABLE",
		value: 0,
	},
	subject: {
		name: type === "TERRENO" ? "SUPERFICIE TOTAL DEL TERRENO" : "SUPERFICIE DEL SUJETO",
		value: 0,
	},
	data: [areasData(1)],
	tag: type === "TERRENO" ? "Área de Lote Moda" : "Superficie del sujeto",
	name: type === "TERRENO" ? "Áreas " : "Sup. Const ",
});
