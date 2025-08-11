import React, { useEffect, useState } from 'react';
import { useRevisiones } from '../../hooks/useRevisiones';
import { CreateSuggestionPayload } from '../../redux/justipreciacion/homologacion/revisiones/types';

interface RevisionSuggestionsProps {
  revisionId: number;
}

export const RevisionSuggestions: React.FC<RevisionSuggestionsProps> = ({ revisionId }) => {
  const { 
    revision_suggestions, 
    loading, 
    fetchSuggestions, 
    createSuggestion, 
    convertSuggestion 
  } = useRevisiones();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'converted' | 'pending'>('all');
  const [newSuggestion, setNewSuggestion] = useState<Partial<CreateSuggestionPayload>>({
    revision_data_id: revisionId,
    field_path: '',
    current_value: '',
    suggested_value: '',
    comment: '',
    field_label: '',
    page: 1,
    reviewer: '',
  });

  useEffect(() => {
    fetchSuggestions(revisionId);
  }, [revisionId, fetchSuggestions]);

  const handleCreateSuggestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSuggestion.field_path || !newSuggestion.comment || !newSuggestion.field_label || !newSuggestion.reviewer) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    try {
      await createSuggestion(newSuggestion as CreateSuggestionPayload);
      setShowCreateForm(false);
      setNewSuggestion({
        revision_data_id: revisionId,
        field_path: '',
        current_value: '',
        suggested_value: '',
        comment: '',
        field_label: '',
        page: 1,
        reviewer: '',
      });
      // Recargar sugerencias
      fetchSuggestions(revisionId);
    } catch (error) {
      console.error('Error al crear sugerencia:', error);
    }
  };

  const handleConvertSuggestion = async (suggestionId: number) => {
    try {
      await convertSuggestion(suggestionId);
      // Recargar sugerencias
      fetchSuggestions(revisionId);
    } catch (error) {
      console.error('Error al convertir sugerencia:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredSuggestions = revision_suggestions.filter((suggestion: any) => {
    switch (filter) {
      case 'converted':
        return suggestion.is_converted;
      case 'pending':
        return !suggestion.is_converted;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <div className="revision-suggestions-loading">
        <div className="spinner"></div>
        <p>Cargando sugerencias...</p>
      </div>
    );
  }

  return (
    <div className="revision-suggestions">
      <div className="revision-suggestions-header">
        <h3>Sugerencias de Revisión</h3>
        <div className="suggestions-controls">
          <div className="filter-tabs">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              Todas ({revision_suggestions.length})
            </button>
            <button
              className={filter === 'pending' ? 'active' : ''}
              onClick={() => setFilter('pending')}
            >
              Pendientes ({revision_suggestions.filter((s: any) => !s.is_converted).length})
            </button>
            <button
              className={filter === 'converted' ? 'active' : ''}
              onClick={() => setFilter('converted')}
            >
              Convertidas ({revision_suggestions.filter((s: any) => s.is_converted).length})
            </button>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-create-suggestion"
          >
            + Nueva Sugerencia
          </button>
        </div>
      </div>

      {showCreateForm && (
        <div className="create-suggestion-modal">
          <div className="modal-overlay" onClick={() => setShowCreateForm(false)} />
          <div className="modal-content">
            <h4>Crear Nueva Sugerencia</h4>
            <form onSubmit={handleCreateSuggestion}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Campo*</label>
                  <input
                    type="text"
                    value={newSuggestion.field_path || ''}
                    onChange={(e) => setNewSuggestion({...newSuggestion, field_path: e.target.value})}
                    placeholder="ej: datos.precio_unitario"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Etiqueta del Campo*</label>
                  <input
                    type="text"
                    value={newSuggestion.field_label || ''}
                    onChange={(e) => setNewSuggestion({...newSuggestion, field_label: e.target.value})}
                    placeholder="ej: Precio Unitario"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Valor Actual</label>
                  <input
                    type="text"
                    value={newSuggestion.current_value || ''}
                    onChange={(e) => setNewSuggestion({...newSuggestion, current_value: e.target.value})}
                    placeholder="Valor actual del campo"
                  />
                </div>

                <div className="form-group">
                  <label>Valor Sugerido</label>
                  <input
                    type="text"
                    value={newSuggestion.suggested_value || ''}
                    onChange={(e) => setNewSuggestion({...newSuggestion, suggested_value: e.target.value})}
                    placeholder="Nuevo valor propuesto"
                  />
                </div>

                <div className="form-group">
                  <label>Página</label>
                  <input
                    type="number"
                    value={newSuggestion.page || 1}
                    onChange={(e) => setNewSuggestion({...newSuggestion, page: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label>Revisor*</label>
                  <input
                    type="text"
                    value={newSuggestion.reviewer || ''}
                    onChange={(e) => setNewSuggestion({...newSuggestion, reviewer: e.target.value})}
                    placeholder="Nombre del revisor"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Comentario*</label>
                  <textarea
                    value={newSuggestion.comment || ''}
                    onChange={(e) => setNewSuggestion({...newSuggestion, comment: e.target.value})}
                    placeholder="Descripción detallada de la sugerencia..."
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Creando...' : 'Crear Sugerencia'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="btn-cancel"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="suggestions-content">
        {filteredSuggestions.length === 0 ? (
          <div className="no-suggestions">
            <p>
              {filter === 'all' 
                ? 'No hay sugerencias para esta revisión.'
                : filter === 'pending'
                ? 'No hay sugerencias pendientes.'
                : 'No hay sugerencias convertidas.'
              }
            </p>
          </div>
        ) : (
          <div className="suggestions-list">
            {filteredSuggestions.map((suggestion) => (
              <div key={suggestion.id} className={`suggestion-item ${suggestion.is_converted ? 'converted' : 'pending'}`}>
                <div className="suggestion-header">
                  <div className="suggestion-field">
                    <strong>{suggestion.field_label}</strong>
                    <small>({suggestion.field_path})</small>
                  </div>
                  <div className="suggestion-meta">
                    <span className="suggestion-page">Página {suggestion.page}</span>
                    <span className={`suggestion-status ${suggestion.is_converted ? 'converted' : 'pending'}`}>
                      {suggestion.is_converted ? 'Convertida' : 'Pendiente'}
                    </span>
                  </div>
                </div>

                <div className="suggestion-values">
                  {suggestion.current_value && (
                    <div className="current-value">
                      <label>Valor Actual:</label>
                      <span>{suggestion.current_value}</span>
                    </div>
                  )}
                  {suggestion.suggested_value && (
                    <div className="suggested-value">
                      <label>Valor Sugerido:</label>
                      <span>{suggestion.suggested_value}</span>
                    </div>
                  )}
                </div>

                <div className="suggestion-comment">
                  <p>{suggestion.comment}</p>
                </div>

                <div className="suggestion-footer">
                  <div className="suggestion-author">
                    <strong>Por:</strong> {suggestion.reviewer} - {formatDate(suggestion.created_at)}
                  </div>
                  {!suggestion.is_converted && (
                    <button
                      onClick={() => handleConvertSuggestion(suggestion.id)}
                      className="btn-convert"
                      disabled={loading}
                    >
                      Convertir
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};