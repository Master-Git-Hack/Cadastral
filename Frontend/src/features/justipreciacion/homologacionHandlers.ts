/** @format */
/**
 * It adds a row to the table
 * @param {any} state - any
 * @returns The factors and documentation objects are being returned.
 */

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
/**
 * It removes the last row of the factors and documentation objects
 * @param {any} state - the current state of the application
 * @returns an object with the factors and documentation properties.
 */
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
		SalesCost.averageUnitCost.roundedTo,
	);
	return SalesCost;
};
/**
 * It updates the values of the factors and documentation objects
 * @param {any} state - the state of the application
 * @returns The state of the application.
 */
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
		type.includes("TERRENO") ? Area.averageLotArea.surface : Area.subject.value,
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
	state.errors = handleErrors(state);
	return state;
};
/**
 * It takes a state object and returns a new object with the same structure but with the insertion
 * property removed from the subject property of the Location and Zone factors
 * @param {any} state - any
 */

export const handleRequest = (state: any) => ({
	factores: {
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
			subject: state.factors.Location.subject.map((item: any) => {
				const { insertion, ...filtered } = item;
				return filtered;
			}),
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
			subject: state.factors.Zone.subject.map((item: any) => {
				const { insertion, ...filtered } = item;
				return filtered;
			}),
			data: state.factors.Zone.data,
			results: state.factors.Zone.results,
			isUsed: state.factors.Zone.isUsed,
			position: state.factors.Zone.position,
		},
	},
	resultado: {
		Area: {
			averageLotArea: {
				name: state.documentation.Area.averageLotArea.name,
				surface: state.documentation.Area.averageLotArea.surface,
				value: state.documentation.Area.averageLotArea.value,
				roundedTo: state.documentation.Area.averageLotArea.roundedTo,
			},
			subject: state.documentation.Area.subject,
			data: state.documentation.Area.data,
		},
		Indiviso: state.record.homologacion.type.includes("TERRENO")
			? {
					surface: state.documentation.Indiviso.surface,
					building: state.documentation.Indiviso.building,
					indiviso: state.documentation.Indiviso.indiviso,
					result: state.documentation.Indiviso.result,
			  }
			: {},
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
	valor_unitario: state.documentation.ReFactor.isUsed
		? state.documentation.SalesCost.averageUnitCost.adjustedValue
		: state.documentation.SalesCost.averageUnitCost.roundedValue,
	tipo_servicio: state.record.homologacion.appraisalPurpose,
	tipo: state.record.homologacion.type,
	registro: state.record.justipreciacion.register,
	id: state.record.homologacion.id,
	sp1_factor:
		state.documentation.ReFactor?.form?.value !== undefined
			? state.documentation.ReFactor?.form?.value
			: state.documentation.ReFactor.surface.value,
	sp1_superficie: state.documentation.Area.subject.value,
	cna_edad: state.factors.Age.subject.value,
	cna_superficie: state.documentation.Area.subject.value,
});

/**
 * It takes the state from the database and the initial state from the reducer and returns a new
 * state that is a combination of the two
 * @param {any} state - the state of the application
 * @param {any} initialState - the initial state of the application
 * @returns The payload is being returned.
 */

