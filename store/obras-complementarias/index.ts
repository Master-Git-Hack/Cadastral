import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { api } from '../api.config';

// Interfaces para Obras Complementarias
export interface ObraItem {
  cantidad: number;
  unidad: string;
  precio_unitario: number;
  importe: number;
}

export interface ObrasEstructura {
  pavimentacion: Record<string, ObraItem>;
  servicios: Record<string, ObraItem>;
  infraestructura: Record<string, ObraItem>;
}

export interface TotalesObra {
  costo_total: number;
  costo_m2: number;
  superficie_beneficiada: number;
}

export interface ConfiguracionObra {
  incluir_pavimentacion: boolean;
  incluir_servicios: boolean;
  incluir_infraestructura: boolean;
  factor_contingencias: number;
  factor_indirectos: number;
}

export interface ConceptoObra {
  id: number;
  codigo: string;
  descripcion: string;
  unidad: string;
  precio_unitario: number;
  categoria: string;
}

export interface ResumenObra {
  totales_por_categoria: Record<string, number>;
  subtotal: number;
  contingencias: number;
  indirectos: number;
  total_final: number;
  factores_aplicados: {
    contingencias: number;
    indirectos: number;
  };
}

interface ObrasComplementariasState {
  // Estado principal
  justipreciacion_id: number;
  registro: string;
  obras: ObrasEstructura;
  totales: TotalesObra;
  configuracion: ConfiguracionObra;
  
  // Catálogos
  catalogo: ConceptoObra[];
  categorias: string[];
  
  // Estados de la UI
  loading: boolean;
  saving: boolean;
  error: string | null;
  
  // Reportes
  reporte_data: any | null;
  generating_report: boolean;
  
  // Acciones principales
  getObrasComplementarias: (justipreciacionId: number) => Promise<void>;
  saveObrasComplementarias: (justipreciacionId: number) => Promise<void>;
  
  // Acciones de datos
  updateObra: (categoria: string, concepto: string, data: Partial<ObraItem>) => void;
  addObra: (categoria: string, concepto: string, data: ObraItem) => void;
  removeObra: (categoria: string, concepto: string) => void;
  
  // Acciones de configuración
  updateConfiguracion: (config: Partial<ConfiguracionObra>) => void;
  
  // Acciones de catálogos
  getCatalogo: (tipoObra?: string) => Promise<void>;
  
  // Acciones de cálculos
  calculateTotales: () => void;
  calculateImporte: (categoria: string, concepto: string) => void;
  
  // Acciones de reportes
  generateReporte: (justipreciacionId: number, formato?: string) => Promise<void>;
  downloadReporte: (justipreciacionId: number) => Promise<void>;
  
  // Reset
  reset: () => void;
}

const initialObras: ObrasEstructura = {
  pavimentacion: {},
  servicios: {},
  infraestructura: {}
};

const initialTotales: TotalesObra = {
  costo_total: 0,
  costo_m2: 0,
  superficie_beneficiada: 100
};

const initialConfiguracion: ConfiguracionObra = {
  incluir_pavimentacion: true,
  incluir_servicios: true,
  incluir_infraestructura: true,
  factor_contingencias: 0.10,
  factor_indirectos: 0.15
};

