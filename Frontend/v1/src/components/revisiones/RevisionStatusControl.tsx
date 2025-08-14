import React, { useState } from 'react';
import { RevisionData } from '../../redux/justipreciacion/homologacion/revisiones/types';
import { Modal, Button, Input, Notification } from 'rsuite';

interface RevisionStatusControlProps {
  revision: RevisionData;
  onStatusChange?: (newRevision: RevisionData) => void;
}

const API_BASE = 'http://172.31.103.57:56733/api/v1';

export const RevisionStatusControl: React.FC<RevisionStatusControlProps> = ({
  revision,
  onStatusChange
}) => {
  const [loading, setLoading] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const getStatusInfo = (status: string) => {
    const statusConfig = {
      'PENDIENTE': { 
        label: 'Pendiente', 
        color: '#f59e0b', 
        bgColor: '#fef3c7',
        canApprove: true,
        canReject: true 
      },
      'EN_REVISION': { 
        label: 'En Revisión', 
        color: '#3b82f6', 
        bgColor: '#dbeafe',
        canApprove: true,
        canReject: true 
      },
      'APROBADA': { 
        label: 'Aprobada', 
        color: '#10b981', 
        bgColor: '#d1fae5',
        canApprove: false,
        canReject: true 
      },
      'RECHAZADA': { 
        label: 'Rechazada', 
        color: '#ef4444', 
        bgColor: '#fee2e2',
        canApprove: true,
        canReject: false 
      }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig['PENDIENTE'];
  };

  const statusInfo = getStatusInfo(revision.status);

  const handleApprove = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE}/revisiones/${revision.id}/aprobar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comentarios: comment,
          usuario_revisor: 'current_user' // TODO: obtener del contexto de usuario
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Revisión aprobada:', result);
      
      setShowApproveModal(false);
      setComment('');
      
      // Notificar cambio al componente padre
      if (onStatusChange && result.revision) {
        onStatusChange(result.revision);
      }
      
      // Refrescar la página para actualizar todos los datos
      window.location.reload();
      
    } catch (err) {
      console.error('❌ Error al aprobar revisión:', err);
      setError(err instanceof Error ? err.message : 'Error al aprobar revisión');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE}/revisiones/${revision.id}/rechazar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comentarios: comment,
          usuario_revisor: 'current_user' // TODO: obtener del contexto de usuario
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Revisión rechazada:', result);
      
      setShowRejectModal(false);
      setComment('');
      
      // Notificar cambio al componente padre
      if (onStatusChange && result.revision) {
        onStatusChange(result.revision);
      }
      
      // Refrescar la página para actualizar todos los datos
      window.location.reload();
      
    } catch (err) {
      console.error('❌ Error al rechazar revisión:', err);
      setError(err instanceof Error ? err.message : 'Error al rechazar revisión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Estado actual */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '16px',
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: '600', color: '#374151' }}>Estado actual:</span>
          <span style={{
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500',
            color: statusInfo.color,
            backgroundColor: statusInfo.bgColor
          }}>
            {statusInfo.label}
          </span>
        </div>
        
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          Revisor: {revision.assigned_reviewer || 'No asignado'}
        </div>
      </div>

      {/* Botones de acción */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {statusInfo.canApprove && (
          <Button 
            appearance="primary"
            color="green"
            size="md"
            disabled={loading}
            onClick={() => setShowApproveModal(true)}
            style={{ minWidth: '120px' }}
          >
            {loading ? 'Procesando...' : '✅ Aprobar'}
          </Button>
        )}
        
        {statusInfo.canReject && (
          <Button 
            appearance="primary"
            color="red"
            size="md"
            disabled={loading}
            onClick={() => setShowRejectModal(true)}
            style={{ minWidth: '120px' }}
          >
            {loading ? 'Procesando...' : '❌ Rechazar'}
          </Button>
        )}
      </div>

      {/* Mostrar error si existe */}
      {error && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{error}</span>
          <Button size="xs" appearance="subtle" onClick={() => setError(null)}>
            ✕
          </Button>
        </div>
      )}

      {/* Modal de aprobación */}
      <Modal open={showApproveModal} onClose={() => setShowApproveModal(false)}>
        <Modal.Header>
          <Modal.Title>Aprobar Revisión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ marginBottom: '12px', color: '#374151' }}>
              ¿Está seguro que desea aprobar la revisión <strong>#{revision.id}</strong>?
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
              Tipo: {revision.type} | Homologación: {revision.homologacion_id}
            </p>
          </div>
          
          <Input 
            as="textarea" 
            rows={4}
            placeholder="Comentarios sobre la aprobación (opcional)"
            value={comment}
            onChange={(value) => setComment(value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button 
            onClick={handleApprove} 
            appearance="primary" 
            color="green"
            disabled={loading}
          >
            {loading ? 'Aprobando...' : 'Confirmar Aprobación'}
          </Button>
          <Button 
            onClick={() => {
              setShowApproveModal(false);
              setComment('');
            }} 
            appearance="subtle"
            disabled={loading}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de rechazo */}
      <Modal open={showRejectModal} onClose={() => setShowRejectModal(false)}>
        <Modal.Header>
          <Modal.Title>Rechazar Revisión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ marginBottom: '12px', color: '#374151' }}>
              ¿Está seguro que desea rechazar la revisión <strong>#{revision.id}</strong>?
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
              Tipo: {revision.type} | Homologación: {revision.homologacion_id}
            </p>
          </div>
          
          <Input 
            as="textarea" 
            rows={4}
            placeholder="Motivo del rechazo (recomendado)"
            value={comment}
            onChange={(value) => setComment(value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button 
            onClick={handleReject} 
            appearance="primary" 
            color="red"
            disabled={loading}
          >
            {loading ? 'Rechazando...' : 'Confirmar Rechazo'}
          </Button>
          <Button 
            onClick={() => {
              setShowRejectModal(false);
              setComment('');
            }} 
            appearance="subtle"
            disabled={loading}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RevisionStatusControl;
