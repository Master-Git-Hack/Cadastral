/** @format */

import { PayloadAction } from "@reduxjs/toolkit";
import { StateProps, RevisionSuggestion, RevisionComment, RevisionEntry } from "./revisiones.interface";
import { 
	createRevisionComment, 
	createRevisionEntry, 
	validateRevisionSuggestion,
	getRevisionStatus,
	generateCommentId
} from "./revisiones.actions";

export const reducers = {
	// Estado general
	setStatus: (state: StateProps, { payload }: PayloadAction<StateProps['status']>) => {
		state.status = payload;
	},
	
	setMessage: (state: StateProps, { payload }: PayloadAction<string>) => {
		state.message = payload;
	},
	
	clearErrors: (state: StateProps) => {
		state.errors = [];
	},

	// Datos de revisión
	setRevisionData: (state: StateProps, { payload }: PayloadAction<StateProps['revisionData']>) => {
		state.revisionData = payload;
		if (payload) {
			state.activeRevision = payload.revisiones.length > 0 
				? payload.revisiones[payload.revisiones.length - 1] 
				: null;
		}
	},

	// Sugerencias de revisión
	addSuggestion: (state: StateProps, { payload }: PayloadAction<RevisionSuggestion>) => {
		const errors = validateRevisionSuggestion(payload);
		if (errors.length > 0) {
			state.errors = errors;
			return;
		}
		
		// Remover sugerencia existente para el mismo campo si existe
		state.currentSuggestions = state.currentSuggestions.filter(
			s => s.fieldPath !== payload.fieldPath
		);
		
		state.currentSuggestions.push(payload);
		state.pendingChanges = true;
		state.errors = [];
	},

	removeSuggestion: (state: StateProps, { payload }: PayloadAction<string>) => {
		state.currentSuggestions = state.currentSuggestions.filter(
			s => s.fieldPath !== payload
		);
		state.pendingChanges = state.currentSuggestions.length > 0;
	},

	updateSuggestion: (state: StateProps, { payload }: PayloadAction<{ fieldPath: string; data: Partial<RevisionSuggestion> }>) => {
		const suggestionIndex = state.currentSuggestions.findIndex(
			s => s.fieldPath === payload.fieldPath
		);
		
		if (suggestionIndex !== -1) {
			state.currentSuggestions[suggestionIndex] = {
				...state.currentSuggestions[suggestionIndex],
				...payload.data
			};
			state.pendingChanges = true;
		}
	},

	clearSuggestions: (state: StateProps) => {
		state.currentSuggestions = [];
		state.pendingChanges = false;
	},

	// Revisión activa
	startRevision: (state: StateProps, { payload }: PayloadAction<{ reviewer: string; version: string }>) => {
		if (!state.revisionData) return;
		
		const newRevision = createRevisionEntry(payload.reviewer, payload.version);
		state.activeRevision = newRevision;
		state.isReviewing = true;
		state.currentSuggestions = [];
		state.pendingChanges = false;
	},

	submitRevision: (state: StateProps, { payload }: PayloadAction<{ generalComments?: string }>) => {
		if (!state.activeRevision || !state.revisionData) return;
		
		// Convertir sugerencias a comentarios
		const comments = state.currentSuggestions.map(suggestion => 
			createRevisionComment(suggestion, state.activeRevision!.created_by)
		);
		
		// Actualizar revisión activa
		state.activeRevision.comments = comments;
		state.activeRevision.status = getRevisionStatus(comments);
		state.activeRevision.generalComments = payload.generalComments || "";
		
		// Agregar la revisión a los datos de revisión
		const existingRevisionIndex = state.revisionData.revisiones.findIndex(
			r => r.version === state.activeRevision!.version
		);
		
		if (existingRevisionIndex !== -1) {
			state.revisionData.revisiones[existingRevisionIndex] = state.activeRevision;
		} else {
			state.revisionData.revisiones.push(state.activeRevision);
		}
		
		// Actualizar estado general de revisión
		state.revisionData.status = comments.length > 0 
			? "REVISADO_CON_ERRORES" 
			: "REVISADO_APROBADO";
		state.revisionData.reviewed_at = new Date().toISOString();
		state.revisionData.updated_at = new Date().toISOString();
		
		// Limpiar estado de revisión
		state.currentSuggestions = [];
		state.isReviewing = false;
		state.pendingChanges = false;
		state.showRevisionModal = false;
	},

	cancelRevision: (state: StateProps) => {
		state.currentSuggestions = [];
		state.isReviewing = false;
		state.pendingChanges = false;
		state.activeRevision = null;
		state.showRevisionModal = false;
	},

	// Comentarios
	resolveComment: (state: StateProps, { payload }: PayloadAction<{ revisionVersion: string; commentId: string }>) => {
		if (!state.revisionData) return;
		
		const revision = state.revisionData.revisiones.find(r => r.version === payload.revisionVersion);
		if (!revision) return;
		
		const comment = revision.comments.find(c => c.id === payload.commentId);
		if (comment) {
			comment.status = "RESOLVED";
		}
		
		// Actualizar estado de la revisión
		revision.status = getRevisionStatus(revision.comments);
		state.revisionData.updated_at = new Date().toISOString();
	},

	dismissComment: (state: StateProps, { payload }: PayloadAction<{ revisionVersion: string; commentId: string }>) => {
		if (!state.revisionData) return;
		
		const revision = state.revisionData.revisiones.find(r => r.version === payload.revisionVersion);
		if (!revision) return;
		
		const comment = revision.comments.find(c => c.id === payload.commentId);
		if (comment) {
			comment.status = "DISMISSED";
		}
		
		// Actualizar estado de la revisión
		revision.status = getRevisionStatus(revision.comments);
		state.revisionData.updated_at = new Date().toISOString();
	},

	// Modal de revisión
	showRevisionModal: (state: StateProps) => {
		state.showRevisionModal = true;
	},

	hideRevisionModal: (state: StateProps) => {
		state.showRevisionModal = false;
	},

	// Campos disponibles
	setAvailableFields: (state: StateProps, { payload }: PayloadAction<StateProps['availableFields']>) => {
		state.availableFields = payload;
	},

	// Estado de revisión
	setReviewingState: (state: StateProps, { payload }: PayloadAction<boolean>) => {
		state.isReviewing = payload;
	},

	// Aplicar cambios sugeridos
	applyAllSuggestions: (state: StateProps) => {
		// Esta acción marca que se aplicaron todas las sugerencias pendientes
		// La aplicación real de cambios se hace en el módulo de homologación principal
		if (!state.revisionData) return;
		
		state.revisionData.revisiones.forEach(revision => {
			revision.comments.forEach(comment => {
				if (comment.status === "PENDING") {
					comment.status = "RESOLVED";
				}
			});
			revision.status = "COMPLETADA";
		});
		
		state.revisionData.status = "REVISADO_APROBADO";
		state.revisionData.updated_at = new Date().toISOString();
	},

	// Resetear módulo
	resetRevisions: (state: StateProps) => {
		state.revisionData = null;
		state.currentSuggestions = [];
		state.activeRevision = null;
		state.showRevisionModal = false;
		state.isReviewing = false;
		state.pendingChanges = false;
		state.errors = [];
		state.status = "idle";
		state.message = "";
	}
};
