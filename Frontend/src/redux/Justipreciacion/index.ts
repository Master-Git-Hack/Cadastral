/** @format */

import { RootState } from "..";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { initialState } from "./initialState";
const slice = createSlice({
	name: "justipreciacion",
	initialState,
	reducers,
});
export const getState = ({ Justipreciacion }: RootState) => Justipreciacion;
export const { load, loadTerreno, add, patch } = slice.actions;
export default slice.reducer;
