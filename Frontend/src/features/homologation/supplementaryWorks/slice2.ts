/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { request } from "../../../api/request";
import { initialState } from "../../../types/homologacion/supplementaryWorks/storage2";

export const consume = request("supplementaryWorks");

export const slice = createSlice({
	name: "SupplementaryWorks",
	initialState,
	reducers: {
		addRow(state) {
			const { dataTemplate, bigPictureTemplate, data, bigPicture } = state;
			data.push(dataTemplate(data.length + 1));
			bigPicture.push(bigPictureTemplate(bigPicture.length + 1));
		},
		removeRow(state) {
			const { data, bigPicture } = state;
			if (data.length > 1) {
				data.pop();
				bigPicture.pop();
			}
		},
		addDataCalculationRow(state, action: PayloadAction<number>) {
			const id = action.payload;
			const { appendCalculationTemplate, calculation } = state.data[id];
			state.data[id].calculation = appendCalculationTemplate(calculation);
		},
		removeDataCalculationRow(state, action: PayloadAction<number>) {
			const id = action.payload;
			const { calculation } = state.data[id];
			const { length } = calculation;
			if (length > 1) {
				calculation.pop();
			}
		},
		updateData: (state, action: PayloadAction<any>) => {
			const { index, key, subKey, value } = action.payload;
			if (index !== undefined && key !== undefined && value !== undefined) {
				const { data } = state;
				if (subKey !== undefined) {
					data[index][key][subKey] = value;
					if (subKey.includes("unity")) {
						data[index].value.result.unity = value;
					}
					if (subKey.includes("gtoFactor")) {
						const { getFinalTotal, result } = state.data[index].value;
						const { gtoFactor, subTotal } = state.data[index].value;

						data[index].value.total = getFinalTotal(gtoFactor, subTotal);

						result.value =
							result?.getResult !== undefined
								? result.getResult(data[index].area.value, data[index].value.total)
								: data[index].value.total / data[index].area.value;
					}
				} else {
					data[index][key] = value;
				}
			}
		},
		updateDataCalculation(state, action: PayloadAction<any>) {
			const { index, id, key, subKey, subSubKey, value } = action.payload;
			if (
				index !== undefined &&
				id !== undefined &&
				key !== undefined &&
				value !== undefined &&
				subKey !== undefined
			) {
				const { data } = state;
				const { calculation } = data[index];
				const { getSubTotal, getFinalTotal, result } = state.data[index].value;
				const { getTotal, unitary, ind } = calculation[id].value;
				const { quantity } = calculation[id];
				if (subSubKey !== undefined) {
					calculation[id][key][subKey][subSubKey] = value;
					if (subKey.includes("ind") && subSubKey.includes("value")) {
						calculation[id].value.ind.unitary = getTotal(value, unitary);
						calculation[id].value.total = getTotal(ind.unitary, quantity.value);
					}
				} else {
					calculation[id][key][subKey] = value;
					if (key.includes("value") && subKey.includes("unitary")) {
						ind.unitary = getTotal(value, ind.value);
						calculation[id].value.total = getTotal(ind.unitary, quantity.value);
					}
					if (key.includes("quantity") && subKey.includes("value")) {
						calculation[id].value.total = getTotal(value, ind.unitary);
					}
				}
				data[index].value.subTotal = getSubTotal(calculation);
				data[index].value.total = getFinalTotal(
					data[index].value.gtoFactor,
					data[index].value.subTotal,
				);

				result.value =
					result?.getResult !== undefined
						? result.getResult(data[index].area.value, data[index].value.total)
						: data[index].value.total / data[index].area.value;
			}
		},
		updateBigPicture(state, action: PayloadAction<any>) {
			const { index, key, subKey, value } = action.payload;
			if (index !== undefined && key !== undefined && value !== undefined) {
				const { bigPicture, data } = state;
				const { age, vut, getSubTotal, getTotal } = bigPicture[index];
				if (subKey !== undefined) {
					bigPicture[index][key][subKey] = value;
					if (subKey.includes("age")) {
						age.factor = age.getFactor(age.value, vut);
					}
				} else {
					bigPicture[index][key] = value;
					if (key.includes("vut")) {
						age.factor = age.getFactor(age.value, vut);
					}
				}
				state.bigPicture = bigPicture.map((item: any, id: number) => {
					item.age.factor = age.getFactor(item.age.value, item.vut);
					item.subTotal = getSubTotal(
						item.age.factor,
						item.stateOfConservation.value,
						data[id].value.result.value,
					);
					item.total = getTotal(item.subTotal, data[id].area.value);
					return item;
				});

				state.total = bigPicture.reduce(
					(previous: number, current: any) => previous + Number(current.total),
					0,
				);
			}
		},
	},
	extraReducers: (builder) => {},
});

export const {
	addRow,
	removeRow,
	addDataCalculationRow,
	removeDataCalculationRow,
	updateData,
	updateDataCalculation,
	updateBigPicture,
} = slice.actions;
export const getState = (state: RootState) => state.supplementaryWorks;
export default slice.reducer;
