/**
 * Configuración y utilidades para el módulo de revisiones
 */

export interface URLParams {
  key: string;
  tipo: 'terreno' | 'renta';
  id: number;
  sp1_superficie?: number;
  sp1_factor?: number;
  tipo_servicio?: string;
  username: string;
}

/**
 * Extrae los parámetros de la URL para inicializar el módulo de revisiones
 */
export const getRevisionParamsFromURL = (): URLParams | null => {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  
  const key = urlParams.get('key');
  const tipo = urlParams.get('tipo') as 'terreno' | 'renta';
  const id = urlParams.get('id');
  const sp1_superficie = urlParams.get('sp1_superficie');
  const sp1_factor = urlParams.get('sp1_factor');
  const tipo_servicio = urlParams.get('tipo_servicio');
  const username = urlParams.get('username');
  
  if (!key || !tipo || !id || !username) {
    console.error('Parámetros URL requeridos faltantes para el módulo de revisiones');
    return null;
  }
  
  return {
    key,
    tipo,
    id: parseInt(id),
    sp1_superficie: sp1_superficie ? parseFloat(sp1_superficie) : undefined,
    sp1_factor: sp1_factor ? parseFloat(sp1_factor) : undefined,
    tipo_servicio: tipo_servicio || undefined,
    username,
  };
};

/**
 * Valida si los parámetros son válidos para el módulo de revisiones
 */
export const validateRevisionParams = (params: URLParams): boolean => {
  if (!params.key || !params.tipo || !params.id || !params.username) {
    return false;
  }
  
  if (!['terreno', 'renta'].includes(params.tipo)) {
    return false;
  }
  
  if (isNaN(params.id) || params.id <= 0) {
    return false;
  }
  
  return true;
};

/**
 * Construye la URL con los parámetros necesarios para el módulo de revisiones
 */
export const buildRevisionURL = (params: URLParams): string => {
  const urlParams = new URLSearchParams({
    key: params.key,
    tipo: params.tipo,
    id: params.id.toString(),
    username: params.username,
  });
  
  if (params.sp1_superficie !== undefined) {
    urlParams.append('sp1_superficie', params.sp1_superficie.toString());
  }
  
  if (params.sp1_factor !== undefined) {
    urlParams.append('sp1_factor', params.sp1_factor.toString());
  }
  
  if (params.tipo_servicio) {
    urlParams.append('tipo_servicio', params.tipo_servicio);
  }
  
  return `${window.location.pathname}?${urlParams.toString()}`;
};

/**
 * Configuración de campos revisables por tipo de homologación
 */
export const REVISION_FIELDS_CONFIG = {
  terreno: [
    { path: 'superficie', label: 'Superficie', type: 'number' },
    { path: 'factor', label: 'Factor', type: 'number' },
    { path: 'valor_unitario', label: 'Valor Unitario', type: 'currency' },
    { path: 'valor_total', label: 'Valor Total', type: 'currency' },
    { path: 'observaciones', label: 'Observaciones', type: 'text' },
  ],
  renta: [
    { path: 'renta_mensual', label: 'Renta Mensual', type: 'currency' },
    { path: 'gastos_operacion', label: 'Gastos de Operación', type: 'currency' },
    { path: 'tasa_capitalizacion', label: 'Tasa de Capitalización', type: 'percentage' },
    { path: 'valor_comercial', label: 'Valor Comercial', type: 'currency' },
    { path: 'observaciones', label: 'Observaciones', type: 'text' },
  ],
};

/**
 * Estados de revisión con sus colores y etiquetas
 */
export const REVISION_STATUS_CONFIG = {
  PENDIENTE: { label: 'Pendiente', color: '#f59e0b', bgColor: '#fef3c7' },
  EN_REVISION: { label: 'En Revisión', color: '#3b82f6', bgColor: '#dbeafe' },
  APROBADA: { label: 'Aprobada', color: '#10b981', bgColor: '#d1fae5' },
  RECHAZADA: { label: 'Rechazada', color: '#ef4444', bgColor: '#fee2e2' },
};

/**
 * Configuración de permisos por rol
 */
export const REVISION_PERMISSIONS_CONFIG = {
  admin: {
    can_read: true,
    can_write: true,
    can_approve: true,
  },
  revisor: {
    can_read: true,
    can_write: true,
    can_approve: false,
  },
  viewer: {
    can_read: true,
    can_write: false,
    can_approve: false,
  },
};
