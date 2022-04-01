/** @format */

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
		const id = documentation[key].data.length + 1;
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

export const handleUpdateOperationValues = (state: any) => {
	const { factors, documentation } = state;
	const { Area } = documentation;
	const { Zone, Results } = factors;
	Area.data = Area.handleDataFactors(Area.subject, Area.data, Zone.data);
	Zone.results = Zone.handleResults(Area.data);
	Results.data = Results.operation(Results.data, factors);
	return state;
};
