/** @format */

import { useEffect, useState } from "react";
import { Alert } from "../../../../utils/alert";

interface PublicarRevisionPageProps {
  revisionId: number;
  recordType: string;
  recordId: number;
  justipreciacionId: number;
}

interface RevisionData {
  id: number;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
  usuario_revisor?: string;
  sugerencias: any[];
  historial: any[];
}

/**
 * Página para publicar/gestionar una revisión específica
 * Se abre en una ventana separada desde el módulo de homologación
 */
export const PublicarRevisionPage = () => {
  const [revisionData, setRevisionData] = useState<RevisionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comentarios, setComentarios] = useState("");
  const [accionSeleccionada, setAccionSeleccionada] = useState<'aprobar' | 'rechazar' | 'sugerir' | null>(null);

  // Obtener parámetros de la URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const revisionId = window.location.pathname.split('/')[2];
    
    if (revisionId) {
      loadRevisionData(parseInt(revisionId));
    }
  }, []);

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
      setRevisionData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      Alert.Error({
        title: "¡Error!",
        text: `No se pudo cargar la información de la revisión: ${err}`
      });
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

    Alert.Save({
      title: "Confirmar Acción",
      text: confirmMessage
    }).then(async ({ isConfirmed }: any) => {
      if (isConfirmed) {
        try {
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
              usuario_revisor: 'current_user' // Obtener del contexto
            }),
          });

          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }

          Alert.Success({
            title: "¡Acción Completada!",
            text: `La revisión ha sido ${accionSeleccionada === 'aprobar' ? 'aprobada' : accionSeleccionada === 'rechazar' ? 'rechazada' : 'actualizada con sugerencias'} exitosamente.`
          }).then(() => {
            // Recargar datos
            loadRevisionData(revisionData.id);
            setComentarios("");
            setAccionSeleccionada(null);
          });

        } catch (err) {
          Alert.Error({
            title: "¡Error!",
            text: `No se pudo completar la acción: ${err}`
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando información de revisión...</p>
        </div>
      </div>
    );
  }

  if (error || !revisionData) {
    return (
      <div className="container-fluid p-4">
        <div className="alert alert-danger">
          <h4>Error</h4>
          <p>{error || 'No se pudo cargar la información de la revisión'}</p>
          <button 
            className="btn btn-outline-danger"
            onClick={() => window.close()}
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            📋 Gestión de Revisión #{revisionData.id}
          </h2>
          
          {/* Información de la revisión */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>Información General</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>ID:</strong> {revisionData.id}</p>
                  <p><strong>Descripción:</strong> {revisionData.descripcion}</p>
                  <p><strong>Estado:</strong> 
                    <span className={`badge ms-2 ${
                      revisionData.estado === 'en_revision' ? 'bg-primary' :
                      revisionData.estado === 'revisado' ? 'bg-success' :
                      revisionData.estado === 'rechazado' ? 'bg-danger' : 'bg-secondary'
                    }`}>
                      {revisionData.estado.replace('_', ' ').toUpperCase()}
                    </span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p><strong>Fecha de Creación:</strong> {new Date(revisionData.fecha_creacion).toLocaleDateString()}</p>
                  <p><strong>Usuario Revisor:</strong> {revisionData.usuario_revisor || 'No asignado'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de acciones */}
          {revisionData.estado === 'en_revision' && (
            <div className="card mb-4">
              <div className="card-header">
                <h5>Acciones de Revisión</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-12">
                    <label className="form-label">Seleccionar Acción:</label>
                    <div className="btn-group w-100" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        name="accion"
                        id="aprobar"
                        checked={accionSeleccionada === 'aprobar'}
                        onChange={() => setAccionSeleccionada('aprobar')}
                      />
                      <label className="btn btn-outline-success" htmlFor="aprobar">
                        ✅ Aprobar
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="accion"
                        id="rechazar"
                        checked={accionSeleccionada === 'rechazar'}
                        onChange={() => setAccionSeleccionada('rechazar')}
                      />
                      <label className="btn btn-outline-danger" htmlFor="rechazar">
                        ❌ Rechazar
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="accion"
                        id="sugerir"
                        checked={accionSeleccionada === 'sugerir'}
                        onChange={() => setAccionSeleccionada('sugerir')}
                      />
                      <label className="btn btn-outline-warning" htmlFor="sugerir">
                        💡 Sugerir Cambios
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="comentarios" className="form-label">Comentarios:</label>
                    <textarea
                      id="comentarios"
                      className="form-control"
                      rows={4}
                      value={comentarios}
                      onChange={(e) => setComentarios(e.target.value)}
                      placeholder="Escriba sus comentarios aquí..."
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <button
                      className="btn btn-primary me-2"
                      onClick={handleAccion}
                      disabled={!accionSeleccionada || !comentarios.trim()}
                    >
                      Ejecutar Acción
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setAccionSeleccionada(null);
                        setComentarios("");
                      }}
                    >
                      Limpiar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Historial y sugerencias */}
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>📈 Historial de Cambios</h5>
                </div>
                <div className="card-body">
                  {revisionData.historial && revisionData.historial.length > 0 ? (
                    <ul className="list-unstyled">
                      {revisionData.historial.map((item: any, index: number) => (
                        <li key={index} className="mb-2 p-2 bg-light rounded">
                          <small className="text-muted">
                            {new Date(item.fecha).toLocaleString()}
                          </small>
                          <br />
                          <strong>{item.accion}</strong>
                          {item.comentarios && (
                            <p className="mt-1 mb-0">{item.comentarios}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No hay historial disponible</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>💡 Sugerencias</h5>
                </div>
                <div className="card-body">
                  {revisionData.sugerencias && revisionData.sugerencias.length > 0 ? (
                    <ul className="list-unstyled">
                      {revisionData.sugerencias.map((item: any, index: number) => (
                        <li key={index} className="mb-2 p-2 bg-warning bg-opacity-10 rounded">
                          <small className="text-muted">
                            {new Date(item.fecha).toLocaleString()}
                          </small>
                          <br />
                          <strong>Sugerencia #{index + 1}</strong>
                          <p className="mt-1 mb-0">{item.contenido}</p>
                          {item.estado && (
                            <span className={`badge ${
                              item.estado === 'pendiente' ? 'bg-warning' :
                              item.estado === 'aplicada' ? 'bg-success' : 'bg-secondary'
                            }`}>
                              {item.estado}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No hay sugerencias disponibles</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción inferior */}
          <div className="row mt-4">
            <div className="col-12 text-center">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => loadRevisionData(revisionData.id)}
              >
                🔄 Actualizar
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => window.close()}
              >
                ❌ Cerrar Ventana
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
