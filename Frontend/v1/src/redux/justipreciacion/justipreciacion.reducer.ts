/** @format */

import { PayloadAction } from "@reduxjs/toolkit";
import { StateProps } from "./justipreciacion.interface";

/** @format */
export const reducers = {
	setID: (state: StateProps, { payload }: PayloadAction<number>) => {
		state.id = payload;
	},
	setInitialState: (
		state: StateProps,
		{
			payload: { type, sp1_factor, sp1_superficie, cna_edad, cna_superficie },
		}: PayloadAction<any>,
	) => {
		if (type.includes("TERRENO")) {
			state.sp1_factor = sp1_factor ?? 1;
			state.sp1_superficie = sp1_superficie ?? 1;
		} else {
			state.cna_edad = cna_edad ?? 1;
			state.cna_superficie = cna_superficie ?? 1;
		}
	},
	terreno: (state: StateProps, { payload }: PayloadAction<number>) => {
		state.sp1_vu = payload ?? 1;
	},
	renta: (state: StateProps, { payload }: PayloadAction<number>) => {
		state.comparativo_mercado = payload ?? 1;
	},
	obrasComplementarias: (state: StateProps, { payload }: PayloadAction<number>) => {
		state.valor_total_obras_comp = payload ?? 1;
	},
};
