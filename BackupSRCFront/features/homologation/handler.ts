/**
 * @format
 * @author Einar Jhordany Serna Valdivia
 */
import { buildingOptions } from "../../types/homologation/factors/building";
import { classificationOptions } from "../../types/homologation/factors/classification";
import { levelOptions } from "../../types/homologation/factors/level";
import { projectOptions } from "../../types/homologation/factors/project";
import { qualityOptions } from "../../types/homologation/factors/quality";
import { topographyOptions } from "../../types/homologation/factors/topography";
import { typeFormOptions } from "../../types/homologation/factors/typeForm";
import { usageOptions } from "../../types/homologation/factors/usage";
import { symbolsOptions } from "../../types/homologation/factors/symbols";

import { roundToTenth } from "../../utils/utils";
export const validateErrors = (state: any) => {
	const errors: any = [];
	const { homologation, factors, type } = state;
	const { location, zone } = factors;
	const { areas } = homologation;
	location.data.map((item: any, index: number) => {
		if (item.observations === "")
			errors.push(`C${index + 1}, en el campo de ${location.name} se encuentra vacio.`);
		return item;
	});
	zone.data.map((item: any, index: number) => {
		if (item.observations === "")
			errors.push(`C${index + 1}, en el campo de ${zone.name} se encuentra vacio.`);
		return item;
	});
	areas.data.map((item: any, index: number) => {
		const { address } = item;
		const { characteristics, link, street, suburb } = address;
		if (characteristics === "")
			errors.push(
				`C${
					index + 1
				}, en el campo de informacion referente a la direccion se encuntra vacio el campo de --Características-- se encuentra vacio.`,
			);
		if (link === "")
			errors.push(
				`C${
					index + 1
				}, en el campo de informacion referente a la direccion se encuntra vacio el campo de --LINK PARA REVISIÓN-- se encuentra vacio.`,
			);
		if (street === "")
			errors.push(
				`C${
					index + 1
				}, en el campo de informacion referente a la direccion se encuntra vacio el campo de --Calle y/o Numero-- se encuentra vacio.`,
			);
		if (suburb === "")
			errors.push(
				`C${
					index + 1
				}, en el campo de informacion referente a la direccion se encuntra vacio el campo de --Colonia-- se encuentra vacio.`,
			);
		if (address.type === "")
			errors.push(
				`C${
					index + 1
				}, en el campo de informacion referente a la direccion se encuntra vacio el campo de -${
					type === "TERRENO" ? "Uso de suelo" : "Tipo Construcción"
				}-- se encuentra vacio.`,
			);
		return item;
	});
	return errors;
};

