import React, { useState } from 'react';

interface URLParams {
  key: string;
  tipo: 'terreno' | 'renta';
  id: string;
  sp1_superficie?: string;
  sp1_factor?: string;
  tipo_servicio: 'justipreciacion';
  username: string;
}

interface CreateRevisionModalProps {
  onClose: () => void;
  onSubmit: (payload: any) => void;
  urlParams: URLParams | null;
}

export const CreateRevisionModal: React.FC<CreateRevisionModalProps> = ({ 
  onClose, 
  onSubmit, 
  urlParams 
}) => {
  const [formData, setFormData] = useState({
    appraisal_purpose: urlParams?.tipo_servicio || 'justipreciacion',
    assigned_reviewer: urlParams?.username || '',
    description: '',
    priority: 'MEDIA' as 'BAJA' | 'MEDIA' | 'ALTA',
    expected_completion: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error al crear revisión:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatHomologacionData = () => {
    if (!urlParams) return null;

    return {
      'ID de Homologación': urlParams.id,
      'Tipo': urlParams.tipo.toUpperCase(),
      'Superficie (SP1)': urlParams.sp1_superficie || 'N/A',
      'Factor (SP1)': urlParams.sp1_factor || 'N/A',
      'Tipo de Servicio': urlParams.tipo_servicio,
      'Usuario': urlParams.username,
    };
  };

  return (
    <div className="create-revision-modal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <h3>Crear Nueva Revisión</h3>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        <div className="modal-body">
          {urlParams && (
            <div className="homologacion-info">
              <h4>Información de Homologación</h4>
              <div className="info-grid">
                {Object.entries(formatHomologacionData() || {}).map(([key, value]) => (
                  <div key={key} className="info-item">
                    <label>{key}:</label>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="create-revision-form">
            <div className="form-group">
              <label>Propósito de Evaluación*</label>
              <input
                type="text"
                value={formData.appraisal_purpose}
                onChange={(e) => setFormData({...formData, appraisal_purpose: e.target.value as "justipreciacion"})}
                placeholder="ej: Justipreciación para expropiación"
                required
              />
            </div>

            <div className="form-group">
              <label>Revisor Asignado*</label>
              <input
                type="text"
                value={formData.assigned_reviewer}
                onChange={(e) => setFormData({...formData, assigned_reviewer: e.target.value})}
                placeholder="Nombre del revisor"
                required
              />
            </div>

            <div className="form-group">
              <label>Prioridad</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
              >
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>

            <div className="form-group">
              <label>Fecha Esperada de Finalización</label>
              <input
                type="date"
                value={formData.expected_completion}
                onChange={(e) => setFormData({...formData, expected_completion: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Descripción opcional de la revisión..."
                rows={3}
              />
            </div>

            <div className="revision-type-info">
              <h4>Tipo de Revisión</h4>
              <div className="type-badge">
                {urlParams?.tipo.toUpperCase()} - {urlParams?.tipo_servicio}
              </div>
              <p className="type-description">
                {urlParams?.tipo === 'terreno' 
                  ? 'Esta revisión se enfocará en la evaluación de terrenos y sus características físicas, ubicación, y factores que afectan su valor.'
                  : 'Esta revisión se enfocará en la evaluación de propiedades en renta, análisis de mercado, y comparables de alquiler.'
                }
              </p>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-create"
                disabled={loading}
              >
                {loading ? 'Creando Revisión...' : 'Crear Revisión'}
              </button>
              <button 
                type="button" 
                onClick={onClose}
                className="btn-cancel"
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};