/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { StorageProps, TransactionProps } from "../../types/homologation/storage";
import { ageTemplate } from "../../types/homologation/factors/age";
import { buildingTemplate } from "../../types/homologation/factors/building";
import { classificationTemplate } from "../../types/homologation/factors/classification";
import { commercialTemplate } from "../../types/homologation/factors/commercial";
import { levelTemplate } from "../../types/homologation/factors/level";
import { projectTemplate } from "../../types/homologation/factors/project";
import { qualityTemplate } from "../../types/homologation/factors/quality";
import { resultsTemplate } from "../../types/homologation/factors/results";
import { surfaceTemplate } from "../../types/homologation/factors/surface";
import { topographyData, topographyTemplate } from "../../types/homologation/factors/topography";
import { typeFormData, typeFormTemplate } from "../../types/homologation/factors/typeForm";
import { usageTemplate } from "../../types/homologation/factors/usage";
import { LocationTemplate } from "../../types/homologation/factors/location";
import { districtOptions, ZoneTemplate } from "../../types/homologation/factors/zone";
import { areasTemplate } from "../../types/homologation/homologation/areas";
import { salesCostTemplate } from "../../types/homologation/homologation/salesCost";
import { weightingPercentageTemplate } from "../../types/homologation/homologation/weightingPercentage";
import { refactoringTemplate } from "../../types/homologation/homologation/refactor";
import { indivisoTemplate } from "../../types/homologation/homologation/indiviso";
import {
	addValueToUsedFactors,
	removeValueFromUsedFactors,
	factorsResult,
	addValueToHomologations,
	removeValueFromHomologations,
	calculationLocationZone,
	calculateAverageUnitCost,
	addValueToLocationZone,
	removeValueToLocationZone,
	handleHomologationUpdate,
	roundToTenth,
} from "../../utils/utils";
import { consume } from "../../api/api.config";

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
		commercial: commercialTemplate,
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
		salesCosts: salesCostTemplate(type),
		weightingPercentage: weightingPercentageTemplate,
		reFactor: refactoringTemplate(type),
		indiviso: indivisoTemplate(type),
	},
	averageUnitCost: 1 as number,
	registration: "",
	appraisalPurpose: "",
	districtIndicators: districtOptions,
};

