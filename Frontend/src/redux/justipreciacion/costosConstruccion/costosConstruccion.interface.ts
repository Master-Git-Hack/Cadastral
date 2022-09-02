/** @format */

import { api } from "../../../api";
import { getURLParams } from "../../../utils/url";

/** @format */
export interface StateProps {
	titulo: string;
	data: Array<any>;
	status: "unset" | "success" | "fail" | "loading" | "working";
	message: string;
	factorGTO: any;
	total: number;
	redondeo: number;
	record: {
		id: number;
		register: string;
		status: "newOne" | "exists";
	};
	handlers: any;
}
const dataTemplate = (id: number) => ({
	id,
	costoDirecto: 0,
	indirectos: 1,
	valorNeto: 0,
	m2: 0,
	total: 0,
	status: null,
});
const totalRows = (data: any): any =>
	data.map(({ costoDirecto, indirectos, m2, ...item }: any) => {
		let valorNeto = Number((costoDirecto * indirectos).toFixed(2));
		valorNeto = !isNaN(valorNeto) ? valorNeto : 1;
		let total = Number((valorNeto / m2).toFixed(2));
		total = !isNaN(total) ? total : 1;
		return {
			...item,
			costoDirecto,
			indirectos,
			valorNeto,
			m2,
			total,
		};
	});
const getTotal = (data: any): number =>
	data.reduce((previous: number, current: any) => previous + Number(current.total), 0);

export const name = "CostosConstruccion";
export const consume = api(name);
export const initialState: StateProps = {
	titulo: "",
	data: [dataTemplate(1)],
	status: "unset",
	message: "",
	redondeo: 1,
	factorGTO: {
		enabled: true,
		value: 0.935,
	},
	total: 0,
	record: {
		id: 0,
		register: getURLParams("") ?? "",
		status: "newOne",
	},
	handlers: {
		dataTemplate,
		getTotal,
		totalRows,
	},
};
