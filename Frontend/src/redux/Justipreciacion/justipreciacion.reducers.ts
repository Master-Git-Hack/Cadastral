/** @format */

import { PayloadAction } from "@reduxjs/toolkit";
import { JustipreciacionState, PayloadByKey } from "./justipreciacion.interfaces";
export const reducers = {
	load: (state: JustipreciacionState, { payload }: PayloadAction<JustipreciacionState>) => {
		if (payload !== undefined) {
			return payload;
		}
	},
	add: (
		state: JustipreciacionState,
		{ payload: { key, value } }: PayloadAction<PayloadByKey>,
	) => {
		if (value !== undefined) {
			state[key] = value;
		}
	},
	patch: (
		state: JustipreciacionState,
		{ payload: { key, value } }: PayloadAction<PayloadByKey>,
	) => {
		if (value !== undefined && key in state) {
			state[key] = value;
		}
	},
	loadTerreno: (
		state: JustipreciacionState,
		{ payload: { sp1_superficie, sp1_factor } }: PayloadAction<JustipreciacionState>,
	) => {
		if (sp1_superficie !== undefined && sp1_factor !== undefined) {
			return { ...state, sp1_superficie, sp1_factor };
		}
	},
	delete: (state: JustipreciacionState, { payload: { key } }: PayloadAction<PayloadByKey>) => {
		if (key !== undefined && key in state) {
			delete state[key];
		}
	},
};
