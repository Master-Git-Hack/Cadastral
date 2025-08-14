/** @format */

import { useEffect, useState, useCallback } from "react";

// Tipos para el sistema de revisiones
export type RevisionStatus = 'sin_revision' | 'en_revision' | 'revisado' | 'rechazado';

export interface RevisionInfo {
  id?: number;
  status: RevisionStatus;
  hasRevisions: boolean;
  pendingCount: number;
  completedCount: number;
  rejectedCount: number;
  lastReviewDate?: string;
  reviewer?: string;
}

interface UseRevisionIntegrationParams {
  recordType: 'TERRENO' | 'RENTA'; // Usando los tipos del módulo existente
  recordId: number;
  justipreciacionId: number;
  enabled?: boolean;
}

interface UseRevisionIntegrationReturn {
  revisionInfo: RevisionInfo | null;
  isLoading: boolean;
  error: string | null;
  refreshRevisionStatus: () => Promise<void>;
  createRevision: () => Promise<any>;
  approveRevision: (revisionId: number, comentarios?: string) => Promise<any>;
  rejectRevision: (revisionId: number, comentarios?: string) => Promise<any>;
  openRevisionHistory: () => void;
  openRevisionSuggestions: () => void;
  hasPermissionToReview: boolean;
  canCreateRevision: boolean;
}

/**
 * Hook personalizado para integrar revisiones con el módulo de homologación existente
 */
