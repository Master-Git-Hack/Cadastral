/** @format */

import { Storage } from "./storage";
const dataTemplate = (id: number) => ({
	id,
	costoDirecto: 0,
	indirectos: 1,
	valorNeto: 0,
	m2: 0,
	total: 0,
});
const totalRows = (data: any): any =>
	data.map((item: any) => {
		const { costoDirecto, indirectos, m2 } = item;
		let valorNeto = Number((costoDirecto * indirectos).toFixed(2));
		valorNeto = !isNaN(valorNeto) ? valorNeto : 1;
		let total = Number((valorNeto / m2).toFixed(2));
		total = !isNaN(total) ? total : 1;
		return {
			costoDirecto,
			indirectos,
			valorNeto,
			m2,
			total,
		};
	});
const getTotal = (data: any): number =>
	data.reduce((previous: number, current: any) => previous + Number(current.total), 0);
export const initialState: Storage = {
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
		register: "",
		status: "newOne",
	},
	handlers: {
		dataTemplate,
		getTotal,
		totalRows,
	},
};
