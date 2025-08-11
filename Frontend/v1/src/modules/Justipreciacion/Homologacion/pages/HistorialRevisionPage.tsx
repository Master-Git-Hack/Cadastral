/** @format */

import { useEffect, useState } from "react";

interface HistorialItem {
  id: number;
  fecha: string;
  accion: string;
  usuario: string;
  comentarios?: string;
  estado_anterior: string;
  estado_nuevo: string;
}

/**
 * Página para mostrar el historial de una revisión específica
 * Se abre en una ventana separada desde el módulo de homologación
 */
export const HistorialRevisionPage = () => {
  const [historial, setHistorial] = useState<HistorialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revisionId, setRevisionId] = useState<number | null>(null);

  // Obtener ID de la revisión desde la URL
  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[2]; // /revisiones/[id]/historial
    
    if (id) {
      setRevisionId(parseInt(id));
      loadHistorial(parseInt(id));
    }
  }, []);

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
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const getEstadoColor = (estado: string): string => {
    switch (estado) {
      case 'sin_revision': return 'text-secondary';
      case 'en_revision': return 'text-primary';
      case 'revisado': return 'text-success';
      case 'rechazado': return 'text-danger';
      default: return 'text-secondary';
    }
  };

  const getAccionIcon = (accion: string): string => {
    switch (accion.toLowerCase()) {
      case 'crear': return '➕';
      case 'aprobar': return '✅';
      case 'rechazar': return '❌';
      case 'sugerir': return '💡';
      case 'actualizar': return '📝';
      case 'revisar': return '🔍';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando historial...</p>
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
            <h2>📈 Historial de Revisión #{revisionId}</h2>
            <div>
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => revisionId && loadHistorial(revisionId)}
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

          {historial.length === 0 ? (
            <div className="alert alert-info">
              <p className="mb-0">No hay historial disponible para esta revisión.</p>
            </div>
          ) : (
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Línea de Tiempo de la Revisión</h5>
              </div>
              <div className="card-body">
                <div className="timeline">
                  {historial.map((item, index) => (
                    <div key={item.id} className="timeline-item mb-4 pb-3" style={{
                      borderLeft: index < historial.length - 1 ? '2px solid #dee2e6' : 'none',
                      paddingLeft: '20px',
                      marginLeft: '10px',
                      position: 'relative'
                    }}>
                      {/* Círculo de la línea de tiempo */}
                      <div style={{
                        position: 'absolute',
                        left: '-11px',
                        top: '0',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#007bff',
                        border: '3px solid #fff',
                        boxShadow: '0 0 0 2px #dee2e6'
                      }} />

                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="mb-1">
                            {getAccionIcon(item.accion)} {item.accion}
                          </h6>
                          <small className="text-muted">
                            {new Date(item.fecha).toLocaleString()} • Por: {item.usuario}
                          </small>
                        </div>
                        <div className="text-end">
                          {item.estado_anterior && item.estado_nuevo && (
                            <div>
                              <span className={`badge me-1 ${getEstadoColor(item.estado_anterior)}`}>
                                {item.estado_anterior.replace('_', ' ')}
                              </span>
                              <span className="text-muted">→</span>
                              <span className={`badge ms-1 ${getEstadoColor(item.estado_nuevo)}`}>
                                {item.estado_nuevo.replace('_', ' ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {item.comentarios && (
                        <div className="bg-light p-3 rounded">
                          <p className="mb-0 text-sm">{item.comentarios}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Estadísticas del historial */}
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-primary">{historial.length}</h5>
                  <p className="card-text">Total de Eventos</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-success">
                    {historial.filter(h => h.accion.toLowerCase() === 'aprobar').length}
                  </h5>
                  <p className="card-text">Aprobaciones</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-danger">
                    {historial.filter(h => h.accion.toLowerCase() === 'rechazar').length}
                  </h5>
                  <p className="card-text">Rechazos</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title text-warning">
                    {historial.filter(h => h.accion.toLowerCase() === 'sugerir').length}
                  </h5>
                  <p className="card-text">Sugerencias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
