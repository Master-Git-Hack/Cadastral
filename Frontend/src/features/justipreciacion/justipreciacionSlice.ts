/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { request } from "../../api/request";
import { initialState, State } from "../../types/justipreciacion/storage";

const name = "Justipreaciacion";
export const consumeJusti = request(name);

export const slice = createSlice({
	name,
	initialState,
	reducers: {
		terreno(state: State, action: PayloadAction<any>) {},
		renta(state: State, action: PayloadAction<any>) {},
		obrasComplementarias(state: State, action: PayloadAction<any>) {},
	},
	extraReducers: (builder) => {
		//get method
		builder
			.addCase(consumeJusti.get.rejected, (state: State) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeJusti.get.pending, (state: State) => {
				state.status = "loading";
			})
			.addCase(consumeJusti.get.fulfilled, (state: State, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
				state.status = status;
				state.message = message;
				if (status.includes("success")) {
					switch (operation) {
						case "JUSTIPRECIACION/Registro":
							state.registro = data;
							break;
						default:
							break;
					}
				}
			});
		//post method
		builder
			.addCase(consumeJusti.post.rejected, (state: State) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeJusti.post.pending, (state: State) => {
				state.status = "loading";
			})
			.addCase(consumeJusti.post.fulfilled, (state: State, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
				state.status = status;
				state.message = message;

				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/":
							break;
						default:
							break;
					}
				}
			});

		//patch method
		builder
			.addCase(consumeJusti.patch.rejected, (state: State) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeJusti.patch.pending, (state: State) => {
				state.status = "loading";
			})
			.addCase(consumeJusti.patch.fulfilled, (state: State, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
				state.status = status;
				state.message = message;
				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/":
							break;
						default:
							break;
					}
				}
			});
	},
});

export const {} = slice.actions;
export const getJustipreciacion = (state: RootState) => state.justipreciacion;
export default slice.reducer;
