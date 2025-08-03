/** @format */

import { FieldMeta } from "../../../../redux/justipreciacion/homologacion/revisiones/revisiones.interface";

/**
 * Utilidades para integración entre homologación y revisiones
 */

/**
 * Extrae el valor actual de un campo usando la ruta especificada
 */
export const getCurrentFieldValue = (homologacionData: any, fieldPath: string): any => {
	if (!homologacionData || !fieldPath) return null;
	
	try {
		return fieldPath.split('.').reduce((obj, key) => {
			if (obj && typeof obj === 'object') {
				// Manejar arrays con índices
				if (key.includes('[') && key.includes(']')) {
					const [arrayKey, indexStr] = key.split('[');
					const index = parseInt(indexStr.replace(']', ''));
					return obj[arrayKey] && obj[arrayKey][index];
				}
				return obj[key];
			}
			return null;
		}, homologacionData);
	} catch (error) {
		console.warn(`Error al obtener valor del campo ${fieldPath}:`, error);
		return null;
	}
};

/**
 * Aplica un valor sugerido a los datos de homologación (inmutable)
 */
export const applyFieldSuggestion = (homologacionData: any, fieldPath: string, newValue: any): any => {
	if (!homologacionData || !fieldPath) return homologacionData;
	
	try {
		const pathParts = fieldPath.split('.');
		const result = JSON.parse(JSON.stringify(homologacionData)); // Deep clone
		
		let current = result;
		for (let i = 0; i < pathParts.length - 1; i++) {
			const part = pathParts[i];
			
			// Manejar arrays con índices
			if (part.includes('[') && part.includes(']')) {
				const [arrayKey, indexStr] = part.split('[');
				const index = parseInt(indexStr.replace(']', ''));
				
				if (!current[arrayKey]) current[arrayKey] = [];
				if (!current[arrayKey][index]) current[arrayKey][index] = {};
				current = current[arrayKey][index];
			} else {
				if (!current[part]) current[part] = {};
				current = current[part];
			}
		}
		
		// Establecer el valor final
		const finalKey = pathParts[pathParts.length - 1];
		if (finalKey.includes('[') && finalKey.includes(']')) {
			const [arrayKey, indexStr] = finalKey.split('[');
			const index = parseInt(indexStr.replace(']', ''));
			
			if (!current[arrayKey]) current[arrayKey] = [];
			current[arrayKey][index] = newValue;
		} else {
			current[finalKey] = newValue;
		}
		
		return result;
	} catch (error) {
		console.warn(`Error al aplicar sugerencia al campo ${fieldPath}:`, error);
		return homologacionData;
	}
};

/**
 * Valida si un campo existe en los datos de homologación
 */
export const isValidFieldPath = (homologacionData: any, fieldPath: string): boolean => {
	try {
		const value = getCurrentFieldValue(homologacionData, fieldPath);
		return value !== null && value !== undefined;
	} catch {
		return false;
	}
};

/**
 * Obtiene el tipo de dato de un campo
 */
export const getFieldType = (value: any): string => {
	if (value === null || value === undefined) return "unknown";
	if (typeof value === "number") return "number";
	if (typeof value === "string") return "string";
	if (typeof value === "boolean") return "boolean";
	if (Array.isArray(value)) return "array";
	if (typeof value === "object") return "object";
	return "unknown";
};

/**
 * Formatea un valor para mostrar en la UI
 */
export const formatFieldValue = (value: any): string => {
	if (value === null || value === undefined) return "N/A";
	if (typeof value === "number") return value.toLocaleString();
	if (typeof value === "string") return value;
	if (typeof value === "boolean") return value ? "Sí" : "No";
	if (Array.isArray(value)) return `[${value.length} elemento(s)]`;
	if (typeof value === "object") return JSON.stringify(value, null, 2);
	return String(value);
};

/**
 * Busca campos que han cambiado entre dos versiones de datos
 */
export const findChangedFields = (originalData: any, modifiedData: any, availableFields: FieldMeta[]): FieldMeta[] => {
	const changedFields: FieldMeta[] = [];
	
	for (const field of availableFields) {
		const originalValue = getCurrentFieldValue(originalData, field.path);
		const modifiedValue = getCurrentFieldValue(modifiedData, field.path);
		
		// Comparación profunda para objetos
		if (JSON.stringify(originalValue) !== JSON.stringify(modifiedValue)) {
			changedFields.push(field);
		}
	}
	
	return changedFields;
};

/**
 * Genera un resumen de cambios para mostrar al usuario
 */
export const generateChangesSummary = (originalData: any, modifiedData: any, changedFields: FieldMeta[]): string => {
	if (changedFields.length === 0) return "No hay cambios detectados";
	
	let summary = `Se encontraron ${changedFields.length} campo(s) modificado(s):\n\n`;
	
	for (const field of changedFields.slice(0, 5)) { // Mostrar máximo 5
		const originalValue = formatFieldValue(getCurrentFieldValue(originalData, field.path));
		const modifiedValue = formatFieldValue(getCurrentFieldValue(modifiedData, field.path));
		
		summary += `• ${field.label} (Página ${field.page})\n`;
		summary += `  Antes: ${originalValue}\n`;
		summary += `  Después: ${modifiedValue}\n\n`;
	}
	
	if (changedFields.length > 5) {
		summary += `... y ${changedFields.length - 5} campo(s) más.`;
	}
	
	return summary;
};

/**
 * Valida que una sugerencia de revisión sea válida
 */
export const validateRevisionSuggestion = (
	homologacionData: any, 
	fieldPath: string, 
	suggestedValue: any, 
	availableFields: FieldMeta[]
): { isValid: boolean; errors: string[] } => {
	const errors: string[] = [];
	
	// Verificar que el campo existe
	const field = availableFields.find(f => f.path === fieldPath);
	if (!field) {
		errors.push("El campo especificado no está disponible para revisión");
	}
	
	// Verificar que el campo existe en los datos
	if (!isValidFieldPath(homologacionData, fieldPath)) {
		errors.push("La ruta del campo no es válida en los datos actuales");
	}
	
	// Verificar que el valor sugerido es diferente al actual
	const currentValue = getCurrentFieldValue(homologacionData, fieldPath);
	if (JSON.stringify(currentValue) === JSON.stringify(suggestedValue)) {
		errors.push("El valor sugerido es igual al valor actual");
	}
	
	// Validaciones de tipo (básicas)
	const currentType = getFieldType(currentValue);
	const suggestedType = getFieldType(suggestedValue);
	
	if (currentType !== "unknown" && suggestedType !== currentType) {
		errors.push(`El tipo de valor sugerido (${suggestedType}) no coincide con el tipo actual (${currentType})`);
	}
	
	return {
		isValid: errors.length === 0,
		errors
	};
};
