import React, { useState } from 'react';
import { RevisionData } from '../../redux/justipreciacion/homologacion/revisiones/types';
import { useRevisiones } from '../../hooks/useRevisiones';
import RevisionStatusControl from './RevisionStatusControl';

interface RevisionDetailProps {
  revision: RevisionData;
}

export const RevisionDetail: React.FC<RevisionDetailProps> = ({ revision }) => {
  const { updateRevision, loading } = useRevisiones();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    status: revision.status,
    assigned_reviewer: revision.assigned_reviewer || '',
  });

  const handleSave = async () => {
    try {
      await updateRevision(revision.id, editData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar revisión:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'PENDIENTE': '#ffc107',
      'EN_REVISION': '#17a2b8',
      'APROBADA': '#28a745',
      'RECHAZADA': '#dc3545',
    };
    return colors[status as keyof typeof colors] || '#6c757d';
  };

  const handleRevisionStatusChange = (updatedRevision: RevisionData) => {
    console.log('📋 Revisión actualizada:', updatedRevision);
    // El componente se refrescará automáticamente
  };

  return (
    <div className="revision-detail">
      {/* Control de estado de la revisión */}
      <RevisionStatusControl 
        revision={revision}
        onStatusChange={handleRevisionStatusChange}
      />

      <div className="revision-detail-header">
        <h3>Información de la Revisión</h3>
        {revision.can_edit && (
          <button
            className="btn-edit"
            onClick={() => setIsEditing(!isEditing)}
            disabled={loading}
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        )}
      </div>

      <div className="revision-detail-content">
        <div className="revision-detail-grid">
          <div className="detail-item">
            <label>ID de Homologación:</label>
            <span>{revision.homologacion_id}</span>
          </div>

          <div className="detail-item">
            <label>Tipo:</label>
            <span className="revision-type-badge">{revision.type}</span>
          </div>

          <div className="detail-item">
            <label>Propósito de Evaluación:</label>
            <span>{revision.appraisal_purpose}</span>
          </div>

          <div className="detail-item">
            <label>Versión Actual:</label>
            <span>{revision.current_version}</span>
          </div>

          <div className="detail-item">
            <label>Estado:</label>
            {isEditing ? (
              <select
                value={editData.status}
                onChange={(e) => setEditData({ ...editData, status: e.target.value as any })}
                className="form-select"
              >
                <option value="PENDIENTE">Pendiente</option>
                <option value="EN_REVISION">En Revisión</option>
                <option value="APROBADA">Aprobada</option>
                <option value="RECHAZADA">Rechazada</option>
              </select>
            ) : (
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(revision.status) }}
              >
                {revision.status}
              </span>
            )}
          </div>

          <div className="detail-item">
            <label>Revisor Asignado:</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.assigned_reviewer}
                onChange={(e) => setEditData({ ...editData, assigned_reviewer: e.target.value })}
                className="form-input"
                placeholder="Nombre del revisor"
              />
            ) : (
              <span>{revision.assigned_reviewer || 'No asignado'}</span>
            )}
          </div>

          <div className="detail-item">
            <label>Fecha de Creación:</label>
            <span>{formatDate(revision.created_at)}</span>
          </div>

          <div className="detail-item">
            <label>Última Actualización:</label>
            <span>{formatDate(revision.updated_at)}</span>
          </div>

          {revision.reviewed_at && (
            <div className="detail-item">
              <label>Fecha de Revisión:</label>
              <span>{formatDate(revision.reviewed_at)}</span>
            </div>
          )}

          <div className="detail-item">
            <label>Puede Revisar:</label>
            <span className={`permission-badge ${revision.can_review ? 'allowed' : 'denied'}`}>
              {revision.can_review ? 'Sí' : 'No'}
            </span>
          </div>

          <div className="detail-item">
            <label>Puede Editar:</label>
            <span className={`permission-badge ${revision.can_edit ? 'allowed' : 'denied'}`}>
              {revision.can_edit ? 'Sí' : 'No'}
            </span>
          </div>
        </div>

        {revision.revisiones && revision.revisiones.length > 0 && (
          <div className="revision-data-section">
            <h4>Datos de Revisión</h4>
            <div className="revision-data-content">
              <pre>{JSON.stringify(revision.revisiones, null, 2)}</pre>
            </div>
          </div>
        )}

        {isEditing && (
          <div className="revision-detail-actions">
            <button 
              onClick={handleSave}
              className="btn-save"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="btn-cancel"
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};