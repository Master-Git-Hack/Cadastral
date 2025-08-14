import React from 'react';
import { useRevisionIntegration, RevisionStatus } from '../hooks/useRevisionIntegration';
import { Button, Badge, Notification } from 'rsuite';

interface HomologacionRevisionControlProps {
  recordType: 'TERRENO' | 'RENTA';
  recordId: number;
  justipreciacionId: number;
  enabled?: boolean;
}

export const HomologacionRevisionControl: React.FC<HomologacionRevisionControlProps> = ({
  recordType,
  recordId,
  justipreciacionId,
  enabled = true
}) => {
  const {
    revisionInfo,
    isLoading,
    error,
    refreshRevisionStatus,
    createRevision,
    approveRevision,
    rejectRevision,
    openRevisionHistory,
    openRevisionSuggestions,
    hasPermissionToReview,
    canCreateRevision
  } = useRevisionIntegration({
    recordType,
    recordId,
    justipreciacionId,
    enabled
  });

  const getStatusConfig = (status: RevisionStatus) => {
    const configs = {
      sin_revision: {
        label: 'Sin Revisión',
        color: '#6b7280',
        bgColor: '#f3f4f6',
        actions: ['create']
      },
      en_revision: {
        label: 'En Revisión',
        color: '#3b82f6',
        bgColor: '#dbeafe',
        actions: ['approve', 'reject', 'history', 'suggestions']
      },
      revisado: {
        label: 'Aprobado',
        color: '#10b981',
        bgColor: '#d1fae5',
        actions: ['reject', 'history']
      },
      rechazado: {
        label: 'Rechazado',
        color: '#ef4444',
        bgColor: '#fee2e2',
        actions: ['approve', 'history']
      }
    };
    return configs[status] || configs['sin_revision'];
  };

  const handleAction = async (action: string) => {
    if (!revisionInfo?.id) return;

    try {
      switch (action) {
        case 'create':
          await createRevision();
          break;
        case 'approve':
          const approveComment = prompt('Comentarios sobre la aprobación (opcional):');
          if (approveComment !== null) { // null = cancelado
            await approveRevision(revisionInfo.id, approveComment);
          }
          break;
        case 'reject':
          const rejectComment = prompt('Motivo del rechazo:');
          if (rejectComment !== null) { // null = cancelado
            await rejectRevision(revisionInfo.id, rejectComment);
          }
          break;
        case 'history':
          openRevisionHistory();
          break;
        case 'suggestions':
          openRevisionSuggestions();
          break;
        default:
          console.warn('Acción no reconocida:', action);
      }
    } catch (error) {
      console.error(`Error ejecutando acción ${action}:`, error);
    }
  };

  if (!enabled) {
    return null;
  }

  if (isLoading) {
    return (
      <div style={{
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#f9fafb',
        textAlign: 'center'
      }}>
        <div>⏳ Verificando estado de revisiones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '12px',
        margin: '16px 0',
        backgroundColor: '#fee2e2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        color: '#dc2626'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>❌ Error: {error}</span>
          <Button size="xs" appearance="primary" onClick={refreshRevisionStatus}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  if (!revisionInfo) {
    return null;
  }

  const statusConfig = getStatusConfig(revisionInfo.status);

  return (
    <div style={{
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#f9fafb',
      marginBottom: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h4 style={{ margin: 0, color: '#374151' }}>
            📋 Revisión de {recordType}
          </h4>
          <Badge 
            style={{
              backgroundColor: statusConfig.bgColor,
              color: statusConfig.color
            }}
          >
            {statusConfig.label}
          </Badge>
        </div>
        
        <Button 
          size="sm" 
          appearance="subtle"
          onClick={refreshRevisionStatus}
          disabled={isLoading}
        >
          🔄 Actualizar
        </Button>
      </div>

      {/* Información de la revisión */}
      {revisionInfo.hasRevisions && (
        <div style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '12px',
          display: 'flex',
          gap: '16px'
        }}>
          <span>ID: {revisionInfo.id}</span>
          <span>Pendientes: {revisionInfo.pendingCount}</span>
          <span>Completadas: {revisionInfo.completedCount}</span>
          <span>Rechazadas: {revisionInfo.rejectedCount}</span>
          {revisionInfo.reviewer && <span>Revisor: {revisionInfo.reviewer}</span>}
        </div>
      )}

      {/* Botones de acción */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {statusConfig.actions.includes('create') && canCreateRevision && (
          <Button 
            appearance="primary"
            size="sm"
            onClick={() => handleAction('create')}
            disabled={isLoading}
          >
            ➕ Crear Revisión
          </Button>
        )}
        
        {statusConfig.actions.includes('approve') && hasPermissionToReview && (
          <Button 
            appearance="primary"
            color="green"
            size="sm"
            onClick={() => handleAction('approve')}
            disabled={isLoading}
          >
            ✅ Aprobar
          </Button>
        )}
        
        {statusConfig.actions.includes('reject') && hasPermissionToReview && (
          <Button 
            appearance="primary"
            color="red"
            size="sm"
            onClick={() => handleAction('reject')}
            disabled={isLoading}
          >
            ❌ Rechazar
          </Button>
        )}
        
        {statusConfig.actions.includes('history') && revisionInfo.hasRevisions && (
          <Button 
            appearance="default"
            size="sm"
            onClick={() => handleAction('history')}
          >
            📚 Historial
          </Button>
        )}
        
        {statusConfig.actions.includes('suggestions') && revisionInfo.hasRevisions && (
          <Button 
            appearance="default"
            size="sm"
            onClick={() => handleAction('suggestions')}
          >
            💡 Sugerencias
          </Button>
        )}
      </div>

      {/* Información adicional */}
      {revisionInfo.lastReviewDate && (
        <div style={{
          marginTop: '8px',
          fontSize: '12px',
          color: '#9ca3af'
        }}>
          Última actualización: {new Date(revisionInfo.lastReviewDate).toLocaleString('es-MX')}
        </div>
      )}
    </div>
  );
};

export default HomologacionRevisionControl;
