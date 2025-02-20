/** @format */
import { PayloadAction } from "@reduxjs/toolkit";
import { StateProps } from "./costosConstruccion.interface";

export const reducers = {
	addRow: ({ data, handlers: { dataTemplate } }: StateProps) => {
		const { length } = data;
		data.push(dataTemplate(length + 1));
	},
	removeRow: ({ data }: StateProps) => {
		const { length } = data;
		length > 1 && data.pop();
	},
	setValues: (state: StateProps, { payload: { key, value, id } }: PayloadAction<any>) => {
		const {
			handlers: { totalRows, getTotal },
		} = state;
		if (key !== undefined && value !== undefined && id !== undefined) {
			console.log(key, value, id);
			state.data[id][key] = value;
			state.data = totalRows(state.data);
			state.total = getTotal(state.data);
		}
	},

	updateTotalData: (state: StateProps) => {
		const {
			handlers: { totalRows, getTotal },
		} = state;
		state.data = totalRows(state.data);
		state.total = getTotal(state.data);
	},
	setTitle: (state: StateProps, { payload }: PayloadAction<string>) => {
		state.titulo = payload;
	},
	setFactorGTO: (state: StateProps, { payload }: PayloadAction<boolean>) => {
		state.factorGTO = {
			enabled: payload,
			value: payload ? 0.935 : 1,
		};
	},
	setRedondeo: (state: StateProps, { payload }: PayloadAction<number>) => {
		const {
			handlers: { totalRows, getTotal },
		} = state;
		state.redondeo = payload;
		state.data = totalRows(state.data);
		state.total = getTotal(state.data);
	},
};
