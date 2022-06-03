/** @format */

import { getParams } from "./../../utils/utils";
/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { request } from "../../api/request";
import { initialState, Storage } from "../../types/justipreciacion/homologacion/storage";
import {
	handlerAddRow,
	handlerRemoveRow,
	handleUpdateOperationValues,
} from "./homologacionHandlers";
const name = "Homologacion";
export const consumeHomologacion = request(name);

export const slice = createSlice({
	name,
	initialState: initialState(
		getParams("tipo") !== "" ? getParams("tipo")?.toUpperCase() : "TERRENO",
		getParams("tipo_servicio") !== ""
			? getParams("tipo_servicio")?.toUpperCase()
			: "justipreciacion",
	),
	reducers: {
		addRowLocationZone(state, action: PayloadAction<any>) {
			const { key } = action.payload;
			const { factors, handlers } = state;
			const { insertionSubject } = handlers[key];
			const { subject } = factors[key];
			factors[key].subject = insertionSubject(subject);
			state = handleUpdateOperationValues(state);
		},
		updateFactorStateAgee(state, action: PayloadAction<any>) {
			const { factors, handlers } = state;
			const { key, object, index } = action.payload;
			const newValue = action.payload.value;
			if (index !== undefined && object !== "subject") {
				factors[key][object][index].value = newValue;
			} else {
				factors[key][object].value = newValue;
			}
			const { subject, data } = factors[key];
			const { operation } = handlers[key];
			factors[key].data = operation(data, subject);

			state = handleUpdateOperationValues(state);
		},
		removeRowLocationZone(state, action: PayloadAction<any>) {
			const { key } = action.payload;
			const { factors, handlers } = state;
			const { subject } = factors[key];

			const { length } = subject;
			if (length > 1) {
				subject.pop();
				subject.map((item: any) => (item.percentage = 10 / (length - 1)));
				state = handleUpdateOperationValues(state);
			}
		},

		updateFactorStateCommon(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			const { factors, handlers } = state;
			if (index !== undefined && object !== "subject") {
				const data = factors[key][object][index];
				factors[key][object][index] = {
					...data,
					...value,
				};
			} else {
				const item = state.factors[key][object];
				factors[key][object] = {
					...item,
					...value,
				};
			}
			if (!key.includes("Surface") && !key.includes("Commercial")) {
				const { data, subject } = factors[key];
				const { operation } = handlers[key];
				factors[key].data = operation(data, subject);
			}
			state = handleUpdateOperationValues(state);
		},
		updateFactorStateLocationZone(state, action: PayloadAction<any>) {
			const { factors, handlers } = state;
			const { key, object, index, value, item } = action.payload;
			if (index !== undefined && object === "subject") {
				const { subject } = factors[key];
				subject[index][item] = value;
				const { operation } = handlers[key];
				factors[key].data = operation(subject);
				state = handleUpdateOperationValues(state);
			}
		},
		updateFactorStateAge(state, action: PayloadAction<any>) {
			const { key, object, index } = action.payload;
			const newValue = action.payload.value;
			const { factors, handlers } = state;
			if (index !== undefined && object !== "subject") {
				factors[key][object][index].value = newValue;
			} else {
				factors[key][object].value = newValue;
			}
			const { subject, data } = factors[key];
			const { operation } = handlers[key];
			factors[key].data = operation(data, subject);

			state = handleUpdateOperationValues(state);
		},
		setVisibilityOrderFactors(state, action: PayloadAction<any>) {
			const { key, value } = action.payload;
			const { factors } = state;
			const data = factors[key];
			factors[key] = {
				...data,
				...value,
			};
			state = handleUpdateOperationValues(state);
		},
		updateDocumentationStateArea(state, action: PayloadAction<any>) {
			const { key, object, index, item, value } = action.payload;
			const { Area } = state.documentation;

			if (key.includes("subject") || key.includes("averageLotArea")) {
				const areaObj = Area[key];
				if (index !== undefined && item !== undefined) {
					areaObj[object][index][item] = value;
				} else {
					areaObj[object] = value;
				}
			} else {
				const areaObj = Area[key][index];
				if (index !== undefined && item !== undefined) {
					areaObj[object][item] = value;
				} else {
					areaObj[object] = value;
				}
			}
			state = handleUpdateOperationValues(state);
		},
		updateDocumentationStateSalesCost(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			if (index !== undefined && object !== "data") {
				const { SalesCost } = state.documentation;
				SalesCost[key][index][object] = value;
				state = handleUpdateOperationValues(state);
			}
		},
		updateDocumentationStateWeightingPercentage(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			if (index !== undefined && object !== "data") {
				const { WeightingPercentage } = state.documentation;
				WeightingPercentage[key][index][object] = value;
				const { calculation, data } = WeightingPercentage;
				WeightingPercentage.total = calculation(data);
				state = handleUpdateOperationValues(state);
			}
		},
		addRow(state) {
			const result = handlerAddRow(state);
			state.factors = result.factors;
			state.documentation = result.documentation;
			state = handleUpdateOperationValues(state);
		},
		removeRow(state) {
			const result = handlerRemoveRow(state);
			state.factors = result.factors;
			state.documentation = result.documentation;
			state = handleUpdateOperationValues(state);
		},
		UpdateOperationValues(state) {
			state = handleUpdateOperationValues(state);
		},
	},
	extraReducers: (builder) => {
		//get method
		builder
			.addCase(consumeHomologacion.get.rejected, (state: Storage) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeHomologacion.get.pending, (state: Storage) => {
				state.status = "loading";
			})
			.addCase(
				consumeHomologacion.get.fulfilled,
				(state: Storage, action: PayloadAction<any>) => {
					const { status, operation, message, data } = action.payload;
					state.status = status;
					state.message = message;
					if (status.includes("success")) {
						switch (operation) {
							case "HOMOLOGACION/IndicadoresMunicipales":
								break;
							case "HOMOLOGACION/Justipreciacion":
								break;
							case "HOMOLOGACION":
								break;
						}
					}
				},
			);
		//post method
		builder
			.addCase(consumeHomologacion.post.rejected, (state: Storage) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeHomologacion.post.pending, (state: Storage) => {
				state.status = "loading";
			})
			.addCase(consumeHomologacion.post.fulfilled, (state, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
				state.status = status;
				state.message = message;

				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/IndicadoresMunicipales":
							break;
						case "HOMOLOGACION/Justipreciacion":
							break;
						case "HOMOLOGACION":
							break;
					}
				}
			});

		//patch method
		builder
			.addCase(consumeHomologacion.patch.rejected, (state: Storage) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeHomologacion.patch.pending, (state: Storage) => {
				state.status = "loading";
			})
			.addCase(consumeHomologacion.patch.fulfilled, (state, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
				state.status = status;
				state.message = message;

				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/IndicadoresMunicipales":
							break;
						case "HOMOLOGACION/Justipreciacion":
							break;
						case "HOMOLOGACION":
							break;
					}
				}
			});
	},
});

export const {
	addRowLocationZone,
	updateFactorStateAge,
	removeRowLocationZone,
	updateFactorStateCommon,
	updateFactorStateLocationZone,
	setVisibilityOrderFactors,
	updateDocumentationStateArea,
	updateDocumentationStateSalesCost,
	updateDocumentationStateWeightingPercentage,
	addRow,
	removeRow,
	UpdateOperationValues,
} = slice.actions;
export const getHomologacion = (state: RootState) => state.homologacion;
export default slice.reducer;
