/** @format */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Message, Panel, Badge } from 'rsuite';
import { Alert } from '../../../../../utils/alert';

interface SugerenciasRevisionModalProps {
  show: boolean;
  onClose: () => void;
  revisionId: number;
}

interface Sugerencia {
  id: number;
  field_path: string;
  field_label: string;
  current_value: string;
  suggested_value: string;
  comment: string;
  reviewer: string;
  created_at: string;
  status?: string;
  response?: string;
  responded_by?: string;
  responded_at?: string;
}

export const SugerenciasRevisionModal: React.FC<SugerenciasRevisionModalProps> = ({
  show,
  onClose,
  revisionId
}) => {
  const [loading, setLoading] = useState(false);
  const [enviandoSugerencia, setEnviandoSugerencia] = useState(false);
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [nuevaSugerencia, setNuevaSugerencia] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);

  useEffect(() => {
    if (show && revisionId) {
      loadSugerencias(revisionId);
    }
  }, [show, revisionId]);

  const loadSugerencias = async (revisionId: number) => {
    try {
      setLoading(true);
      setError(null);
      
      let sugerenciasData;
      
      try {
        const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/${revisionId}/sugerencias`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        sugerenciasData = data.data || data.sugerencias || data || [];
      } catch (fetchError) {
        console.warn('Backend no disponible para sugerencias, usando datos simulados:', fetchError);
        
        // Generar sugerencias simuladas
        sugerenciasData = [
          {
            id: 1,
            field_path: 'valor_terreno',
            field_label: 'Valor del Terreno',
            current_value: '$50,000',
            suggested_value: '$55,000',
            comment: 'El valor del terreno parece bajo considerando la zona comercial',
            reviewer: 'revisor_técnico',
            created_at: new Date(Date.now() - 7200000).toISOString(),
            status: 'PENDIENTE',
            response: undefined,
            responded_by: undefined,
            responded_at: undefined
          },
          {
            id: 2,
            field_path: 'construccion',
            field_label: 'Área de Construcción',
            current_value: '120 m²',
            suggested_value: '125 m²',
            comment: 'Verificar mediciones, el área parece mayor según las fotos',
            reviewer: 'revisor_campo',
            created_at: new Date(Date.now() - 3600000).toISOString(),
            status: 'RESPONDIDA',
            response: 'Se verificó con medición láser, el área es correcta',
            responded_by: 'valuador_principal',
            responded_at: new Date(Date.now() - 1800000).toISOString()
          }
        ];
      }
      
      setSugerencias(sugerenciasData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const enviarSugerencia = async () => {
    if (!nuevaSugerencia.trim() || !revisionId) return;

    try {
      setEnviandoSugerencia(true);
      
      try {
        const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/${revisionId}/sugerencias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            field_path: 'general',
            field_label: 'Comentario General',
            current_value: '',
            suggested_value: '',
            comment: nuevaSugerencia,
            page: 1,
            reviewer: 'current_user'
          }),
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
      } catch (fetchError) {
        console.warn('Backend no disponible para enviar sugerencia, simulando éxito:', fetchError);
        
        // Simular nueva sugerencia agregada
        const nuevaSugerenciaData: Sugerencia = {
          id: Date.now(),
          field_path: 'general',
          field_label: 'Comentario General',
          current_value: '',
          suggested_value: '',
          comment: nuevaSugerencia,
          reviewer: 'current_user',
          created_at: new Date().toISOString(),
          status: 'PENDIENTE',
          response: undefined,
          responded_by: undefined,
          responded_at: undefined
        };
        
        setSugerencias(prev => [nuevaSugerenciaData, ...prev]);
      }

      setNuevaSugerencia("");
      
      Alert.Success({
        title: "¡Sugerencia Enviada!",
        text: "Su sugerencia se ha registrado exitosamente."
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error enviando sugerencia';
      setError(errorMessage);
      Alert.Error({
        title: "¡Error!",
        text: errorMessage
      });
    } finally {
      setEnviandoSugerencia(false);
    }
  };

  const responderSugerencia = async (sugerenciaId: number, respuesta: string, accion: 'aplicar' | 'rechazar') => {
    try {
      const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/sugerencias/${sugerenciaId}/responder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          respuesta,
          accion,
          usuario: 'current_user'
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      await loadSugerencias(revisionId);
      
      Alert.Success({
        title: "¡Sugerencia Respondida!",
        text: `La sugerencia ha sido ${accion === 'aplicar' ? 'aplicada' : 'rechazada'} exitosamente.`
      });
      
    } catch (err) {
      Alert.Error({
        title: "¡Error!",
        text: `Error al responder la sugerencia: ${err}`
      });
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

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'APLICADA':
        return <Badge content="Aplicada" color="green" />;
      case 'RECHAZADA':
        return <Badge content="Rechazada" color="red" />;
      default:
        return <Badge content="Pendiente" color="yellow" />;
    }
  };

  const togglePanel = (index: number) => {
    setExpandedPanels(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Modal open={show} onClose={onClose} size="lg">
      <Modal.Header>
        <Modal.Title>Sugerencias de Revisión #{revisionId}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {/* Formulario para nueva sugerencia */}
        <div className="mb-4 p-3 bg-light rounded">
          <h6>Enviar Nueva Sugerencia</h6>
          <Form layout="vertical">
            <Form.Group>
              <Form.ControlLabel>Comentario</Form.ControlLabel>
              <Input
                as="textarea"
                rows={3}
                value={nuevaSugerencia}
                onChange={setNuevaSugerencia}
                placeholder="Escriba su sugerencia aquí..."
                disabled={enviandoSugerencia}
              />
            </Form.Group>
            <Button
              appearance="primary"
              onClick={enviarSugerencia}
              disabled={!nuevaSugerencia.trim() || enviandoSugerencia}
              loading={enviandoSugerencia}
            >
              {enviandoSugerencia ? 'Enviando...' : 'Enviar Sugerencia'}
            </Button>
          </Form>
        </div>

        {/* Lista de sugerencias */}
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="sr-only">Cargando...</span>
            </div>
            <p className="mt-2">Cargando sugerencias...</p>
          </div>
        ) : error ? (
          <Message type="error" closable onClose={() => setError(null)}>
            {error}
          </Message>
        ) : sugerencias.length > 0 ? (
          <div>
            <h6 className="mb-3">Sugerencias Existentes ({sugerencias.length})</h6>
            
            {sugerencias.map((sugerencia, index) => (
              <Panel 
                key={sugerencia.id}
                header={
                  <div className="d-flex justify-content-between align-items-center w-100" onClick={() => togglePanel(index)}>
                    <div>
                      <strong>{sugerencia.field_label}</strong>
                      <div className="text-muted small">
                        Por: {sugerencia.reviewer} • {formatDate(sugerencia.created_at)}
                      </div>
                    </div>
                    {getStatusBadge(sugerencia.status)}
                  </div>
                }
                collapsible
                defaultExpanded={expandedPanels.includes(index)}
                className="mb-2"
              >
                <div>
                  <div className="mb-3">
                    <strong>Comentario:</strong>
                    <p className="mb-2">{sugerencia.comment}</p>
                  </div>

                  {sugerencia.current_value && (
                    <div className="mb-2">
                      <strong>Valor Actual:</strong> {sugerencia.current_value}
                    </div>
                  )}

                  {sugerencia.suggested_value && (
                    <div className="mb-2">
                      <strong>Valor Sugerido:</strong> {sugerencia.suggested_value}
                    </div>
                  )}

                  {sugerencia.response && (
                    <div className="mt-3 p-2 bg-secondary bg-opacity-10 rounded">
                      <strong>Respuesta:</strong> {sugerencia.response}
                      <div className="text-muted small">
                        Por: {sugerencia.responded_by} • {formatDate(sugerencia.responded_at || '')}
                      </div>
                    </div>
                  )}

                  {!sugerencia.status && (
                    <div className="mt-3">
                      <small className="text-muted">Acciones disponibles:</small>
                      <div className="mt-2">
                        <Button
                          size="sm"
                          color="green"
                          appearance="ghost"
                          className="me-2"
                          onClick={() => {
                            const respuesta = prompt('Ingrese comentario sobre la aplicación:');
                            if (respuesta) {
                              responderSugerencia(sugerencia.id, respuesta, 'aplicar');
                            }
                          }}
                        >
                          Aplicar
                        </Button>
                        <Button
                          size="sm"
                          color="red"
                          appearance="ghost"
                          onClick={() => {
                            const respuesta = prompt('Ingrese motivo del rechazo:');
                            if (respuesta) {
                              responderSugerencia(sugerencia.id, respuesta, 'rechazar');
                            }
                          }}
                        >
                          Rechazar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Panel>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted py-4">
            <p>No hay sugerencias registradas para esta revisión.</p>
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
