/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { consume } from "../../api/api.config";
import { initialState } from "../../types/homologacion/storage";
import { handlerAddRow, handlerRemoveRow,handleUpdateOperationValues } from "./handlers";
export const slice = createSlice({
	name: "homologation",
	initialState,
	reducers: {
		addRow(state) {
			const result = handlerAddRow(state);
			state.factors = result.factors;
			state.documentation = result.documentation;
		},
		addRowLocationZone(state,action: PayloadAction<any>){
			const {key} = action.payload;
			const {insertionSubject,subject}= state.factors[key];
			state.factors[key].subject = insertionSubject(subject)

		},
		removeRow(state) {
			const result = handlerRemoveRow(state);
			state.factors = result.factors;
			state.documentation = result.documentation;
		},
		removeRowLocationZone(state,action: PayloadAction<any>){
			const {key} = action.payload;
			const length = state.factors[key].subject.length;
			if(length > 1){
				state.factors[key].subject.pop();
				state.factors[key].subject.map((item:any)=>item.percentage=10/(length-1));
			}
		},
		updateFactorStateAge(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			if (index !== undefined && object !== "subject")
				state.factors[key][object][index].value = value;
			else state.factors[key][object].value = value;

			const { operation, data, subject } = state.factors[key];
			state.factors[key].data = operation(data, subject);
		},
		updateFactorStateCommon(state, action: PayloadAction<any>) {
			const { key, object, index, value } = action.payload;
			if (index !== undefined && object !== "subject") {
				const data = state.factors[key][object][index];
				state.factors[key][object][index] = {
					...data,
					...value,
				};
			} else {
				const item = state.factors[key][object];
				state.factors[key][object] = {
					...item,
					...value,
				};
			}
			const { operation, data, subject } = state.factors[key];
			state.factors[key].data = operation(data, subject);
		},
		updateFactorStateLocationZone(state,action: PayloadAction<any>){
			const {key,object,index,value,item }=action.payload;
			if(index!==undefined && object==="subject"){
				state.factors[key].subject[index][item]=value
				const {operation} =state.factors[key]
				state.factors[key].data = operation(state.factors[key].subject)
			}
		},
		updateDocumentationStateArea(state,action: PayloadAction<any>){
			const {key,object,index,item, value}=action.payload;
			if(key.includes("subject")){
				if(index!==undefined && item !==undefined){
					state.documentation.Area[key][object][index][item]=value
					

				}
				else{
					state.documentation.Area[key][object] = value
				}
			}
			else{ 
				if(index!==undefined && item !==undefined){
					state.documentation.Area[key][index][object][item]=value
					
				}
				else{
					state.documentation.Area[key][object] = value
				}
			}
			state = handleUpdateOperationValues(state);
		},
	},
	extraReducers: (builder) => {},
});
export const { addRow,addRowLocationZone, removeRow,removeRowLocationZone, updateFactorStateAge, updateFactorStateCommon,updateFactorStateLocationZone,updateDocumentationStateArea } = slice.actions;
export const getState = (state: RootState) => state.homologation;
export default slice.reducer;
