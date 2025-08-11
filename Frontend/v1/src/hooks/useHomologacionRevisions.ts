/**
 * Hook para integrar el módulo de revisiones con homologaciones existentes
 * Este hook debe usarse en el componente principal de homologaciones
 */

import { useEffect, useState } from 'react';

export interface RevisionStatus {
  hasRevisions: boolean;
  revisions: any[];
  canCreateRevision: boolean;
  loading: boolean;
  error: string | null;
}

export interface HomologacionRevisionParams {
  homologacionId: number;
  tipo: 'terreno' | 'renta';
  username: string;
}

/**
 * Hook principal para manejar revisiones en el contexto de homologaciones
 */
export const useHomologacionRevisions = (params?: HomologacionRevisionParams): RevisionStatus => {
  const [revisionStatus, setRevisionStatus] = useState<RevisionStatus>({
    hasRevisions: false,
    revisions: [],
    canCreateRevision: true,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const checkRevisions = async () => {
      if (!params) {
        setRevisionStatus(prev => ({
          ...prev,
          loading: false,
          error: 'Parámetros de revisión no proporcionados'
        }));
        return;
      }

      const { homologacionId, tipo } = params;

      if (!homologacionId || homologacionId === 0) {
        setRevisionStatus({
          hasRevisions: false,
          revisions: [],
          canCreateRevision: false,
          loading: false,
          error: null,
        });
        return;
      }

      try {
        // Usar fetch directamente para verificar revisiones
        const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/homologacion/${homologacionId}?tipo=${tipo}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRevisionStatus({
            hasRevisions: data.revisions && data.revisions.length > 0,
            revisions: data.revisions || [],
            canCreateRevision: !data.revisions || data.revisions.length === 0,
            loading: false,
            error: null,
          });
        } else if (response.status === 404) {
          // No hay revisiones
          setRevisionStatus({
            hasRevisions: false,
            revisions: [],
            canCreateRevision: true,
            loading: false,
            error: null,
          });
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      } catch (error) {
        setRevisionStatus({
          hasRevisions: false,
          revisions: [],
          canCreateRevision: true,
          loading: false,
          error: error instanceof Error ? error.message : 'Error desconocido',
        });
      }
    };

    checkRevisions();
  }, [params?.homologacionId, params?.tipo, params?.username]);

  return revisionStatus;
};

/**
 * Función para crear una revisión desde homologación
 */
export const createRevisionForHomologacion = async (
  homologacionId: number,
  tipo: 'terreno' | 'renta',
  additionalData?: Record<string, any>
) => {
  const payload = {
    key: `homologacion_${tipo}_${homologacionId}`,
    tipo,
    id: homologacionId,
    username: 'current_user',
    descripcion: `Revisión para ${tipo} ${homologacionId}`,
    metadatos: {
      record_type: tipo,
      record_id: homologacionId,
      created_from: 'homologacion_module',
      ...additionalData
    }
  };

  const response = await fetch('http://172.31.103.57:56733/api/v1/revisiones/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Error creating revision: ${response.status}`);
  }

  return response.json();
};

/**
 * Función para obtener badge de estado basado en revisiones
 */
export const getRevisionStatusBadge = (revisions: any[]) => {
  if (!revisions || revisions.length === 0) {
    return {
      text: 'Sin revisiones',
      color: '#6b7280',
      bgColor: '#f3f4f6',
      canReview: true,
    };
  }

  const latestRevision = revisions[0];
  const status = latestRevision?.estado || 'en_proceso';

  switch (status) {
    case 'en_proceso':
    case 'en_revision':
      return {
        text: 'En revisión',
        color: '#3b82f6',
        bgColor: '#dbeafe',
        canReview: true,
      };
    case 'aprobado':
    case 'completado':
      return {
        text: 'Aprobado',
        color: '#10b981',
        bgColor: '#d1fae5',
        canReview: false,
      };
    case 'rechazado':
      return {
        text: 'Rechazado',
        color: '#ef4444',
        bgColor: '#fee2e2',
        canReview: true,
      };
    default:
      return {
        text: 'Estado desconocido',
        color: '#6b7280',
        bgColor: '#f3f4f6',
        canReview: false,
      };
  }
};
