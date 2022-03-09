/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { StorageProps, TransactionProps } from "../../types/homologation/storage";
import { ageTemplate } from "../../types/homologation/factors/age";
import { buildingTemplate } from "../../types/homologation/factors/building";
import { classificationTemplate } from "../../types/homologation/factors/classification";
import { comparisonTemplate } from "../../types/homologation/factors/comparison";
import { levelTemplate } from "../../types/homologation/factors/level";
import { projectTemplate } from "../../types/homologation/factors/project";
import { qualityTemplate } from "../../types/homologation/factors/quality";
import { surfaceTemplate } from "../../types/homologation/factors/surface";
import { topographyData, topographyTemplate } from "../../types/homologation/factors/topography";
import { typeFormData, typeFormTemplate } from "../../types/homologation/factors/typeForm";
import { usageTemplate } from "../../types/homologation/factors/usage";
import { LocationTemplate } from "../../types/homologation/factors/location";
import { ZoneTemplate } from "../../types/homologation/factors/zone";
import { areasTemplate } from "../../types/homologation/homologation/areas";
import { salesCostTemplate } from "../../types/homologation/homologation/salesCost";
import { weightingPercentageTemplate } from "../../types/homologation/homologation/weightingPercentage";

import {
	addValueToUsedFactors,
	removeValueFromUsedFactors,
	addValueToHomologations,
	removeValueFromHomologations,
} from "../../utils/utils";

const parameters = new URLSearchParams(window.location.search);
const id = parameters.get("id");
const typeUsage = parameters.get("tipo");
const type = typeUsage ? typeUsage.toString().toUpperCase() : "TERRENO";
const initialState: StorageProps = {
	id: id ? Number(id) : 0,
	type,
	status: "working",
	factors: {
		ages: { ...ageTemplate, isUsed: type === "TERRENO" ? false : true },
		buildings: buildingTemplate,
		classification: classificationTemplate,
		comparison: comparisonTemplate,
		level: levelTemplate,
		location: LocationTemplate,
		project: projectTemplate,
		quality: qualityTemplate,
		surface: surfaceTemplate,
		topography: {
			...topographyTemplate,
			data: [topographyData(1, type)],
		},
		typeForm: {
			...typeFormTemplate,
			data: [typeFormData(1, type)],
		},
		usage: usageTemplate,
		zone: ZoneTemplate,
	},
	homologation: {
		areas: areasTemplate(type),
		salesCosts: salesCostTemplate,
		weightingPercentage: weightingPercentageTemplate,
	},
};

export const searchForExistence = createAsyncThunk(
	"homologation/searchForExistence",
	async (id: number) => {
		const response = await fetch(`http://localhost:3001/homologations/${id}`);
		const data = await response.json();
		return data;
	},
);
export const slice = createSlice({
	name: "homologation",
	initialState,
	reducers: {
		setFactors(state, action: PayloadAction<TransactionProps>) {
			const { itemName, subItemName, value } = action.payload;
			if (itemName !== undefined && value !== undefined && subItemName !== undefined)
				state.factors[itemName][subItemName] = value;
		},
		setFactorsSubject(state, action: PayloadAction<TransactionProps>) {
			const { itemName, value } = action.payload;
			if (itemName !== undefined && value !== undefined)
				state.factors[itemName].subject = value;
		},
		setFactorsData(state, action: PayloadAction<TransactionProps>) {
			const { itemID, itemName, value } = action.payload;
			if (itemName !== undefined && value !== undefined && itemID !== undefined)
				state.factors[itemName].data[itemID] = value;
		},
		setLocationZone(state, action: PayloadAction<TransactionProps>) {
			const { itemName, itemID, subItemName, value } = action.payload;
			if (
				itemName !== undefined &&
				value !== undefined &&
				itemID !== undefined &&
				subItemName !== undefined
			)
				state.factors[itemName].data[itemID][subItemName] = value;
		},
		addDataRow(state) {
			state.factors = addValueToUsedFactors(state.factors);
			state.homologation = addValueToHomologations(state.homologation);
		},
		removeDataRow(state) {
			state.factors = removeValueFromUsedFactors(state.factors);
			state.homologation = removeValueFromHomologations(state.homologation);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchForExistence.pending, (state) => {
				state.status = "loading";
			})
			.addCase(searchForExistence.fulfilled, (state, action) => {
				state.status = "exists";
			});
	},
});
export const selector = (state: RootState) => state.homologation;
export const {
	setFactors,
	setFactorsSubject,
	setFactorsData,
	addDataRow,
	removeDataRow,
	setLocationZone,
} = slice.actions;

export default slice.reducer;
