/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { consume } from "../../api/api.config";
import { initialState } from "../../types/homologacion/storage";
import {
	handlerAddRow,
	handlerRemoveRow,
	handleUpdateOperationValues,
	handleRequest,
	handleGetRequest,
} from "./handlers";

export const slice = createSlice({
	name: "homologation",
	initialState,
	reducers: {
		UpdateOperationValues(state) {
			state = handleUpdateOperationValues(state);
		},
		setIndiviso(state, action: PayloadAction<any>) {
			state.documentation.ReFactor.isUsed = action.payload;
		},
		addRow(state) {
			const result = handlerAddRow(state);
			state.factors = result.factors;
			state.documentation = result.documentation;
			state = handleUpdateOperationValues(state);
		},
		addRowLocationZone(state, action: PayloadAction<any>) {
			const { key } = action.payload;
			const { insertionSubject, subject } = state.factors[key];
			state.factors[key].subject = insertionSubject(subject);
			state = handleUpdateOperationValues(state);
		},
		addRowSupplementary(state) {
			const { template, data } = state.supplementaryWorks;
			const id = data.length + 1;
			state.supplementaryWorks.data.push(template(id));
		},
		setVisibilityOrderFactors(state, action: PayloadAction<any>) {
			const { key, value } = action.payload;
			const data = state.factors[key];
			state.factors[key] = {
				...data,
				...value,
			};
			state = handleUpdateOperationValues(state);
		},
		removeRow(state) {
			const result = handlerRemoveRow(state);
			state.factors = result.factors;
			state.documentation = result.documentation;
			state = handleUpdateOperationValues(state);
		},
		removeRowSupplementary(state) {
			const { data } = state.supplementaryWorks;
			if (data.length > 1) {
				state.supplementaryWorks.data.pop();
			}
		},
		removeRowLocationZone(state, action: PayloadAction<any>) {
			const { key } = action.payload;
			const length = state.factors[key].subject.length;
			if (length > 1) {
				state.factors[key].subject.pop();
				state.factors[key].subject.map(
					(item: any) => (item.percentage = 10 / (length - 1)),
				);
				state = handleUpdateOperationValues(state);
			}
		},
		updateSupplementary(state, action: PayloadAction<any>) {
			const { index, key, value, object } = action.payload;
			if (object !== undefined) {
				state.supplementaryWorks.data[index][key][object] = value;
			} else {
				state.supplementaryWorks.data[index][key] = value;
			}
			if (key.includes("state")) {
			}
			const { getTotal, operation, data } = state.supplementaryWorks;
			state.supplementaryWorks.data = operation(data);
			state.supplementaryWorks.total = getTotal(data);
		},
		updateFactorStateAge(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			if (index !== undefined && object !== "subject")
				state.factors[key][object][index].value = value;
			else state.factors[key][object].value = value;

			const { operation, data, subject } = state.factors[key];
			state.factors[key].data = operation(data, subject);

			state = handleUpdateOperationValues(state);
		},
		updateFactorStateCommon(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			if (index !== undefined && object !== "subject") {
				const data = state.factors[key][object][index];
				state.factors[key][object][index] = {
					...data,
					...value,
				};
			} else {
				const item = state.factors[key][object];
				state.factors[key][object] = {
					...item,
					...value,
				};
			}
			if (!key.includes("Surface") && !key.includes("Commercial")) {
				const { operation, data, subject } = state.factors[key];
				state.factors[key].data = operation(data, subject);
			}
			state = handleUpdateOperationValues(state);
		},
		updateFactorStateLocationZone(state, action: PayloadAction<any>) {
			const { key, object, index, value, item } = action.payload;
			if (index !== undefined && object === "subject") {
				state.factors[key].subject[index][item] = value;
				const { operation } = state.factors[key];
				state.factors[key].data = operation(state.factors[key].subject);
				state = handleUpdateOperationValues(state);
			}
		},
		updateDocumentationStateArea(state, action: PayloadAction<any>) {
			const { key, object, index, item, value } = action.payload;
			if (key.includes("subject") || key.includes("averageLotArea")) {
				if (index !== undefined && item !== undefined) {
					state.documentation.Area[key][object][index][item] = value;
				} else {
					state.documentation.Area[key][object] = value;
				}
			} else {
				if (index !== undefined && item !== undefined) {
					state.documentation.Area[key][index][object][item] = value;
				} else {
					state.documentation.Area[key][index][object] = value;
				}
			}
			state = handleUpdateOperationValues(state);
		},
		updateDocumentationStateSalesCost(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			if (index !== undefined && object !== "data") {
				state.documentation.SalesCost[key][index][object] = value;
				state = handleUpdateOperationValues(state);
			}
		},
		updateDocumentationStateRoundedTo(state, action: PayloadAction<any>) {
			const { key, value } = action.payload;
			if (key !== undefined && value !== undefined) {
				console.log(key, value);
				state.documentation.SalesCost.averageUnitCost[key] = value;
				state = handleUpdateOperationValues(state);
			}
		},
		updateDocumentationStateWeightingPercentage(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			if (index !== undefined && object !== "data") {
				state.documentation.WeightingPercentage[key][index][object] = value;
				const { calculation, data } = state.documentation.WeightingPercentage;
				state.documentation.WeightingPercentage.total = calculation(data);
				state = handleUpdateOperationValues(state);
			}
		},
		updateReFactor(state, action: PayloadAction<any>) {
			const { key, object, value } = action.payload;
			state.documentation.ReFactor[key][object] = value;
			state = handleUpdateOperationValues(state);
		},
		updateIndiviso(state, action: PayloadAction<any>) {
			const { key, value } = action.payload;
			state.documentation.Indiviso[key] = value;
			state = handleUpdateOperationValues(state);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(request.get.pending, (state) => {
				state.status = "loading";
			})
			.addCase(request.post.pending, (state) => {
				state.status = "loading";
			})
			.addCase(request.patch.pending, (state) => {
				state.status = "loading";
			})
			.addCase(request.post.fulfilled, (state, action) => {
				if (action.payload !== null) {
					const { response } = action.payload;
					state.status = response !== -1 && response !== null ? "complete" : "failed";
				} else state.status = "failed";
			})
			.addCase(request.patch.fulfilled, (state, action) => {
				if (action.payload !== null) {
					const { response } = action.payload;
					state.status = response !== -1 && response !== null ? "complete" : "failed";
				} else state.status = "failed";
			})
			.addCase(request.get.fulfilled, (state, action) => {
				if (action.payload !== null) {
					const { response, type } = action.payload;
					state.status =
						response.response !== -1 && response.response !== null
							? "complete"
							: "failed";
					if (type.includes("/")) {
						const { status } = response.response.record.homologacion;
						if (status.includes("exists")) {
							const record = handleGetRequest(response.response, state);
							state.factors = record.factors;

							state.documentation = record.documentation;

							state.record = record.record;
						} else {
							const { documentation, factors, record } = response.response;
							console.log(response.response);
							state.documentation.Area.options = documentation.Area.options;
							state.documentation.Area.subject.value =
								documentation.Area.subject.value;
							state.documentation.ReFactor.surface.value =
								documentation.ReFactor.surface.value;
							state.factors.Age.subject.value = factors.Age.subject.value;
							state.record.justipreciacion = record.justipreciacion;
							state.record.homologacion.status = record.homologacion.status;
							state.record.homologacion.type = record.homologacion.type;
							state.status = "working";
						}
					}
					if (type.includes("OC")) return;
				} else state.status = "failed";
			});
	},
});
export const request = {
	get: createAsyncThunk("homologation/get", async (action: any) => {
		const { url, type } = action;
		try {
			return {
				response: await (await consume("json").get(url)).data,
				type,
			};
		} catch (err: any) {
			return null;
		}
	}),
	post: createAsyncThunk("homologation/post", async (action: any) => {
		const { url, responseType, payload } = action;
		try {
			return await (
				await consume(responseType).post(url, payload)
			).data;
		} catch (err: any) {
			return null;
		}
	}),
	patch: createAsyncThunk("homologation/patch", async (action: any) => {
		const { url, responseType, payload } = action;
		try {
			return await (
				await consume(responseType).patch(url, payload)
			).data;
		} catch (err: any) {
			return null;
		}
	}),
};

export const {
	UpdateOperationValues,
	addRow,
	setIndiviso,
	updateReFactor,
	addRowLocationZone,
	addRowSupplementary,
	removeRowSupplementary,
	updateSupplementary,
	removeRow,
	updateIndiviso,
	removeRowLocationZone,
	updateFactorStateAge,
	updateFactorStateCommon,
	setVisibilityOrderFactors,
	updateDocumentationStateRoundedTo,
	updateFactorStateLocationZone,
	updateDocumentationStateArea,
	updateDocumentationStateSalesCost,
	updateDocumentationStateWeightingPercentage,
} = slice.actions;
export const getState = (state: RootState) => state.homologation;
export default slice.reducer;
