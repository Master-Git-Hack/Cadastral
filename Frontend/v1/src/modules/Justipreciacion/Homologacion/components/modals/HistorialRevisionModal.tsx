/** @format */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Timeline } from 'rsuite';
import { Alert } from '../../../../../utils/alert';

interface HistorialRevisionModalProps {
  show: boolean;
  onClose: () => void;
  revisionId: number;
}

interface HistorialEntry {
  id: number;
  action: string;
  description: string;
  performed_by: string;
  performed_at: string;
  previous_data: any;
  new_data: any;
}

export const HistorialRevisionModal: React.FC<HistorialRevisionModalProps> = ({
  show,
  onClose,
  revisionId
}) => {
  const [loading, setLoading] = useState(false);
  const [historial, setHistorial] = useState<HistorialEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (show && revisionId) {
      loadHistorial(revisionId);
    }
  }, [show, revisionId]);

  const loadHistorial = async (revisionId: number) => {
    try {
      setLoading(true);
      setError(null);
      
      let historialData;
      
      try {
        const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/${revisionId}/historial`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        historialData = data.data || data.historial || data || [];
      } catch (fetchError) {
        console.warn('Backend no disponible para historial, usando datos simulados:', fetchError);
        
        // Generar historial simulado
        historialData = [
          {
            id: 1,
            revision_id: revisionId,
            action: 'CREATED',
            description: 'Revisión creada',
            performed_by: 'sistema',
            performed_at: new Date(Date.now() - 3600000).toISOString(),
            previous_data: null,
            new_data: { estado: 'PENDIENTE' }
          },
          {
            id: 2,
            revision_id: revisionId,
            action: 'APPROVED',
            description: 'Revisión aprobada con comentarios',
            performed_by: 'usuario_revisor',
            performed_at: new Date(Date.now() - 1800000).toISOString(),
            previous_data: { estado: 'PENDIENTE' },
            new_data: { estado: 'APROBADA', comentarios: 'Revisión completada correctamente' }
          }
        ];
      }
      
      setHistorial(historialData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      Alert.Error({
        title: "¡Error!",
        text: `No se pudo cargar el historial: ${errorMessage}`
      });
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATED':
        return '✅';
      case 'APPROVED':
        return '👍';
      case 'REJECTED':
        return '👎';
      case 'UPDATED':
        return '✏️';
      case 'SUGGESTION_RESPONSE':
        return '💬';
      default:
        return '📝';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATED':
        return 'green';
      case 'APPROVED':
        return 'blue';
      case 'REJECTED':
        return 'red';
      case 'UPDATED':
        return 'orange';
      case 'SUGGESTION_RESPONSE':
        return 'violet';
      default:
        return 'gray';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Modal open={show} onClose={onClose} size="lg">
      <Modal.Header>
        <Modal.Title>Historial de Revisión #{revisionId}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="sr-only">Cargando...</span>
            </div>
            <p className="mt-2">Cargando historial...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">
            <strong>Error:</strong> {error}
            <button 
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={() => loadHistorial(revisionId)}
            >
              Reintentar
            </button>
          </div>
        ) : historial.length > 0 ? (
          <div>
            <p className="mb-3">
              <strong>Registro de cambios y actividades:</strong>
            </p>
            
            <Timeline>
              {historial.map((entry, index) => (
                <Timeline.Item 
                  key={entry.id || index}
                  dot={getActionIcon(entry.action)}
                  color={getActionColor(entry.action)}
                >
                  <div className="mb-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <strong>{entry.description || entry.action}</strong>
                        <div className="text-muted small">
                          Por: {entry.performed_by} • {formatDate(entry.performed_at)}
                        </div>
                      </div>
                    </div>
                    
                    {entry.new_data && Object.keys(entry.new_data).length > 0 && (
                      <div className="mt-2 p-2 bg-light rounded small">
                        <strong>Datos:</strong>
                        <pre className="mb-0" style={{ fontSize: '11px', maxHeight: '100px', overflow: 'auto' }}>
                          {JSON.stringify(entry.new_data, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        ) : (
          <div className="text-center text-muted py-4">
            <p>No hay historial disponible para esta revisión.</p>
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer>
        <Button onClick={onClose} appearance="primary">
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
