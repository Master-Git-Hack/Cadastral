/** @format */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Timeline, Loader, Alert, Badge } from 'rsuite';

interface HistorialRevisionModalProps {
  show: boolean;
  onClose: () => void;
  revisionId: number;
}

interface HistoryEntry {
  id: number;
  action: string;
  performed_by: string;
  performed_at: string;
  description?: string;
  previous_data?: any;
  new_data?: any;
}

export const HistorialRevisionModal: React.FC<HistorialRevisionModalProps> = ({
  show,
  onClose,
  revisionId
}) => {
  const [loading, setLoading] = useState(false);
  const [historial, setHistorial] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    if (show && revisionId) {
      loadHistorial(revisionId);
    }
  }, [show, revisionId]);

  const loadHistorial = async (revisionId: number) => {
    try {
      setLoading(true);
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
      setHistorial(data.historial || []);
    } catch (err) {
      console.error('Error cargando historial:', err);
      Alert.error('Error', `No se pudo cargar el historial: ${err}`);
      setHistorial([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getActionBadge = (action: string) => {
    const actionConfig = {
      'CREATED': { label: 'Creado', color: 'blue' },
      'UPDATED': { label: 'Actualizado', color: 'orange' },
      'APPROVED': { label: 'Aprobado', color: 'green' },
      'REJECTED': { label: 'Rechazado', color: 'red' },
      'SUGGESTION_RESPONSE': { label: 'Respuesta a Sugerencia', color: 'purple' },
      'STATUS_CHANGE': { label: 'Cambio de Estado', color: 'cyan' }
    };
    
    const config = actionConfig[action as keyof typeof actionConfig] || { label: action, color: 'gray' };
    
    return <Badge color={config.color} content={config.label} />;
  };

  const renderTimelineItem = (entry: HistoryEntry) => {
    return (
      <Timeline.Item key={entry.id}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            {getActionBadge(entry.action)}
            <span style={{ fontSize: '14px', color: '#666' }}>
              por <strong>{entry.performed_by}</strong>
            </span>
            <span style={{ fontSize: '12px', color: '#999' }}>
              {formatDate(entry.performed_at)}
            </span>
          </div>
          
          {entry.description && (
            <div style={{ marginBottom: '8px', fontSize: '14px' }}>
              {entry.description}
            </div>
          )}

          {entry.new_data && (
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '8px', 
              borderRadius: '4px', 
              fontSize: '12px',
              border: '1px solid #e9ecef'
            }}>
              <strong>Cambios:</strong>
              <pre style={{ margin: '4px 0 0 0', whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(entry.new_data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </Timeline.Item>
    );
  };

  return (
    <Modal open={show} onClose={onClose} size="lg">
      <Modal.Header>
        <Modal.Title>Historial de Revisión</Modal.Title>
      </Modal.Header>
      
      <Modal.Body style={{ maxHeight: '600px', overflowY: 'auto' }}>
        {loading && <Loader center content="Cargando historial..." />}
        
        {!loading && historial.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <h5>No hay historial disponible</h5>
            <p>Esta revisión aún no tiene registros en el historial.</p>
          </div>
        )}

        {!loading && historial.length > 0 && (
          <div>
            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#e3f2fd', borderRadius: '6px' }}>
              <strong>Total de eventos:</strong> {historial.length}
            </div>
            
            <Timeline>
              {historial.map(renderTimelineItem)}
            </Timeline>
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
