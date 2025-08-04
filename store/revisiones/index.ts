/** @format */

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { 
  RevisionState, 
  RevisionData, 
  RevisionSuggestion, 
  RevisionEntry, 
  FieldMeta, 
  CreateRevisionRequest,
  ResolveCommentRequest 
} from "./types";

const initialState: RevisionState = {
  // Datos del servidor
  revisionData: null,
  
  // Estado de revisión activa
  isReviewing: false,
  activeRevision: null,
  currentSuggestions: [],
  
  // UI State
  showRevisionModal: false,
  showRevisionHistory: false,
  availableFields: [],
  
  // Estados de carga y errores
  loading: false,
  saving: false,
  error: null,
  message: null,
  
  // Configuración
  pendingChanges: false,
  selectedRevision: null,
};

interface RevisionActions {
  // Acciones de datos
  loadRevisionData: (homologacionId: number, tipo: string, tipoServicio: string) => Promise<void>;
  
  // Acciones de revisión activa
  startRevision: (reviewer: string) => void;
  cancelRevision: () => void;
  
  // Gestión de sugerencias
  addSuggestion: (suggestion: RevisionSuggestion) => void;
  removeSuggestion: (fieldPath: string) => void;
  updateSuggestion: (fieldPath: string, updates: Partial<RevisionSuggestion>) => void;
  clearSuggestions: () => void;
  
  // Envío de revisión
  submitRevision: (generalComments?: string) => Promise<void>;
  
  // Gestión de comentarios
  resolveComment: (revisionVersion: string, commentId: string) => Promise<void>;
  dismissComment: (revisionVersion: string, commentId: string) => Promise<void>;
  
  // UI Actions
  toggleRevisionModal: () => void;
  hideRevisionModal: () => void;
  toggleRevisionHistory: () => void;
  hideRevisionHistory: () => void;
  setSelectedRevision: (revision: RevisionEntry | null) => void;
  setAvailableFields: (fields: FieldMeta[]) => void;
  
  // Utilidades
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setError: (error: string | null) => void;
  setMessage: (message: string | null) => void;
  reset: () => void;
}

