/** @format */

import { RootState } from "..";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { initialState } from "./initialState";
const slice = createSlice({
	name: "homologacion",
	initialState,
	reducers,
});
export const getState = ({ Homologacion }: RootState) => Homologacion;
export const { load } = slice.actions;
export default slice.reducer;
