/** @format */

import { RootState } from "..";
import { createSlice } from "@reduxjs/toolkit";
import { APIState } from "./api.interfaces";
import { reducers } from "./api.reducers";
import { initialState } from "./api.initialState";
import { api } from "../../api/";

export const consume = api("API");

export const slice = createSlice({
	name: "API",
	initialState,
	reducers,
});
export const getAPI = ({ API }: RootState) => API;
export const { updateStateByKeys, updateStateBySubKeys } = slice.actions;
export default slice.reducer;
