/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { request } from "../../api/request";
import { initialState } from "../../types/justipreciacion/obrasComplementarias/store";

const name = "SupplementaryWorks";
export const consumeOC = request(name);

export const slice = createSlice({
	name,
	initialState,
	reducers: {
		
	},
	extraReducers: (builder) => {
		//get method
		builder
			.addCase(consumeOC.get.rejected, (state) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeOC.get.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consumeOC.get.fulfilled, (state, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
				state.status = status;
				state.message = message;

				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/OC":
							console.log(data);
							break;
						default:
							break;
					}
				}
			});
		//post method
		builder
			.addCase(consumeOC.post.rejected, (state) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeOC.post.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consumeOC.post.fulfilled, (state, action: PayloadAction<any>) => {
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
			.addCase(consumeOC.patch.rejected, (state) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeOC.patch.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consumeOC.patch.fulfilled, (state, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
				state.status = status;
				state.message = message;
				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/ObrasComplementarias":
							break;
						default:
							break;
					}
				}
			});
	},
});

export const {
	
} = slice.actions;
export const getOC = (state: RootState) => state.obrasComplementarias;
export default slice.reducer;
