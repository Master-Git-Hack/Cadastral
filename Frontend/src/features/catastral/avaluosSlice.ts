/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { request } from "../../api/request";
import {
	recommendedProperties,
	initialState as isReports,
} from "../../types/catastral/avaluos/storage";
import { initialState } from "../../types/catastral/avaluos/handler";
const name = "avaluosCatastrales";
export const consumeReport = request(name);

export const slice = createSlice({
	name,
	initialState,
	reducers: {
		/**
		 * It adds a new report to the reports array
		 * @param state - The state object
		 */
		addDocument(state) {
			const id = state.reports.length + 1;
			state.reports[id - 2].showHide = false;
			state.reports.push({
				...isReports,
				id,
				showHide: false,
				filename: `report_${new Date().toISOString()}_temp.pdf`,
			});
		},
		/**
		 * If the reports array has more than one item, remove the last item
		 * @param state - The state object that is passed to the mutation.
		 */
		removeDocument(state) {
			if (state.reports.length > 1) {
				state.reports.pop();
			}
		},
		/**
		 * It takes the state and an action as parameters, and then it changes the status of the report with
		 * the id that was passed in the action
		 * @param state - The current state of the reducer.
		 * @param action - PayloadAction<any>
		 */
		changeStatus(state, action: PayloadAction<any>) {
			const { id, status } = action.payload;
			state.reports[id].status = status;
		},
		/**
		 * It takes the payload from the action and uses it to update the state
		 * @param state - The state of the store.
		 * @param actions - PayloadAction<any>
		 */
		handleProperties(state, actions: PayloadAction<any>) {
			const { itemName, itemID, value } = actions.payload;
			if (itemName !== undefined && itemID !== undefined && value !== undefined) {
				state.reports[itemID][itemName] = value;
			}
			if (
				itemName === "recommendedProperties" &&
				state.reports[itemID].recommendedProperties
			) {
				state.reports[itemID].zoom = Number(recommendedProperties.zoom);
				state.reports[itemID].moreProperties = recommendedProperties.moreProperties as any;
				state.reports[itemID].showProperties = true;
			}
		},
		/**
		 * It takes the payload from the action, and then uses the itemName, itemID, and value to update the
		 * moreProperties object in the reports object
		 * @param state - The state of the store.
		 * @param actions - PayloadAction<any>
		 */
		handleMoreProperties(state, actions: PayloadAction<any>) {
			const { itemName, itemID, value } = actions.payload;
			if (itemName !== undefined && itemID !== undefined && value !== undefined) {
				const { moreProperties } = state.reports[itemID];
				state.reports[itemID].moreProperties = {
					...moreProperties,
					[itemName]: value,
				};
			}
		},
	},
	extraReducers: (builder) => {
		//get method
		builder
			.addCase(consumeReport.get.rejected, (state) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeReport.get.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consumeReport.get.fulfilled, (state, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
				state.status = status;
				state.message = message;
				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/IndicadoresMunicipales":
							break;
						case "HOMOLOGACION/Justipreciacion":
							break;
						case "HOMOLOGACION":
							break;
					}
				}
			});
		//post method
		builder
			.addCase(consumeReport.post.rejected, (state) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeReport.post.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consumeReport.post.fulfilled, (state, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
				state.status = status;
				state.message = message;
				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/IndicadoresMunicipales":
							break;
						case "HOMOLOGACION/Justipreciacion":
							break;
						case "HOMOLOGACION":
							break;
					}
				}
			});

		//patch method
		builder
			.addCase(consumeReport.patch.rejected, (state) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(consumeReport.patch.pending, (state) => {
				state.status = "loading";
			})
			.addCase(consumeReport.patch.fulfilled, (state, action: PayloadAction<any>) => {
				const { status, operation, message, data } = action.payload;
				state.status = status;
				state.message = message;
				if (status.includes("success")) {
					switch (operation) {
						case "HOMOLOGACION/IndicadoresMunicipales":
							break;
						case "HOMOLOGACION/Justipreciacion":
							break;
						case "HOMOLOGACION":
							break;
					}
				}
			});
	},
});

export const { addDocument, removeDocument, handleProperties, handleMoreProperties, changeStatus } =
	slice.actions;
export const getAvaluos = (state: RootState) => state.avaluosCatastrales;
export default slice.reducer;
