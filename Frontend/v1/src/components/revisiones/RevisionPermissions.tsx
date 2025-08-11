import React, { useEffect, useState } from 'react';
import { useRevisiones } from '../../hooks/useRevisiones';
import { RevisionPermissions as RevisionPermissionsType } from '../../redux/justipreciacion/homologacion/revisiones/types';

interface RevisionPermissionsProps {
  revisionId: number;
}

interface NewPermission {
  user_id: string;
  can_read: boolean;
  can_write: boolean;
  can_approve: boolean;
  can_delete: boolean;
}

export const RevisionPermissions: React.FC<RevisionPermissionsProps> = ({ revisionId }) => {
  const { revision_permissions, loading, fetchPermissions } = useRevisiones();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPermission, setEditingPermission] = useState<number | null>(null);
  const [newPermission, setNewPermission] = useState<NewPermission>({
    user_id: '',
    can_read: true,
    can_write: false,
    can_approve: false,
    can_delete: false,
  });

  useEffect(() => {
    fetchPermissions(revisionId);
  }, [revisionId, fetchPermissions]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPermissionStatus = (permission: RevisionPermissionsType) => {
    // Si el tipo tiene expires_at, verificar si ha expirado
    if ('expires_at' in permission && permission.expires_at && new Date(permission.expires_at) < new Date()) {
      return 'expired';
    }
    return 'active';
  };

  const handleAddPermission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPermission.user_id.trim()) {
      alert('Por favor, ingresa un ID de usuario válido.');
      return;
    }

    try {
      // Aquí iría la llamada al servicio para agregar permisos
      // await revisionService.updatePermissions(revisionId, newPermission.user_id, newPermission);
      console.log('Agregando permiso:', { revisionId, ...newPermission });
      
      setShowAddForm(false);
      setNewPermission({
        user_id: '',
        can_read: true,
        can_write: false,
        can_approve: false,
        can_delete: false,
      });
      
      // Recargar permisos
      fetchPermissions(revisionId);
    } catch (error) {
      console.error('Error al agregar permiso:', error);
    }
  };

  const handleUpdatePermission = async (permissionId: number, updates: Partial<RevisionPermissionsType>) => {
    try {
      // Aquí iría la llamada al servicio para actualizar permisos
      console.log('Actualizando permiso:', { permissionId, updates });
      
      setEditingPermission(null);
      // Recargar permisos
      fetchPermissions(revisionId);
    } catch (error) {
      console.error('Error al actualizar permiso:', error);
    }
  };

  const handleDeletePermission = async (permissionId: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este permiso?')) {
      return;
    }

    try {
      // Aquí iría la llamada al servicio para eliminar permisos
      console.log('Eliminando permiso:', permissionId);
      
      // Recargar permisos
      fetchPermissions(revisionId);
    } catch (error) {
      console.error('Error al eliminar permiso:', error);
    }
  };

  if (loading) {
    return (
      <div className="revision-permissions-loading">
        <div className="spinner"></div>
        <p>Cargando permisos...</p>
      </div>
    );
  }

  return (
    <div className="revision-permissions">
      <div className="revision-permissions-header">
        <h3>Permisos de Revisión</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-add-permission"
        >
          + Agregar Permiso
        </button>
      </div>

      {showAddForm && (
        <div className="add-permission-form">
          <h4>Agregar Nuevo Permiso</h4>
          <form onSubmit={handleAddPermission}>
            <div className="form-grid">
              <div className="form-group">
                <label>Usuario*</label>
                <input
                  type="text"
                  value={newPermission.user_id}
                  onChange={(e) => setNewPermission({...newPermission, user_id: e.target.value})}
                  placeholder="ID del usuario"
                  required
                />
              </div>

              <div className="permissions-checkboxes">
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newPermission.can_read}
                      onChange={(e) => setNewPermission({...newPermission, can_read: e.target.checked})}
                    />
                    Puede Leer
                  </label>
                </div>

                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newPermission.can_write}
                      onChange={(e) => setNewPermission({...newPermission, can_write: e.target.checked})}
                    />
                    Puede Escribir
                  </label>
                </div>

                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newPermission.can_approve}
                      onChange={(e) => setNewPermission({...newPermission, can_approve: e.target.checked})}
                    />
                    Puede Aprobar
                  </label>
                </div>

                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newPermission.can_delete}
                      onChange={(e) => setNewPermission({...newPermission, can_delete: e.target.checked})}
                    />
                    Puede Eliminar
                  </label>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Agregar Permiso
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-cancel"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="permissions-content">
        {revision_permissions.length === 0 ? (
          <div className="no-permissions">
            <p>No hay permisos configurados para esta revisión.</p>
          </div>
        ) : (
          <div className="permissions-table">
            <div className="table-header">
              <div className="header-cell">Usuario</div>
              <div className="header-cell">Leer</div>
              <div className="header-cell">Escribir</div>
              <div className="header-cell">Aprobar</div>
              <div className="header-cell">Eliminar</div>
              <div className="header-cell">Otorgado Por</div>
              <div className="header-cell">Fecha</div>
              <div className="header-cell">Estado</div>
              <div className="header-cell">Acciones</div>
            </div>

            {revision_permissions.map((permission: any) => (
              <div key={permission.id} className="table-row">
                <div className="table-cell">
                  <strong>{permission.user_id}</strong>
                </div>

                <div className="table-cell">
                  <span className={`permission-badge ${permission.can_read ? 'granted' : 'denied'}`}>
                    {permission.can_read ? '✓' : '✗'}
                  </span>
                </div>

                <div className="table-cell">
                  <span className={`permission-badge ${permission.can_write ? 'granted' : 'denied'}`}>
                    {permission.can_write ? '✓' : '✗'}
                  </span>
                </div>

                <div className="table-cell">
                  <span className={`permission-badge ${permission.can_approve ? 'granted' : 'denied'}`}>
                    {permission.can_approve ? '✓' : '✗'}
                  </span>
                </div>

                <div className="table-cell">
                  <span className={`permission-badge ${permission.can_delete ? 'granted' : 'denied'}`}>
                    {permission.can_delete ? '✓' : '✗'}
                  </span>
                </div>

                <div className="table-cell">
                  {permission.granted_by}
                </div>

                <div className="table-cell">
                  <div className="date-info">
                    <div>{formatDate(permission.granted_at)}</div>
                    {permission.expires_at && (
                      <small>Expira: {formatDate(permission.expires_at)}</small>
                    )}
                  </div>
                </div>

                <div className="table-cell">
                  <span className={`status-badge status-${getPermissionStatus(permission)}`}>
                    {getPermissionStatus(permission) === 'expired' ? 'Expirado' : 'Activo'}
                  </span>
                </div>

                <div className="table-cell">
                  <div className="action-buttons">
                    <button
                      onClick={() => setEditingPermission(permission.id)}
                      className="btn-edit-small"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeletePermission(permission.id)}
                      className="btn-delete-small"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};