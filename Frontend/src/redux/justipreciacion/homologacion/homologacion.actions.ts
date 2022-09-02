/** @format */
export const positions = (type: boolean) => {
	const factors = {
		[!type ? 4 : 13]: { key: "Age", isUsed: !type },
		[!type ? 5 : 7]: { key: "Building", isUsed: !type },
		[type ? 0 : 9]: { key: "Classification", isUsed: type },
		[type ? 11 : 12]: { key: "Commercial", isUsed: true },
		[!type ? 6 : 8]: { key: "Level", isUsed: !type },
		[type ? 1 : 3]: { key: "Location", isUsed: true },
		[!type ? 1 : 9]: { key: "Project", isUsed: !type },
		[!type ? 7 : 10]: { key: "Quality", isUsed: !type },
		[type ? 6 : 0]: { key: "Surface", isUsed: true },
		[type ? 5 : 8]: { key: "Topography", isUsed: true },
		[type ? 2 : 10]: { key: "TypeForm", isUsed: type },
		[type ? 3 : 11]: { key: "Usage", isUsed: type },
		[type ? 4 : 2]: { key: "Zone", isUsed: true },
	};

	return new Array(type ? 12 : 13).fill(0).map((_, i) => {
		return {
			...factors[i],
		};
	});
};
/**
 * It adds a row to the table
 * @param {any} state - any
 * @returns The factors and documentation objects are being returned.
 */

export const addRowFN = (state: any) => {
	const { factors, documentation, record, handlers } = state;

	for (const key in factors) {
		const { subject, data, results } = factors[key];
		const { template, insertColumn, templateData, templateResults } = handlers[key];
		const id = data.length + 1;
		key !== "Location" && key !== "Zone" && data.push(template(id));
		if (key === "Location" || key === "Zone") {
			subject.map((item: any) => {
				item = insertColumn(`C${id}`, item);
				return item;
			});
			data.push(templateData(id));
			key === "Zone" && results.push(templateResults(id));
		}
	}
	for (const key in documentation) {
		const { data, results } = documentation[key];
		const length = data !== undefined ? data.length : 0;
		if (Object(handlers[key]).hasOwnProperty("template")) {
			const { template, templateResults } = handlers[key];
			const id = !key.includes("ReFactor") && !key.includes("Indiviso") ? length + 1 : 0;
			if (key.includes("Area") || key.includes("WeightingPercentage")) {
				const { type } = record;
				data.push(template(id, type));

				key.includes("WeightingPercentage") &&
					data.map((item: any) => (item.value = 100 / id));
			}
			key.includes("SalesCost") &&
				data.push(template(id)) &&
				results.push(templateResults(id));
		}
	}
	return {
		factors,
		documentation,
	};
};
/**
 * It removes the last row of the factors and documentation objects
 * @param {any} state - the current state of the application
 * @returns an object with the factors and documentation properties.
 */
export const rmRowFN = (state: any) => {
	const { factors, documentation } = state;
	for (const key in factors) {
		const { data, subject } = factors[key];
		const { length } = data;
		if (length > 1) {
			key !== "Location" && key !== "Zone" && data.pop();
			if (key === "Location") {
				const id = length;
				subject.map((item: any) => {
					delete item[`C${id}`];
					return item;
				});
				data.pop();
			}
		}
	}
	for (const key in documentation) {
		const { data, results } = documentation[key];
		const length = data !== undefined ? data.length : 0;
		const id = !key.includes("ReFactor") && !key.includes("Indiviso") ? length : 0;
		if (key.includes("Area") || key.includes("WeightingPercentage")) {
			id > 1 && data.pop();
		}
		key.includes("SalesCost") && id > 1 && data.pop() && results.pop();
	}
	return {
		factors,
		documentation,
	};
};
/**
 * It takes in a SalesCost object, an Area object, a Results object, a WeightingPercentage object, and
 * a factor, and returns a SalesCost object.
 * @param {any} SalesCost - any,
 * @param {any} Area - The Area object
 * @param {any} Results - The results of the previous calculation.
 * @param {any} WeightingPercentage - This is the percentage of the total sales that each product
 * represents.
 * @param {number} [factor=1] - number = 1,
 * @returns SalesCost
 */
const handleSalesCost = (
	SalesCost: any,
	Area: any,
	Results: any,
	WeightingPercentage: any,
	factor: number = 1,
	handlers: any,
) => {
	/*SalesCost.data = SalesCost.operation(SalesCost.data, Area.data);
	SalesCost.results = SalesCost.operationResults(SalesCost, Results.data);
	SalesCost.averageUnitCost = SalesCost.handleAverageUnitCostValue(SalesCost.calculateAverageUnitCostValue(
		SalesCost.results,
		WeightingPercentage.data,
	))*/
	const { results, data } = SalesCost;
	SalesCost.data = handlers.SalesCost.operation(data, Area);
	SalesCost.results = handlers.SalesCost.operationResults(SalesCost, Results);
	SalesCost.averageUnitCost = handlers.SalesCost.handleAverageUnitCostValue(
		handlers.SalesCost.calculateAverageUnitCostValue(results, WeightingPercentage),
		factor,
		SalesCost.averageUnitCost.roundedTo,
		SalesCost.averageUnitCost.roundedResult,
	);
	return SalesCost;
};
/**
 * It updates the values of the factors and documentation objects
 * @param {any} state - the state of the application
 * @returns The state of the application.
 */
