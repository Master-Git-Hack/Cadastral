/**
 * @format
 * @author Einar Jhordany Serna Valdivia
 */
import { buildingOptions } from "../types/homologation/factors/building";
import { classificationOptions } from "../types/homologation/factors/classification";
import { levelOptions } from "../types/homologation/factors/level";
import { projectOptions } from "../types/homologation/factors/project";
import { qualityOptions } from "../types/homologation/factors/quality";
import { topographyOptions } from "../types/homologation/factors/topography";
import { typeFormOptions } from "../types/homologation/factors/typeForm";
import { usageOptions } from "../types/homologation/factors/usage";
import { symbolsOptions } from "../types/homologation/factors/symbols";

export const surfaceCalculation=(factors:any,root:number)=>factors.surface.data.map((item:any,index:number)=>{
	for(const factor in factors){
		if(factor !=="surface"){
			if(factors[factor].isUsed){
				if(factors[factor].data[index]){
					item.result += factors[factor].data[index].result;
				}
			}
		}
	}

})
export const getUsedFactors = (factors: any) => {
	const usedFactors: any = {};
	for (const factor in factors) {
		if (factors[factor].isUsed) {
			usedFactors[factor] = factors[factor];
		}
	}
	return usedFactors;
};

export const getFactorsTag = (factors: any) => {
	const factorsTag: Array<string> = [];
	for (const factor in factors) {
		factorsTag.push(factors[factor].tag);
	}
	return factorsTag;
};
export const countFactors = (factors: any) => {
	let count = 0;
	for (let factor in factors) {
		if (factors[factor].isUsed) {
			if (factors[factor].isUsed) {
				count++;
			}
		}
	}
	return count;
};
export const factorsResult = (factors: any) => {
	const { data } = factors.results;
	const length = data.length;
	for (let i = 0; i < length; i++)
		for (const factor in factors)
			if (factor !== "results")
				if (factors[factor].isUsed)
					data[i].value *= (
						(factor==="surface")
						?
						(factors[factor].data[i].value)
						:
						(
							(factor !== "location" && factor !== "zone") 
							?
							(factors[factor].data[i].result) 
							:
							(factors[factor].results[i].value)
						)
					);
	return factors.results;
};
export const addValueToLocationZone = (items: any) => {
	const id = items.length + 1;
	items.push({ id, ...items[id - 2] });
	return items;
};
export const removeValueToLocationZone = (items: any) => {
	items.pop();
	return items;
};
export const calculationLocationZone = (items: any) => {
	const columns = getObjectKey(items[0]).filter((key: string) => key.includes("C"));
	const results = columns.map((column: string) =>
		items
			.map((item: any) => ({
				percentage: item.percentage,
				[column]: item[column],
			}))
			.reduce(
				(previous: number, current: any) =>
					previous + (current.percentage / 100) * current[column].value,
				1,
			),
	);
	return results.map((item: number, index: number) => ({ id: index + 1, value: item }));
};

