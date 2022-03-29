/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { consume } from "../../api/api.config";
import { initialState } from "../../types/homologacion/storage";
import { handlerAddRow, handlerRemoveRow } from "./handlers";
export const slice = createSlice({
	name: "homologation",
	initialState,
	reducers: {
		addRow(state) {
			const result = handlerAddRow(state);
			state.factors = result.factors;
			state.documentation = result.documentation;
		},
		removeRow(state) {
			const result = handlerRemoveRow(state);
			state.factors = result.factors;
			state.documentation = result.documentation;
		},
		updateFactorStateAge(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			if (index !== undefined && object !== "subject")
				state.factors[key][object][index].value = value;
			else state.factors[key][object].value = value;

			const { operation, data, subject } = state.factors[key];
			state.factors[key].data = operation(data, subject);
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
			const { operation, data, subject } = state.factors[key];
			state.factors[key].data = operation(data, subject);
		},
	},
	extraReducers: (builder) => {},
});
export const { addRow, removeRow, updateFactorStateAge, updateFactorStateCommon } = slice.actions;
export const getState = (state: RootState) => state.homologation;
export default slice.reducer;