export const updateValuesFN = (state: any) => {
	const {
		factors,
		documentation,
		record: { type },
		handlers,
	} = state;
	const { Zone, Results, Surface } = factors;
	const { Area, WeightingPercentage, ReFactor, Indiviso } = documentation;
	let resultReFactor = 1;
	Area.data = handlers.Area.handleDataFactors(Area.subject, Area.data, Zone.data);
	Zone.results = handlers.Zone.handleResults(Area.data);
	Results.data = handlers.Results.operation(Results.data, factors);

	documentation.SalesCost = handleSalesCost(
		documentation.SalesCost,
		Area.data,
		Results.data,
		WeightingPercentage.data,
		resultReFactor,
		handlers,
	);

	WeightingPercentage.total = handlers.WeightingPercentage.calculation(WeightingPercentage.data);

	Area.averageLotArea.value = handlers.Area.operationAverageLotArea(Area.data);

	Surface.data = handlers.Surface.operation(Area, Surface);

	Results.data = handlers.Results.operation(Results.data, factors);

	//refactor
	ReFactor.surface.value = handlers.ReFactor.operation(
		Area.averageLotArea.value,
		type.includes("TERRENO") ? Area.averageLotArea.surface : Area.subject.value,
		ReFactor.root,
	);

	if (type.includes("TERRENO")) {
		ReFactor.result.value = handlers.ReFactor.handleResult(
			ReFactor.surface.value,
			ReFactor.form.value,
		);
		resultReFactor = ReFactor.result.value;
	} else resultReFactor = ReFactor.surface.value;

	documentation.SalesCost = handleSalesCost(
		documentation.SalesCost,
		Area.data,
		Results.data,
		WeightingPercentage.data,
		resultReFactor,
		handlers,
	);

	//indiviso
	if (type.includes("TERRENO")) {
		documentation.Indiviso = handlers.Indiviso.operation(Indiviso, Area.subject.value);
	}
	state.errors = checkErrors(state);
	return state;
};

/**
 * It takes a state object and returns an array of objects that contain errors
 * @param {any} state - the state of the application
 * @returns An array of objects.
 */

export const checkErrors = (state: any) => {
	const errors = [];
	const { factors, documentation } = state;
	const { Location, Zone, Surface } = factors;
	const { data } = documentation.Area;
	const { ReFactor, observations } = documentation;
	const { root } = Surface;
	const { roundedTo, roundedResult } = documentation.SalesCost.averageUnitCost;
	for (let i = 0; i < data.length; i++) {
		const { address } = data[i];
		Location.subject[i] !== undefined &&
			Location.subject[i].observations.trim() === "" &&
			errors.push({
				title: "Factor de Ubicación",
				message: "El campo esta vacio",
				reference: `la fila ${i + 1}`,
			});

		Zone.subject[i] !== undefined &&
			Zone.subject[i].observations.trim() === "" &&
			errors.push({
				title: "Factor de Zona",
				message: "El campo esta vacio",
				reference: `la fila ${i + 1}`,
			});

		address.colony.trim() === "" &&
			errors.push({
				title: "Apartado de Colonia",
				message: "El campo esta vacio",
				reference: `C${i + 1}`,
			});
		address.street.trim() === "" &&
			errors.push({
				title: "Apartado de Dirección",
				message: "El campo esta vacio",
				reference: `C${i + 1}`,
			});
		address.streetNumber === 0 &&
			address.hasNoStreetNumber === false &&
			errors.push({
				title: "Apartado de numero",
				message:
					"El campo esta vacio, si no tiene número de calle presione el switch para indicarlo",
				reference: `C${i + 1}`,
			});
		address.extras.observations.trim() === "" &&
			errors.push({
				title: "Apartado de Caracteristicas",
				message: "El campo esta vacio",
				reference: `C${i + 1}`,
			});
		address.extras.reference.trim() === "" &&
			errors.push({
				title: "Apartado de Consulta",
				message: "El campo esta vacio",
				reference: `C${i + 1}`,
			});
	}

	root.enabled &&
		root.observations.trim() === "" &&
		errors.push({
			title: "Factor de Superficie",
			message:
				"El campo fue activado para cambiar el valor predeterminado de la raiz aplicada, favor de justificar el motivo del cambio.",
			reference: "",
		});

	roundedTo.enabled &&
		roundedTo.observations.trim() === "" &&
		errors.push({
			title: "Factor de Superficie",
			message:
				"El campo fue activado para cambiar el valor predeterminado de redondeo, favor de justificar el motivo del cambio.",
			reference: "",
		});

	if (Location.subject.length > data.length) {
		for (let i = data.length; i < Location.subject.length; i++) {
			Location.subject[i].observations.trim() === "" &&
				errors.push({
					title: "Factor de Ubicación",
					message: "El campo esta vacio",
					reference: `la fila ${i + 1}`,
				});
		}
	}
	if (Zone.subject.length > data.length) {
		for (let i = data.length; i < Zone.subject.length; i++) {
			Zone.subject[i].observations.trim() === "" &&
				errors.push({
					title: "Factor de Zona",
					message: "El campo esta vacio",
					reference: `la fila ${i + 1}`,
				});
		}
	}
	observations !== undefined &&
		observations.trim() === "" &&
		errors.push({
			title: "Justificación de Factores",
			message:
				"No puede dejar el campo vacio, debe justificar la aplicación de los factores utilizados durante el ejercicio en curso.",
			reference: "",
		});

	if (ReFactor.root !== 8) {
		ReFactor.observation !== undefined &&
			ReFactor.observation.trim() === "" &&
			errors.push({
				title: `RAÍZ DEL ${ReFactor.surface.name}`,
				message:
					"El campo fue activado para cambiar el valor predeterminado de la raiz aplicada, favor de justificar el motivo del cambio.",
				reference: "",
			});
	}
	roundedResult.enabled &&
		roundedResult.observations.trim() === "" &&
		errors.push({
			title: "Valor Ajustado",
			message:
				"El campo fue activado para cambiar el valor predeterminado de redondeo, favor de justificar el motivo del cambio.",
			reference: "",
		});

	return errors;
};
