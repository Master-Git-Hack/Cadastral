import React, { useState, useEffect } from 'react';
import { useHomologacionRevisions, createRevisionForHomologacion, getRevisionStatusBadge } from '../../hooks/useHomologacionRevisions';
import { getRevisionParamsFromURL } from '../../utils/revisionConfig';
import RevisionModuleWrapper from './RevisionModuleWrapper';

interface Props {
  // Props que debería recibir del módulo de homologaciones
  homologacionId: number;
  tipo: 'terreno' | 'renta';
  username: string;
  // Callback para cuando se crea una revisión
  onRevisionCreated?: () => void;
}

/**
 * Componente integrador que conecta el módulo de homologaciones con el sistema de revisiones
 * Este componente debe ser incluido en las páginas de homologaciones existentes
 */
const HomologacionRevisionIntegrator: React.FC<Props> = ({
  homologacionId,
  tipo,
  username,
  onRevisionCreated
}) => {
  const [showRevisionModule, setShowRevisionModule] = useState(false);
  const [creatingRevision, setCreatingRevision] = useState(false);
  
  // Usar el hook para obtener el estado de revisiones
  const revisionStatus = useHomologacionRevisions({
    homologacionId,
    tipo,
    username
  });

  // Manejar la creación de revisiones
  const handleCreateRevision = async () => {
    try {
      setCreatingRevision(true);
      
      await createRevisionForHomologacion(
        homologacionId,
        tipo,
        { username }
      );
      
      // Notificar al componente padre
      if (onRevisionCreated) {
        onRevisionCreated();
      }
      
      alert('Revisión creada exitosamente');
      
    } catch (error: any) {
      alert(`Error al crear revisión: ${error.message}`);
    } finally {
      setCreatingRevision(false);
    }
  };

  const handleToggleRevisionModule = () => {
    setShowRevisionModule(!showRevisionModule);
  };

  // No mostrar nada si no hay homologacionId válido
  if (!homologacionId || homologacionId === 0) {
    return null;
  }

  // Mostrar loading mientras se cargan los datos
  if (revisionStatus.loading) {
    return (
      <div style={{
        margin: '16px 0',
        padding: '16px',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: '#f8fafc',
        textAlign: 'center'
      }}>
        Cargando estado de revisiones...
      </div>
    );
  }

  // Obtener la configuración del badge de estado
  const statusBadge = getRevisionStatusBadge(revisionStatus.revisions);

  return (
    <div style={{
      margin: '16px 0',
      padding: '16px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      backgroundColor: '#f8fafc'
    }}>
      {/* Encabezado con estado */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <span style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#374151'
        }}>
          Estado de Revisión
        </span>
        
        <span style={{
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
          color: statusBadge.color,
          backgroundColor: statusBadge.bgColor
        }}>
          {statusBadge.text}
        </span>
      </div>

      {/* Información adicional */}
      {revisionStatus.hasRevisions && (
        <div style={{
          display: 'flex',
          gap: '16px',
          margin: '8px 0',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <span>Total de revisiones: {revisionStatus.revisions.length}</span>
          <span>Tipo: {tipo.toUpperCase()}</span>
        </div>
      )}

      {/* Mostrar error si existe */}
      {revisionStatus.error && (
        <div style={{
          color: '#dc2626',
          fontSize: '14px',
          marginBottom: '8px'
        }}>
          Error: {revisionStatus.error}
        </div>
      )}

      {/* Botones de acción */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
        {!revisionStatus.hasRevisions && revisionStatus.canCreateRevision && (
          <button
            onClick={handleCreateRevision}
            disabled={creatingRevision}
            style={{
              padding: '8px 16px',
              backgroundColor: creatingRevision ? '#9ca3af' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: creatingRevision ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {creatingRevision ? 'Creando...' : 'Crear Revisión'}
          </button>
        )}

        {revisionStatus.hasRevisions && (
          <button
            onClick={handleToggleRevisionModule}
            style={{
              padding: '8px 16px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {showRevisionModule ? 'Ocultar Revisión' : 'Ver Revisión'}
          </button>
        )}
      </div>

      {/* Módulo de revisión */}
      {showRevisionModule && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          backgroundColor: 'white'
        }}>
          <RevisionModuleWrapper />
        </div>
      )}
    </div>
  );
};

export default HomologacionRevisionIntegrator;
