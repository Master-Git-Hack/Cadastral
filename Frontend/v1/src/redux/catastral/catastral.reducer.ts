/** @format */

import { PayloadAction } from "@reduxjs/toolkit";
import {
	StateProps,
	reportsTemplate,
	recommendedProperties,
	initialProperties,
} from "./catastral.interface";

export const reducers = {
	/**
	 * It adds a new report to the reports array
	 * @param state - The state object
	 */
	addDocument: (state: StateProps) => {
		const { reports } = state;
		const { length } = reports;
		reports.push(reportsTemplate(length + 1));
	},
	/**
	 * If the reports array has more than one item, remove the last item
	 * @param state - The state object that is passed to the mutation.
	 */
	removeDocument: (state: StateProps) => {
		const { reports } = state;
		const { length } = reports;
		length > 1 && reports.pop();
	},
	setLimits: (state: StateProps, { payload: { id, key, value } }: PayloadAction<any>) => {
		if (id !== undefined && key !== undefined && value !== undefined) {
			const { reports } = state;
			const { limits } = reports[id];
			limits[key] = value;
		}
	},
	setLoading: (state: StateProps, { payload }: PayloadAction<number>) => {
		const { reports } = state;
		if (payload !== -1) reports[payload].status = "loading";
		else state.status = "loading";
	},
	setDocument: (
		state: StateProps,
		{ payload: { status, message, document, id } }: PayloadAction<any>,
	) => {
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
	setValues: (state: StateProps, { payload: { id, key, value } }: PayloadAction<any>) => {
		if (id !== undefined && key !== undefined && value !== undefined) {
			const { reports } = state;
			reports[id][key] = value;
		}
	},
	setDefaultProperties: (state: StateProps, { payload: { id, value } }: PayloadAction<any>) => {
		if (id !== undefined && value !== undefined) {
			const { reports } = state;
			const { zoom, moreProperties } = value ? recommendedProperties : initialProperties;

			reports[id].zoom = zoom;
			reports[id].moreProperties = moreProperties;
		}
	},
	setMoreProperties: (state: StateProps, { payload: { id, key, value } }: PayloadAction<any>) => {
		if (id !== undefined && key !== undefined && value !== undefined) {
			const { moreProperties } = state.reports[id];
			moreProperties[key] = value;
		}
	},
	setMargins: (state: StateProps, { payload: { id, key, value } }: PayloadAction<any>) => {
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
	changeStatus(state: StateProps, { payload: { id, status } }: PayloadAction<any>) {
		if (id !== undefined && status !== undefined) {
			const { reports } = state;
			reports[id].status = status;
		}
	},
	/**
	 * It takes the payload from the action and uses it to update the state
	 * @param state - The state of the store.
	 * @param actions - PayloadAction<any>
	 */
	handleProperties(
		state: StateProps,
		{ payload: { itemName, itemID, value } }: PayloadAction<any>,
	) {
		const { reports } = state;
		const { zoom, moreProperties } = recommendedProperties;
		if (itemName !== undefined && itemID !== undefined && value !== undefined) {
			reports[itemID][itemName] = value;
		}
		if (itemName === "recommendedProperties" && reports[itemID].recommendedProperties) {
			reports[itemID].zoom = zoom;
			reports[itemID].moreProperties = moreProperties;
			reports[itemID].showProperties = true;
		}
	},
	/**
	 * It takes the payload from the action, and then uses the itemName, itemID, and value to update the
	 * moreProperties object in the reports object
	 * @param state - The state of the store.
	 * @param actions - PayloadAction<any>
	 */
	handleMoreProperties(
		state: StateProps,
		{ payload: { itemName, itemID, value } }: PayloadAction<any>,
	) {
		if (itemName !== undefined && itemID !== undefined && value !== undefined) {
			const { moreProperties } = state.reports[itemID];
			moreProperties[itemName] = value;
		}
	},
};