export const searchForExistence = createAsyncThunk(
	"homologation/searchForExistence",
	async (id: number) => {
		const url = `/HOMOLOGATION/j-appreciation/${type}/${id}`;
		const response = await consume("json").get(url);
		return response.data;
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
				const { subject } = state.factors[itemName];
				state.factors[itemName].data.map((item: any) => {
					item.result = Number(subject.value) / Number(item.value);
					return item;
				});
			}
		},
		setFactorsData(state, action: PayloadAction<TransactionProps>) {
			const { itemID, itemName, value } = action.payload;
			const { factors } = state;
			if (itemName !== undefined && value !== undefined && itemID !== undefined) {
				state.factors[itemName].data[itemID] = value;
				state.factors.results.data = factorsResult(factors);
				state = handleHomologationUpdate(state);
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
				const { data } = state.factors[itemName];
				state.factors[itemName].results = calculationLocationZone(data);
				const { factors } = state;
				state.factors.results.data = factorsResult(factors);
				state = handleHomologationUpdate(state);
			}
		},
		setZoneSubjectFactors(state, action: PayloadAction<TransactionProps>) {
			const { itemName, value } = action.payload;
			if (itemName !== undefined && value !== undefined) {
				state.factors.zone.subject[itemName] = value;
			}
			state = handleHomologationUpdate(state);
		},
		setZone(state, action: PayloadAction<TransactionProps>) {
			const { itemName, itemID, value, subItemName } = action.payload;
			if (
				itemName !== undefined &&
				value !== undefined &&
				itemID !== undefined &&
				subItemName !== undefined
			) {
				if (itemName === "analytics") {
					state.factors.zone.analytics[itemID][subItemName] = value;
				} else {
				}
				state = handleHomologationUpdate(state);
			}
		},
		addDataRowLocationZone(state, action: PayloadAction<TransactionProps>) {
			const { itemName } = action.payload;
			if (itemName !== undefined) {
				const { data } = state.factors[itemName];
				state.factors[itemName].data = addValueToLocationZone(data);
			}
		},
		removeDataRowLocationZone(state, action: PayloadAction<TransactionProps>) {
			const { itemName } = action.payload;
			if (itemName !== undefined) {
				const { data } = state.factors[itemName];
				state.factors[itemName].data = removeValueToLocationZone(data);
			}
		},
		addDataRow(state) {
			const { factors, homologation } = state;
			state.factors = addValueToUsedFactors(factors);
			state.homologation = addValueToHomologations(homologation);
			state.rowsCount++;
		},
		removeDataRow(state) {
			const { factors, homologation } = state;
			state.factors = removeValueFromUsedFactors(factors);
			state.homologation = removeValueFromHomologations(homologation);
			if (state.rowsCount > 1) state.rowsCount--;
		},
		setHomologation(state, action: PayloadAction<TransactionProps>) {
			const { itemName, itemID, value, subItemName } = action.payload;
			if (itemName !== undefined && value !== undefined && itemID !== undefined) {
				if (subItemName !== undefined)
					state.homologation[itemName].data[itemID][subItemName] = value;
				else {
					state.homologation[itemName].data[itemID].value = value;
				}
				const salesCostsValue = Number(state.homologation.salesCosts.data[itemID].value);
				const areasValue = Number(state.homologation.areas.data[itemID].value);

				state.homologation.salesCosts.data[itemID].unitaryCost =
					salesCostsValue / areasValue;
				state = handleHomologationUpdate(state);
			}
		},
		setHomologationReFactor(state, action: PayloadAction<TransactionProps>) {
			const { itemName, value, subItemName,itemID } = action.payload;
			if (itemName !== undefined && value !== undefined && subItemName !== undefined) {
				state.homologation[itemName][subItemName] = value;
				state = handleHomologationUpdate(state);
			}

		},
		setHomologationReFactorData(state, action: PayloadAction<TransactionProps>) {
			const {value,itemID } = action.payload;
			if (itemID ) {
				state.homologation.reFactor.data[itemID] = value;
				state = handleHomologationUpdate(state);
			}

		},
		setHomologationAreaSubject(state, action: PayloadAction<TransactionProps>) {
			const { value } = action.payload;
			if (value !== undefined) {
				state.homologation.areas.subject = value;
			}
		},
		updateAverageUnitCost(state, action: PayloadAction<number>) {
			state.averageUnitCost = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchForExistence.pending, (state) => {
				state.status = "loading";
			})
			.addCase(searchForExistence.fulfilled, (state, action) => {
				const { response } = action.payload;
				const { exists } = response;
				if (exists !== undefined) {
					if (exists) {
						const { factors, homologation, averageUnitCost } = response;
						state.status = "exists";
						state.factors = factors;
						state.homologation = homologation;
						state.averageUnitCost = averageUnitCost;
						state.rowsCount = homologation.salesCosts.data.length;
						state.districtIndicators = response.districtOptions;
					} else {
						const { registration, appraisalPurpose } = response;
						state.status = "working";
						state.registration = registration;
						state.appraisalPurpose = appraisalPurpose;
						state.districtIndicators = response.districtOptions;
						state.homologation.areas.subject.value = response.areas.subject.value;
						if (state.type === "TERRENO") {
							state.homologation.reFactor.data[0].value =
								response.reFactor.data.value;
						} else {
							state.factors.ages.subject.value = response.ages.subject.value;
						}
					}
				} else {
					state.status = "failed";
				}
			})
			.addCase(sendPatchRequest.pending, (state) => {
				state.status = "loading";
			})
			.addCase(sendPatchRequest.fulfilled, (state, action) => {
				const { response } = action.payload;
				if (response !== undefined) {
					state.status = response ? "complete" : "failed";
					console.log("executed");
				} else {
					state.states = "failed";
				}
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
	setZone,
	updateAverageUnitCost,
	setHomologationReFactor,
	setZoneSubjectFactors,
	setHomologationReFactorData
} = slice.actions;

export const sendPatchRequest = createAsyncThunk(
	"homologation/sendPatchRequest",
	async (state: any) => {
		const { id, type, factors, homologation, averageUnitCost, registration, appraisalPurpose } =
			state;
		const payload = {
			factors,
			homologation,
			averageUnitCost: roundToTenth(Number(averageUnitCost), 1),
			registration,
			appraisalPurpose,
		};
		const url = `/HOMOLOGATION/j-appreciation/${type}/${id}`;
		const response = await consume("json").patch(url, payload);
		return response.data;
	},
);

export default slice.reducer;