export const handleHomologationUpdate = (state: any) => {
	const { type, factors, homologation } = state;
	const { salesCosts, areas, weightingPercentage, reFactor, indiviso } = homologation;

	//handle results data only
	factors.results.data = factorsResult(factors);

	const { results, surface, zone } = factors;
	//handle homologation only
	salesCosts.data.map((item: any, index: number) => {
		item.unitaryCost = item.value / areas.data[index].value;
		return item;
	});

	salesCosts.results = calculateResultantUnitaryCost(results.data, salesCosts);

	salesCosts.averageUnitCost.value = calculateAverageUnitCost(
		salesCosts.results,
		weightingPercentage.data,
	);

	salesCosts.averageUnitCost.roundedValue = roundToTenth(salesCosts.averageUnitCost.value, 1);

	salesCosts.averageUnitCost.result = salesCosts.averageUnitCost.roundedValue;

	weightingPercentage.total = calculateWeightingPercentage(weightingPercentage.data);

	areas.averageLotArea.value = calculateAverageLotArea(areas.data);

	//handle factors Only
	surface.data = calculateSurface(surface.data, areas.data, areas.averageLotArea.value, type);

	factors.zone = updateZoneAnalytics(zone);
	factors.results.data = factorsResult(factors);
	//handle reFactor Only
	if (type === "TERRENO") {
		reFactor.data[0].value = (areas.averageLotArea.value / reFactor.surface.value) ** (1 / 12);
		reFactor.factorResult.value = reFactor.data.reduce(
			(previous: number, current: any) => previous * Number(current.value),
			1,
		);
	} else {
		reFactor.factorResult.value =
			(areas.averageLotArea.value / areas.subject.value) ** (1 / 12);
	}
	//handle averageUnitCost

	salesCosts.results = calculateResultantUnitaryCost(results.data, salesCosts);

	salesCosts.averageUnitCost.value = calculateAverageUnitCost(
		salesCosts.results,
		weightingPercentage.data,
	);

	salesCosts.averageUnitCost.roundedValue = roundToTenth(salesCosts.averageUnitCost.value, 1);

	salesCosts.averageUnitCost.result = salesCosts.averageUnitCost.roundedValue;
	salesCosts.averageUnitCost.result =
		reFactor.factorResult.value * salesCosts.averageUnitCost.roundedValue;

	//handle indiviso
	if (type === "TERRENO") {
		indiviso.indiviso = indiviso.private / indiviso.surface;
		indiviso.result = indiviso.indiviso * areas.subject.value;
	} else {
		salesCosts.averageUnitCost.result =
			reFactor.factorResult.value * salesCosts.averageUnitCost.roundedValue;
	}

	return {
		factors: {
			...factors,
			surface,
			results,
		},
		homologation: {
			...homologation,
			salesCosts,
			areas,
			reFactor,
		},
		averageUnitCost: roundToTenth(salesCosts.averageUnitCost.result, 1),
		...state,
	};
};
const updateZoneAnalytics = (zone: any) => {
	const { district, factor1, factor2 } = zone.subject;
	zone.analytics.map((item: any, index: number) => {
		const f1Value =
			factor1.type === "percentage"
				? district.percentage / item.district.percentage
				: (district[factor1.type] / item.district[factor1.type]) ** (1 / factor1.root);
		item.factor1.value = f1Value;
		const f2Value =
			factor2.type === "percentage"
				? district.percentage / item.district.percentage
				: factor2.type === "useZoneResults"
				? zone.results[index].value
				: (district[factor2.type] / item.district[factor2.type]) ** (1 / factor2.root);
		item.factor2.value = f2Value;
		item.factor1.result = f1Value * f2Value;
		item.factor2.result = item.factor1.result * zone.results[index].value;
		return item;
	});
	return zone;
};
export const calculateWeightingPercentage = (data: any) =>
	data.reduce((prev: number, curr: any) => prev + Number(curr.value), 0);
/*
export const handleHomologationUpdate = (state: any) => {
	const { data } = state.factors.results;
	const { salesCosts } = state.homologation;
	state.homologation.salesCosts.results = calculateResultantUnitaryCost(data, salesCosts);
	const weightingPercentage = state.homologation.weightingPercentage.data;
	state.homologation.salesCosts.averageUnitCost = calculateAverageUnitCost(
		salesCosts.results,
		weightingPercentage,
	);
	state.homologation.weightingPercentage.total = weightingPercentage.reduce(
		(prev: number, curr: any) => prev + Number(curr.value),
		0,
	);
	const { averageUnitCost } = state.homologation.salesCosts;
	state.reFactor.averageUnitCost.value = averageUnitCost;

	const { areas } = state.homologation;
	const { surface } = state.factors;
	const { type } = state;
	state.homologation.areas.averageLotArea = calculateAverageLotArea(areas.data);
	state.reFactor.averageLotArea.value = areas.averageLotArea;
	state.factors.surface.data = calculateSurface(
		surface.data,
		areas.data,
		areas.averageLotArea,
		type,
	);
	const {value} = state.reFactor.averageUnitCost
	state.reFactor.averageUnitCost.value = roundToTenth(Number(value), 1);
	if(type === "TERRENO"){
		const {areaSubject,averageLotArea} =state.reFactor;
		state.reFactor.factors[0].value = ((averageLotArea.value/areaSubject.value)**(1/12));
		const {factors} = state.reFactor
		state.reFactor.factorResult.value = factors.reduce((prev:number,curr:any)=>prev*Number(curr.value),1);
		state.reFactor.averageUnitCost.result

	}

	return state;
};*/
export const calculateAverageUnitCost = (salesCosts: any, weightingPercentage: any) =>
	salesCosts.reduce(
		(previous: number, current: any, index: number) =>
			previous + Number(current.value * (weightingPercentage[index].value / 100)),
		0,
	);
export const calculateResultantUnitaryCost = (resultantFactor: any, salesCosts: any) =>
	salesCosts.results.map((item: any, index: number) => {
		item.value =
			Number(resultantFactor[index].value) * Number(salesCosts.data[index].unitaryCost);
		return item;
	});

