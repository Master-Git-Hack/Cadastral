import React, { useEffect, useState } from 'react';
import { useRevisiones } from '../../hooks/useRevisiones';
import { getRevisionParamsFromURL, validateRevisionParams, REVISION_STATUS_CONFIG } from '../../utils/revisionConfig';
import { RevisionMain } from './RevisionMain';

/**
 * Componente principal que inicializa y maneja el módulo de revisiones
 * Este componente debe ser incluido en la aplicación principal de homologaciones
 */
const RevisionModuleWrapper: React.FC = () => {
  const [urlParams, setUrlParams] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const {
    revision_data,
    loading,
    error,
    initRevisionModule,
    fetchRevisionsByHomologacion,
  } = useRevisiones();

  useEffect(() => {
    // Obtener parámetros de la URL
    const params = getRevisionParamsFromURL();
    
    if (params && validateRevisionParams(params)) {
      setUrlParams(params);
      
      // Inicializar el módulo de revisiones
      initRevisionModule(params)
        .then(() => {
          setIsInitialized(true);
        })
        .catch((error: any) => {
          console.error('Error al inicializar el módulo de revisiones:', error);
        });
    }
  }, []);

  if (loading) {
    return (
      <div className="revision-loading">
        <div className="loading-spinner"></div>
        <p>Cargando módulo de revisiones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="revision-error">
        <h3>Error en el módulo de revisiones</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-button"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!isInitialized || !urlParams) {
    return (
      <div className="revision-not-initialized">
        <h3>Módulo de revisiones no disponible</h3>
        <p>Los parámetros necesarios no están presentes en la URL.</p>
        <p>URL esperada: ?key=...&tipo=terreno|renta&id=...&username=...</p>
      </div>
    );
  }

  return (
    <div className="revision-module-wrapper">
      <div className="revision-header">
        <h2>Revisión de Homologación</h2>
        <div className="revision-info">
          <span className="revision-type">Tipo: {urlParams.tipo.toUpperCase()}</span>
          <span className="revision-id">ID: {urlParams.id}</span>
          <span className="revision-user">Usuario: {urlParams.username}</span>
          {revision_data && (
            <span 
              className="revision-status"
              style={{ 
                backgroundColor: REVISION_STATUS_CONFIG[revision_data.status as keyof typeof REVISION_STATUS_CONFIG]?.bgColor,
                color: REVISION_STATUS_CONFIG[revision_data.status as keyof typeof REVISION_STATUS_CONFIG]?.color
              }}
            >
              {REVISION_STATUS_CONFIG[revision_data.status as keyof typeof REVISION_STATUS_CONFIG]?.label}
            </span>
          )}
        </div>
      </div>
      
      <RevisionMain />
    </div>
  );
};

export default RevisionModuleWrapper;
