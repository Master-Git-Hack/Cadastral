/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
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
	validateErrors,
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
const serviceType = parameters.get("tipo_servicio")
	? parameters.get("tipo_servicio")
	: "justipreciacion";
const initialState: StorageProps = {
	id: id ? Number(id) : 0,
	type,
	appraisalPurpose: serviceType as string,
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
	averageUnitCost: Number(1),
	registration: "",
	districtIndicators: districtOptions,
	errors: [],
};

export const searchForExistence = createAsyncThunk(
	"homologation/searchForExistence",
	async (id: number, { rejectWithValue }) => {
		const url = `/HOMOLOGATION/j-appreciation/${type}/${id}`;
		try {
			const response = await consume("json").get(url);
			return response.data;
		} catch (err: any) {
			return rejectWithValue(err.response.data);
		}
	},
);

export const slice = createSlice({
	name: "homologation",
	initialState,
	reducers: {
		updateState(state) {
			state = handleHomologationUpdate(state);
			const { result } = state.homologation.salesCosts.averageUnitCost;
			console.log(roundToTenth(result, 1));
			state.averageUnitCost = roundToTenth(result, 1);
		},
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
			if (itemName !== undefined && value !== undefined && itemID !== undefined) {
				state.factors[itemName].data[itemID] = value;
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
		setHomologationAddress(state, action: PayloadAction<TransactionProps>) {
			const { itemID, itemName, value } = action.payload;
			if (itemName !== undefined && value !== undefined && itemID !== undefined) {
				state.homologation.areas.data[itemID].address[itemName] = value;
			}
		},
		setHomologationReFactor(state, action: PayloadAction<TransactionProps>) {
			const { itemName, value, subItemName } = action.payload;
			if (itemName !== undefined && value !== undefined && subItemName !== undefined) {
				state.homologation[itemName][subItemName] = value;
				state = handleHomologationUpdate(state);
			}
		},
		setHomologationReFactorData(state, action: PayloadAction<TransactionProps>) {
			const { value, itemID } = action.payload;
			if (itemID) {
				state.homologation.reFactor.data[itemID] = value;
				state = handleHomologationUpdate(state);
			}
		},
		setHomologationAreaSubject(state, action: PayloadAction<TransactionProps>) {
			const { value } = action.payload;
			if (value !== undefined) {
				state.homologation.areas.subject.value = value;
				state = handleHomologationUpdate(state);
			}
		},
		updateAverageUnitCost(state, action: PayloadAction<number>) {
			state.averageUnitCost = action.payload;
		},
		setIndiviso(state, action: PayloadAction<TransactionProps>) {
			const { itemName, value } = action.payload;
			if (itemName !== undefined && value !== undefined) {
				state.homologation.indiviso[itemName] = value;
				state = handleHomologationUpdate(state);
			}
		},
		findErrors(state) {
			state.errors = validateErrors(state);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchForExistence.pending, (state) => {
				state.status = "loading";
			})
			.addCase(searchForExistence.rejected, (state, action) => {
				console.log(action.payload);
				state.states = "failed";
			})
			.addCase(searchForExistence.fulfilled, (state, action) => {
				const { response } = action.payload;
				const { exists } = response;
				if (exists !== undefined) {
					if (exists) {
						const {
							factors,
							homologation,
							averageUnitCost,
							registration,
							appraisalPurpose,
						} = response;
						state.status = "exists";
						state.record = response.record;
						state.factors = factors;
						state.homologation = homologation;
						state.averageUnitCost = averageUnitCost;
						state.registration = registration;
						state.appraisalPurpose = appraisalPurpose;
						state.rowsCount = homologation.salesCosts.data.length;
						state.districtIndicators = response.districtOptions;
					} else {
						const { registration } = response;
						state.status = "working";
						state.registration = registration;
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
					state.status = response !== -1 ? "complete" : "failed";
				} else {
					state.states = "failed";
				}
			})
			.addCase(sendPatchRequest.rejected, (state, action) => {
				console.log(action.payload);
				state.states = "failed";
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
	setHomologationReFactorData,
	setIndiviso,
	setHomologationAddress,
	updateState,
	findErrors,
} = slice.actions;

export const checkForErrors = (dispatch: Function) =>
	new Promise<void>((resolve, reject) => {
		dispatch(findErrors());
		setTimeout(() => resolve());
	});
export const sendPatchRequest = createAsyncThunk(
	"homologation/sendPatchRequest",
	async (state: any, { rejectWithValue }) => {
		const {
			id,
			type,
			factors,
			homologation,
			registration,
			appraisalPurpose,
			status,
			record,
			errors,
		} = state.state;
		state.dispatch(findErrors());
		if (errors.length === 0) {
			const payload = {
				exists: status === "exists" ? true : false,
				record,
				factors,
				homologation,
				averageUnitCost: roundToTenth(
					Number(homologation.salesCosts.averageUnitCost.result.toFixed(0)),
					1,
				),
				registration,
				appraisalPurpose,
			};
			const url = `/HOMOLOGATION/j-appreciation/${type}/${id}`;
			try {
				const response = await consume("json").patch(url, payload);
				return response.data;
			} catch (err: any) {
				return rejectWithValue(err.response.data);
			}
		}
	},
);

export default slice.reducer;
