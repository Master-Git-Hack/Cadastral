/** @format */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reducers } from "./comparable.reducer";
import { name, consume, initialState, StateProps } from "./comparables.interface";
import { RootState } from "../store";

export const consumeComparables = consume;
export const { get, post, patch } = consumeComparables;
export const slice = createSlice({
	name,
	initialState,
	reducers,
	extraReducers: (builder) => {
		//get method
		builder
			.addCase(get.rejected, (state: StateProps) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(get.pending, (state: StateProps) => {
				state.status = "loading";
			})
			.addCase(
				get.fulfilled,
				(
					state: StateProps,
					{ payload: { status, operation, message, data } }: PayloadAction<any>,
				) => {
					state.status = status;
					state.message = message;
					
				},
			);
	},
});
export const {
	addDocument,
	removeDocument,
	setLimits,
	setValues,
	setDefaultProperties,
	setMoreProperties,
	setMargins,
	setDocument,
	setLoading,
	handleProperties,
	handleMoreProperties,
	changeStatus,
} = slice.actions;
export const getComparables = (state: RootState) => state.Comparables;
export default slice.reducer;
