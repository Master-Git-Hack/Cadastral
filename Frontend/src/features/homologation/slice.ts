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
import { resultsTemplate } from "../../types/homologation/factors/results";
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
	factorsResult,
	addValueToHomologations,
	removeValueFromHomologations,
	calculationLocationZone,
	addValueToLocationZone,
	removeValueToLocationZone,
} from "../../utils/utils";

const parameters = new URLSearchParams(window.location.search);
const id = parameters.get("id");
const typeUsage = parameters.get("tipo");
const type = typeUsage ? typeUsage.toString().toUpperCase() : "TERRENO";
const initialState: StorageProps = {
	id: id ? Number(id) : 0,
	type,
	status: "working",
	rowsCount: 1 as number,
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
		results: resultsTemplate,
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
			if (itemName !== undefined && value !== undefined) {
				state.factors[itemName].subject = value;
				state.factors[itemName].data.map((item: any) => {
					item.result =
						Number(state.factors[itemName].subject.value) / Number(item.value);

					return item;
				});
			}
		},
		setFactorsData(state, action: PayloadAction<TransactionProps>) {
			const { itemID, itemName, value } = action.payload;
			if (itemName !== undefined && value !== undefined && itemID !== undefined) {
				/*if(itemName !== "ages" && itemName !== "comparison")
				{
					const option = findOption(itemName,state.type,itemName ==="level" ? "type":"value",value)
					state.factors[itemName].data[itemID] = {
						id: itemID,
						...option,
						result:Number(state.factors[itemName].subject.value/option.value)
						
					};
				}
				else */
				state.factors[itemName].data[itemID] = value;
				state.factors.results.data = factorsResult(state.factors);
			}
		},
		setLocationZone(state, action: PayloadAction<TransactionProps>) {
			const { itemName, itemID, subItemName, value } = action.payload;
			if (
				itemName !== undefined &&
				value !== undefined &&
				itemID !== undefined &&
				subItemName !== undefined
			) {
				state.factors[itemName].data[itemID][subItemName] = value;
				state.factors[itemName].results = calculationLocationZone(
					state.factors[itemName].data,
				);
				state.factors.results.data = factorsResult(state.factors);
			}
		},
		setLocationZoneResults(state, action: PayloadAction<TransactionProps>) {
			const { itemName, itemID, value } = action.payload;
			if (itemName !== undefined && value !== undefined && itemID !== undefined)
				state.factors[itemName].results[itemID].value = value;
		},
		addDataRowLocationZone(state, action: PayloadAction<TransactionProps>) {
			const { itemName } = action.payload;
			if (itemName !== undefined) {
				state.factors[itemName].data = addValueToLocationZone(state.factors[itemName].data);
			}
		},
		removeDataRowLocationZone(state, action: PayloadAction<TransactionProps>) {
			const { itemName } = action.payload;
			if (itemName !== undefined) {
				state.factors[itemName].data = removeValueToLocationZone(
					state.factors[itemName].data,
				);
			}
		},
		addDataRow(state) {
			state.factors = addValueToUsedFactors(state.factors);
			state.homologation = addValueToHomologations(state.homologation);
			state.rowsCount++;
		},
		removeDataRow(state) {
			state.factors = removeValueFromUsedFactors(state.factors);
			state.homologation = removeValueFromHomologations(state.homologation);
			if (state.rowsCount > 1) state.rowsCount--;
		},
		setHomologation(state, action: PayloadAction<TransactionProps>) {
			const { itemName, itemID, value } = action.payload;
			if (itemName !== undefined && value !== undefined && itemID !== undefined) {
				state.homologation[itemName].data[itemID].value = value;
				state.homologation.salesCosts.data[itemID].unitaryCost =
					state.homologation.salesCosts.data[itemID].value /
					state.homologation.areas.data[itemID].value;
				if (itemName === "areas") {
					if (state.type === "TERRENO") {
						state.homologation.areas.averageLotArea =
							state.homologation.areas.data.reduce(
								(previous: number, current: any) =>
									previous + Number(current.value),
								0,
							) / state.homologation.areas.data.length;
						state.factors.surface.data.map((item: any, index: number) => {
							item.value =
								(state.homologation.areas.data[index].value /
									state.homologation.areas.averageLotArea) **
								(1 / 12);
							return item;
						});
					} else {
						state.factors.surface.data.map((item: any, index: number) => {
							item.value =
								(state.homologation.areas.data[index].value /
									state.homologation.areas.subject) **
								(1 / 8);
							return item;
						});
					}
				}
			}
		},
		setHomologationAreaSubject(state, action: PayloadAction<TransactionProps>) {
			const { value } = action.payload;
			if (value !== undefined) {
				state.homologation.areas.subject = value;
			}
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
	addDataRowLocationZone,
	removeDataRowLocationZone,
	setHomologation,
	setHomologationAreaSubject,
	setLocationZoneResults,
} = slice.actions;

export default slice.reducer;
