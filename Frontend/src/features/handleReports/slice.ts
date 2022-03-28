/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { consume } from "../../api/api.config";
import { Storage } from "../../types/handleReports/storage";
import { initialStateReports, recommendedProperties } from "../../types/handleReports/state";
import { stat } from "fs/promises";

const initialState: Storage = {
	status: "working",
	filename: `report_${new Date().toISOString()}.pdf`,
	reports: [initialStateReports],
	document: "",
};

export const slice = createSlice({
	name: "reports",
	initialState,
	reducers: {
		addDocument(state) {
			const id = state.reports.length + 1;
			state.reports[id - 2].showHide = false;
			state.reports.push({ ...initialStateReports, id, showHide: false });
		},
		removeDocument(state) {
			if (state.reports.length > 1) {
				state.reports.pop();
			}
		},
		changeStatus(state, action: PayloadAction<any>) {
			const { id, status } = action.payload;
			state.reports[id].status = status;
		},
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
					state.status="complete"
				}
			});
	},
});
export const { addDocument, removeDocument, handleProperties, handleMoreProperties, changeStatus } =
	slice.actions;
export const selector = (state: RootState) => state.reports;

export const getReport = createAsyncThunk(
	"reports/GetReports",
	async (report: any, { rejectWithValue }) => {
		const { id, limits, collection, year, zoom, watermark, filename, moreProperties } =
			report.report;
		report.dispatch(changeStatus({ id: id - 1, status: "loading" }));
		const url = `APPRAISAL/Reports/${filename}`;
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

export const getReportsJoined = createAsyncThunk(
	"reports/getReportsJoined",
	async (state: any, { rejectWithValue }) => {
		const url = "APPRAISAL/Reports/MERGE";
		const payload = {
			files: [] as Array<string>,
		};
		state.reports.map((item: any) => {
			payload.files.push(item.filename);
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
