/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { request } from "../../../api/request";
import { initialState } from "../../../types/homologacion/supplementaryWorks/storage2";

export const consume = request("supplementaryWorks");

export const slice = createSlice({
	name: "SupplementaryWorks",
	initialState,
	reducers: {
		addDataCalculationRow(state,action:PayloadAction<number>) {
			const id = action.payload;
			const { appendCalculationTemplate, calculation } = state.data[id];
			state.data[id].calculation = appendCalculationTemplate(calculation);
		},
		removeDataCalculationRow(state, action: PayloadAction<number>) {
			const id = action.payload;
			const { calculation } = state.data[id];
			const { length } = calculation;
			if (length > 1) {
				calculation.pop();
			}
		},
		updateData: (state, action: PayloadAction<any>) => { 
			const { index, key, subKey, value } = action.payload;
			if (index !==undefined && key !==undefined&& value!==undefined) {
				const { data } = state;
				if (subKey!==undefined) {
					data[index][key][subKey] = value;
					if (subKey.includes("unity")) {
						data[index].value.result.unity = value;
					}
					
				}
				else {
					data[index][key] = value;
				}
			}
		},
		updateDataCalculation(state, action: PayloadAction<any>) { 
			const { index, id, key, subKey, subSubKey, value } = action.payload;
			if(index !== undefined && id !== undefined && key !== undefined && value !== undefined && subKey !== undefined) {
				const { calculation } = state.data[index];
				if (subSubKey !== undefined) { 
					calculation[id][key][subKey][subSubKey] = value;
				} else {
					calculation[id][key][subKey] = value;
				}
			}
		},
	},
	extraReducers: (builder) => {
	}
});

export const {addDataCalculationRow,removeDataCalculationRow, updateData, updateDataCalculation} = slice.actions;
export const getState = (state: RootState) => state.supplementaryWorks;
export default slice.reducer;
