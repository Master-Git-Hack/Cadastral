/** @format */
import { roundToTenth } from "../../utils/utils";
export const handlerAddRow = (state: any) => {
	const { factors, documentation } = state;
	for (const key in factors) {
		const id = factors[key].data.length + 1;
		if (key !== "Location" && key !== "Zone") {
			factors[key].data.push(factors[key].template(id));
		}
		if (key === "Location" || key === "Zone") {
			factors[key].subject.map((item: any) => {
				item = item.insertion(`C${id}`, item);
				return item;
			});
			factors[key].data.push(factors[key].templateData(id));
			if (key === "Zone") {
				factors[key].results.push(factors[key].templateResults(id));
			}
		}
	}
	for (const key in documentation) {
		const id =
			!key.includes("ReFactor") && !key.includes("Indiviso")
				? documentation[key]?.data.length + 1
				: 0;
		if (key.includes("Area") || key.includes("WeightingPercentage")) {
			const { type } = state.record.homologacion;
			documentation[key].data.push(documentation[key].template(id, type));
			if (key.includes("WeightingPercentage")) {
				documentation[key].data.map((item: any) => (item.value = 100 / id));
			}
		}
		if (key.includes("SalesCost")) {
			documentation[key].data.push(documentation[key].template(id));
			documentation[key].results.push(documentation[key].templateResults(id));
		}
	}
	return {
		factors,
		documentation,
	};
};
export const handlerRemoveRow = (state: any) => {
	const { factors, documentation } = state;
	for (const key in factors) {
		const length = factors[key].data.length;
		if (length > 1) {
			if (key !== "Location" && key !== "Zone") {
				factors[key].data.pop();
			}
			if (key === "Location") {
				const id = factors[key].data.length;
				factors[key].subject.map((item: any) => {
					delete item[`C${id}`];
					return item;
				});
				factors[key].data.pop();
			}
		}
	}
	return {
		factors,
		documentation,
	};
};
const handleSalesCost = (
	SalesCost: any,
	Area: any,
	Results: any,
	WeightingPercentage: any,
	factor: number = 1,
) => {
	/*SalesCost.data = SalesCost.operation(SalesCost.data, Area.data);
	SalesCost.results = SalesCost.operationResults(SalesCost, Results.data);
	SalesCost.averageUnitCost = SalesCost.handleAverageUnitCostValue(SalesCost.calculateAverageUnitCostValue(
		SalesCost.results,
		WeightingPercentage.data,
	))*/
	const {
		operation,
		operationResults,
		handleAverageUnitCostValue,
		calculateAverageUnitCostValue,
		results,
		data,
	} = SalesCost;
	SalesCost.data = operation(data, Area);
	SalesCost.results = operationResults(SalesCost, Results);
	SalesCost.averageUnitCost = handleAverageUnitCostValue(
		calculateAverageUnitCostValue(results, WeightingPercentage),
		factor,
	);
	return SalesCost;
};
export const handleUpdateOperationValues = (state: any) => {
	const { factors, documentation, record } = state;
	const { type } = record.homologacion;
	const { Area, SalesCost, WeightingPercentage, ReFactor, Indiviso } = documentation;
	const { Zone, Results, Surface } = factors;
	let resultReFactor = 1;
	Area.data = Area.handleDataFactors(Area.subject, Area.data, Zone.data);
	Zone.results = Zone.handleResults(Area.data);
	Results.data = Results.operation(Results.data, factors);

	documentation.SalesCost = handleSalesCost(
		SalesCost,
		Area.data,
		Results.data,
		WeightingPercentage.data,
		resultReFactor,
	);

	WeightingPercentage.total = WeightingPercentage.calculation(WeightingPercentage.data);

	Area.averageLotArea.value = Area.averageLotArea.operation(Area.data);

	Surface.data = Surface.operation(Area, Surface);

	Results.data = Results.operation(Results.data, factors);

	//refactor
	ReFactor.surface.value = ReFactor.operation(
		Area.averageLotArea.value,
		Area.averageLotArea.surface,
		ReFactor.root,
	);

	if (type.includes("TERRENO")) {
		ReFactor.result.value = ReFactor.handleResult(ReFactor.surface.value, ReFactor.form.value);
		resultReFactor = ReFactor.result.value;
	} else resultReFactor = ReFactor.surface.value;

	documentation.SalesCost = handleSalesCost(
		SalesCost,
		Area.data,
		Results.data,
		WeightingPercentage.data,
		resultReFactor,
	);

	//indiviso
	if (type.includes("TERRENO")) {
		documentation.Indiviso = Indiviso.operation(Indiviso, Area.subject.value);
	}

	return state;
};
