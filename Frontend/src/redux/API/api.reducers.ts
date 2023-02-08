/** @format */

import { PayloadAction } from "@reduxjs/toolkit";
import { APIState, updateStateByKeys, updateStateBySubKeys } from "./api.interfaces";
import { initialState } from "./api.initialState";
export const reducers = {
	default: (state: APIState) => {
		state = initialState;
	},
	updateStateByKeys: (
		state: APIState,
		{ payload: { key, value } }: PayloadAction<updateStateByKeys>,
	) => {
		if (key !== undefined && value !== undefined) state[key] = value;
	},
	updateStateBySubKeys: (
		state: APIState,
		{ payload: { key, parentKey, value } }: PayloadAction<updateStateBySubKeys>,
	) => {
		if (parentKey !== undefined && key !== undefined && value !== undefined)
			state[parentKey][key] = value;
	},
	setState: (state: APIState, { payload }: PayloadAction<APIState>) => {
		if (payload !== undefined) state = payload;
	},
};
