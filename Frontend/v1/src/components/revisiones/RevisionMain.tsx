import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useRevisiones } from '../../hooks/useRevisiones';
import { RevisionDetail } from './RevisionDetail';
import { RevisionHistory } from './RevisionHistory';
import { RevisionSuggestions } from './RevisionSuggestions';
import { RevisionPermissions } from './RevisionPermissions';
import { CreateRevisionModal } from './CreateRevisionModal';
import './Revisiones.css';

interface URLParams {
  key: string;
  tipo: 'terreno' | 'renta';
  id: string;
  sp1_superficie?: string;
  sp1_factor?: string;
  tipo_servicio: 'justipreciacion';
  username: string;
}

export const RevisionMain: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const {
    revision_data,
    loading,
    error,
    fetchRevision,
    createRevision,
  } = useRevisiones();

  const [activeTab, setActiveTab] = useState<'detail' | 'history' | 'suggestions' | 'permissions'>('detail');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [urlParams, setUrlParams] = useState<URLParams | null>(null);

  // Extraer parámetros de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const extractedParams: URLParams = {
      key: params.get('key') || '',
      tipo: params.get('tipo') as 'terreno' | 'renta' || 'terreno',
      id: params.get('id') || '',
      sp1_superficie: params.get('sp1_superficie') || undefined,
      sp1_factor: params.get('sp1_factor') || undefined,
      tipo_servicio: params.get('tipo_servicio') as 'justipreciacion' || 'justipreciacion',
      username: params.get('username') || '',
    };
    setUrlParams(extractedParams);
  }, [location.search]);

  // Cargar revisión existente o mostrar modal para crear nueva
  useEffect(() => {
    if (id && urlParams) {
      fetchRevision(parseInt(id));
    } else if (urlParams && !revision_data) {
      setShowCreateModal(true);
    }
  }, [id, urlParams, fetchRevision, revision_data]);

  const handleCreateRevision = async (payload: any) => {
    if (urlParams) {
      const revisionPayload = {
        homologacion_id: parseInt(urlParams.id),
        type: urlParams.tipo.toUpperCase() as 'TERRENO' | 'RENTA',
        appraisal_purpose: urlParams.tipo_servicio,
        assigned_reviewer: urlParams.username,
        ...payload,
      };

      try {
        await createRevision(revisionPayload);
        setShowCreateModal(false);
      } catch (error) {
        console.error('Error al crear revisión:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="revision-loading">
        <div className="spinner"></div>
        <p>Cargando revisión...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="revision-error">
        <h3>Error al cargar la revisión</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  if (!revision_data && !showCreateModal) {
    return (
      <div className="revision-not-found">
        <h3>Revisión no encontrada</h3>
        <button onClick={() => setShowCreateModal(true)}>
          Crear Nueva Revisión
        </button>
      </div>
    );
  }

  return (
    <div className="revision-main">
      {revision_data && (
        <>
          <div className="revision-header">
            <h2>Revisión #{revision_data.id}</h2>
            <div className="revision-info">
              <span className="revision-type">{revision_data.type}</span>
              <span className={`revision-status status-${revision_data.status.toLowerCase()}`}>
                {revision_data.status}
              </span>
            </div>
          </div>

          <div className="revision-tabs">
            <button
              className={activeTab === 'detail' ? 'active' : ''}
              onClick={() => setActiveTab('detail')}
            >
              Detalles
            </button>
            <button
              className={activeTab === 'history' ? 'active' : ''}
              onClick={() => setActiveTab('history')}
            >
              Historial
            </button>
            <button
              className={activeTab === 'suggestions' ? 'active' : ''}
              onClick={() => setActiveTab('suggestions')}
            >
              Sugerencias
            </button>
            <button
              className={activeTab === 'permissions' ? 'active' : ''}
              onClick={() => setActiveTab('permissions')}
            >
              Permisos
            </button>
          </div>

          <div className="revision-content">
            {activeTab === 'detail' && <RevisionDetail revision={revision_data} />}
            {activeTab === 'history' && <RevisionHistory revisionId={revision_data.id} />}
            {activeTab === 'suggestions' && <RevisionSuggestions revisionId={revision_data.id} />}
            {activeTab === 'permissions' && <RevisionPermissions revisionId={revision_data.id} />}
          </div>
        </>
      )}

      {showCreateModal && (
        <CreateRevisionModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateRevision}
          urlParams={urlParams}
        />
      )}
    </div>
  );
};