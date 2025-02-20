/** @format */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { reducers } from "./justipreciacion.reducer";
import { api } from "../../api";
import { StateProps, initialState } from "./justipreciacion.interface";
import { RootState } from "../store";

const name = "Justipreciacion";
export const consumeJustipreciacion = api(name);
export const { get, post, patch } = consumeJustipreciacion;
export const slice = createSlice({
	name,
	initialState,
	reducers,
	extraReducers: (builder) => {
		builder
			.addCase(get.rejected, (state: StateProps) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(get.pending, (state: StateProps) => {
				state.status = "loading";
			})
			.addCase(
				get.fulfilled,
				(
					state: StateProps,
					{ payload: { status, operation, message, data } }: PayloadAction<any>,
				) => {
					state.status = status;
					state.message = message;
					if (status !== undefined) {
						if (status.includes("success")) {
							switch (operation) {
								case "JUSTIPRECIACION/Registro":
									state.registro = data;
									break;
							}
						}
					}
				},
			);
		//post method
		builder
			.addCase(post.rejected, (state: StateProps) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(post.pending, (state: StateProps) => {
				state.status = "loading";
			})
			.addCase(
				post.fulfilled,
				(
					state: StateProps,
					{ payload: { status, operation, message, data } }: PayloadAction<any>,
				) => {
					state.status = status;
					state.message = message;

					if (status.includes("success")) {
						switch (operation) {
							case "HOMOLOGACION/":
								break;
						}
					}
				},
			);

		//patch method
		builder
			.addCase(patch.rejected, (state: StateProps) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(patch.pending, (state: StateProps) => {
				state.status = "loading";
			})
			.addCase(
				patch.fulfilled,
				(
					state: StateProps,
					{ payload: { status, operation, message, data } }: PayloadAction<any>,
				) => {
					state.status = status;
					state.message = message;
					if (status.includes("success")) {
						switch (operation) {
							case "HOMOLOGACION/":
								break;
						}
					}
				},
			);
	},
});
export const { setID, setInitialState, terreno, renta, obrasComplementarias } = slice.actions;
export const getJustipreciacion = (state: RootState) => state.Justipreciacion;
export default slice.reducer;
