/** @format */

import { StateProps, RevisionData, RevisionComment, RevisionSuggestion, FieldMeta } from "./revisiones.interface";

export const initialState: StateProps = {
	status: "idle",
	message: "",
	revisionData: null,
	currentSuggestions: [],
	availableFields: [],
	activeRevision: null,
	showRevisionModal: false,
	isReviewing: false,
	pendingChanges: false,
	errors: []
};

// Campos disponibles para revisión con metadata
export const getAvailableFields = (type: "TERRENO" | "RENTA"): FieldMeta[] => {
	const commonFields: FieldMeta[] = [
		// Factores
		{ path: "factors.Classification.subject.value", label: "Clasificación", page: 1, type: "select" },
		{ path: "factors.Location.subject", label: "Factor de Ubicación", page: 1, type: "input" },
		{ path: "factors.TypeForm.subject.value", label: "Factor de Forma", page: 1, type: "select" },
		{ path: "factors.Usage.subject.value", label: "Factor de Uso", page: 1, type: "select" },
		{ path: "factors.Zone.subject", label: "Factor de Zona", page: 1, type: "input" },
		{ path: "factors.Topography.subject.value", label: "Factor de Topografía", page: 1, type: "select" },
		{ path: "factors.Surface.data", label: "Factor de Superficie", page: 1, type: "input" },
		{ path: "factors.Commercial.data", label: "Factor de Comercialización", page: 1, type: "input" },
		
		// Documentación - Área
		{ path: "documentation.Area.subject", label: "Sujeto del Área", page: 3, type: "input" },
		{ path: "documentation.Area.data", label: "Datos de Área", page: 3, type: "input" },
		{ path: "documentation.Area.averageLotArea", label: "Superficie Promedio del Lote", page: 3, type: "input" },
		
		// Documentación - Costos de Venta
		{ path: "documentation.SalesCost.data", label: "Datos de Costo de Venta", page: 3, type: "input" },
		{ path: "documentation.SalesCost.averageUnitCost", label: "Costo Unitario Promedio", page: 3, type: "input" },
		
		// Porcentaje de Ponderación
		{ path: "documentation.WeightingPercentage.data", label: "Porcentaje de Ponderación", page: 3, type: "input" },
		
		// Observaciones
		{ path: "documentation.observations", label: "Justificación de Factores", page: 5, type: "textarea" },
	];

	const terrenoSpecificFields: FieldMeta[] = [
		{ path: "documentation.ReFactor.surface", label: "Factor de Terreno", page: 6, type: "input" },
		{ path: "documentation.ReFactor.form", label: "Factor de Forma", page: 6, type: "input" },
		{ path: "documentation.ReFactor.result", label: "Factor Resultante", page: 6, type: "input" },
		{ path: "documentation.Indiviso", label: "Indiviso", page: 6, type: "input" },
	];

	const rentaSpecificFields: FieldMeta[] = [
		{ path: "factors.Age.subject", label: "Factor de Edad", page: 2, type: "input" },
		{ path: "factors.Age.data", label: "Datos de Edad", page: 2, type: "input" },
		{ path: "factors.Building.subject.value", label: "Factor de Construcción", page: 1, type: "select" },
		{ path: "factors.Level.subject.value", label: "Factor de Nivel", page: 1, type: "select" },
		{ path: "factors.Project.subject.value", label: "Factor de Proyecto", page: 1, type: "select" },
		{ path: "factors.Quality.subject.value", label: "Factor de Calidad", page: 1, type: "select" },
	];

	return type === "TERRENO" 
		? [...commonFields, ...terrenoSpecificFields]
		: [...commonFields, ...rentaSpecificFields];
};
