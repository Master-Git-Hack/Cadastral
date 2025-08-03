/** @format */

import { StateProps, RevisionData, RevisionSuggestion, RevisionComment } from "./revisiones.interface";

/**
 * Obtiene el valor de un campo usando una ruta de acceso con puntos
 * @param obj - Objeto del cual extraer el valor
 * @param path - Ruta del campo (ej: "factors.Age.subject.value")
 * @returns El valor del campo o undefined si no existe
 */
export const getFieldValue = (obj: any, path: string): any => {
	return path.split('.').reduce((current, key) => {
		if (current === null || current === undefined) return undefined;
		return current[key];
	}, obj);
};

/**
 * Establece un valor en un objeto usando una ruta de acceso con puntos
 * @param obj - Objeto a modificar
 * @param path - Ruta del campo (ej: "factors.Age.subject.value")
 * @param value - Valor a establecer
 */
export const setFieldValue = (obj: any, path: string, value: any): void => {
	const keys = path.split('.');
	const lastKey = keys.pop();
	if (!lastKey) return;
	
	const target = keys.reduce((current, key) => {
		if (current[key] === undefined) current[key] = {};
		return current[key];
	}, obj);
	
	target[lastKey] = value;
};

/**
 * Genera un nuevo ID único para comentarios
 */
export const generateCommentId = (): string => {
	return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Crea una nueva entrada de revisión
 * @param reviewer - Usuario que realiza la revisión
 * @param version - Versión de la revisión
 * @returns Nueva entrada de revisión
 */
export const createRevisionEntry = (reviewer: string, version: string) => ({
	version,
	created_by: reviewer,
	created_at: new Date().toISOString(),
	status: "EN_REVISION" as const,
	comments: [],
	generalComments: ""
});

/**
 * Crea un nuevo comentario de revisión
 * @param suggestion - Sugerencia que contiene la información del comentario
 * @param reviewer - Usuario que hace la revisión
 * @returns Nuevo comentario de revisión
 */
export const createRevisionComment = (suggestion: RevisionSuggestion, reviewer: string): RevisionComment => ({
	id: generateCommentId(),
	fieldPath: suggestion.fieldPath,
	comment: suggestion.comment,
	reviewer,
	created_at: new Date().toISOString(),
	status: "PENDING",
	originalValue: suggestion.currentValue,
	suggestedValue: suggestion.suggestedValue,
	fieldLabel: suggestion.fieldLabel,
	page: suggestion.page
});

/**
 * Valida si una sugerencia de revisión es válida
 * @param suggestion - Sugerencia a validar
 * @returns Array de errores, vacío si es válida
 */
export const validateRevisionSuggestion = (suggestion: RevisionSuggestion): string[] => {
	const errors: string[] = [];
	
	if (!suggestion.fieldPath || suggestion.fieldPath.trim() === '') {
		errors.push('La ruta del campo es requerida');
	}
	
	if (!suggestion.comment || suggestion.comment.trim() === '') {
		errors.push('El comentario es requerido');
	}
	
	if (!suggestion.fieldLabel || suggestion.fieldLabel.trim() === '') {
		errors.push('La etiqueta del campo es requerida');
	}
	
	if (typeof suggestion.page !== 'number' || suggestion.page < 1) {
		errors.push('La página debe ser un número válido mayor a 0');
	}
	
	return errors;
};

/**
 * Obtiene el estado de revisión basado en los comentarios
 * @param comments - Lista de comentarios
 * @returns Estado de la revisión
 */
export const getRevisionStatus = (comments: RevisionComment[]) => {
	if (comments.length === 0) return "COMPLETADA";
	
	const pendingComments = comments.filter(c => c.status === "PENDING");
	if (pendingComments.length > 0) return "PENDIENTE_CORRECCION";
	
	return "COMPLETADA";
};

/**
 * Filtra campos disponibles según el tipo de homologación
 * @param fields - Campos disponibles
 * @param type - Tipo de homologación
 * @returns Campos filtrados
 */
export const filterFieldsByType = (fields: any[], type: "TERRENO" | "RENTA") => {
	// Implementar lógica específica para filtrar campos según el tipo
	return fields;
};

/**
 * Formatea una ruta de campo para mostrar al usuario
 * @param path - Ruta del campo
 * @returns Ruta formateada legible
 */
export const formatFieldPath = (path: string): string => {
	return path
		.split('.')
		.map(part => {
			// Capitalizar primera letra y reemplazar camelCase con espacios
			return part.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
		})
		.join(' → ');
};

/**
 * Obtiene la página donde se encuentra un campo basado en su ruta
 * @param fieldPath - Ruta del campo
 * @param type - Tipo de homologación
 * @returns Número de página
 */
export const getFieldPage = (fieldPath: string, type: "TERRENO" | "RENTA"): number => {
	// Mapeo básico de rutas a páginas
	if (fieldPath.includes('factors.Age')) return 2;
	if (fieldPath.includes('documentation.Area')) return 3;
	if (fieldPath.includes('documentation.SalesCost')) return 3;
	if (fieldPath.includes('documentation.WeightingPercentage')) return 3;
	if (fieldPath.includes('documentation.observations')) return 5;
	if (fieldPath.includes('documentation.ReFactor') || fieldPath.includes('documentation.Indiviso')) {
		return type === "TERRENO" ? 6 : 7;
	}
	
	return 1; // Página por defecto para factores
};
