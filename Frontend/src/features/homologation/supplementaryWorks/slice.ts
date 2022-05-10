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
		/**
		 * It adds a new row to the data array, then runs the operation function on the data array, and then
		 * sets the total to the result of the getTotal function
		 * @param state - The state object that is passed to the component.
		 */
		addRow(state) {
			const { template, getTotal, operation, data } = state;
			const id = data.length + 1;
			state.data.push(template(id));
			state.data = operation(data);
			state.total = getTotal(data);
		},
		/**
		 * It removes the last row from the data array, then it runs the operation function on the data
		 * array, and then it sets the total to the result of the getTotal function
		 * @param state - The state object that is passed to the component.
		 */
		removeRow(state) {
			const { data, getTotal, operation } = state;
			if (data.length > 1) {
				state.data.pop();
				state.data = operation(data);
				state.total = getTotal(data);
			}
		},
		/**
		 * It updates the state of the data in the table
		 * @param state - The state of the reducer
		 * @param action - PayloadAction<any>
		 */
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
		isLoading(state) {
			state.status = "loading";
		},
	},
	extraReducers: (builder) => {
		/* A way to add extra reducers to the reducer. */
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
					state.status = "complete";
					const { response } = action.payload;
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

export const { addRow, removeRow, update, isLoading } = slice.actions;
export const getState = (state: RootState) => state.supplementaryWorks;
export default slice.reducer;
