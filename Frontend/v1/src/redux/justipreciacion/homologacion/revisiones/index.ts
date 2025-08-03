/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { name, consume, StateProps } from "./revisiones.interface";
import { initialState } from "./revisiones.initialState";
import { reducers } from "./revisiones.reducer";

export const consumeRevisiones = consume;
export const { get, post, patch } = consume;

const slice = createSlice({
	name,
	initialState,
	reducers,
	extraReducers: (builder) => {
		// GET - Obtener datos de revisión
		builder
			.addCase(get.rejected, (state: StateProps) => {
				state.status = "error";
				state.message = "Error al cargar los datos de revisión";
			})
			.addCase(get.pending, (state: StateProps) => {
				state.status = "loading";
				state.message = "Cargando datos de revisión...";
			})
			.addCase(
				get.fulfilled,
				(
					state: StateProps,
					{ payload: { status, operation, message, data } }: PayloadAction<any>
				) => {
					state.status = status === "success" ? "success" : "error";
					state.message = message;

					if (status === "success" && data) {
						switch (operation) {
							case "REVISION/GetRevisionData":
								state.revisionData = data;
								state.activeRevision = data.revisiones.length > 0 
									? data.revisiones[data.revisiones.length - 1] 
									: null;
								break;
							case "REVISION":
								// Operación genérica para obtener datos de revisión
								state.revisionData = data;
								state.activeRevision = data.revisiones?.length > 0 
									? data.revisiones[data.revisiones.length - 1] 
									: null;
								break;
						}
					}
				}
			);

		// POST - Crear nueva revisión
		builder
			.addCase(post.rejected, (state: StateProps) => {
				state.status = "error";
				state.message = "Error al crear la revisión";
			})
			.addCase(post.pending, (state: StateProps) => {
				state.status = "loading";
				state.message = "Creando revisión...";
			})
			.addCase(
				post.fulfilled,
				(
					state: StateProps,
					{ payload: { status, operation, message, data } }: PayloadAction<any>
				) => {
					state.status = status === "success" ? "success" : "error";
					state.message = message;

					if (status === "success") {
						switch (operation) {
							case "REVISION/CreateRevision":
								if (state.revisionData) {
									state.revisionData = { ...state.revisionData, ...data };
								}
								state.isReviewing = false;
								state.currentSuggestions = [];
								state.pendingChanges = false;
								break;
							case "REVISION":
								// Operación genérica para crear revisión
								if (state.revisionData) {
									state.revisionData = { ...state.revisionData, ...data };
								} else {
									state.revisionData = data;
								}
								state.isReviewing = false;
								state.currentSuggestions = [];
								state.pendingChanges = false;
								break;
						}
					}
				}
			);

		// PATCH - Actualizar revisión
		builder
			.addCase(patch.rejected, (state: StateProps) => {
				state.status = "error";
				state.message = "Error al actualizar la revisión";
			})
			.addCase(patch.pending, (state: StateProps) => {
				state.status = "loading";
				state.message = "Actualizando revisión...";
			})
			.addCase(
				patch.fulfilled,
				(
					state: StateProps,
					{ payload: { status, operation, message, data } }: PayloadAction<any>
				) => {
					state.status = status === "success" ? "success" : "error";
					state.message = message;

					if (status === "success") {
						switch (operation) {
							case "REVISION/UpdateRevision":
								if (state.revisionData) {
									state.revisionData = { ...state.revisionData, ...data };
								}
								break;
							case "REVISION/ResolveComment":
								// Los comentarios se actualizan mediante los reducers
								break;
							case "REVISION/ApplyChanges":
								if (state.revisionData) {
									state.revisionData.status = "REVISADO_APROBADO";
									state.revisionData.updated_at = new Date().toISOString();
								}
								break;
							case "REVISION":
								// Operación genérica para actualizar revisión
								if (state.revisionData) {
									state.revisionData = { ...state.revisionData, ...data };
								}
								break;
						}
					}
				}
			);
	},
});

// Exportar acciones
export const {
	setStatus,
	setMessage,
	clearErrors,
	setRevisionData,
	addSuggestion,
	removeSuggestion,
	updateSuggestion,
	clearSuggestions,
	startRevision,
	submitRevision,
	cancelRevision,
	resolveComment,
	dismissComment,
	showRevisionModal,
	hideRevisionModal,
	setAvailableFields,
	setReviewingState,
	applyAllSuggestions,
	resetRevisions
} = slice.actions;

// Selectores
export const getRevisiones = (state: RootState) => state.HomologacionRevisiones;
export const getRevisionData = (state: RootState) => state.HomologacionRevisiones.revisionData;
export const getCurrentSuggestions = (state: RootState) => state.HomologacionRevisiones.currentSuggestions;
export const getActiveRevision = (state: RootState) => state.HomologacionRevisiones.activeRevision;
export const getIsReviewing = (state: RootState) => state.HomologacionRevisiones.isReviewing;
export const getRevisionStatus = (state: RootState) => state.HomologacionRevisiones.status;
export const getRevisionErrors = (state: RootState) => state.HomologacionRevisiones.errors;
export const getPendingChanges = (state: RootState) => state.HomologacionRevisiones.pendingChanges;
export const getShowRevisionModal = (state: RootState) => state.HomologacionRevisiones.showRevisionModal;
export const getAvailableFields = (state: RootState) => state.HomologacionRevisiones.availableFields;

export default slice.reducer;
