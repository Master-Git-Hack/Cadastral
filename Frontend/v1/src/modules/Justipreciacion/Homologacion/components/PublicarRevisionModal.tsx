/** @format */

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, Loader, Alert } from 'rsuite';

interface PublicarRevisionModalProps {
  show: boolean;
  onClose: () => void;
  revisionId: number;
  recordType: string;
  recordId: number;
  justipreciacionId: number;
}

interface RevisionData {
  id: number;
  status: string;
  type: string;
  appraisal_purpose: string;
  assigned_reviewer?: string;
  created_at: string;
  updated_at: string;
}

export const PublicarRevisionModal: React.FC<PublicarRevisionModalProps> = ({
  show,
  onClose,
  revisionId,
  recordType,
  recordId,
  justipreciacionId
}) => {
  const [loading, setLoading] = useState(false);
  const [revisionData, setRevisionData] = useState<RevisionData | null>(null);
  const [comentarios, setComentarios] = useState('');
  const [accionSeleccionada, setAccionSeleccionada] = useState<'aprobar' | 'rechazar' | 'sugerir'>('aprobar');

  useEffect(() => {
    if (show && revisionId) {
      loadRevisionData(revisionId);
    }
  }, [show, revisionId]);

  const loadRevisionData = async (revisionId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/${revisionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setRevisionData(data.revision);
    } catch (err) {
      console.error('Error cargando datos de revisión:', err);
      Alert.error('Error', `No se pudo cargar la información de la revisión: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAccion = async () => {
    if (!accionSeleccionada || !revisionData) return;

    const confirmMessage = {
      'aprobar': '¿Está seguro que desea APROBAR esta revisión?',
      'rechazar': '¿Está seguro que desea RECHAZAR esta revisión?',
      'sugerir': '¿Está seguro que desea enviar estas SUGERENCIAS?'
    }[accionSeleccionada];

    const confirmed = window.confirm(confirmMessage);
    if (!confirmed) return;

    try {
      setLoading(true);
      const endpoint = {
        'aprobar': `http://172.31.103.57:56733/api/v1/revisiones/${revisionData.id}/aprobar`,
        'rechazar': `http://172.31.103.57:56733/api/v1/revisiones/${revisionData.id}/rechazar`,
        'sugerir': `http://172.31.103.57:56733/api/v1/revisiones/${revisionData.id}/sugerencias`
      }[accionSeleccionada];

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comentarios,
          usuario_revisor: 'current_user' // TODO: Obtener del contexto
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      Alert.success('¡Éxito!', result.message || 'Acción completada exitosamente');
      onClose();
      
    } catch (err) {
      console.error('Error ejecutando acción:', err);
      Alert.error('Error', `No se pudo ejecutar la acción: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'PENDIENTE': { label: 'Pendiente', color: 'orange' },
      'EN_REVISION': { label: 'En Revisión', color: 'blue' },
      'APROBADA': { label: 'Aprobada', color: 'green' },
      'RECHAZADA': { label: 'Rechazada', color: 'red' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, color: 'gray' };
    
    return (
      <span style={{
        backgroundColor: config.color,
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {config.label}
      </span>
    );
  };

  return (
    <Modal open={show} onClose={onClose} size="md">
      <Modal.Header>
        <Modal.Title>Publicar Revisión</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {loading && <Loader center content="Cargando..." />}
        
        {revisionData && !loading && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h5>Información de la Revisión</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div>
                  <strong>ID:</strong> {revisionData.id}
                </div>
                <div>
                  <strong>Estado:</strong> {getStatusBadge(revisionData.status)}
                </div>
                <div>
                  <strong>Tipo:</strong> {revisionData.type}
                </div>
                <div>
                  <strong>Revisor:</strong> {revisionData.assigned_reviewer || 'Sin asignar'}
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <strong>Propósito:</strong> {revisionData.appraisal_purpose}
                </div>
              </div>
            </div>

            <Form>
              <Form.Group>
                <Form.ControlLabel>Acción a realizar</Form.ControlLabel>
                <Select 
                  value={accionSeleccionada} 
                  onChange={(value) => setAccionSeleccionada(value as any)}
                  block
                >
                  <Select.Option value="aprobar">Aprobar Revisión</Select.Option>
                  <Select.Option value="rechazar">Rechazar Revisión</Select.Option>
                  <Select.Option value="sugerir">Enviar Sugerencias</Select.Option>
                </Select>
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel>Comentarios</Form.ControlLabel>
                <Input
                  as="textarea"
                  rows={4}
                  value={comentarios}
                  onChange={setComentarios}
                  placeholder="Agregue sus comentarios sobre la revisión..."
                />
              </Form.Group>
            </Form>
          </div>
        )}
      </Modal.Body>
      
      <Modal.Footer>
        <Button onClick={onClose} appearance="subtle">
          Cancelar
        </Button>
        <Button 
          onClick={handleAccion} 
          appearance="primary" 
          disabled={loading || !revisionData}
        >
          {loading ? 'Procesando...' : 'Ejecutar Acción'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
