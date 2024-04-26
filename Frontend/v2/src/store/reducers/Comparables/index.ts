/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/index";
import { reducers, initialState } from "./actions";
const slice = createSlice({
	name: "Comparables",
	initialState,
	reducers,
});
export const { setComparables, setDefaultComparables } = slice.actions;
export const getComparables = (state: RootState) => state.Comparables;
export default slice.reducer;