export const calculateSurface = (surface: any, areas: any, value: number, type: string) =>
	surface.map((item: any, index: number) => {
		item.value = (areas[index].value / value) ** (1 / (type === "TERRENO" ? 12 : 8));
		return item;
	});
export const calculateAverageLotArea = (areas: any) =>
	areas.reduce((previous: number, current: any) => previous + Number(current.value), 0) /
	areas.length;
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
export const factorsResult = (factors: any) =>
	factors.results.data.map((item: any, index: number) => {
		item.value = 1;
		for (const factor in factors)
			if (factors[factor].isUsed) {
				if (factor === "surface" || factor === "commercial") {
					item.value *= factors[factor].data[index].value;
				} else if (
					factor !== "location" &&
					factor !== "zone" &&
					factor !== "surface" &&
					factor !== "commercial"
				) {
					item.value *= factors[factor].data[index].result;
				} else if (factor === "location") {
					item.value *= factors[factor].results[index].value;
				} else if (factor === "zone") {
					item.value *= factors[factor].analytics[index].factor1.result;
				}
			}
		return item;
	});
export const addValueToLocationZone = (items: any) => {
	const id = items.length + 1;
	items.push({ id, ...items[id - 2] });
	return items;
};
export const removeValueToLocationZone = (items: any) => {
	if (items.length > 1) items.pop();
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
const addValue=(state:any)=>{
	const {factors,homologation}=state;
	
	for(const key in factors){
		const length = factors[key].data.length;
		if (
			key !== "location" &&
			key !== "zone"
		) {
			factors[key].data.push(factors[key].handleInsert(length+1))
		}
		else{
			factors[key].data.map((item:any,index:number)=>{
				item = item.handleInsert(index+1);
			})
			factors[key].results.push(factors[key].handleInsert(length+1))
		}
	}
}
export const addValueToUsedFactors = (factors: any) => {
	for (const factor of getObjectKey(factors)) {
		let length = factors[factor].data.length;
		if (
			factor !== "location" &&
			factor !== "zone" &&
			factor !== "surface" &&
			factor !== "commercial"
		) {
			const { subject, isUsed } = factors[factor];
			if (isUsed) {
				factors[factor].data.push({ id: length + 1, ...subject, result: 1 });
			}
			if (factor === "results") {
				factors[factor].data.push({ id: length + 1, ...factors[factor].data[length - 1] });
			}
		} else {
			if (factor === "surface" || factor === "commercial") {
				factors[factor].data.push({ id: length + 1, ...factors[factor].data[length - 1] });
			} else {
				length = factors[factor].results.length;
				const { data, isUsed } = factors[factor];
				if (isUsed) {
					factors[factor].data[0] = addColumns(data[0]);
					factors[factor].results.push({ id: length + 1, value: 1 });
					if (factor === "zone") {
						factors[factor].analytics.push({
							id: length + 1,
							...factors[factor].analytics[length - 1],
						});
					}
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
		if (item !== "reFactor" && item !== "indiviso") {
			const length = homologation[item].data.length;
			if (item === "salesCosts") {
				homologation[item].data.push({ id: length + 1, value: 1, unitaryCost: 1 });
				homologation[item].results.push({ id: length + 1, value: 1 });
			} else {
				homologation[item].data.push({ id: length + 1, value: 1 });
				if (item === "weightingPercentage") {
					homologation[item].data.map(
						(current: any) => (current.value = 100 / (length + 1)),
					);
				} else {
					homologation[item].data[length] = {
						...homologation[item].data[length - 1],
					};
				}
			}
		}
	}
	return homologation;
};
export const removeValueFromHomologations = (homologation: any) => {
	for (const item of Object.keys(homologation))
		if (item !== "reFactor" && item !== "indiviso")
			if (homologation[item].data.length > 1) {
				homologation[item].data.pop();
				if (item === "weightingPercentage") {
					homologation[item].data.map(
						(current: any) => (current.value = 100 / homologation[item].data.length),
					);
				}
			}
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
			return topographyOptions.find((item: any) =>
				option === "value" ? item.value === value : item.type === value,
			);
		case "typeForm":
			return typeFormOptions.find((item: any) =>
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

