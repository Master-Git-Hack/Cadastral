/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { request } from "../../api/request";
import { initialState } from "../../types/homologacion/storage";
import {
	handlerAddRow,
	handlerRemoveRow,
	handleUpdateOperationValues,
	handleGetRequest,
} from "./handlers";

export const consume = request("homologation");

export const slice = createSlice({
	name: "homologation",
	initialState,
	reducers: {
		/**
		 * It updates the operation values.
		 * @param state - The state object that is passed to the reducer.
		 */
		UpdateOperationValues(state) {
			state = handleUpdateOperationValues(state);
		},
		/**
		 * The function takes in a state and an action, and then sets the state's documentation's ReFactor's
		 * isUsed property to the action's payload
		 * @param state - The state of the reducer.
		 * @param action - PayloadAction<any>
		 */
		setIndiviso(state, action: PayloadAction<any>) {
			state.documentation.ReFactor.isUsed = action.payload;
		},
		/**
		 * It adds a row to the table
		 * @param state - The state object that is passed to the function.
		 */
		addRow(state) {
			const result = handlerAddRow(state);
			state.factors = result.factors;
			state.documentation = result.documentation;
			state = handleUpdateOperationValues(state);
		},
		/**
		 * It adds a row to the subject of the factor with the key passed in the payload
		 * @param state - The current state of the reducer.
		 * @param action - PayloadAction<any>
		 */
		addRowLocationZone(state, action: PayloadAction<any>) {
			const { key } = action.payload;
			const { insertionSubject, subject } = state.factors[key];
			state.factors[key].subject = insertionSubject(subject);
			state = handleUpdateOperationValues(state);
		},
		/**
		 * It takes a key and a value, and then updates the state with the new value
		 * @param state - The current state of the store.
		 * @param action - PayloadAction<any>
		 */
		setVisibilityOrderFactors(state, action: PayloadAction<any>) {
			const { key, value } = action.payload;
			const data = state.factors[key];
			state.factors[key] = {
				...data,
				...value,
			};
			state = handleUpdateOperationValues(state);
		},
		/**
		 * It removes the last row from the factors table and updates the documentation table
		 * @param state - The state object that is passed to the store.
		 */
		removeRow(state) {
			const result = handlerRemoveRow(state);
			state.factors = result.factors;
			state.documentation = result.documentation;
			state = handleUpdateOperationValues(state);
		},
		/**
		 * It removes a row from the table and updates the percentage values of the remaining rows
		 * @param state - The current state of the store.
		 * @param action - PayloadAction<any>
		 */
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

		/**
		 * It takes the state and an action, and updates the state based on the action
		 * @param state - The current state of the store.
		 * @param action - PayloadAction<any>
		 */
		updateFactorStateAge(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			if (index !== undefined && object !== "subject")
				state.factors[key][object][index].value = value;
			else state.factors[key][object].value = value;

			const { operation, data, subject } = state.factors[key];
			state.factors[key].data = operation(data, subject);

			state = handleUpdateOperationValues(state);
		},
		/* Updating the state of the store. */
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
		/**
		 * It updates the state of the factor object with the new value of the input field
		 * @param state - The current state of the reducer.
		 * @param action - PayloadAction<any>
		 */
		updateFactorStateLocationZone(state, action: PayloadAction<any>) {
			const { key, object, index, value, item } = action.payload;
			if (index !== undefined && object === "subject") {
				state.factors[key].subject[index][item] = value;
				const { operation } = state.factors[key];
				state.factors[key].data = operation(state.factors[key].subject);
				state = handleUpdateOperationValues(state);
			}
		},
		/* Updating the state of the documentation object. */
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
		/**
		 * It updates the state of the documentation object with the value of the payload
		 * @param state - the current state of the store
		 * @param action - PayloadAction<any>
		 */
		updateDocumentationStateSalesCost(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			if (index !== undefined && object !== "data") {
				state.documentation.SalesCost[key][index][object] = value;
				state = handleUpdateOperationValues(state);
			}
		},
		/**
		 * It takes a state and an action, and if the action has a payload with a key and a value, it updates
		 * the state with the key and value
		 * @param state - The current state of the store.
		 * @param action - PayloadAction<any>
		 */
		updateDocumentationStateRoundedTo(state, action: PayloadAction<any>) {
			const { key, value } = action.payload;
			if (key !== undefined && value !== undefined) {
				console.log(key, value);
				state.documentation.SalesCost.averageUnitCost[key] = value;
				state = handleUpdateOperationValues(state);
			}
		},
		/**
		 * It updates the state of the documentation object with the value of the payload action
		 * @param state - The current state of the store.
		 * @param action - PayloadAction<any>
		 */
		updateDocumentationStateWeightingPercentage(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			if (index !== undefined && object !== "data") {
				state.documentation.WeightingPercentage[key][index][object] = value;
				const { calculation, data } = state.documentation.WeightingPercentage;
				state.documentation.WeightingPercentage.total = calculation(data);
				state = handleUpdateOperationValues(state);
			}
		},
		/**
		 * It takes the state, and an action, and then updates the state with the value of the action
		 * @param state - The current state of the store.
		 * @param action - PayloadAction<any>
		 */
		updateReFactor(state, action: PayloadAction<any>) {
			const { key, object, value } = action.payload;
			state.documentation.ReFactor[key][object] = value;
			state = handleUpdateOperationValues(state);
		},
		/**
		 * It updates the state of the Indiviso object in the documentation object
		 * @param state - The current state of the reducer.
		 * @param action - PayloadAction<any>
		 */
		updateIndiviso(state, action: PayloadAction<any>) {
			const { key, value } = action.payload;
			state.documentation.Indiviso[key] = value;
			state = handleUpdateOperationValues(state);
		},
	},
	extraReducers: (builder) => {
		/* A reducer that is handling the state of the application. */
		builder
			.addCase(consume.get.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consume.post.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consume.patch.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consume.post.fulfilled, (state, action) => {
				if (action.payload !== null) {
					const { response } = action.payload;
					state.status = response !== -1 && response !== null ? "complete" : "failed";
				} else state.status = "failed";
			})
			.addCase(consume.patch.fulfilled, (state, action) => {
				if (action.payload !== null) {
					const { response } = action.payload;
					state.status = response !== -1 && response !== null ? "complete" : "failed";
				} else state.status = "failed";
			})
			.addCase(consume.get.fulfilled, (state, action) => {
				if (action.payload !== null) {
					const { response } = action.payload;

					state.status = response !== -1 && response !== null ? "complete" : "failed";
					const { status } = response.record.homologacion;
					if (status.includes("exists")) {
						const record = handleGetRequest(response, state);
						state.factors = record.factors;

						state.documentation = record.documentation;

						state.record = record.record;
					} else {
						const { documentation, factors, record } = response;

						state.documentation.Area.options = documentation.Area.options;
						state.documentation.Area.subject.value = documentation.Area.subject.value;
						state.documentation.ReFactor.surface.value =
							documentation.ReFactor.surface.value;
						state.factors.Age.subject.value = factors.Age.subject.value;
						state.record.justipreciacion = record.justipreciacion;
						state.record.homologacion.status = record.homologacion.status;
						state.record.homologacion.type = record.homologacion.type;
						state.status = "working";
					}
					state = handleUpdateOperationValues(state);
				} else state.status = "failed";
			});
	},
});

export const {
	UpdateOperationValues,
	addRow,
	setIndiviso,
	updateReFactor,
	addRowLocationZone,
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
