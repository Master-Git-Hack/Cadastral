/** @format */

import { useEffect, useState } from "react";

interface Sugerencia {
  id: number;
  contenido: string;
  fecha: string;
  usuario: string;
  estado: 'pendiente' | 'aplicada' | 'rechazada';
  respuesta?: string;
  fecha_respuesta?: string;
  usuario_respuesta?: string;
}

/**
 * Página para mostrar y gestionar sugerencias de una revisión específica
 * Se abre en una ventana separada desde el módulo de homologación
 */
export const SugerenciasRevisionPage = () => {
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revisionId, setRevisionId] = useState<number | null>(null);
  const [nuevaSugerencia, setNuevaSugerencia] = useState("");
  const [enviandoSugerencia, setEnviandoSugerencia] = useState(false);

  // Obtener ID de la revisión desde la URL
  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[2]; // /revisiones/[id]/sugerencias
    
    if (id) {
      setRevisionId(parseInt(id));
      loadSugerencias(parseInt(id));
    }
  }, []);

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
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const enviarSugerencia = async () => {
    if (!nuevaSugerencia.trim() || !revisionId) return;

    try {
      setEnviandoSugerencia(true);
      const response = await fetch(`http://172.31.103.57:56733/api/v1/revisiones/${revisionId}/sugerencias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contenido: nuevaSugerencia,
          usuario: 'current_user' // Obtener del contexto de usuario
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      setNuevaSugerencia("");
      await loadSugerencias(revisionId);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error enviando sugerencia');
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
          usuario_respuesta: 'current_user'
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      if (revisionId) {
        await loadSugerencias(revisionId);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error respondiendo sugerencia');
    }
  };

  const getEstadoBadge = (estado: string): string => {
    switch (estado) {
      case 'pendiente': return 'bg-warning';
      case 'aplicada': return 'bg-success';
      case 'rechazada': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getEstadoIcon = (estado: string): string => {
    switch (estado) {
      case 'pendiente': return '⏳';
      case 'aplicada': return '✅';
      case 'rechazada': return '❌';
      default: return '❓';
    }
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando sugerencias...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid p-4">
        <div className="alert alert-danger">
          <h4>Error</h4>
          <p>{error}</p>
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>💡 Sugerencias de Revisión #{revisionId}</h2>
            <div>
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => revisionId && loadSugerencias(revisionId)}
              >
                🔄 Actualizar
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => window.close()}
              >
                ❌ Cerrar
              </button>
            </div>
          </div>

          {/* Formulario para nueva sugerencia */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>📝 Nueva Sugerencia</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows={3}
                  value={nuevaSugerencia}
                  onChange={(e) => setNuevaSugerencia(e.target.value)}
                  placeholder="Escriba su sugerencia aquí..."
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={enviarSugerencia}
                disabled={!nuevaSugerencia.trim() || enviandoSugerencia}
              >
                {enviandoSugerencia ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Enviando...
                  </>
                ) : (
                  '📤 Enviar Sugerencia'
                )}
              </button>
            </div>
          </div>

          {/* Lista de sugerencias */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">📋 Lista de Sugerencias</h5>
                  <span className="badge bg-primary">{sugerencias.length} sugerencias</span>
                </div>
                <div className="card-body">
                  {sugerencias.length === 0 ? (
                    <div className="text-center text-muted py-4">
                      <p>No hay sugerencias disponibles para esta revisión.</p>
                    </div>
                  ) : (
                    <div className="row">
                      {sugerencias.map((sugerencia) => (
                        <div key={sugerencia.id} className="col-12 mb-3">
                          <div className="card border-start border-4 border-primary">
                            <div className="card-header d-flex justify-content-between align-items-center py-2">
                              <div>
                                <small className="text-muted">
                                  {new Date(sugerencia.fecha).toLocaleString()} • Por: {sugerencia.usuario}
                                </small>
                              </div>
                              <span className={`badge ${getEstadoBadge(sugerencia.estado)}`}>
                                {getEstadoIcon(sugerencia.estado)} {sugerencia.estado.toUpperCase()}
                              </span>
                            </div>
                            <div className="card-body py-2">
                              <p className="mb-2">{sugerencia.contenido}</p>
                              
                              {/* Respuesta si existe */}
                              {sugerencia.respuesta && (
                                <div className="bg-light p-2 rounded mt-2">
                                  <small className="text-muted d-block">
                                    Respuesta de {sugerencia.usuario_respuesta} • {sugerencia.fecha_respuesta && new Date(sugerencia.fecha_respuesta).toLocaleString()}
                                  </small>
                                  <p className="mb-0 mt-1">{sugerencia.respuesta}</p>
                                </div>
                              )}

                              {/* Botones de acción para sugerencias pendientes */}
                              {sugerencia.estado === 'pendiente' && (
                                <div className="mt-3">
                                  <button
                                    className="btn btn-sm btn-success me-2"
                                    onClick={() => {
                                      const respuesta = prompt('Comentario al aplicar la sugerencia:');
                                      if (respuesta !== null) {
                                        responderSugerencia(sugerencia.id, respuesta, 'aplicar');
                                      }
                                    }}
                                  >
                                    ✅ Aplicar
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => {
                                      const respuesta = prompt('Motivo del rechazo:');
                                      if (respuesta !== null) {
                                        responderSugerencia(sugerencia.id, respuesta, 'rechazar');
                                      }
                                    }}
                                  >
                                    ❌ Rechazar
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-warning">
                    {sugerencias.filter(s => s.estado === 'pendiente').length}
                  </h5>
                  <p className="card-text">Pendientes</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-success">
                    {sugerencias.filter(s => s.estado === 'aplicada').length}
                  </h5>
                  <p className="card-text">Aplicadas</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-danger">
                    {sugerencias.filter(s => s.estado === 'rechazada').length}
                  </h5>
                  <p className="card-text">Rechazadas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
