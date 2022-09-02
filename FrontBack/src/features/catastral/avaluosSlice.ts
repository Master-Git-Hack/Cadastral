/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { request } from "../../api/request";
import {
	initialProperties,
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
		addDocument: (state) => {
			const { reports } = state;
			reports.length < 15 &&
				reports.push({
					...isReports,
					id: state.reports.length + 1,
					filename: `report_${new Date().toISOString()}_temp.pdf`,
				});
		},
		/**
		 * If the reports array has more than one item, remove the last item
		 * @param state - The state object that is passed to the mutation.
		 */
		removeDocument: (state) => {
			state.reports.length > 1 && state.reports.pop();
		},
		setLimits: (state, action: PayloadAction<any>) => {
			const { id, key, value } = action.payload;
			if (id !== undefined && key !== undefined && value !== undefined) {
				const { limits } = state.reports[id];
				limits[key] = value;
			}
		},
		setLoading: (state, action: PayloadAction<number>) => {
			const id = action.payload;
			const { reports } = state;
			if (id !== -1) reports[id].status = "loading";
			else state.status = "loading";
		},
		setDocument: (state, action: PayloadAction<any>) => {
			const { status, message, document, id } = action.payload;
			const { reports } = state;
			if (id !== undefined && status !== undefined) {
				if (status.includes("fail") && message !== undefined) {
					reports[id].status = status;
					reports[id].message = message;
				}
				if (status.includes("success") && document !== undefined) {
					reports[id].document = document;
					reports[id].status = status;
				}
			}
		},
		setValues: (state, action: PayloadAction<any>) => {
			const { id, key, value } = action.payload;
			if (id !== undefined && key !== undefined && value !== undefined) {
				const { reports } = state;
				reports[id][key] = value;
			}
		},
		setDefaultProperties: (state, action: PayloadAction<any>) => {
			const { id, value } = action.payload;
			if (id !== undefined && value !== undefined) {
				const { reports } = state;
				const { zoom, moreProperties } = value ? recommendedProperties : initialProperties;

				reports[id].zoom = zoom;
				reports[id].moreProperties = moreProperties;
			}
		},
		setMoreProperties: (state, action: PayloadAction<any>) => {
			const { id, key, value } = action.payload;
			if (id !== undefined && key !== undefined && value !== undefined) {
				const { moreProperties } = state.reports[id];
				moreProperties[key] = value;
			}
		},
		setMargins: (state, action: PayloadAction<any>) => {
			const { id, key, value } = action.payload;
			if (id !== undefined && key !== undefined && value !== undefined) {
				const { margins } = state.reports[id].moreProperties;
				margins[key] = value <= 20 ? value : 20;
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
			const { reports } = state;
			reports[id].status = status;
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
	},
});

export const {
	addDocument,
	removeDocument,
	setLimits,
	setValues,
	setDefaultProperties,
	setMoreProperties,
	setMargins,
	setDocument,
	setLoading,
	handleProperties,
	handleMoreProperties,
	changeStatus,
} = slice.actions;
export const getAvaluos = (state: RootState) => state.avaluosCatastrales;
export default slice.reducer;