export const handleGetRequest = (state: any, initialState: any) => {
	const payload = {
		...initialState,
		record: state.record,
		factors: {
			Age: {
				...initialState.factors.Age,
				subject: {
					operator: initialState.factors.Age.subject.operator,
					value: state.factors.Age.subject.value,
				},
				data: state.factors.Age.data,
				isUsed: state.factors.Age.isUsed,
				position: state.factors.Age.position,
			},
			Building: {
				...initialState.factors.Building,
				subject: state.factors.Building.subject,
				data: state.factors.Building.data,
				isUsed: state.factors.Building.isUsed,
				position: state.factors.Building.position,
			},
			Classification: {
				...initialState.factors.Classification,
				subject: state.factors.Classification.subject,
				data: state.factors.Classification.data,
				isUsed: state.factors.Classification.isUsed,
				position: state.factors.Classification.position,
			},
			Commercial: {
				...initialState.factors.Commercial,
				data: state.factors.Commercial.data,
				isUsed: state.factors.Commercial.isUsed,
				position: state.factors.Commercial.position,
			},
			Level: {
				...initialState.factors.Level,
				subject: state.factors.Level.subject,
				data: state.factors.Level.data,
				isUsed: state.factors.Level.isUsed,
				position: state.factors.Level.position,
			},
			Location: {
				...initialState.factors.Location,
				subject: state.factors.Location.subject.map((item: any) => {
					return {
						...item,
						insertion: initialState.factors.Location.subject[0].insertion,
					};
				}),
				data: state.factors.Location.data,
				isUsed: state.factors.Location.isUsed,
				position: state.factors.Location.position,
			},
			Project: {
				...initialState.factors.Project,
				subject: state.factors.Project.subject,
				data: state.factors.Project.data,
				isUsed: state.factors.Project.isUsed,
				position: state.factors.Project.position,
			},
			Quality: {
				...initialState.factors.Quality,
				subject: state.factors.Quality.subject,
				data: state.factors.Quality.data,
				isUsed: state.factors.Quality.isUsed,
				position: state.factors.Quality.position,
			},
			Results: {
				...initialState.factors.Results,
				data: state.factors.Results.data,
				isUsed: state.factors.Results.isUsed,
				position: state.factors.Results.position,
			},
			Surface: {
				...initialState.factors.Surface,
				data: state.factors.Surface.data,
				isUsed: state.factors.Surface.isUsed,
				position: state.factors.Surface.position,
				root: state.factors.Surface.root,
			},
			Topography: {
				...initialState.factors.Topography,
				subject: state.factors.Topography.subject,
				data: state.factors.Topography.data,
				isUsed: state.factors.Topography.isUsed,
				position: state.factors.Topography.position,
			},
			TypeForm: {
				...initialState.factors.TypeForm,
				subject: state.factors.TypeForm.subject,
				data: state.factors.TypeForm.data,
				isUsed: state.factors.TypeForm.isUsed,
				position: state.factors.TypeForm.position,
			},
			Usage: {
				...initialState.factors.Usage,
				subject: state.factors.Usage.subject,
				data: state.factors.Usage.data,
				isUsed: state.factors.Usage.isUsed,
				position: state.factors.Usage.position,
			},
			Zone: {
				...initialState.factors.Zone,
				subject: state.factors.Zone.subject.map((item: any) => {
					return { ...item, insertion: initialState.factors.Zone.subject[0].insertion };
				}),
				data: state.factors.Zone.data,
				results: state.factors.Zone.results,
				isUsed: state.factors.Zone.isUsed,
				position: state.factors.Zone.position,
			},
		},
		documentation: {
			Area: {
				...initialState.documentation.Area,
				averageLotArea: {
					...initialState.documentation.Area.averageLotArea,
					name: state.documentation.Area.averageLotArea.name,
					surface: state.documentation.Area.averageLotArea.surface,
					value: state.documentation.Area.averageLotArea.value,
				},
				subject: state.documentation.Area.subject,
				data: state.documentation.Area.data,
				options: state?.areaOptions,
			},
			Indiviso: {
				...state.documentation.Indiviso,
				...initialState.documentation.Indiviso,
			},
			ReFactor: {
				...initialState.documentation.ReFactor,
				surface: state.documentation.ReFactor.surface,
				form: state.documentation.ReFactor.form,
				result: state.documentation.ReFactor.result,
				root: state.documentation.ReFactor.root,
				isUsed: state.documentation.ReFactor.isUsed,
			},
			SalesCost: {
				...initialState.documentation.SalesCost,
				averageUnitCost: state.documentation.SalesCost.averageUnitCost,
				data: state.documentation.SalesCost.data,
				results: state.documentation.SalesCost.results,
			},
			WeightingPercentage: {
				...initialState.documentation.WeightingPercentage,
				total: state.documentation.WeightingPercentage.total,
				data: state.documentation.WeightingPercentage.data,
			},
		},
	};
	console.log(payload);
	return payload;
};
/**
 * It takes a state object and returns an array of objects that contain errors
 * @param {any} state - the state of the application
 * @returns An array of objects.
 */

