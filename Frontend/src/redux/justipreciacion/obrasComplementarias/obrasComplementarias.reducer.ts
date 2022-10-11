/** @format */

import { PayloadAction } from "@reduxjs/toolkit";
import { roundNumber } from "../../../utils/number";
import {
	checkErrorsFN,
	updatePartialValuesFN,
	updateValuesFN,
} from "./obrasComplementarias.actions";
import { StateProps } from "./obrasComplementarias.interface";

export const reducers = {
	addRow: (state: StateProps) => {
		const {
			Documentation,
			Calculation,
			handlers: {
				documentation: { documentationTemplate },
				calculo: { calculationTemplate },
			},
		} = state;
		const { length } = Documentation;
		Documentation.push(documentationTemplate) && Calculation.push(calculationTemplate);

		const response = updateValuesFN(state);
		state.Documentation = response.Documentation;
		state.Calculation = response.Calculation;
		state.total = response.total;
		state.errors = checkErrorsFN(state);
	},
	rmRow: (state: StateProps) => {
		const { Documentation, Calculation } = state;
		const { length } = Documentation;
		length > 1 && Documentation.pop() && Calculation.pop();
		const response = updateValuesFN(state);
		state.Documentation = response.Documentation;
		state.Calculation = response.Calculation;
		state.total = response.total;
		state.errors = checkErrorsFN(state);
	},
	addDataRow: (state: StateProps, { payload }: PayloadAction<number>) => {
		const {
			Documentation,
			handlers: {
				documentation: { dataTemplate },
			},
		} = state;
		const { data } = Documentation[payload];
		const { length } = data;
		data.push(dataTemplate(length + 1));
		const response = updateValuesFN(state);
		state.Documentation = response.Documentation;
		state.Calculation = response.Calculation;
		state.total = response.total;
		state.errors = checkErrorsFN(state);
	},
	rmDataRow: (state: StateProps, { payload }: PayloadAction<number>) => {
		const { Documentation } = state;
		const { data } = Documentation[payload];
		const { length } = data;
		length > 1 && data.pop();
		const response = updateValuesFN(state);
		state.Documentation = response.Documentation;
		state.Calculation = response.Calculation;
		state.total = response.total;
		state.errors = checkErrorsFN(state);
	},
	addAreaRow: (state: StateProps, { payload }: PayloadAction<number>) => {
		const {
			Documentation,
			handlers: {
				documentation: { areaDataTemplate },
			},
		} = state;
		const { data } = Documentation[payload].area;
		const { length } = data;
		data.push(areaDataTemplate(length + 1));
		const response = updateValuesFN(state);
		state.Documentation = response.Documentation;
		state.Calculation = response.Calculation;
		state.total = response.total;
		state.errors = checkErrorsFN(state);
	},
	rmAreaRow: (state: StateProps, { payload }: PayloadAction<number>) => {
		const { Documentation } = state;
		const { data } = Documentation[payload].area;
		const { length } = data;
		length > 1 && data.pop();
		const response = updateValuesFN(state);
		state.Documentation = response.Documentation;
		state.Calculation = response.Calculation;
		state.total = response.total;
		state.errors = checkErrorsFN(state);
	},
	setAreaData: (
		state: StateProps,
		{ payload: { index, indx, id, key, value } }: PayloadAction<any>,
	) => {
		if (index !== undefined && id !== undefined && key !== undefined && value !== undefined) {
			const { Documentation } = state;
			const { data } = Documentation[index].area;
			data[id][key] = value;
			const response = updateValuesFN(state);
			state.Documentation = response.Documentation;
			state.Calculation = response.Calculation;
			state.total = response.total;
			state.errors = checkErrorsFN(state);
		}
	},
	setDoc: (state: StateProps, { payload: { index, key, value } }: PayloadAction<any>) => {
		const { Documentation } = state;
		if (index !== undefined && key !== undefined && value !== undefined) {
			Documentation[index][key] = value;
			const response = updateValuesFN(state);
			state.Documentation = response.Documentation;
			state.Calculation = response.Calculation;
			state.total = response.total;
			state.errors = checkErrorsFN(state);
		}
	},
	setDocData: (state: StateProps, { payload: { index, id, key, value } }: PayloadAction<any>) => {
		const { Documentation } = state;
		if (index !== undefined && id !== undefined && key !== undefined && value !== undefined) {
			const { data } = Documentation[index];
			data[id][key] = value;
			data[id].total = data[id].ind * data[id].value * data[id].quantity;
			const response = updateValuesFN(state);
			state.Documentation = response.Documentation;
			state.Calculation = response.Calculation;
			state.total = response.total;
			state.errors = checkErrorsFN(state);
		}
	},
	setCalc: (state: StateProps, { payload: { index, key, value } }: PayloadAction<any>) => {
		const { Calculation } = state;
		if (index !== undefined && key !== undefined && value !== undefined) {
			Calculation[index][key] = value;
			const response = updateValuesFN(state);
			state.Documentation = response.Documentation;
			state.Calculation = response.Calculation;
			state.total = response.total;
			state.errors = checkErrorsFN(state);
		}
	},
	setAge: (state: StateProps, { payload: { index, key, value } }: PayloadAction<any>) => {
		const { Calculation } = state;
		if (index !== undefined && key !== undefined && value !== undefined) {
			const { age } = Calculation[index];
			age[key] = value;
			const response = updateValuesFN(state);
			state.Documentation = response.Documentation;
			state.Calculation = response.Calculation;
			state.total = response.total;
			state.errors = checkErrorsFN(state);
		}
	},
	checkErrors: (state: StateProps) => {
		const response = updateValuesFN(state);
		state.Documentation = response.Documentation;
		state.Calculation = response.Calculation;
		state.total = response.total;
		state.errors = checkErrorsFN(state);
	},
	setIsComplete: (state: StateProps, { payload }: PayloadAction<boolean>) => {
		state.isComplete = payload;
		const response = updateValuesFN(state);
		state.Documentation = response.Documentation;
		state.Calculation = response.Calculation;
		state.total = response.total;
		
	},
	setPartialAge: (state: StateProps, { payload: { index, key, value } }: PayloadAction<any>) => {
		if (index !== undefined && key !== undefined && value !== undefined) {
			const {area} = state.Documentation[index];
			area[key] = value;
			
			const response = updateValuesFN(state);
			state.Documentation = response.Documentation;
			state.Calculation = response.Calculation;
			state.total = response.total;
		}
		
	},
	setPartialTotalByUnit: (
		state: StateProps,
		{ payload: { index, value } }: PayloadAction<any>,
	) => {
		if (index !== undefined && value !== undefined) {
			const { Documentation } = state;
			Documentation[index].totalByUnit = value;
			
			
			const { total, ...data } = updatePartialValuesFN(state);
			state.Calculation = data.Calculation;
			state.total = total;
			
		}
	},
	setPartialCalculation: (
		state: StateProps,
		{ payload: { index, key, value } }: PayloadAction<any>,
	) => {
		if (index !== undefined && value !== undefined) {
			const { Calculation } = state;
			Calculation[index][key] = value;
			const response = updateValuesFN(state);
			state.Documentation = response.Documentation;
			state.Calculation = response.Calculation;
			state.total = response.total;
			const { total, ...data } = updatePartialValuesFN(state);
			state.Calculation = data.Calculation;
			state.total = total;
		}
	},
	setPartialAgeFactor: (
		state: StateProps,
		{ payload: { index, key, value } }: PayloadAction<any>,
	) => {
		if (index !== undefined && key !== undefined && value !== undefined) {
			const { age } = state.Calculation[index];
			age[key] = value;
			const response = updateValuesFN(state);
			state.Documentation = response.Documentation;
			state.Calculation = response.Calculation;
			state.total = response.total;
			const { total, Calculation } = updatePartialValuesFN(state);
			state.Calculation = Calculation;
			state.total = total;
			
		}
		
	},
	setRound: (state: StateProps, { payload }: PayloadAction<number>) => {
		if (payload !== undefined) state.rounded = payload;
		const { total, Calculation } = updatePartialValuesFN(state);
		state.Calculation = Calculation;
		state.total = roundNumber(total, payload ?? -1);
		const response = updateValuesFN(state);
		state.Documentation = response.Documentation;
		state.Calculation = response.Calculation;
		state.total = response.total;
	},
	updateValues: (state: StateProps) => { 
		const {Documentation,Calculation,total} = updateValuesFN(state);
		state.Documentation = Documentation;
		state.Calculation = Calculation;
		state.total = total;
	}
};