export const useRevisionesStore = create<RevisionState & RevisionActions>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,

    // === ACCIONES DE DATOS ===
    loadRevisionData: async (homologacionId: number, tipo: string, tipoServicio: string) => {
      set({ loading: true, error: null });
      
      try {
        const response = await fetch(`/api/revisiones/${homologacionId}/${tipo}/${tipoServicio}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: RevisionData = await response.json();
        
        set({ 
          revisionData: data,
          loading: false,
          error: null,
          message: "Datos de revisión cargados correctamente"
        });
        
      } catch (error) {
        console.error("Error loading revision data:", error);
        set({ 
          loading: false, 
          error: error instanceof Error ? error.message : "Error desconocido",
          revisionData: null
        });
      }
    },

    // === ACCIONES DE REVISIÓN ACTIVA ===
    startRevision: (reviewer: string) => {
      const version = `v${Date.now()}`;
      const now = new Date().toISOString();
      
      const newRevision: RevisionEntry = {
        version,
        created_by: reviewer,
        created_at: now,
        status: "EN_REVISION",
        comments: [],
        summary: {
          total_comments: 0,
          pending_comments: 0,
          resolved_comments: 0,
          dismissed_comments: 0,
        }
      };

      set({
        isReviewing: true,
        activeRevision: newRevision,
        currentSuggestions: [],
        showRevisionModal: true,
        pendingChanges: false,
        message: "Revisión iniciada correctamente"
      });
    },

    cancelRevision: () => {
      set({
        isReviewing: false,
        activeRevision: null,
        currentSuggestions: [],
        showRevisionModal: false,
        pendingChanges: false,
        message: "Revisión cancelada"
      });
    },

    // === GESTIÓN DE SUGERENCIAS ===
    addSuggestion: (suggestion: RevisionSuggestion) => {
      const currentSuggestions = get().currentSuggestions;
      const existingIndex = currentSuggestions.findIndex(s => s.fieldPath === suggestion.fieldPath);
      
      if (existingIndex >= 0) {
        // Actualizar sugerencia existente
        const updatedSuggestions = [...currentSuggestions];
        updatedSuggestions[existingIndex] = suggestion;
        set({ 
          currentSuggestions: updatedSuggestions,
          pendingChanges: true 
        });
      } else {
        // Agregar nueva sugerencia
        set({ 
          currentSuggestions: [...currentSuggestions, suggestion],
          pendingChanges: true 
        });
      }
    },

    removeSuggestion: (fieldPath: string) => {
      const currentSuggestions = get().currentSuggestions;
      const filteredSuggestions = currentSuggestions.filter(s => s.fieldPath !== fieldPath);
      
      set({ 
        currentSuggestions: filteredSuggestions,
        pendingChanges: filteredSuggestions.length > 0
      });
    },

    updateSuggestion: (fieldPath: string, updates: Partial<RevisionSuggestion>) => {
      const currentSuggestions = get().currentSuggestions;
      const updatedSuggestions = currentSuggestions.map(suggestion =>
        suggestion.fieldPath === fieldPath 
          ? { ...suggestion, ...updates }
          : suggestion
      );
      
      set({ 
        currentSuggestions: updatedSuggestions,
        pendingChanges: true 
      });
    },

    clearSuggestions: () => {
      set({ 
        currentSuggestions: [],
        pendingChanges: false 
      });
    },

    // === ENVÍO DE REVISIÓN ===
    submitRevision: async (generalComments?: string) => {
      const state = get();
      const { revisionData, currentSuggestions, activeRevision } = state;
      
      if (!revisionData || !activeRevision) {
        set({ error: "No hay revisión activa para enviar" });
        return;
      }

      set({ saving: true, error: null });

      try {
        const payload: CreateRevisionRequest = {
          suggestions: currentSuggestions,
          generalComments,
          homologacionId: revisionData.homologacion_id,
          tipo: revisionData.tipo,
          tipoServicio: revisionData.tipo_servicio
        };

        const response = await fetch(`/api/revisiones/${revisionData.homologacion_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        
        // Recargar datos de revisión
        await get().loadRevisionData(
          revisionData.homologacion_id, 
          revisionData.tipo, 
          revisionData.tipo_servicio
        );

        set({
          saving: false,
          isReviewing: false,
          activeRevision: null,
          currentSuggestions: [],
          showRevisionModal: false,
          pendingChanges: false,
          message: "Revisión enviada correctamente"
        });

      } catch (error) {
        console.error("Error submitting revision:", error);
        set({ 
          saving: false, 
          error: error instanceof Error ? error.message : "Error al enviar revisión"
        });
      }
    },

    // === GESTIÓN DE COMENTARIOS ===
    resolveComment: async (revisionVersion: string, commentId: string) => {
      const state = get();
      const { revisionData } = state;
      
      if (!revisionData) return;

      try {
        const payload: ResolveCommentRequest = {
          revisionVersion,
          commentId,
          action: "resolve"
        };

        const response = await fetch(`/api/revisiones/${revisionData.homologacion_id}/comment/${commentId}/resolve`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Recargar datos de revisión
        await get().loadRevisionData(
          revisionData.homologacion_id, 
          revisionData.tipo, 
          revisionData.tipo_servicio
        );

        set({ message: "Comentario marcado como resuelto" });

      } catch (error) {
        console.error("Error resolving comment:", error);
        set({ error: error instanceof Error ? error.message : "Error al resolver comentario" });
      }
    },

    dismissComment: async (revisionVersion: string, commentId: string) => {
      const state = get();
      const { revisionData } = state;
      
      if (!revisionData) return;

      try {
        const payload: ResolveCommentRequest = {
          revisionVersion,
          commentId,
          action: "dismiss"
        };

        const response = await fetch(`/api/revisiones/${revisionData.homologacion_id}/comment/${commentId}/dismiss`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Recargar datos de revisión
        await get().loadRevisionData(
          revisionData.homologacion_id, 
          revisionData.tipo, 
          revisionData.tipo_servicio
        );

        set({ message: "Comentario descartado" });

      } catch (error) {
        console.error("Error dismissing comment:", error);
        set({ error: error instanceof Error ? error.message : "Error al descartar comentario" });
      }
    },

    // === UI ACTIONS ===
    toggleRevisionModal: () => set(state => ({ showRevisionModal: !state.showRevisionModal })),
    hideRevisionModal: () => set({ showRevisionModal: false }),
    toggleRevisionHistory: () => set(state => ({ showRevisionHistory: !state.showRevisionHistory })),
    hideRevisionHistory: () => set({ showRevisionHistory: false }),
    setSelectedRevision: (revision: RevisionEntry | null) => set({ selectedRevision: revision }),
    setAvailableFields: (fields: FieldMeta[]) => set({ availableFields: fields }),

    // === UTILIDADES ===
    setLoading: (loading: boolean) => set({ loading }),
    setSaving: (saving: boolean) => set({ saving }),
    setError: (error: string | null) => set({ error }),
    setMessage: (message: string | null) => set({ message }),
    reset: () => set(() => ({ ...initialState })),
  }))
);

// Selectores para facilitar el uso
export const useRevisionData = () => useRevisionesStore(state => state.revisionData);
export const useIsReviewing = () => useRevisionesStore(state => state.isReviewing);
export const useActiveRevision = () => useRevisionesStore(state => state.activeRevision);
export const useCurrentSuggestions = () => useRevisionesStore(state => state.currentSuggestions);
export const useRevisionStatus = () => useRevisionesStore(state => state.revisionData?.status);
export const usePendingChanges = () => useRevisionesStore(state => state.pendingChanges);
export const useShowRevisionModal = () => useRevisionesStore(state => state.showRevisionModal);
export const useShowRevisionHistory = () => useRevisionesStore(state => state.showRevisionHistory);
export const useAvailableFields = () => useRevisionesStore(state => state.availableFields);
export const useRevisionLoading = () => useRevisionesStore(state => state.loading);
export const useRevisionSaving = () => useRevisionesStore(state => state.saving);
export const useRevisionError = () => useRevisionesStore(state => state.error);
export const useRevisionMessage = () => useRevisionesStore(state => state.message);
export const useSelectedRevision = () => useRevisionesStore(state => state.selectedRevision);