export const handleErrors = (state: any) => {
	const errors = [];
	const { factors, documentation } = state;
	const { Location, Zone, Surface } = factors;
	const { data } = documentation.Area;
	const { root } = Surface;
	const { roundedTo } = documentation.SalesCost.averageUnitCost;
	for (let i = 0; i < data.length; i++) {
		const { address } = data[i];
		const list = {} as any;
		if (Location.subject[i] !== undefined) {
			if (Location.subject[i].observations.trim() === "")
				list["Location"] = {
					name: "Factor de Ubicación",
					message: "El campo esta vacio",
					reference: `la fila ${i + 1}`,
				};
		}
		if (Zone.subject[i] !== undefined) {
			if (Zone.subject[i].observations.trim() === "")
				list["Zone"] = {
					name: "Factor de Zona",
					message: "El campo esta vacio",
					reference: `la fila ${i + 1}`,
				};
		}
		if (address.colony.trim() === "")
			list["Area"] = {
				...list["Area"],
				colony: {
					name: "Apartado de Colonia",
					message: "El campo esta vacio",
					reference: `C${i + 1}`,
				},
			};
		if (address.street.trim() === "")
			list["Area"] = {
				...list["Area"],
				street: {
					name: "Apartado de Dirección",
					message: "El campo esta vacio",
					reference: `C${i + 1}`,
				},
			};
		if (address.streetNumber === 0 && address.hasNoStreetNumber === false)
			list["Area"] = {
				...list["Area"],
				streetNumber: {
					name: "Apartado de numero",
					message:
						"El campo esta vacio, si no tiene número de calle presione el switch para indicarlo",
					reference: `C${i + 1}`,
				},
			};
		if (address.extras.observations.trim() === "")
			list["Area"] = {
				...list["Area"],
				observations: {
					name: "Apartado de Caracteristicas",
					message: "El campo esta vacio",
					reference: `C${i + 1}`,
				},
			};
		if (address.extras.reference.trim() === "")
			list["Area"] = {
				...list["Area"],
				references: {
					name: "Apartado de Consulta",
					message: "El campo esta vacio",
					reference: `C${i + 1}`,
				},
			};
		if (Object.keys(list).length > 0) errors.push(list);
	}
	if (root.enabled && root.observations.trim() === "") {
		errors.push({
			Surface: {
				observations: {
					name: "Factor de Superficie",
					message:
						"El campo fue activado para cambiar el valor predeterminado de la raiz aplicada, favor de justificar el motivo del cambio.",
				},
			},
		});
	}
	if (roundedTo.enabled && roundedTo.observations.trim() === "") {
		errors.push({
			SalesCost: {
				observations: {
					name: "Factor de Superficie",
					message:
						"El campo fue activado para cambiar el valor predeterminado de la raiz aplicada, favor de justificar el motivo del cambio.",
				},
			},
		});
	}
	if (Location.subject.length > data.length) {
		for (let i = data.length; i < Location.subject.length; i++) {
			const list = {} as any;
			if (Location.subject[i].observations.trim() === "")
				list["Location"] = {
					name: "Factor de Ubicación",
					message: "El campo esta vacio",
					reference: `la fila ${i + 1}`,
				};
			if (Object.keys(list).length > 0) errors.push(list);
		}
	}
	if (Zone.subject.length > data.length) {
		for (let i = data.length; i < Zone.subject.length; i++) {
			const list = {} as any;
			if (Zone.subject[i].observations.trim() === "")
				list["Zone"] = {
					name: "Factor de Zona",
					message: "El campo esta vacio",
					reference: `la fila ${i + 1}`,
				};
			if (Object.keys(list).length > 0) errors.push(list);
		}
	}
	return errors;
};
