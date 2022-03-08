import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk } from '../../app/store'
import {StorageProps, TransactionProps} from '../../types/homologation/storage';
import { ageData, ageTemplate } from '../../types/homologation/factors/age';
import { buildingData, buildingTemplate } from '../../types/homologation/factors/building';
import { classificationData, classificationTemplate } from '../../types/homologation/factors/classification';
import { comparisonData, comparisonTemplate } from '../../types/homologation/factors/comparison';
import { levelData, levelTemplate } from '../../types/homologation/factors/level';
import { projectData, projectTemplate } from '../../types/homologation/factors/project';
import { qualityData, qualityTemplate } from '../../types/homologation/factors/quality';
import { surfaceData, surfaceTemplate } from '../../types/homologation/factors/surface';
import { topographyData, topographyOptions, topographyTemplate } from '../../types/homologation/factors/topography';
import { typeFormData, typeFormTemplate } from '../../types/homologation/factors/typeForm';
import { usageData, usageTemplate } from '../../types/homologation/factors/usage';
import { areasData, areasTemplate } from '../../types/homologation/homologation/areas';
import { salesCostData, salesCostTemplate } from '../../types/homologation/homologation/salesCost';
import { weightingPercentageData, weightingPercentageTemplate } from '../../types/homologation/homologation/weightingPercentage';

import {addValueToUsedFactors,removeValueFromUsedFactors} from '../../utils/utils';

const parameters = new URLSearchParams(window.location.search);
const id = parameters.get('id');
const typeUsage = parameters.get('tipo');
const type =typeUsage ? typeUsage.toString().toUpperCase() : "TERRENO"
const initialState:StorageProps={
	id: id ? Number(id) : 0,
	type,
	status: "working",
	factors:{
		ages:ageTemplate,
		buildings:buildingTemplate,
		classification:classificationTemplate,
		comparison:comparisonTemplate,
		level:levelTemplate,
		location:{},
		project:projectTemplate,
		quality:qualityTemplate,
		surface:surfaceTemplate,
		topography:{
			...topographyTemplate,
			data:[topographyData(1,type)]
		},
		typeForm:{
			...typeFormTemplate,
			data:[typeFormData(1,type)]
		},
		usage:usageTemplate,
		zone:{},
	},
	homologation:{
		areas:areasTemplate(type),
		salesCosts:salesCostTemplate,
		weightingPercentage:weightingPercentageTemplate,
	},
	
}

export const searchForExistence= createAsyncThunk(
	'homologation/searchForExistence',
	async (id:number) => {
		const response = await fetch(`http://localhost:3001/homologations/${id}`);
		const data = await response.json();
		return data;
	}
)
export const slice = createSlice({
	name:'homologation',
	initialState, 
	reducers: {
		setFactors(state, action: PayloadAction<TransactionProps>) {
			const {itemName,subItemName,value} = action.payload;
			if(itemName!==undefined && value!==undefined && subItemName!==undefined)
				state.factors[itemName][subItemName] = value;
		},
		setFactorsSubject(state, action: PayloadAction<TransactionProps>){
			const {itemName,value} = action.payload;
			if(itemName!==undefined && value!==undefined)
				state.factors[itemName].subject = value;
		},
		setFactorsData(state, action: PayloadAction<TransactionProps>){
			const {itemID,itemName,value} = action.payload;
			if(itemName!==undefined && value!==undefined && itemID!==undefined)
				state.factors[itemName].data[itemID] = value;
		},
		addDataRow(state){
			state.factors = addValueToUsedFactors(state.factors);
		},
		removeDataRow(state){
			state.factors = removeValueFromUsedFactors(state.factors);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchForExistence.pending, (state) => {
			state.status = 'loading';
			})
			.addCase(searchForExistence.fulfilled, (state, action) => {
			state.status = 'exists';
			});
		},
});
export const selector = (state:RootState)=>state.homologation;
export const {
	setFactors,
	setFactorsSubject,
	setFactorsData,
	addDataRow,
	removeDataRow,
}
= slice.actions;

export default slice.reducer;