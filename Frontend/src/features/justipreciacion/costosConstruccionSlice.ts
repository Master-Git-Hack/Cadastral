/** @format */

import { dataStorage } from "./../../types/justipreciacion/obrasComplementarias/documentacion/docStorage";
/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { request } from "../../api/request";
import { initialState } from "../../types/justipreciacion/costosConstruccion/handler";

const name = "CostosConstruccion";
export const consumeCC = request(name);
export const slice = createSlice({
	name,
	initialState,
	reducers: {
		addRow: (state) => {
			const { data, handlers } = state;
			const { length } = data;
			data.push(handlers.dataTemplate(length + 1));
		},
		removeRow: (state) => {
			const { data } = state;
			const { length } = data;
			length > 1 && data.pop();
		},
		setValues: (state, action: PayloadAction<any>) => {
			const { key, value, id } = action.payload;
			const { data, handlers } = state;
			if (key !== undefined && value !== undefined && id !== undefined) {
				data[id][key] = value;
				state.data = handlers.totalRows(state.data);
				state.total = handlers.getTotal(state.data);
			}
		},
		updateTotalData: (state) => {
			const { data, handlers } = state;
			state.data = handlers.totalRows(data);
			state.total = handlers.getTotal(data);
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.titulo = action.payload;
		},
		setFactorGTO: (state, action: PayloadAction<boolean>) => {
			const enabled = action.payload;
			state.factorGTO = {
				enabled,
				value: enabled ? 0.935 : 1,
			};
		},
		setRedondeo: (state, action: PayloadAction<number>) => {
			const { redondeo, data, handlers } = state;
			state.redondeo = action.payload;
			state.data = handlers.totalRows(data);
			state.total = handlers.getTotal(data);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(consumeCC.get.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consumeCC.get.fulfilled, (state, action: PayloadAction<any>) => {
				const { operation, message, data, status } = action.payload;
				state.status = status;
				state.message = message;

				if (status.includes("success")) {
					switch (operation) {
						case "CostosConstruccion":
							const { handlers } = state;
							const { factorGTO, redondeo, titulo, record } = data;
							state.titulo = titulo;
							state.data = handlers.totalRows(data.data);
							state.total = handlers.getTotal(state.data);
							state.factorGTO = factorGTO;
							state.redondeo = redondeo ?? 0;
							state.record = record;
							break;

						default:
							break;
					}
				}
			});
	},
});

export const {
	addRow,
	removeRow,
	setValues,
	setTitle,
	setFactorGTO,
	updateTotalData,
	setRedondeo,
} = slice.actions;
export const getCC = (state: RootState) => state.costosConstruccion;
export default slice.reducer;
