/** @format */

import { api } from "../../../../api";

export const name = "HomologacionRevisiones";
export const consume = api(name);

export interface RevisionSuggestion {
	fieldPath: string; // e.g., "factors.Age.data.0.value"
	currentValue: any;
	suggestedValue: any;
	comment: string;
	fieldLabel: string; // human readable field name
	page: number; // página donde está el campo
}

export interface RevisionComment {
	id: string;
	fieldPath: string;
	comment: string;
	reviewer: string;
	created_at: string;
	status: "PENDING" | "RESOLVED" | "DISMISSED";
	originalValue: any;
	suggestedValue: any;
	fieldLabel: string;
	page: number;
}

export interface RevisionEntry {
	version: string; // v1, v2, etc.
	created_by: string; // usuario que hizo la revisión
	created_at: string;
	status: "EN_REVISION" | "COMPLETADA" | "PENDIENTE_CORRECCION";
	comments: RevisionComment[];
	generalComments?: string;
}

export interface RevisionData {
	homologacionId: number;
	type: "TERRENO" | "RENTA";
	appraisalPurpose: string;
	current_version: string;
	status: "PENDIENTE" | "EN_REVISION" | "REVISADO_CON_ERRORES" | "REVISADO_APROBADO" | "RECHAZADO" | "OBSOLETO";
	created_at: string;
	updated_at: string;
	reviewed_at?: string;
	revisiones: RevisionEntry[];
	can_review: boolean; // si el usuario actual puede revisar
	can_edit: boolean; // si el usuario actual puede editar
	assigned_reviewer?: string;
}

export interface FieldMeta {
	path: string;
	label: string;
	page: number;
	type: "input" | "select" | "checkbox" | "textarea";
	options?: Array<{ label: string; value: any }>;
	validation?: {
		required?: boolean;
		min?: number;
		max?: number;
		pattern?: string;
	};
}

export interface StateProps {
	status: "idle" | "loading" | "success" | "error";
	message: string;
	revisionData: RevisionData | null;
	currentSuggestions: RevisionSuggestion[];
	availableFields: FieldMeta[];
	activeRevision: RevisionEntry | null;
	showRevisionModal: boolean;
	isReviewing: boolean;
	pendingChanges: boolean;
	errors: string[];
}
