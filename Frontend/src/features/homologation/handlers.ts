/** @format */

export const handlerAddRow = (state: any) => {
	const { factors, documentation } = state;
	for (const key in factors) {
		if (key !== "Location" && key !== "Zone") {
			const id = factors[key].data.length + 1;
			factors[key].data.push(factors[key].template(id));
		}
		if (key === "Location") {
			const id = factors[key].data.length + 1;
			factors[key].subject.map((item: any) => {
				item = item.insertion(`C${id}`, item);
				return item;
			});
			factors[key].data.push(factors[key].templateData(id));
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
