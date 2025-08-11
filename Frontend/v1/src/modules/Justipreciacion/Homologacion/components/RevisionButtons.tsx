/** @format */

import { Button } from "../../../../components/Button";
import { useState } from "react";
import { Alert } from "../../../../utils/alert";
import { useRevisionIntegration } from "../hooks/useRevisionIntegration";
import { PublicarRevisionModal } from "./modals/PublicarRevisionModal";
import { HistorialRevisionModal } from "./modals/HistorialRevisionModal";
import { SugerenciasRevisionModal } from "./modals/SugerenciasRevisionModal";

interface RevisionButtonsProps {
  recordType: string; // Acepta string y lo convertimos internamente
  recordId: number;
  justipreciacionId: number;
}

/**
 * Componente de botones de revisión integrado con el módulo de homologación
 */
export const RevisionButtons = ({ 
  recordType, 
  recordId, 
  justipreciacionId 
}: RevisionButtonsProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [showPublicarModal, setShowPublicarModal] = useState(false);
  const [showHistorialModal, setShowHistorialModal] = useState(false);
  const [showSugerenciasModal, setShowSugerenciasModal] = useState(false);

  // Normalizar el tipo de registro
  const normalizedType = recordType.toUpperCase().includes('TERRENO') ? 'TERRENO' : 'RENTA';

  const {
    revisionInfo,
    isLoading,
    error,
    createRevision,
    openRevisionHistory,
    openRevisionSuggestions,
    canCreateRevision,
    hasPermissionToReview
  } = useRevisionIntegration({
    recordType: normalizedType,
    recordId,
    justipreciacionId,
    enabled: recordId > 0 && justipreciacionId > 0
  });

  // Depuración
  console.log("🎯 RevisionButtons - Estado actual:", {
    recordType: normalizedType,
    recordId,
    justipreciacionId,
    revisionInfo,
    isLoading,
    error
  });

  // Función para crear nueva revisión con confirmación
  const handleCreateRevision = () => {
    Alert.Save({
      title: "¡Crear Nueva Revisión!",
      text: `¿Está seguro que desea crear una revisión para este registro de ${normalizedType}?`
    }).then(({ isConfirmed }: any) => {
      if (isConfirmed) {
        setIsCreating(true);
        createRevision()
          .then(() => {
            Alert.Success({
              title: "¡Revisión Creada!",
              text: "La revisión se ha creado exitosamente."
            });
          })
          .catch((err: any) => {
            Alert.Error({
              title: "¡Error!",
              text: `No se pudo crear la revisión: ${err.message}`
            });
          })
          .finally(() => {
            setIsCreating(false);
          });
      }
    });
  };

  // Función para abrir el modal de publicación de revisiones
  const handlePublishRevision = () => {
    if (!revisionInfo?.id) return;
    setShowPublicarModal(true);
  };

  // Función para abrir el modal de historial
  const handleOpenHistory = () => {
    if (!revisionInfo?.id) return;
    setShowHistorialModal(true);
  };

  // Función para abrir el modal de sugerencias
  const handleOpenSuggestions = () => {
    if (!revisionInfo?.id) return;
    setShowSugerenciasModal(true);
  };

  // Si no hay datos válidos, no mostrar botones
  if (!recordId || !justipreciacionId || recordId === 0 || justipreciacionId === 0) {
    return null;
  }

  // Configuración de botones según el estado
  const getButtonConfig = () => {
    if (!revisionInfo) {
      return {
        showCreate: true,
        showPublish: false,
        showHistory: false,
        showSuggestions: false
      };
    }

    switch (revisionInfo.status) {
      case 'sin_revision':
        return {
          showCreate: canCreateRevision,
          showPublish: false,
          showHistory: false,
          showSuggestions: false
        };
      case 'en_revision':
        return {
          showCreate: false,
          showPublish: hasPermissionToReview,
          showHistory: true,
          showSuggestions: true
        };
      case 'revisado':
        return {
          showCreate: false,
          showPublish: false,
          showHistory: true,
          showSuggestions: true
        };
      case 'rechazado':
        return {
          showCreate: canCreateRevision,
          showPublish: false,
          showHistory: true,
          showSuggestions: true
        };
      default:
        return {
          showCreate: false,
          showPublish: false,
          showHistory: false,
          showSuggestions: false
        };
    }
  };

  const config = getButtonConfig();

  return (
    <>
      {/* Botón para crear nueva revisión */}
      {config.showCreate && (
        <Button 
          className="me-2" 
          type="success"
          size="sm"
          loading={isCreating}
          onClick={handleCreateRevision}
          disabled={isLoading}
        >
          <span>Nueva Revisión</span>
        </Button>
      )}

      {/* Botón para publicar/gestionar revisión */}
      {config.showPublish && (
        <Button 
          className="me-2" 
          type="primary"
          size="sm"
          onClick={handlePublishRevision}
          disabled={isLoading}
        >
          <span>Publicar Revisión</span>
        </Button>
      )}

      {/* Botón para ver historial */}
      {config.showHistory && (
        <Button 
          className="me-2" 
          type="info"
          appearance="outline"
          size="sm"
          onClick={handleOpenHistory}
          disabled={isLoading || !revisionInfo?.id}
        >
          <span>Historial</span>
        </Button>
      )}

      {/* Botón para ver sugerencias */}
      {config.showSuggestions && (
        <Button 
          className="me-2" 
          type="warning"
          appearance="outline"
          size="sm"
          onClick={handleOpenSuggestions}
          disabled={isLoading || !revisionInfo?.id}
        >
          <span>Sugerencias</span>
        </Button>
      )}

      {/* Indicador de estado para debugging */}
      {revisionInfo && (
        <span className="badge text-xs me-2" style={{
          backgroundColor: getStatusColor(revisionInfo.status),
          color: 'white',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '10px'
        }}>
          {getStatusLabel(revisionInfo.status)}
        </span>
      )}

      {/* Mostrar error si existe */}
      {error && (
        <span className="text-danger text-xs">
          Error: {error}
        </span>
      )}

      {/* Modales */}
      {revisionInfo?.id && (
        <>
          <PublicarRevisionModal
            show={showPublicarModal}
            onClose={() => setShowPublicarModal(false)}
            revisionId={revisionInfo.id}
            tipo={normalizedType}
            recordId={recordId}
            justipreciacionId={justipreciacionId}
          />
          
          <HistorialRevisionModal
            show={showHistorialModal}
            onClose={() => setShowHistorialModal(false)}
            revisionId={revisionInfo.id}
          />
          
          <SugerenciasRevisionModal
            show={showSugerenciasModal}
            onClose={() => setShowSugerenciasModal(false)}
            revisionId={revisionInfo.id}
          />
        </>
      )}
    </>
  );
};

// Funciones auxiliares para styling
function getStatusColor(status: string): string {
  switch (status) {
    case 'sin_revision': return '#6c757d';
    case 'en_revision': return '#0d6efd';
    case 'revisado': return '#198754';
    case 'rechazado': return '#dc3545';
    default: return '#6c757d';
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'sin_revision': return 'Sin Revisión';
    case 'en_revision': return 'En Revisión';
    case 'revisado': return 'Revisado';
    case 'rechazado': return 'Rechazado';
    default: return 'Desconocido';
  }
}
