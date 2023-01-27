/** @format */

import { commercial } from "./../../../types/justipreciacion/homologacion/factores/commercial/index";
/** @format */

import { PayloadAction } from "@reduxjs/toolkit";


import { StateProps } from "./homologacion.interface";

export const reducers = {
	addRow: (state: StateProps) => {
		const { factors, documentation } = addRowFN(state);
		state.factors = factors;
		state.documentation = documentation;

		//state = updateValuesFN(state);
	},
	rmRow: (state: StateProps) => {
		//const { factors, documentation } = rmRowFN(state);
		//state.factors = factors;
		//state.documentation = documentation;
		//state = updateValuesFN(state);
	},
	addRowLocZone: (state: StateProps, { payload: { key } }: PayloadAction<any>) => {
		const { factors, handlers } = state;
		const { insertionSubject } = handlers[key];
		const { subject } = factors[key];
		factors[key].subject = insertionSubject(subject);
		//state = updateValuesFN(state);
	},
	rmRowLocZone: (state: StateProps, { payload: { key } }: PayloadAction<any>) => {
		const { factors } = state;
		const { subject } = factors[key];

		const { length } = subject;
		if (length > 1) {
			subject.pop();
			subject.map((item: any) => (item.percentage = 10 / (length - 1)));
			//state = updateValuesFN(state);
		}
	},
	updateFactors: (state: StateProps) => {
		const {
			factors,
			handlers: {
				common: { operation },
			},
		} = state;
		for (let key in factors) {
			if (
				!key.includes("Commercial") &&
				!key.includes("Age") &&
				!key.includes("Location") &&
				!key.includes("Zone") &&
				!key.includes("Surface") &&
				!key.includes("Results")
			) {
				const { data, subject } = factors[key];
				factors[key].data = operation(data, subject);
			}
			//state = updateValuesFN(state);
		}
	},
	updateCommonSubject: (state: StateProps, { payload: { key, value } }: PayloadAction<any>) => {
		const { factors } = state;
		if (key !== undefined && value !== undefined) {
			factors[key].subject = value;
			//state = updateValuesFN(state);
		}
	},
	updateCommonData: (
		state: StateProps,
		{ payload: { index, key, value } }: PayloadAction<any>,
	) => {
		const { factors } = state;
		if (index !== undefined && key !== undefined && value !== undefined) {
			const { data } = factors[key];
			data[index] = { ...data[index], ...value };
			//state = updateValuesFN(state);
		}
	},

	updateSymbolsData: (
		state: StateProps,
		{ payload: { key, index, column, value } }: PayloadAction<any>,
	) => {
		const { factors, handlers } = state;
		if (
			key !== undefined &&
			index !== undefined &&
			column !== undefined &&
			value !== undefined
		) {
			const { subject } = factors[key];
			subject[index][column] = value;
			const { operation } = handlers[key];
			factors[key].data = operation(subject);
			//state = updateValuesFN(state);
		}
	},
	updateLocZoneSubject: (
		state: StateProps,
		{ payload: { key, index, name, value } }: PayloadAction<any>,
	) => {
		const { factors } = state;
		if (key !== undefined && index !== undefined && value !== undefined) {
			const { subject } = factors[key];
			subject[index][name] = value;
			//state = updateValuesFN(state);
		}
	},
	loadFactors: (state: StateProps) => {
		const { factors, record } = state;
		const type = record.type.includes("TERRENO");
		/*positions(type).map((factor: any, index: number) => {
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
		});*/
		//state = updateValuesFN(state);
	},
	setEnabledFactors: (
		state: StateProps,
		{ payload: { key, isUsed, position } }: PayloadAction<any>,
	) => {
		const { factors } = state;
		if (key !== undefined && isUsed !== undefined && position !== undefined) {
			const current: any = factors[key];
			current.isUsed = isUsed;
			current.position = position;
			//state = updateValuesFN(state);
		}
	},
	setAgeSubject: (state: StateProps, { payload: { value } }: PayloadAction<any>) => {
		const {
			factors: { Age },
			handlers: {
				Age: { operation },
			},
		} = state;
		if (value !== undefined) {
			const { subject, data } = Age;
			subject.value = !isNaN(value) ? value : 1;
			Age.data = operation(data, subject);
			//state = updateValuesFN(state);
		}
	},
	setAgeData: (state: StateProps, { payload: { index, value } }: PayloadAction<any>) => {
		const {
			factors: { Age },
			handlers: {
				Age: { operation },
			},
		} = state;
		if (index !== undefined && value !== undefined) {
			const { subject, data } = Age;
			data[index].value = !isNaN(value) ? value : 1;
			Age.data = operation(data, subject);
			//state = updateValuesFN(state);
		}
	},
	setAreaSubject: (state: StateProps, { payload: { key, value } }: PayloadAction<any>) => {
		const { subject } = state.documentation.Area;
		if (key !== undefined && value !== undefined) subject[key] = value;
		//state = updateValuesFN(state);
	},
	setAreaSubjectFactors: (
		state: StateProps,
		{ payload: { index, key, value } }: PayloadAction<any>,
	) => {
		const { factors } = state.documentation.Area.subject;
		if (index !== undefined && key !== undefined && value !== undefined)
			factors[index][key] = value;

		//state = updateValuesFN(state);
	},
	setAreaAverageLotArea: (state: StateProps, { payload: { key, value } }: PayloadAction<any>) => {
		const { averageLotArea } = state.documentation.Area;
		if (key !== undefined && value !== undefined) averageLotArea[key] = value;
		//state = updateValuesFN(state);
	},
	setAreaData: (state: StateProps, { payload: { index, key, value } }: PayloadAction<any>) => {
		const { data } = state.documentation.Area;

		if (index !== undefined && key !== undefined && value !== undefined)
			data[index][key] = value;
		//state = updateValuesFN(state);
	},
	setAreaAddress: (state: StateProps, { payload: { index, key, value } }: PayloadAction<any>) => {
		const { data } = state.documentation.Area;
		if (index !== undefined && key !== undefined && value !== undefined)
			data[index].address[key] = value;
		//state = updateValuesFN(state);
	},
	setAreaAddressExtra: (
		state: StateProps,
		{ payload: { index, key, value } }: PayloadAction<any>,
	) => {
		const { data } = state.documentation.Area;
		if (index !== undefined && key !== undefined && value !== undefined)
			data[index].address.extras[key] = value;
		//state = updateValuesFN(state);
	},
	setAreaAddressExtraFile: (
		state: StateProps,
		{ payload: { index, value } }: PayloadAction<any>,
	) => {
		const { data } = state.documentation.Area;
		if (index !== undefined && value !== undefined) data[index].address.extras.document = value;
		//state = updateValuesFN(state);
	},
	setSurfaceRoot: (state: StateProps, { payload: { key, value } }: PayloadAction<any>) => {
		const { root } = state.factors.Surface;
		if (key !== undefined && value !== undefined) root[key] = value;
		//state = updateValuesFN(state);
	},
	setSalesCostData: (
		state: StateProps,
		{ payload: { index, key, value } }: PayloadAction<any>,
	) => {
		const { data } = state.documentation.SalesCost;
		if (index !== undefined && key !== undefined && value !== undefined)
			data[index][key] = value;
		//state = updateValuesFN(state);
	},
	setCommercialData: (
		state: StateProps,
		{ payload: { index, key, value } }: PayloadAction<any>,
	) => {
		const { data } = state.factors.Commercial;
		if (index !== undefined && key !== undefined && value !== undefined)
			data[index][key] = value;
		//state = updateValuesFN(state);
	},
	setPercentageData: (
		state: StateProps,
		{ payload: { index, key, value } }: PayloadAction<any>,
	) => {
		const { data } = state.documentation.WeightingPercentage;
		if (index !== undefined && key !== undefined && value !== undefined)
			data[index][key] = value;
		//state = updateValuesFN(state);
	},
	setPercentageTotal: (state: StateProps, { payload: { value } }: PayloadAction<any>) => {
		const { weightingPercentage } = state.documentation;
		if (value !== undefined) weightingPercentage.total = value;
		//state = updateValuesFN(state);
	},
	setObservations: (state: StateProps, { payload }: PayloadAction<string>) => {
		const { documentation } = state;
		if (payload !== undefined) documentation.observations = payload;
		//state = updateValuesFN(state);
	},
	setIndivisoVisibility: (state: StateProps, { payload }: PayloadAction<boolean>) => {
		const { ReFactor } = state.documentation;
		ReFactor.isUsed = payload ?? false;
		//state = updateValuesFN(state);
	},
	setRoundedTo: (state: StateProps, { payload: { key, value } }: PayloadAction<any>) => {
		const { roundedTo } = state.documentation.SalesCost.averageUnitCost;
		if (key !== undefined && value !== undefined) roundedTo[key] = value;

		//state = updateValuesFN(state);
	},
	setRoundedResult: (state: StateProps, { payload: { key, value } }: PayloadAction<any>) => {
		const { roundedResult } = state.documentation.SalesCost.averageUnitCost;
		if (key !== undefined && value !== undefined) roundedResult[key] = value;
		//state = updateValuesFN(state);
	},
	setReFactorRoot: (state: StateProps, { payload: { key, value } }: PayloadAction<any>) => {
		const { root } = state.documentation.ReFactor;
		if (key !== undefined && value !== undefined) root[key] = value;
		//state = updateValuesFN(state);
	},
	setReFactorSurface: (state: StateProps, { payload: { key, value } }: PayloadAction<any>) => {
		const { surface } = state.documentation.ReFactor;
		if (key !== undefined && value !== undefined) surface[key] = value;
		//state = updateValuesFN(state);
	},
	setReFactorForm: (state: StateProps, { payload: { key, value } }: PayloadAction<any>) => {
		const { form } = state.documentation.ReFactor;
		if (key !== undefined && value !== undefined) form[key] = value;
		//state = updateValuesFN(state);
	},
	setIndiviso: (state: StateProps, { payload: { key, value } }: PayloadAction<any>) => {
		const { Indiviso } = state.documentation;
		if (key !== undefined && value !== undefined) Indiviso[key] = value;
		//state = updateValuesFN(state);
	},
};
