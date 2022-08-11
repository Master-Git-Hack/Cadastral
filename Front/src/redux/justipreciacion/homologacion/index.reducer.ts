/** @format */

import { PayloadAction } from "@reduxjs/toolkit";
import { addRowFN, updateValuesFN, rmRowFN, positions } from "./index.actions";
import { InitialStateProps } from "./index.types";

/** @format */
const addRow = (state: InitialStateProps) => {
	const result = addRowFN(state);
	state.factors = result.factors;
	state.documentation = result.documentation;
	state = updateValuesFN(state);
};
const rmRow = (state: InitialStateProps) => {
	const result = rmRowFN(state);
	state.factors = result.factors;
	state.documentation = result.documentation;
	state = updateValuesFN(state);
};
const addRowLocZone = (state: InitialStateProps, action: PayloadAction<any>) => {
	const { key } = action.payload;
	const { factors, handlers } = state;
	const { insertionSubject } = handlers[key];
	const { subject } = factors[key];
	factors[key].subject = insertionSubject(subject);
	state = updateValuesFN(state);
};
const rmRowLocZone = (state: InitialStateProps, action: PayloadAction<any>) => {
	const { key } = action.payload;
	const { factors } = state;
	const { subject } = factors[key];

	const { length } = subject;
	if (length > 1) {
		subject.pop();
		subject.map((item: any) => (item.percentage = 10 / (length - 1)));
		state = updateValuesFN(state);
	}
};
const updateCommonSubject = (state: InitialStateProps, action: PayloadAction<any>) => {
	const { key, value } = action.payload;
	if (key !== undefined && value !== undefined) {
		const { factors } = state;
		factors[key].subject = value;
	}
};
const updateCommonData = (state: InitialStateProps, action: PayloadAction<any>) => {
	const { index, key, value } = action.payload;
	if (index !== undefined && key !== undefined && value !== undefined) {
		const { data } = state.factors[key];
		data[index] = { ...data[index], ...value };
	}
};
const updateSymbolsData = (state: InitialStateProps, action: PayloadAction<any>) => {
	const { factors, handlers } = state;
	const { key, index, column, value } = action.payload;
	if (key !== undefined && index !== undefined && column !== undefined && value !== undefined) {
		const { subject } = factors[key];
		subject[index][column] = value;
		const { operation } = handlers[key];
		factors[key].data = operation(subject);
		state = updateValuesFN(state);
	}
};
const updateLocZoneSubject = (state: InitialStateProps, action: PayloadAction<any>) => {
	const { key, index, name, value } = action.payload;
	if (key !== undefined && index !== undefined && value !== undefined) {
		const { factors } = state;
		const { subject } = factors[key];
		subject[index][name] = value;
		state = updateValuesFN(state);
	}
};
const loadFactors = (state: InitialStateProps) => {
	const { factors, record } = state;
	const type = record.type.includes("TERRENO");
	positions(type).map((factor: any, index: number) => {
		const { key, isUsed } = factor;
		const current: any = factors[key];
		const inferiorLimit = type ? 7 : 9;
		const superiorLimit = type ? 10 : 11;
		const enabled = index <= inferiorLimit && index >= superiorLimit;
		if (!current.isUsed && !enabled) {
			current.isUsed = isUsed;
			current.position = index;
		}
		return factor;
	});
};
const setEnabledFactors = (state: InitialStateProps, action: PayloadAction<any>) => {
	const { key, isUsed, position } = action.payload;
	if (key !== undefined && isUsed !== undefined && position !== undefined) {
		const { factors } = state;
		const current: any = factors[key];
		current.isUsed = isUsed;
		current.position = position;
	}
};

export const reducers = {
	addRow,
	rmRow,
	addRowLocZone,
	rmRowLocZone,
	updateCommonSubject,
	updateCommonData,
	updateSymbolsData,
	updateLocZoneSubject,
	loadFactors,
	setEnabledFactors,
};
