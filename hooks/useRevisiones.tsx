/** @format */

"use client";

import React from "react";
import { useRevisionesStore } from "@/store/revisiones";
import { FieldMeta, RevisionSuggestion } from "@/store/revisiones/types";

interface UseRevisionesOptions {
  homologacionId?: number;
  tipo?: "TERRENO" | "RENTA";
  tipoServicio?: string;
  autoLoad?: boolean;
}

export const useRevisiones = (options: UseRevisionesOptions = {}) => {
  const {
    homologacionId,
    tipo,
    tipoServicio,
    autoLoad = true
  } = options;

  const store = useRevisionesStore();

  // Cargar datos automáticamente cuando cambien los parámetros
  React.useEffect(() => {
    if (autoLoad && homologacionId && tipo && tipoServicio) {
      store.loadRevisionData(homologacionId, tipo, tipoServicio);
    }
  }, [autoLoad, homologacionId, tipo, tipoServicio, store.loadRevisionData]);

  // Funciones helper
  const startNewRevision = React.useCallback((reviewer: string = "Usuario Actual") => {
    store.startRevision(reviewer);
  }, [store.startRevision]);

  const addFieldSuggestion = React.useCallback((suggestion: Omit<RevisionSuggestion, "reviewer">) => {
    const fullSuggestion: RevisionSuggestion = {
      ...suggestion,
      reviewer: "Usuario Actual" // TODO: Obtener del contexto de auth
    };
    store.addSuggestion(fullSuggestion);
  }, [store.addSuggestion]);

  const submitCurrentRevision = React.useCallback(async (generalComments?: string) => {
    try {
      await store.submitRevision(generalComments);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Error desconocido" 
      };
    }
  }, [store.submitRevision]);

  const resolveFieldComment = React.useCallback(async (revisionVersion: string, commentId: string) => {
    try {
      await store.resolveComment(revisionVersion, commentId);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Error desconocido" 
      };
    }
  }, [store.resolveComment]);

  const dismissFieldComment = React.useCallback(async (revisionVersion: string, commentId: string) => {
    try {
      await store.dismissComment(revisionVersion, commentId);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Error desconocido" 
      };
    }
  }, [store.dismissComment]);

  const loadRevisionData = React.useCallback(async () => {
    if (homologacionId && tipo && tipoServicio) {
      await store.loadRevisionData(homologacionId, tipo, tipoServicio);
    }
  }, [homologacionId, tipo, tipoServicio, store.loadRevisionData]);

  // Establecer campos disponibles según el tipo de homologación
  const setAvailableFieldsByType = React.useCallback((homologationType: "TERRENO" | "RENTA") => {
    const baseFields: FieldMeta[] = [
      { path: "factors.zone", label: "Factor de Zona", page: 1, type: "number" },
      { path: "factors.front", label: "Factor de Frente", page: 1, type: "number" },
      { path: "factors.depth", label: "Factor de Fondo", page: 1, type: "number" },
      { path: "documentation.Area.subject.value", label: "Área del Sujeto", page: 3, type: "number" },
      { path: "documentation.SalesCost.averageUnitCost.value", label: "Costo Unitario Promedio", page: 4, type: "number" },
    ];

    const terrenoFields: FieldMeta[] = [
      ...baseFields,
      { path: "factors.shape", label: "Factor de Forma", page: 2, type: "number" },
      { path: "factors.accessibility", label: "Factor de Accesibilidad", page: 2, type: "number" },
    ];

    const rentaFields: FieldMeta[] = [
      ...baseFields,
      { path: "factors.age", label: "Factor de Edad", page: 2, type: "number" },
      { path: "factors.conservation", label: "Factor de Conservación", page: 2, type: "number" },
      { path: "documentation.Indiviso.surface", label: "Superficie Indiviso", page: 5, type: "number" },
    ];

    const fields = homologationType === "TERRENO" ? terrenoFields : rentaFields;
    store.setAvailableFields(fields);
  }, [store.setAvailableFields]);

  // Estadísticas calculadas
  const stats = {
    totalRevisiones: store.revisionData?.stats.total_revisiones || 0,
    comentariosPendientes: store.revisionData?.stats.comentarios_pendientes || 0,
    ultimaRevision: store.revisionData?.stats.ultima_revision || "",
    sugerenciasActuales: store.currentSuggestions.length,
    puedeRevisar: store.revisionData?.can_review || false,
  };

  // Estado de UI
  const ui = {
    showModal: store.showRevisionModal,
    showHistory: store.showRevisionHistory,
    openModal: store.toggleRevisionModal,
    closeModal: store.hideRevisionModal,
    openHistory: store.toggleRevisionHistory,
    closeHistory: store.hideRevisionHistory,
  };

  return {
    // Datos
    revisionData: store.revisionData,
    isReviewing: store.isReviewing,
    activeRevision: store.activeRevision,
    currentSuggestions: store.currentSuggestions,
    availableFields: store.availableFields,
    selectedRevision: store.selectedRevision,
    
    // Estados
    loading: store.loading,
    saving: store.saving,
    error: store.error,
    message: store.message,
    pendingChanges: store.pendingChanges,
    
    // Estadísticas
    stats,
    
    // UI
    ui,
    
    // Acciones
    loadRevisionData,
    startNewRevision,
    cancelRevision: store.cancelRevision,
    addFieldSuggestion,
    removeSuggestion: store.removeSuggestion,
    updateSuggestion: store.updateSuggestion,
    clearSuggestions: store.clearSuggestions,
    submitCurrentRevision,
    resolveFieldComment,
    dismissFieldComment,
    setSelectedRevision: store.setSelectedRevision,
    setAvailableFieldsByType,
    
    // Reset
    reset: store.reset,
  };
};

// Hook específico para usar solo con datos cargados
export const useRevisionesWithData = (
  homologacionId: number,
  tipo: "TERRENO" | "RENTA",
  tipoServicio: string
) => {
  return useRevisiones({
    homologacionId,
    tipo,
    tipoServicio,
    autoLoad: true
  });
};

// Hook para usar solo las acciones de UI
export const useRevisionesUI = () => {
  const store = useRevisionesStore();
  
  return {
    showModal: store.showRevisionModal,
    showHistory: store.showRevisionHistory,
    openModal: store.toggleRevisionModal,
    closeModal: store.hideRevisionModal,
    openHistory: store.toggleRevisionHistory,
    closeHistory: store.hideRevisionHistory,
    isReviewing: store.isReviewing,
    pendingChanges: store.pendingChanges,
  };
};
