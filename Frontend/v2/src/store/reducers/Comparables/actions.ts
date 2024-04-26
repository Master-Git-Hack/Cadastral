/** @format */

import { ComparablesState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
export const initialState: ComparablesState = { ids:[],record: [] };
export const reducers = {
    setComparables: (state: ComparablesState, { payload }: PayloadAction<any>) => {
		const {key,value} = payload;
		state[key] = value;
	},
	setDefaultComparables: (state: ComparablesState) => {
		state.record = [];
	},
};
