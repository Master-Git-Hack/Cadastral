/** @format */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, List, Loader, Alert, Badge, Divider } from 'rsuite';

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
  const [campoSugerencia, setCampoSugerencia] = useState('');
  const [valorActual, setValorActual] = useState('');
  const [valorSugerido, setValorSugerido] = useState('');

  useEffect(() => {
    if (show && revisionId) {
      loadSugerencias(revisionId);
    }
  }, [show, revisionId]);

  const loadSugerencias = async (revisionId: number) => {
    try {
      setLoading(true);
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
      setSugerencias(data.sugerencias || []);
    } catch (err) {
      console.error('Error cargando sugerencias:', err);
      Alert.error('Error', `No se pudo cargar las sugerencias: ${err}`);
      setSugerencias([]);
    } finally {
      setLoading(false);
    }
  };

  const enviarSugerencia = async () => {
    if (!nuevaSugerencia.trim() || !campoSugerencia.trim()) {
      Alert.warning('Advertencia', 'Por favor complete todos los campos requeridos');
      return;
    }

    try {
      setEnviandoSugerencia(true);
      const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/${revisionId}/sugerencias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field_path: campoSugerencia,
          field_label: campoSugerencia,
          current_value: valorActual,
          suggested_value: valorSugerido,
          comment: nuevaSugerencia,
          page: 1,
          reviewer: 'current_user' // TODO: Obtener del contexto de usuario
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      // Limpiar formulario
      setNuevaSugerencia('');
      setCampoSugerencia('');
      setValorActual('');
      setValorSugerido('');
      
      // Recargar sugerencias
      await loadSugerencias(revisionId);
      
      Alert.success('¡Éxito!', 'Sugerencia enviada correctamente');
      
    } catch (err) {
      console.error('Error enviando sugerencia:', err);
      Alert.error('Error', `No se pudo enviar la sugerencia: ${err}`);
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
          usuario: 'current_user' // TODO: Obtener del contexto
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      await loadSugerencias(revisionId);
      Alert.success('¡Éxito!', `Sugerencia ${accion === 'aplicar' ? 'aplicada' : 'rechazada'} correctamente`);

    } catch (err) {
      console.error('Error respondiendo sugerencia:', err);
      Alert.error('Error', `No se pudo responder la sugerencia: ${err}`);
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

  const getStatusBadge = (status?: string) => {
    if (!status) return <Badge color="blue" content="Pendiente" />;
    
    const statusConfig = {
      'APLICADA': { label: 'Aplicada', color: 'green' },
      'RECHAZADA': { label: 'Rechazada', color: 'red' },
      'PENDIENTE': { label: 'Pendiente', color: 'blue' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, color: 'gray' };
    return <Badge color={config.color} content={config.label} />;
  };

  const renderSugerencia = (sugerencia: Sugerencia) => {
    return (
      <List.Item key={sugerencia.id}>
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div>
              <strong>{sugerencia.field_label}</strong>
              {getStatusBadge(sugerencia.status)}
            </div>
            <span style={{ fontSize: '12px', color: '#666' }}>
              {sugerencia.reviewer} • {formatDate(sugerencia.created_at)}
            </span>
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '8px' }}>
              <div>
                <small style={{ color: '#666' }}>Valor actual:</small>
                <div style={{ padding: '4px 8px', backgroundColor: '#fff3cd', borderRadius: '4px', fontSize: '14px' }}>
                  {sugerencia.current_value || 'N/A'}
                </div>
              </div>
              <div>
                <small style={{ color: '#666' }}>Valor sugerido:</small>
                <div style={{ padding: '4px 8px', backgroundColor: '#d1ecf1', borderRadius: '4px', fontSize: '14px' }}>
                  {sugerencia.suggested_value}
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '8px' }}>
              <small style={{ color: '#666' }}>Comentario:</small>
              <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '14px' }}>
                {sugerencia.comment}
              </div>
            </div>
          </div>

          {sugerencia.response && (
            <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#e2e3e5', borderRadius: '4px' }}>
              <small style={{ color: '#666' }}>Respuesta:</small>
              <div style={{ fontSize: '14px' }}>{sugerencia.response}</div>
              <small style={{ color: '#666' }}>
                por {sugerencia.responded_by} • {sugerencia.responded_at ? formatDate(sugerencia.responded_at) : ''}
              </small>
            </div>
          )}

          {!sugerencia.status && (
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
              <Button 
                size="xs" 
                appearance="primary" 
                color="green"
                onClick={() => responderSugerencia(sugerencia.id, 'Sugerencia aplicada', 'aplicar')}
              >
                Aplicar
              </Button>
              <Button 
                size="xs" 
                appearance="primary" 
                color="red"
                onClick={() => responderSugerencia(sugerencia.id, 'Sugerencia rechazada', 'rechazar')}
              >
                Rechazar
              </Button>
            </div>
          )}
        </div>
      </List.Item>
    );
  };

  return (
    <Modal open={show} onClose={onClose} size="lg">
      <Modal.Header>
        <Modal.Title>Sugerencias de Revisión</Modal.Title>
      </Modal.Header>
      
      <Modal.Body style={{ maxHeight: '700px', overflowY: 'auto' }}>
        {loading && <Loader center content="Cargando sugerencias..." />}
        
        {!loading && (
          <div>
            {/* Formulario para nueva sugerencia */}
            <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '16px' }}>Nueva Sugerencia</h5>
              
              <Form>
                <Form.Group>
                  <Form.ControlLabel>Campo o Sección</Form.ControlLabel>
                  <Input
                    value={campoSugerencia}
                    onChange={setCampoSugerencia}
                    placeholder="Ej: Superficie del terreno, Valor unitario, etc."
                  />
                </Form.Group>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <Form.Group>
                    <Form.ControlLabel>Valor Actual</Form.ControlLabel>
                    <Input
                      value={valorActual}
                      onChange={setValorActual}
                      placeholder="Valor que aparece actualmente"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.ControlLabel>Valor Sugerido</Form.ControlLabel>
                    <Input
                      value={valorSugerido}
                      onChange={setValorSugerido}
                      placeholder="Valor que sugiere"
                    />
                  </Form.Group>
                </div>

                <Form.Group>
                  <Form.ControlLabel>Comentario</Form.ControlLabel>
                  <Input
                    as="textarea"
                    rows={3}
                    value={nuevaSugerencia}
                    onChange={setNuevaSugerencia}
                    placeholder="Explique su sugerencia y justificación..."
                  />
                </Form.Group>

                <Button 
                  appearance="primary" 
                  onClick={enviarSugerencia}
                  disabled={enviandoSugerencia}
                  loading={enviandoSugerencia}
                >
                  {enviandoSugerencia ? 'Enviando...' : 'Enviar Sugerencia'}
                </Button>
              </Form>
            </div>

            <Divider />

            {/* Lista de sugerencias existentes */}
            <div>
              <h5 style={{ marginBottom: '16px' }}>
                Sugerencias Existentes ({sugerencias.length})
              </h5>

              {sugerencias.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  <p>No hay sugerencias para esta revisión.</p>
                </div>
              ) : (
                <List bordered>
                  {sugerencias.map(renderSugerencia)}
                </List>
              )}
            </div>
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
