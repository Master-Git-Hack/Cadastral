/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { consume } from "../../api/api.config";
import { Storage } from "../../types/handleReports/storage";
import { initialStateReports, recommendedProperties } from "../../types/handleReports/state";

/* Creating the initial state of the store. */
const initialState: Storage = {
	status: "working",
	filename: `report_${new Date().toISOString()}.pdf`,
	reports: [initialStateReports],
	document: "",
};

/* Creating a slice of the store. */
export const slice = createSlice({
	name: "reports",
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
				...initialStateReports,
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
	/* A way to add extra reducers to the reducer. */
	extraReducers: (builder) => {
		builder
			.addCase(getReport.fulfilled, (state, action) => {
				const { file, id } = action.payload;
				if (file !== undefined && id !== undefined) {
					state.reports[id].document = URL.createObjectURL(file);
					state.reports[id].status = "complete";
				}
			})
			.addCase(getReportsJoined.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getReportsJoined.fulfilled, (state, action) => {
				const response = action.payload;
				if (response !== undefined) {
					state.document = response;
					state.status = "complete";
				}
			});
	},
});
export const { addDocument, removeDocument, handleProperties, handleMoreProperties, changeStatus } =
	slice.actions;
export const getState = (state: RootState) => state.reports;

/* Creating a thunk that will be used to get the reports. */
export const getReport = createAsyncThunk(
	"reports/GetReports",
	async (report: any, { rejectWithValue }) => {
		const { id, limits, collection, year, zoom, watermark, filename, moreProperties } =
			report.report;
		report.dispatch(changeStatus({ id: id - 1, status: "loading" }));
		const url = `/REPORTS/APPRAISAL/GET/${filename}`;
		const payload = {
			id,
			limits,
			collection,
			year: year.toString().slice(2, 4),
			zoom,
			watermark,
			moreProperties,
		};
		try {
			const response = await consume("blob").post(url, payload);
			return {
				id: id - 1,
				file: response.data,
			};
		} catch (err: any) {
			return rejectWithValue(err.response.data);
		}
	},
);

/* Creating a thunk that will be used to get the reports joined. */
export const getReportsJoined = createAsyncThunk(
	"reports/getReportsJoined",
	async (state: any, { rejectWithValue }) => {
		const url = `/REPORTS/APPRAISAL/MERGE/${new Date().toISOString()}`;
		const payload = {
			files: [] as Array<string>,
		};
		state.reports.map((item: any) => {
			const filename = item.filename.split(".pdf")[0];
			payload.files.push(filename);
			return item;
		});
		try {
			const response = await consume("blob").post(url, payload);
			return response.data;
		} catch (err: any) {
			return rejectWithValue(err.response.data);
		}
	},
);

export default slice.reducer;
