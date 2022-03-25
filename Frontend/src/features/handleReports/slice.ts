/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { consume } from "../../api/api.config";
import { Storage } from "../../types/handleReports/storage";
import { initalStateReports } from "../../types/handleReports/state";
import blankDocument from "../../assets/documents/blank.pdf";

const initialState: Storage = {
	status: "working",
	filename: `report_${new Date().toISOString()}.pdf`,
	reports: [initalStateReports],
	document: "",
};

export const slice = createSlice({
	name: "reports",
	initialState,
	reducers: {
		addDocument(state) {},
		removeDocument(state) {},
		handleProperties(state, actions: PayloadAction<any>) {
            const {itemName,itemID,value}= actions.payload;
            if(itemName !== undefined && itemID !== undefined && value !== undefined){
                state.reports[itemID][itemName]=value
            }
        },
	},
	extraReducers: (builder) => {
		builder
			.addCase(getReport.pending, (state) => {
				//state.status = "loading",
			})
			.addCase(getReport.fulfilled, (state, action) => {
				//state.status = "complete",
				const { response, id } = action.payload;
				//state.documents[id].document = URL.createObjectURL(response)
			});
	},
});
export const {handleProperties} = slice.actions;
export const selector = (state: RootState) => state.reports;

export const getReport = createAsyncThunk(
	"reports/GetReports",
	async (state: any, { rejectWithValue }) => {
		const url = `/Reports/name`;
		const payload = {};
		try {
			const response = await consume("blob").post(url, payload);
			return response.data;
		} catch (err: any) {
			return rejectWithValue(err.response.data);
		}
	},
);
export default slice.reducer;
