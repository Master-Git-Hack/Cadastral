/** @format */

import { StateProps } from "../state";
import moment from "moment";
const date = moment();
interface State extends StateProps {
	id: number;
	value: number;
	surface: number;
	address: any;
}
export interface AreasProps {
	[key: string]: number | Array<State> | any;
}
export const areasData = (id: number): State => ({
	id,
	value: 1,
	surface: 1,
	address: {
		street: "",
		streetNumber: 0,
		streetWithoutNumber: false,
		suburb: "",
		type: "",
		date: date.format("yyyy-MM-D"),
		characteristics: "",
		link: "",
	},
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
