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
      console.log('📅 useEffect del HistorialRevisionModal - cargando para:', revisionId);
      loadHistorial(revisionId);
    } else {
      console.log('📅 useEffect del HistorialRevisionModal - NO carga:', { show, revisionId });
    }
  }, [show, revisionId]);

  const loadHistorial = async (revisionId: number) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Cargando historial para revisión:', revisionId);
      
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
        console.log('Datos del backend recibidos:', data);
        
        // Procesar los datos del backend - pueden venir como array directo o dentro de data/history/historial
        historialData = Array.isArray(data) ? data : (data.history || data.data || data.historial || []);
        console.log('Historial procesado (array):', historialData);
        
        // Asegurar que cada entrada tenga la estructura correcta
        historialData = historialData.map((entry: any) => ({
          id: entry.id,
          action: entry.action,
          description: entry.description || entry.action,
          performed_by: entry.performed_by,
          performed_at: entry.performed_at,
          previous_data: entry.previous_data,
          new_data: entry.new_data
        }));
        
        console.log('Historial normalizado:', historialData);
        
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
        console.log('Datos simulados generados:', historialData);
      }
      
      console.log('Estableciendo historial con:', historialData);
      setHistorial(historialData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error en loadHistorial:', err);
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
      case 'CREATE':
        return '✅';
      case 'APPROVED':
        return '👍';
      case 'REJECTED':
        return '👎';
      case 'UPDATED':
        return '✏️';
      case 'SUGGESTION_CREATED':
        return '💭';
      case 'SUGGESTION_RESPONSE':
        return '💬';
      default:
        return '📝';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATED':
      case 'CREATE':
        return 'blue';
      case 'APPROVED':
        return 'green';
      case 'REJECTED':
        return 'red';
      case 'UPDATED':
        return 'orange';
      case 'SUGGESTION_CREATED':
        return 'purple';
      case 'SUGGESTION_RESPONSE':
        return 'cyan';
      default:
        return 'gray';
    }
  };

  const getActionTitle = (action: string): string => {
    switch (action) {
      case 'CREATED':
      case 'CREATE':
        return 'Revisión Creada';
      case 'APPROVED':
        return 'Revisión Aprobada';
      case 'REJECTED':
        return 'Revisión Rechazada';
      case 'UPDATED':
        return 'Revisión Actualizada';
      case 'SUGGESTION_CREATED':
        return 'Nueva Sugerencia';
      case 'SUGGESTION_RESPONSE':
        return 'Respuesta a Sugerencia';
      default:
        return 'Actividad';
    }
  };

  const getActionLabel = (action: string): string => {
    switch (action) {
      case 'CREATED':
      case 'CREATE':
        return 'CREADA';
      case 'APPROVED':
        return 'APROBADA';
      case 'REJECTED':
        return 'RECHAZADA';
      case 'UPDATED':
        return 'ACTUALIZADA';
      case 'SUGGESTION_CREATED':
        return 'SUGERENCIA';
      case 'SUGGESTION_RESPONSE':
        return 'RESPUESTA';
      default:
        return 'ACTIVIDAD';
    }
  };

  const getActionBadgeColor = (action: string): string => {
    switch (action) {
      case 'CREATED':
      case 'CREATE':
        return 'primary';
      case 'APPROVED':
        return 'success';
      case 'REJECTED':
        return 'danger';
      case 'UPDATED':
        return 'warning';
      case 'SUGGESTION_CREATED':
        return 'info';
      case 'SUGGESTION_RESPONSE':
        return 'secondary';
      default:
        return 'light';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.warn('Error formateando fecha:', error, 'Fecha original:', dateString);
      return dateString;
    }
  };

  console.log('HistorialRevisionModal - Estado actual:', { 
    show, 
    loading, 
    error, 
    historialLength: historial.length,
    historial: historial,
    revisionId
  });

  return (
    <Modal open={show} onClose={onClose} size="lg">
      <Modal.Header>
        <Modal.Title>
          Historial de Revisión #{revisionId} 
          {loading && ' (Cargando...)'}
          {!loading && ` (${historial.length} entradas)`}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Debug info - siempre visible */}
        <div className="alert alert-info mb-3">
          <small>
            <strong>Debug:</strong> Show: {show ? 'true' : 'false'} | 
            Loading: {loading ? 'true' : 'false'} | 
            Error: {error || 'none'} | 
            Historial Length: {historial.length} | 
            Revision ID: {revisionId}
          </small>
        </div>

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
              <strong>Registro de cambios y actividades ({historial.length} entradas):</strong>
            </p>
            
            {/* Renderizado temporal sin Timeline para debugging */}
            <div className="border p-3 mb-3 bg-light">
              <h6>Debug - Datos del historial:</h6>
              <pre style={{ fontSize: '12px', maxHeight: '200px', overflow: 'auto' }}>
                {JSON.stringify(historial, null, 2)}
              </pre>
            </div>
            
            {/* Lista simple para verificar que los datos existen */}
            <div>
              {historial.map((entry, index) => {
                console.log(`Renderizando entrada ${index}:`, entry);
                return (
                  <div key={entry.id || index} className="card mb-3 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <span className="badge badge-primary mr-2 p-2" style={{ fontSize: '16px' }}>
                            {getActionIcon(entry.action)}
                          </span>
                          <div>
                            <h6 className="mb-0 font-weight-bold">
                              {getActionTitle(entry.action)}
                            </h6>
                            <small className="text-muted">
                              {entry.description}
                            </small>
                          </div>
                        </div>
                        <span className={`badge badge-${getActionBadgeColor(entry.action)} px-2 py-1`}>
                          {getActionLabel(entry.action)}
                        </span>
                      </div>
                      
                      <div className="row text-sm mb-2">
                        <div className="col-6">
                          <strong>Realizado por:</strong> {entry.performed_by}
                        </div>
                        <div className="col-6 text-right">
                          <strong>Fecha:</strong> {formatDate(entry.performed_at)}
                        </div>
                      </div>
                      
                      {/* Mostrar cambios relevantes de manera legible */}
                      {entry.new_data && (
                        <div className="mt-3">
                          {entry.action === 'SUGGESTION_CREATED' && entry.new_data.field_label && (
                            <div className="alert alert-info mb-0">
                              <div className="row">
                                <div className="col-md-6">
                                  <strong>Campo:</strong> {entry.new_data.field_label}
                                </div>
                                <div className="col-md-6">
                                  <strong>Comentario:</strong> {entry.new_data.comment}
                                </div>
                              </div>
                              {entry.new_data.current_value !== entry.new_data.suggested_value && (
                                <div className="mt-2">
                                  <strong>Valor actual:</strong> <code>{entry.new_data.current_value || 'No especificado'}</code>
                                  {entry.new_data.suggested_value && (
                                    <>
                                      <br />
                                      <strong>Valor sugerido:</strong> <code className="bg-warning">{entry.new_data.suggested_value}</code>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                          
                          {entry.action === 'CREATE' && entry.new_data.status && (
                            <div className="alert alert-success mb-0">
                              <div className="row">
                                <div className="col-md-4">
                                  <strong>Tipo:</strong> {entry.new_data.type || 'No especificado'}
                                </div>
                                <div className="col-md-4">
                                  <strong>Estado:</strong> 
                                  <span className={`badge badge-${entry.new_data.status === 'PENDIENTE' ? 'warning' : 'success'} ml-1`}>
                                    {entry.new_data.status}
                                  </span>
                                </div>
                                <div className="col-md-4">
                                  <strong>Revisor asignado:</strong> {entry.new_data.assigned_reviewer || 'No asignado'}
                                </div>
                              </div>
                              <div className="mt-2">
                                <strong>Propósito:</strong> {entry.new_data.appraisal_purpose || 'No especificado'}
                              </div>
                            </div>
                          )}
                          
                          {entry.action === 'CREATED' && (
                            <div className="alert alert-light mb-0">
                              <strong>Revisión inicializada</strong> para {entry.new_data.type || 'registro'} #{entry.new_data.homologacion_id || 'N/A'}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Timeline original comentado temporalmente */}
            {/*
            <Timeline>
              {historial.map((entry, index) => {
                console.log(`Renderizando entrada ${index}:`, entry);
                return (
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
                );
              })}
            </Timeline>
            */}
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
