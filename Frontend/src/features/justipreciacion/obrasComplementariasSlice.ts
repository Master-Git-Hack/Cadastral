/** @format */

import { docHandler } from "./../../types/justipreciacion/obrasComplementarias/documentacion/docHandler";
/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { request } from "../../api/request";
import { initialState } from "../../types/justipreciacion/obrasComplementarias/store";

const name = "SupplementaryWorks";
export const consumeOC = request(name);

export const slice = createSlice({
	name,
	initialState,
	reducers: {
		addRow: (state) => {
			const { handlers, documentation, calculous } = state;
			const documentationTemplate = handlers.documentation.template;
			const { length } = documentation;
			documentation[length - 1].show = false;
			const calculousTemplate = handlers.calculous.template;
			documentation.push(documentationTemplate(length + 1));
			calculous.push(calculousTemplate(calculous.length + 1));
		},
		removeRow: (state) => {
			const { documentation, calculous } = state;
			documentation.length > 1 && documentation.pop() && calculous.pop();
			const { length } = documentation;
			documentation[length - 1].show = true;
		},
		addRowDocumentationAreaData: (state, action: PayloadAction<number>) => {
			const { documentation, handlers } = state;
			const { areaDataTemplate, getAreaTotalFromData } = handlers.documentation;
			const { area } = documentation[action.payload];
			const { data } = area;
			data.push(areaDataTemplate);
			area.total = getAreaTotalFromData(data);
			area.unity = data[0].unity;
		},
		updateDocumentationAreaData: (state, action: PayloadAction<any>) => {
			const { id, index, key, value } = action.payload;
			const { documentation, handlers } = state;
			const { getAreaTotalFromData } = handlers.documentation;
			if (id !== undefined) {
				const { area } = documentation[id];
				const { data } = area;
				if (index !== undefined && key !== undefined && value !== undefined) {
					data[index][key] = value;
				}
				//data[0]
				area.total = getAreaTotalFromData(data);
				area.unity = data[0].unity;
			}
		},
		removeRowDocumentationAreaData: (state, action: PayloadAction<number>) => {
			const { documentation, handlers } = state;
			const { getAreaTotalFromData } = handlers.documentation;
			const { area } = documentation[action.payload];
			const { data } = area;
			data.length > 1 && data.pop();
			area.total = getAreaTotalFromData(data);
			area.unity = data[0].unity;
		},
		setDocumentationShow: (state, action: PayloadAction<any>) => {
			const { index, value } = action.payload;
			state.documentation[index].show = value;
		},
		addDocumentationCalculationRow: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			const { handlers, documentation } = state;
			const { calculation } = documentation[id];

			const { appendCalculationTemplate } = handlers.documentation;

			documentation[id].calculation = appendCalculationTemplate(calculation);
		},
		removeDocumentationCalculationRow: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			const { calculation } = state.documentation[id];
			const { length } = calculation;
			length > 1 && calculation.pop();
		},
		updateDocumentation: (state, action: PayloadAction<any>) => {
			const { index, key, subKey, value } = action.payload;
			if (index !== undefined && key !== undefined && value !== undefined) {
				const { documentation, handlers } = state;
				if (subKey !== undefined) {
					documentation[index][key][subKey] = value;
					if (subKey.includes("unity")) {
						documentation[index].value.result.unity = value;
					}
					if (subKey.includes("gtoFactor")) {
						const { result } = state.documentation[index].value;
						const { getFinalTotal, getResult } = handlers.documentation;
						const { gtoFactor, subTotal } = state.documentation[index].value;

						documentation[index].value.total = getFinalTotal(gtoFactor, subTotal);

						result.value = getResult(
							documentation[index].area.total,
							documentation[index].value.total,
						);
					}
				} else {
					documentation[index][key] = value;
				}
			}
		},
		updateDocumentationCalculation: (state, action: PayloadAction<any>) => {
			const { index, id, key, subKey, subSubKey, value } = action.payload;
			if (
				index !== undefined &&
				id !== undefined &&
				key !== undefined &&
				value !== undefined &&
				subKey !== undefined
			) {
				const { documentation, handlers } = state;
				const { calculation } = documentation[index];
				const { result } = state.documentation[index].value;
				const { getSubTotal, getFinalTotal, getResult } = handlers.documentation;
				const { unitary, ind } = calculation[id].value;
				const { getTotal } = handlers.calculous;
				const { quantity } = calculation[id];
				if (subSubKey !== undefined) {
					calculation[id][key][subKey][subSubKey] = value;
					if (subKey.includes("ind") && subSubKey.includes("value")) {
						calculation[id].value.ind.unitary = getTotal(value, unitary);
						calculation[id].value.total = getTotal(ind.unitary, quantity.value);
					}
				} else {
					calculation[id][key][subKey] = value;
					if (key.includes("value") && subKey.includes("unitary")) {
						ind.unitary = getTotal(value, ind.value);
						calculation[id].value.total = getTotal(ind.unitary, quantity.value);
					}
					if (key.includes("quantity") && subKey.includes("value")) {
						calculation[id].value.total = getTotal(value, ind.unitary);
					}
				}
				documentation[index].value.subTotal = getSubTotal(calculation);
				documentation[index].value.total = getFinalTotal(
					documentation[index].value.gtoFactor,
					documentation[index].value.subTotal,
				);

				result.value = getResult(
					documentation[index].area.total,
					documentation[index].value.total,
				);
			}
		},
		updateCalculous: (state, action: PayloadAction<any>) => {
			const { index, key, subKey, value } = action.payload;
			if (index !== undefined && key !== undefined && value !== undefined) {
				const { calculous, documentation, handlers } = state;
				const { getFactor, getSubTotal, getTotal } = handlers.calculous;
				const { age, vut } = calculous[index];
				if (subKey !== undefined) {
					calculous[index][key][subKey] = value;
					if (subKey.includes("age")) {
						age.factor = getFactor(age.value, vut);
					}
				} else {
					calculous[index][key] = value;
					if (key.includes("vut")) {
						age.factor = getFactor(age.value, vut);
					}
				}
				state.calculous = calculous.map((item: any, id: number) => {
					item.age.factor = getFactor(item.age.value, item.vut);
					item.subTotal = getSubTotal(
						item.age.factor,
						item.stateOfConservation.value,
						documentation[id].value.result.value,
					);
					item.total = getTotal(item.subTotal, documentation[id].area.total);
					return item;
				});

				state.total = calculous.reduce(
					(previous: number, current: any) => previous + Number(current.total),
					0,
				);
			}
		},
	},
	extraReducers: (builder) => {
		//get method
		builder
			.addCase(consumeOC.get.rejected, (state) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeOC.get.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consumeOC.get.fulfilled, (state, action: PayloadAction<any>) => {
				const { status, operation, message, documentation } = action.payload;
				state.status = status;
				state.message = message;

				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/OC":
							console.log(documentation);
							break;
						default:
							break;
					}
				}
			});
		//post method
		builder
			.addCase(consumeOC.post.rejected, (state) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeOC.post.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consumeOC.post.fulfilled, (state, action: PayloadAction<any>) => {
				const { status, operation, message, documentation } = action.payload;
				state.status = status;
				state.message = message;
				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/":
							break;
						default:
							break;
					}
				}
			});

		//patch method
		builder
			.addCase(consumeOC.patch.rejected, (state) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeOC.patch.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consumeOC.patch.fulfilled, (state, action: PayloadAction<any>) => {
				const { status, operation, message, documentation } = action.payload;
				state.status = status;
				state.message = message;
				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/ObrasComplementarias":
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
	addRowDocumentationAreaData,
	removeRowDocumentationAreaData,
	updateDocumentationAreaData,
	addDocumentationCalculationRow,
	removeDocumentationCalculationRow,
	updateDocumentation,
	updateDocumentationCalculation,
	updateCalculous,
	setDocumentationShow,
} = slice.actions;
export const getOC = (state: RootState) => state.obrasComplementarias;
export default slice.reducer;
