/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { request } from "../../api/request";
import { initialState } from "../../types/justipreciacion/handler";
import { Storage } from "../../types/justipreciacion/storage";

const name = "Justipreaciacion";
export const consumeJusti = request(name);

export const slice = createSlice({
	name,
	initialState,
	reducers: {
		setID: (state: Storage, action: PayloadAction<number>) => {
			state.id = action.payload;
		},
		setInitialState: (state: Storage, action: PayloadAction<any>) => {
			const { type, sp1_factor, sp1_superficie, cna_edad, cna_superficie } = action.payload;
			if (type.includes("TERRENO")) {
				state.sp1_factor = sp1_factor || 1;
				state.sp1_superficie = sp1_superficie || 1;
			} else {
				state.cna_edad = cna_edad || 1;
				state.cna_superficie = cna_superficie || 1;
			}
		},
		terreno: (state: Storage, action: PayloadAction<number>) => {
			state.sp1_vu = action.payload || 1;
		},
		renta: (state: Storage, action: PayloadAction<number>) => {
			state.comparativo_mercado = action.payload || 1;
		},
		obrasComplementarias: (state: Storage, action: PayloadAction<number>) => {
			state.valor_total_obras_comp = action.payload || 1;
		},
	},
	extraReducers: (builder) => {
		//get method
		builder
			.addCase(consumeJusti.get.rejected, (state: Storage) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeJusti.get.pending, (state: Storage) => {
				state.status = "loading";
			})
			.addCase(consumeJusti.get.fulfilled, (state: Storage, action: PayloadAction<any>) => {
				if (action.payload?.status !== undefined) {
					const { status, operation, message, data } = action.payload;
					state.status = status;
					state.message = message;
					if (status.includes("success")) {
						switch (operation) {
							case "JUSTIPRECIACION/Registro":
								state.registro = data;
								break;
						}
					}
				} else {
					state.status = "fail";
					state.message =
						"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
				}
			});
		//post method
		builder
			.addCase(consumeJusti.post.rejected, (state: Storage) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeJusti.post.pending, (state: Storage) => {
				state.status = "loading";
			})
			.addCase(consumeJusti.post.fulfilled, (state: Storage, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
				state.status = status;
				state.message = message;

				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/":
							break;
					}
				}
			});

		//patch method
		builder
			.addCase(consumeJusti.patch.rejected, (state: Storage) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeJusti.patch.pending, (state: Storage) => {
				state.status = "loading";
			})
			.addCase(consumeJusti.patch.fulfilled, (state: Storage, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
				state.status = status;
				state.message = message;
				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/":
							break;
					}
				}
			});
	},
});

export const { setID, setInitialState, terreno, renta, obrasComplementarias } = slice.actions;
export const getJustipreciacion = (state: RootState) => state.justipreciacion;
export default slice.reducer;