const addColumns = (object: any) => {
	const length = getObjectKey(object).filter((key: string) => key.includes("C")).length;
	object[`C${length + 1}`] = object.C1;
	return object;
};
const deleteColumns = (object: any) => {
	const length = getObjectKey(object).filter((key: string) => key.includes("C")).length;
	if (length > 1) {
		delete object[`C${length}`];
	}
	return object;
};
export const addValueToUsedFactors = (factors: any) => {
	for (const factor of getObjectKey(factors)) {
		if (factor !== "location" && factor !== "zone" && factor !== "surface") {
			const { length } = factors[factor].data;
			const { subject, isUsed } = factors[factor];
			if (isUsed) {
				factors[factor].data.push({ id: length + 1, ...subject, result: 1 });
			}
			if (factor === "results") {
				factors[factor].data.push({ id: length + 1, ...factors[factor].data[length - 1] });
			}
		} else {
			if (factor === "surface") {
				const { length } = factors[factor].data;
				factors[factor].data.push({ id: length + 1, value: 1 });
			} else {
				const { length } = factors[factor].results;
				const { data, isUsed, results } = factors[factor];
				if (isUsed) {
					factors[factor].data[0] = addColumns(data[0]);
					factors[factor].results.push({ id: length + 1, ...results[0] });
				}
			}
		}
	}
	return factors;
};
export const removeValueFromUsedFactors = (factors: any) => {
	for (const factor of getObjectKey(factors)) {
		if (factor !== "location" && factor !== "zone") {
			const { length } = factors[factor].data;
			const { isUsed } = factors[factor];
			if (isUsed) if (length > 1) factors[factor].data.pop();
			if (factor === "results") if (length > 1) factors[factor].data.pop();
		} else {
			const { data, isUsed } = factors[factor];
			if (isUsed) {
				const { length } = factors[factor].results;
				factors[factor].data[0] = deleteColumns(data[0]);
				if (length > 1) factors[factor].results.pop();
			}
		}
	}
	return factors;
};
export const addValueToHomologations = (homologation: any) => {
	for (const item of getObjectKey(homologation)) {
		const length = homologation[item].data.length;
		if (item === "salesCosts") {
			homologation[item].data.push({ id: length + 1, value: 1,unitaryCost:1 });
		}
		else{
			homologation[item].data.push({ id: length + 1, value: 1 });
		}
		if (item === "weightingPercentage") {
			homologation[item].data.map((current: any) => (current.value = 100 / (length + 1)));
		}
	}
	return homologation;
};
export const removeValueFromHomologations = (homologation: any) => {
	for (const item of Object.keys(homologation))
		if (homologation[item].data.length > 1) homologation[item].data.pop();
	return homologation;
};
export const getObjectKey = (items: any) => Object.keys(items);
export const findOption = (name: string, type: string, option: string, value: any) => {
	switch (name) {
		case "building":
			return buildingOptions.find((item: any) =>
				option === "value" ? item.value === value : item.type === value,
			);
		case "classification":
			return classificationOptions.find((item: any) =>
				option === "value" ? item.value === value : item.type === value,
			);
		case "level":
			return levelOptions.find((item: any) => item.type === value);
		case "project":
			return projectOptions.find((item: any) =>
				option === "value" ? item.value === value : item.type === value,
			);
		case "quality":
			return qualityOptions.find((item: any) =>
				option === "value" ? item.value === value : item.type === value,
			);
		case "topography":
			return topographyOptions(type).find((item: any) =>
				option === "value" ? item.value === value : item.type === value,
			);
		case "typeForm":
			return typeFormOptions(type).find((item: any) =>
				option === "value" ? item.value === value : item.type === value,
			);
		case "usage":
			return usageOptions.find((item: any) =>
				option === "value" ? item.value === value : item.type === value,
			);
		case "location":
			return symbolsOptions.find((item: any) => item.value === value);
		case "zone":
			return symbolsOptions.find((item: any) => item.value === value);
		default:
			return value;
	}
};
export const searchByType = (options: any, type: string) =>
	options.find((option: any) => option.type === type);

export const searchByValue = (options: any, value: number) =>
	options.find((option: any) => option.value === value);
/**
 * @param value number that will be converted to a string displaying a representative character as $ or % in case you need it
 * @param isCurrency boolean that will be used to determine if the value will be converted to a currency or not
 * @param isPercentage boolean that will be used to determine if the value will be converted to a percentage or not
 * @param decimals number that will be used to determine the number of decimals to be displayed
 * @returns a string that represents the value in the desired format (currency or percentage or decimal)
 * @example toFancyNumber(123456789, true, false, 2) // returns "$1,234,567.89"
 * @example toFancyNumber(123456789, false, true, 2) // returns "1234567.89%"
 * @example toFancyNumber(123456789, false, false, 2) // returns "1234567.89"
 * @example toFancyNumber(123456789, false, false, 0) // returns "1234567"
 */
export const toFancyNumber: Function = (
	value: number,
	isCurrency: boolean = false,
	isPercentage: boolean = false,
	decimals: number = 2,
): string =>
	new Intl.NumberFormat("es-MX", {
		style: isCurrency ? "currency" : isPercentage ? "percent" : "decimal",
		minimumFractionDigits: decimals,
		currency: isCurrency ? "MXN" : undefined,
	}).format(isPercentage && !isCurrency ? value / 100 : value);

/**
 * @param value number that will round to the nearest tenth
 * @param decimals number that will be used to determine the rounding precision
 * @returns a number that represents the value rounded to the nearest tenth
 * @example
 *
 */
export const roundToTenth = (value: number, decimals: number = 1): number =>
	Number((value / 10).toString().split(".")[1][0]) <= 5
		? Math.floor(value / Math.pow(10, decimals)) * Math.pow(10, decimals)
		: Math.ceil(value / Math.pow(10, decimals)) * Math.pow(10, decimals);
