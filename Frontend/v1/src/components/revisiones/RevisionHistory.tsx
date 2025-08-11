import React, { useEffect, useState } from 'react';
import { useRevisiones } from '../../hooks/useRevisiones';

interface RevisionHistoryProps {
  revisionId: number;
}

export const RevisionHistory: React.FC<RevisionHistoryProps> = ({ revisionId }) => {
  const { revision_history, loading, fetchHistory } = useRevisiones();
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchHistory(revisionId);
  }, [revisionId, fetchHistory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActionIcon = (action: string) => {
    const icons = {
      'CREATE': '📝',
      'UPDATE': '✏️',
      'DELETE': '🗑️',
      'APPROVE': '✅',
      'REJECT': '❌',
      'ASSIGN': '👤',
      'COMMENT': '💬',
    };
    return icons[action as keyof typeof icons] || '📄';
  };

  const getActionColor = (action: string) => {
    const colors = {
      'CREATE': '#28a745',
      'UPDATE': '#17a2b8',
      'DELETE': '#dc3545',
      'APPROVE': '#28a745',
      'REJECT': '#dc3545',
      'ASSIGN': '#6f42c1',
      'COMMENT': '#fd7e14',
    };
    return colors[action as keyof typeof colors] || '#6c757d';
  };

  const filteredHistory = revision_history.filter((item: any) => 
    item.action.toLowerCase().includes(filter.toLowerCase()) ||
    item.performed_by.toLowerCase().includes(filter.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(filter.toLowerCase()))
  );

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    const dateA = new Date(a.performed_at);
    const dateB = new Date(b.performed_at);
    return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });

  if (loading) {
    return (
      <div className="revision-history-loading">
        <div className="spinner"></div>
        <p>Cargando historial...</p>
      </div>
    );
  }

  return (
    <div className="revision-history">
      <div className="revision-history-header">
        <h3>Historial de Cambios</h3>
        <div className="revision-history-controls">
          <input
            type="text"
            placeholder="Filtrar por acción, usuario o descripción..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-input"
          />
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="sort-button"
          >
            {sortOrder === 'desc' ? '↓ Más reciente' : '↑ Más antiguo'}
          </button>
        </div>
      </div>

      <div className="revision-history-content">
        {sortedHistory.length === 0 ? (
          <div className="no-history">
            <p>No hay historial disponible para esta revisión.</p>
          </div>
        ) : (
          <div className="history-timeline">
            {sortedHistory.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-marker">
                  <div 
                    className="history-icon"
                    style={{ backgroundColor: getActionColor(item.action) }}
                  >
                    {getActionIcon(item.action)}
                  </div>
                </div>
                
                <div className="history-content">
                  <div className="history-header">
                    <span className="history-action">{item.action}</span>
                    <span className="history-date">{formatDate(item.performed_at)}</span>
                  </div>
                  
                  <div className="history-user">
                    <strong>Por:</strong> {item.performed_by}
                  </div>

                  {item.description && (
                    <div className="history-description">
                      {item.description}
                    </div>
                  )}

                  {item.previous_data && (
                    <details className="history-data">
                      <summary>Datos Anteriores</summary>
                      <pre>{JSON.stringify(item.previous_data, null, 2)}</pre>
                    </details>
                  )}

                  {item.new_data && (
                    <details className="history-data">
                      <summary>Nuevos Datos</summary>
                      <pre>{JSON.stringify(item.new_data, null, 2)}</pre>
                    </details>
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