/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { request } from "../../../api/request";
import { initialState } from "../../../types/homologacion/supplementaryWorks/storage";

export const consume = request("supplementaryWorks");

export const slice = createSlice({
	name: "SupplementaryWorks",
	initialState,
	reducers: {
		addRow(state) {
			const { template, getTotal, operation, data } = state;
			const id = data.length + 1;
			state.data.push(template(id));
			state.data = operation(data);
			state.total = getTotal(data);
		},
		removeRow(state) {
			const { data, getTotal, operation } = state;
			if (data.length > 1) {
				state.data.pop();
				state.data = operation(data);
				state.total = getTotal(data);
			}
		},
		update(state, action: PayloadAction<any>) {
			const { index, key, value, object } = action.payload;
			if (object !== undefined) {
				state.data[index][key][object] = value;
			} else {
				state.data[index][key] = value;
			}
			const { getTotal, operation, data } = state;
			state.data = operation(data);
			state.total = getTotal(data);
		},
	},
	extraReducers: (builder) => {
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
			.addCase(consume.get.fulfilled, (state, action) => {
				if (action.payload !== null) {
					const { response } = action.payload;
					state.status = response !== undefined ? "success" : "error";
					const { record } = response;
					if (record.type.includes("exists")) {
						const { data, total } = response;
						state.data = data;
						state.total = total;
						state.record = record;
					} else {
						state.record.register = record.register;
						state.record.type = record.type;
						state.status = "working";
					}
				}
			})
			.addCase(consume.post.fulfilled, (state, action) => {
				if (action.payload !== null) {
					const { response } = action.payload;
					state.status = response !== -1 && response !== null ? "success" : "failed";
				} else state.status = "failed";
			})
			.addCase(consume.patch.fulfilled, (state, action) => {
				if (action.payload !== null) {
					const { response } = action.payload;
					state.status = response !== -1 && response !== null ? "success" : "failed";
				} else state.status = "failed";
			});
	},
});

export const { addRow, removeRow, update } = slice.actions;
export const getState = (state: RootState) => state.supplementaryWorks;
export default slice.reducer;
