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
	for (const key in documentation) {
		const id =
			!key.includes("ReFactor") && !key.includes("Indiviso")
				? documentation[key]?.data.length
				: 0;
		if (key.includes("Area") || key.includes("WeightingPercentage")) {
			if (id > 1) {
				documentation[key].data.pop();
			}
		}
		if (key.includes("SalesCost")) {
			if (id > 1) {
				documentation[key].data.pop();
				documentation[key].results.pop();
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

export const handleRequest = (state: any) => ({
	factors: {
		Age: {
			subject: state.factors.Age.subject,
			data: state.factors.Age.data,
			isUsed: state.factors.Age.isUsed,
			position: state.factors.Age.position,
		},
		Building: {
			subject: state.factors.Building.subject,
			data: state.factors.Building.data,
			isUsed: state.factors.Building.isUsed,
			position: state.factors.Building.position,
		},
		Classification: {
			subject: state.factors.Classification.subject,
			data: state.factors.Classification.data,
			isUsed: state.factors.Classification.isUsed,
			position: state.factors.Classification.position,
		},
		Commercial: {
			data: state.factors.Commercial.data,
			isUsed: state.factors.Commercial.isUsed,
			position: state.factors.Commercial.position,
		},
		Level: {
			subject: state.factors.Level.subject,
			data: state.factors.Level.data,
			isUsed: state.factors.Level.isUsed,
			position: state.factors.Level.position,
		},
		Location: {
			subject: state.factors.Location.subject,
			data: state.factors.Location.data,
			isUsed: state.factors.Location.isUsed,
			position: state.factors.Location.position,
		},
		Project: {
			subject: state.factors.Project.subject,
			data: state.factors.Project.data,
			isUsed: state.factors.Project.isUsed,
			position: state.factors.Project.position,
		},
		Quality: {
			subject: state.factors.Quality.subject,
			data: state.factors.Quality.data,
			isUsed: state.factors.Quality.isUsed,
			position: state.factors.Quality.position,
		},
		Results: {
			data: state.factors.Results.data,
			isUsed: state.factors.Results.isUsed,
			position: state.factors.Results.position,
		},
		Surface: {
			data: state.factors.Surface.data,
			isUsed: state.factors.Surface.isUsed,
			position: state.factors.Surface.position,
			root: state.factors.Surface.root,
		},
		Topography: {
			subject: state.factors.Topography.subject,
			data: state.factors.Topography.data,
			isUsed: state.factors.Topography.isUsed,
			position: state.factors.Topography.position,
		},
		TypeForm: {
			subject: state.factors.TypeForm.subject,
			data: state.factors.TypeForm.data,
			isUsed: state.factors.TypeForm.isUsed,
			position: state.factors.TypeForm.position,
		},
		Usage: {
			subject: state.factors.Usage.subject,
			data: state.factors.Usage.data,
			isUsed: state.factors.Usage.isUsed,
			position: state.factors.Usage.position,
		},
		Zone: {
			subject: state.factors.Zone.subject,
			data: state.factors.Zone.data,
			results: state.factors.Zone.results,
			isUsed: state.factors.Zone.isUsed,
			position: state.factors.Zone.position,
		},
	},
	documentation: {
		Area: {
			averageLotArea: state.documentation.Area.averageLotArea,
			subject: state.documentation.Area.subject,
			data: state.documentation.Area.data,
		},
		Indiviso: state.documentation.Indiviso,
		ReFactor: {
			surface: state.documentation.ReFactor.surface,
			form: state.documentation.ReFactor.form,
			result: state.documentation.ReFactor.result,
			root: state.documentation.ReFactor.root,
			isUsed: state.documentation.ReFactor.isUsed,
		},
		SalesCost: {
			averageUnitCost: state.documentation.SalesCost.averageUnitCost,
			data: state.documentation.SalesCost.data,
			results: state.documentation.SalesCost.results,
		},
		WeightingPercentage: {
			total: state.documentation.WeightingPercentage.total,
			data: state.documentation.WeightingPercentage.data,
		},
	},
	averageUnitCost: state.record.homologacion.hasIndiviso
		? state.SalesCost.averageUnitCost.adjustedValue
		: state.SalesCost.averageUnitCost.roundedValue,
	appraisalPurpose: state.record.homologacion.appraisalPurpose,
});
export const handleGetRequest = (state: any, initialState: any) => ({
	factors: {
		Age: {
			subject: state.factors.Age.subject,
			data: state.factors.Age.data,
			isUsed: state.factors.Age.isUsed,
			position: state.factors.Age.position,
			...initialState.factors.Age,
		},
		Building: {
			subject: state.factors.Building.subject,
			data: state.factors.Building.data,
			isUsed: state.factors.Building.isUsed,
			position: state.factors.Building.position,
			...initialState.factors.Building,
		},
		Classification: {
			subject: state.factors.Classification.subject,
			data: state.factors.Classification.data,
			isUsed: state.factors.Classification.isUsed,
			position: state.factors.Classification.position,
			...initialState.factors.Classification,
		},
		Commercial: {
			data: state.factors.Commercial.data,
			isUsed: state.factors.Commercial.isUsed,
			position: state.factors.Commercial.position,
			...initialState.factors.Commercial,
		},
		Level: {
			subject: state.factors.Level.subject,
			data: state.factors.Level.data,
			isUsed: state.factors.Level.isUsed,
			position: state.factors.Level.position,
			...initialState.factors.Level,
		},
		Location: {
			subject: state.factors.Location.subject,
			data: state.factors.Location.data,
			isUsed: state.factors.Location.isUsed,
			position: state.factors.Location.position,
			...initialState.factors.Location,
		},
		Project: {
			subject: state.factors.Project.subject,
			data: state.factors.Project.data,
			isUsed: state.factors.Project.isUsed,
			position: state.factors.Project.position,
			...initialState.factors.Project,
		},
		Quality: {
			subject: state.factors.Quality.subject,
			data: state.factors.Quality.data,
			isUsed: state.factors.Quality.isUsed,
			position: state.factors.Quality.position,
			...initialState.factors.Quality,
		},
		Results: {
			data: state.factors.Results.data,
			isUsed: state.factors.Results.isUsed,
			position: state.factors.Results.position,
			...initialState.factors.Results,
		},
		Surface: {
			data: state.factors.Surface.data,
			isUsed: state.factors.Surface.isUsed,
			position: state.factors.Surface.position,
			root: state.factors.Surface.root,
			...initialState.factors.Surface,
		},
		Topography: {
			subject: state.factors.Topography.subject,
			data: state.factors.Topography.data,
			isUsed: state.factors.Topography.isUsed,
			position: state.factors.Topography.position,
			...initialState.factors.Topography,
		},
		TypeForm: {
			subject: state.factors.TypeForm.subject,
			data: state.factors.TypeForm.data,
			isUsed: state.factors.TypeForm.isUsed,
			position: state.factors.TypeForm.position,
			...initialState.factors.TypeForm,
		},
		Usage: {
			subject: state.factors.Usage.subject,
			data: state.factors.Usage.data,
			isUsed: state.factors.Usage.isUsed,
			position: state.factors.Usage.position,
			...initialState.factors.Usage,
		},
		Zone: {
			subject: state.factors.Zone.subject,
			data: state.factors.Zone.data,
			results: state.factors.Zone.results,
			isUsed: state.factors.Zone.isUsed,
			position: state.factors.Zone.position,
			...initialState.factors.Zone,
		},
	},
	documentation: {
		Area: {
			averageLotArea: state.documentation.Area.averageLotArea,
			subject: state.documentation.Area.subject,
			data: state.documentation.Area.data,
			...initialState.documentation.Area,
		},
		Indiviso: state.documentation.Indiviso,
		ReFactor: {
			surface: state.documentation.ReFactor.surface,
			form: state.documentation.ReFactor.form,
			result: state.documentation.ReFactor.result,
			root: state.documentation.ReFactor.root,
			isUsed: state.documentation.ReFactor.isUsed,
			...initialState.documentation.ReFactor,
		},
		SalesCost: {
			averageUnitCost: state.documentation.SalesCost.averageUnitCost,
			data: state.documentation.SalesCost.data,
			results: state.documentation.SalesCost.results,
			...initialState.documentation.SalesCost,
		},
		WeightingPercentage: {
			total: state.documentation.WeightingPercentage.total,
			data: state.documentation.WeightingPercentage.data,
			...initialState.documentation.WeightingPercentage,
		},
	},
	...initialState,
	record: {
		...initialState.record,
		homologacion: {
			id: state.id,
			type: state.type,
			appraisalPurpose: state.appraisalPurpose,
			status: "exists",
		},
	},
});