export function useRevisionIntegration({
  recordType,
  recordId,
  justipreciacionId,
  enabled = true
}: UseRevisionIntegrationParams): UseRevisionIntegrationReturn {
  const [revisionInfo, setRevisionInfo] = useState<RevisionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermissionToReview, setHasPermissionToReview] = useState(false);

  // Función para verificar el estado de revisiones del registro
  const checkRevisionStatus = useCallback(async () => {
    if (!enabled || !recordId || recordId === 0 || !justipreciacionId) {
      setRevisionInfo({
        status: 'sin_revision',
        hasRevisions: false,
        pendingCount: 0,
        completedCount: 0,
        rejectedCount: 0
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Llamada al endpoint de verificación de estado usando fetch
      const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/status/homologacion/${recordId}?tipo=${recordType.toLowerCase()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // No hay revisiones para este registro
          setRevisionInfo({
            status: 'sin_revision',
            hasRevisions: false,
            pendingCount: 0,
            completedCount: 0,
            rejectedCount: 0
          });
          return;
        }
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("🔍 Datos del API de revisiones (Frontend/v1):", data);
      
      // Mapear el estado del backend al frontend
      const mapBackendStatus = (backendStatus: string | null): RevisionStatus => {
        console.log("🔄 Mapeando estado (Frontend/v1):", backendStatus);
        switch (backendStatus) {
          case "PENDIENTE":
            return "en_revision";
          case "APROBADA":
            return "revisado";
          case "RECHAZADA":
            return "rechazado";
          case "EN_REVISION":
            return "en_revision";
          default:
            return "sin_revision";
        }
      };

      // Contar revisiones por estado
      const revisions = data.revisions || [];
      const pendingCount = revisions.filter((r: any) => r.status === "PENDIENTE" || r.status === "EN_REVISION").length;
      const completedCount = revisions.filter((r: any) => r.status === "APROBADA").length;
      const rejectedCount = revisions.filter((r: any) => r.status === "RECHAZADA").length;

      const mappedStatus = mapBackendStatus(data.latest_status);
      console.log("📊 Estado mapeado (Frontend/v1):", mappedStatus);

      const revisionInfo = {
        id: revisions[0]?.id,
        status: mappedStatus,
        hasRevisions: data.has_revisions,
        pendingCount,
        completedCount,
        rejectedCount,
        lastReviewDate: revisions[0]?.updated_at,
        reviewer: revisions[0]?.assigned_reviewer,
      };

      console.log("💾 Guardando info de revisión (Frontend/v1):", revisionInfo);
      setRevisionInfo(revisionInfo);

      setHasPermissionToReview(!data.can_create); // Si no puede crear, significa que ya hay revisiones

    } catch (err) {
      console.error('Error verificando estado de revisiones:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      
      // En caso de error, asumir sin revisiones
      setRevisionInfo({
        status: 'sin_revision',
        hasRevisions: false,
        pendingCount: 0,
        completedCount: 0,
        rejectedCount: 0
      });
    } finally {
      setIsLoading(false);
    }
  }, [recordType, recordId, justipreciacionId, enabled]);

  // Función para refrescar el estado
  const refreshRevisionStatus = useCallback(async () => {
    await checkRevisionStatus();
  }, [checkRevisionStatus]);

  // Función para crear una nueva revisión
  const createRevision = useCallback(async () => {
    if (!recordId || recordId === 0 || !justipreciacionId) {
      throw new Error('IDs de registro inválidos');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://172.31.103.57:56733/api/v1/revisiones/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          homologacion_id: recordId,
          type: recordType.toUpperCase(), // "TERRENO" o "RENTA"
          appraisal_purpose: `Revisión de ${recordType.toLowerCase()} para justipreciación ${justipreciacionId}`,
          assigned_reviewer: 'current_user' // Se puede obtener del contexto de usuario
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error del backend:', errorData);
        throw new Error(`Error creando revisión: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const newRevision = await response.json();
      console.log('✅ Revisión creada exitosamente:', newRevision);
      
      // Refrescar el estado después de crear
      await refreshRevisionStatus();
      
      return newRevision;
    } catch (err) {
      console.error('Error creando revisión:', err);
      setError(err instanceof Error ? err.message : 'Error creando revisión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [recordType, recordId, justipreciacionId, refreshRevisionStatus]);

  // Función para abrir historial de revisiones
  const openRevisionHistory = useCallback(() => {
    if (revisionInfo?.id) {
      // Abrir en nueva ventana el historial de revisiones
      const url = `/revisiones/${revisionInfo.id}/historial`;
      window.open(url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    }
  }, [revisionInfo?.id]);

  // Función para abrir sugerencias de revisiones
  const openRevisionSuggestions = useCallback(() => {
    if (revisionInfo?.id) {
      // Abrir en nueva ventana las sugerencias de revisiones
      const url = `/revisiones/${revisionInfo.id}/sugerencias`;
      window.open(url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    }
  }, [revisionInfo?.id]);

  // Función para aprobar una revisión
  const approveRevision = useCallback(async (revisionId: number, comentarios: string = '') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/${revisionId}/aprobar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comentarios,
          usuario_revisor: 'current_user', // Se puede obtener del contexto de usuario
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error del backend al aprobar:', errorData);
        throw new Error(`Error aprobando revisión: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const result = await response.json();
      console.log('✅ Revisión aprobada exitosamente:', result);
      
      // Refrescar el estado después de aprobar
      await refreshRevisionStatus();
      
      return result;
    } catch (err) {
      console.error('Error aprobando revisión:', err);
      setError(err instanceof Error ? err.message : 'Error aprobando revisión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [refreshRevisionStatus]);

  // Función para rechazar una revisión
  const rejectRevision = useCallback(async (revisionId: number, comentarios: string = '') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/${revisionId}/rechazar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comentarios,
          usuario_revisor: 'current_user', // Se puede obtener del contexto de usuario
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error del backend al rechazar:', errorData);
        throw new Error(`Error rechazando revisión: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const result = await response.json();
      console.log('✅ Revisión rechazada exitosamente:', result);
      
      // Refrescar el estado después de rechazar
      await refreshRevisionStatus();
      
      return result;
    } catch (err) {
      console.error('Error rechazando revisión:', err);
      setError(err instanceof Error ? err.message : 'Error rechazando revisión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [refreshRevisionStatus]);

  // Verificar estado al montar el componente o cambiar parámetros
  useEffect(() => {
    checkRevisionStatus();
  }, [checkRevisionStatus]);

  const canCreateRevision = recordId > 0 && justipreciacionId > 0 && !revisionInfo?.hasRevisions;

  return {
    revisionInfo,
    isLoading,
    error,
    refreshRevisionStatus,
    createRevision,
    approveRevision,
    rejectRevision,
    openRevisionHistory,
    openRevisionSuggestions,
    hasPermissionToReview,
    canCreateRevision
  };
}