export const useObrasComplementariasStore = create<ObrasComplementariasState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        justipreciacion_id: 0,
        registro: '',
        obras: initialObras,
        totales: initialTotales,
        configuracion: initialConfiguracion,
        
        // Catálogos
        catalogo: [],
        categorias: ['pavimentacion', 'servicios', 'infraestructura'],
        
        // Estados de la UI
        loading: false,
        saving: false,
        error: null,
        
        // Reportes
        reporte_data: null,
        generating_report: false,

        // Acciones principales
        getObrasComplementarias: async (justipreciacionId: number) => {
          set({ loading: true, error: null });
          try {
            const data = await api.get(`/obras-complementarias/${justipreciacionId}`);
            
            if (data.success) {
              const { justipreciacion_id, registro, obras, totales, configuracion } = data.data;
              set({
                justipreciacion_id,
                registro,
                obras: obras || initialObras,
                totales: totales || initialTotales,
                configuracion: configuracion || initialConfiguracion,
                loading: false
              });
            } else {
              throw new Error(data.message || 'Error desconocido');
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Error al obtener obras complementarias',
              loading: false
            });
          }
        },

        saveObrasComplementarias: async (justipreciacionId: number) => {
          set({ saving: true, error: null });
          try {
            const state = get();
            const payload = {
              obras: state.obras,
              totales: state.totales,
              configuracion: state.configuracion
            };

            const result = state.justipreciacion_id === 0 
              ? await api.post(`/obras-complementarias/${justipreciacionId}`, payload)
              : await api.patch(`/obras-complementarias/${justipreciacionId}`, payload);
            
            if (result.success) {
              set({
                justipreciacion_id: justipreciacionId,
                saving: false
              });
            } else {
              throw new Error(result.message || 'Error al guardar');
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Error al guardar',
              saving: false
            });
          }
        },

        // Acciones de datos
        updateObra: (categoria: string, concepto: string, data: Partial<ObraItem>) => {
          set((state) => {
            const newObras = { ...state.obras };
            if (!newObras[categoria as keyof ObrasEstructura]) {
              newObras[categoria as keyof ObrasEstructura] = {};
            }
            
            const obraActual = newObras[categoria as keyof ObrasEstructura][concepto] || {
              cantidad: 0,
              unidad: '',
              precio_unitario: 0,
              importe: 0
            };
            
            const obraActualizada = { ...obraActual, ...data };
            
            // Calcular importe automáticamente
            if (data.cantidad !== undefined || data.precio_unitario !== undefined) {
              obraActualizada.importe = obraActualizada.cantidad * obraActualizada.precio_unitario;
            }
            
            newObras[categoria as keyof ObrasEstructura][concepto] = obraActualizada;
            
            return { obras: newObras };
          });
          
          // Recalcular totales
          get().calculateTotales();
        },

        addObra: (categoria: string, concepto: string, data: ObraItem) => {
          set((state) => {
            const newObras = { ...state.obras };
            if (!newObras[categoria as keyof ObrasEstructura]) {
              newObras[categoria as keyof ObrasEstructura] = {};
            }
            
            newObras[categoria as keyof ObrasEstructura][concepto] = {
              ...data,
              importe: data.cantidad * data.precio_unitario
            };
            
            return { obras: newObras };
          });
          
          get().calculateTotales();
        },

        removeObra: (categoria: string, concepto: string) => {
          set((state) => {
            const newObras = { ...state.obras };
            if (newObras[categoria as keyof ObrasEstructura]) {
              delete newObras[categoria as keyof ObrasEstructura][concepto];
            }
            
            return { obras: newObras };
          });
          
          get().calculateTotales();
        },

        // Acciones de configuración
        updateConfiguracion: (config: Partial<ConfiguracionObra>) => {
          set((state) => ({
            configuracion: { ...state.configuracion, ...config }
          }));
          
          get().calculateTotales();
        },

        // Acciones de catálogos
        getCatalogo: async (tipoObra?: string) => {
          try {
            const url = tipoObra 
              ? `/obras-complementarias/0/catalogo?tipo_obra=${tipoObra}`
              : `/obras-complementarias/0/catalogo`;
              
            const data = await api.get(url);
            
            if (data.success) {
              set({ catalogo: data.data.catalogo });
            }
          } catch (error) {
            console.error('Error al obtener catálogo:', error);
          }
        },

        // Acciones de cálculos
        calculateTotales: () => {
          const state = get();
          let subtotal = 0;
          
          // Sumar todos los importes según configuración
          Object.entries(state.obras).forEach(([categoria, items]) => {
            const incluir = state.configuracion[`incluir_${categoria}` as keyof ConfiguracionObra];
            if (incluir) {
              Object.values(items as Record<string, ObraItem>).forEach((obra) => {
                subtotal += obra.importe || 0;
              });
            }
          });
          
          // Aplicar factores
          const contingencias = subtotal * state.configuracion.factor_contingencias;
          const indirectos = subtotal * state.configuracion.factor_indirectos;
          const total_final = subtotal + contingencias + indirectos;
          
          const costo_m2 = state.totales.superficie_beneficiada > 0 
            ? total_final / state.totales.superficie_beneficiada 
            : 0;
          
          set({
            totales: {
              ...state.totales,
              costo_total: total_final,
              costo_m2: Math.round(costo_m2 * 100) / 100
            }
          });
        },

        calculateImporte: (categoria: string, concepto: string) => {
          const state = get();
          const obra = state.obras[categoria as keyof ObrasEstructura]?.[concepto];
          
          if (obra) {
            const importe = obra.cantidad * obra.precio_unitario;
            get().updateObra(categoria, concepto, { importe });
          }
        },

        // Acciones de reportes
        generateReporte: async (justipreciacionId: number, formato = 'json') => {
          set({ generating_report: true, error: null });
          try {
            const data = await api.get(`/obras-complementarias/${justipreciacionId}/reporte?formato=${formato}`);
            
            if (data.success) {
              set({
                reporte_data: data.data,
                generating_report: false
              });
            } else {
              throw new Error(data.message || 'Error al generar reporte');
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Error al generar reporte',
              generating_report: false
            });
          }
        },

        downloadReporte: async (justipreciacionId: number) => {
          try {
            const data = await api.get(`/obras-complementarias/${justipreciacionId}/reporte?formato=pdf`);
            
            if (data.success && data.data.url) {
              // Abrir en nueva ventana
              window.open(data.data.url, '_blank');
            }
          } catch (error) {
            console.error('Error al descargar reporte:', error);
          }
        },

        // Reset
        reset: () => set({
          justipreciacion_id: 0,
          registro: '',
          obras: initialObras,
          totales: initialTotales,
          configuracion: initialConfiguracion,
          catalogo: [],
          loading: false,
          saving: false,
          error: null,
          reporte_data: null,
          generating_report: false
        })
      }),
      {
        name: 'obras-complementarias-store',
        partialize: (state) => ({
          justipreciacion_id: state.justipreciacion_id,
          registro: state.registro,
          obras: state.obras,
          totales: state.totales,
          configuracion: state.configuracion
        })
      }
    ),
    { name: 'obras-complementarias-store' }
  )
);

export default useObrasComplementariasStore;
