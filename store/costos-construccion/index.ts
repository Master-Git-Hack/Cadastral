import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { api } from '../api.config';

// Interfaces para Costos de Construcción
export interface ConceptoCosto {
  id: number;
  codigo: string;
  descripcion: string;
  unidad: string;
  precio_unitario: number;
  categoria: string;
}

export interface PartidaCosto {
  cantidad: number;
  unidad: string;
  precio_unitario: number;
  importe: number;
}

export interface CostosEstructura {
  preliminares: Record<string, PartidaCosto>;
  cimentacion: Record<string, PartidaCosto>;
  estructura: Record<string, PartidaCosto>;
  albanileria: Record<string, PartidaCosto>;
  acabados: Record<string, PartidaCosto>;
  instalaciones: Record<string, PartidaCosto>;
}

export interface TotalesCosto {
  costo_total: number;
  costo_m2: number;
  superficie_construccion: number;
}

export interface ConfiguracionCosto {
  incluir_preliminares: boolean;
  incluir_acabados: boolean;
  incluir_instalaciones: boolean;
  factor_indirectos: number;
  factor_utilidad: number;
}

export interface ResumenReporte {
  costo_total: number;
  costo_m2: number;
  superficie: number;
  factor_indirectos: number;
  factor_utilidad: number;
}

interface CostosConstruccionState {
  // Estado principal
  justipreciacion_id: number;
  registro: string;
  costos: CostosEstructura;
  totales: TotalesCosto;
  configuracion: ConfiguracionCosto;
  
  // Catálogos
  conceptos: ConceptoCosto[];
  categorias: string[];
  
  // Estados de la UI
  loading: boolean;
  saving: boolean;
  error: string | null;
  
  // Reportes
  reporte_data: any | null;
  generating_report: boolean;
  
  // Acciones principales
  getCostosConstruccion: (justipreciacionId: number) => Promise<void>;
  saveCostosConstruccion: (justipreciacionId: number) => Promise<void>;
  
  // Acciones de datos
  updatePartida: (categoria: string, concepto: string, data: Partial<PartidaCosto>) => void;
  addPartida: (categoria: string, concepto: string, data: PartidaCosto) => void;
  removePartida: (categoria: string, concepto: string) => void;
  
  // Acciones de configuración
  updateConfiguracion: (config: Partial<ConfiguracionCosto>) => void;
  
  // Acciones de catálogos
  getConceptos: (categoria?: string) => Promise<void>;
  
  // Acciones de cálculos
  calculateTotales: () => void;
  calculateImporte: (categoria: string, concepto: string) => void;
  
  // Acciones de reportes
  generateReporte: (justipreciacionId: number, formato?: string) => Promise<void>;
  downloadReporte: (justipreciacionId: number) => Promise<void>;
  
  // Reset
  reset: () => void;
}

const initialCostos: CostosEstructura = {
  preliminares: {},
  cimentacion: {},
  estructura: {},
  albanileria: {},
  acabados: {},
  instalaciones: {}
};

const initialTotales: TotalesCosto = {
  costo_total: 0,
  costo_m2: 0,
  superficie_construccion: 0
};

const initialConfiguracion: ConfiguracionCosto = {
  incluir_preliminares: true,
  incluir_acabados: true,
  incluir_instalaciones: true,
  factor_indirectos: 0.15,
  factor_utilidad: 0.10
};

export const useCostosConstruccionStore = create<CostosConstruccionState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        justipreciacion_id: 0,
        registro: '',
        costos: initialCostos,
        totales: initialTotales,
        configuracion: initialConfiguracion,
        
        // Catálogos
        conceptos: [],
        categorias: ['preliminares', 'cimentacion', 'estructura', 'albanileria', 'acabados', 'instalaciones'],
        
        // Estados de la UI
        loading: false,
        saving: false,
        error: null,
        
        // Reportes
        reporte_data: null,
        generating_report: false,

        // Acciones principales
        getCostosConstruccion: async (justipreciacionId: number) => {
          set({ loading: true, error: null });
          try {
            const data = await api.get(`/costos-construccion/${justipreciacionId}`);
            
            if (data.success) {
              const { justipreciacion_id, registro, costos, totales, configuracion } = data.data;
              set({
                justipreciacion_id,
                registro,
                costos: costos || initialCostos,
                totales: totales || initialTotales,
                configuracion: configuracion || initialConfiguracion,
                loading: false
              });
            } else {
              throw new Error(data.message || 'Error desconocido');
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Error al obtener costos',
              loading: false
            });
          }
        },

        saveCostosConstruccion: async (justipreciacionId: number) => {
          set({ saving: true, error: null });
          try {
            const state = get();
            const payload = {
              costos: state.costos,
              totales: state.totales,
              configuracion: state.configuracion
            };

            const result = state.justipreciacion_id === 0 
              ? await api.post(`/costos-construccion/${justipreciacionId}`, payload)
              : await api.patch(`/costos-construccion/${justipreciacionId}`, payload);
            
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
        updatePartida: (categoria: string, concepto: string, data: Partial<PartidaCosto>) => {
          set((state) => {
            const newCostos = { ...state.costos };
            if (!newCostos[categoria as keyof CostosEstructura]) {
              newCostos[categoria as keyof CostosEstructura] = {};
            }
            
            const partidaActual = newCostos[categoria as keyof CostosEstructura][concepto] || {
              cantidad: 0,
              unidad: '',
              precio_unitario: 0,
              importe: 0
            };
            
            const partidaActualizada = { ...partidaActual, ...data };
            
            // Calcular importe automáticamente
            if (data.cantidad !== undefined || data.precio_unitario !== undefined) {
              partidaActualizada.importe = partidaActualizada.cantidad * partidaActualizada.precio_unitario;
            }
            
            newCostos[categoria as keyof CostosEstructura][concepto] = partidaActualizada;
            
            return { costos: newCostos };
          });
          
          // Recalcular totales
          get().calculateTotales();
        },

        addPartida: (categoria: string, concepto: string, data: PartidaCosto) => {
          set((state) => {
            const newCostos = { ...state.costos };
            if (!newCostos[categoria as keyof CostosEstructura]) {
              newCostos[categoria as keyof CostosEstructura] = {};
            }
            
            newCostos[categoria as keyof CostosEstructura][concepto] = {
              ...data,
              importe: data.cantidad * data.precio_unitario
            };
            
            return { costos: newCostos };
          });
          
          get().calculateTotales();
        },

        removePartida: (categoria: string, concepto: string) => {
          set((state) => {
            const newCostos = { ...state.costos };
            if (newCostos[categoria as keyof CostosEstructura]) {
              delete newCostos[categoria as keyof CostosEstructura][concepto];
            }
            
            return { costos: newCostos };
          });
          
          get().calculateTotales();
        },

        // Acciones de configuración
        updateConfiguracion: (config: Partial<ConfiguracionCosto>) => {
          set((state) => ({
            configuracion: { ...state.configuracion, ...config }
          }));
          
          get().calculateTotales();
        },

        // Acciones de catálogos
        getConceptos: async (categoria?: string) => {
          try {
            const url = categoria 
              ? `/costos-construccion/0/conceptos?categoria=${categoria}`
              : `/costos-construccion/0/conceptos`;
              
            const data = await api.get(url);
            
            if (data.success) {
              set({ conceptos: data.data.conceptos });
            }
          } catch (error) {
            console.error('Error al obtener conceptos:', error);
          }
        },

        // Acciones de cálculos
        calculateTotales: () => {
          const state = get();
          let costo_total = 0;
          
          // Sumar todos los importes
          Object.values(state.costos).forEach(categoria => {
            Object.values(categoria as Record<string, PartidaCosto>).forEach((partida) => {
              costo_total += partida.importe || 0;
            });
          });
          
          // Aplicar factores
          const indirectos = costo_total * state.configuracion.factor_indirectos;
          const utilidad = costo_total * state.configuracion.factor_utilidad;
          const total_final = costo_total + indirectos + utilidad;
          
          const costo_m2 = state.totales.superficie_construccion > 0 
            ? total_final / state.totales.superficie_construccion 
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
          const partida = state.costos[categoria as keyof CostosEstructura]?.[concepto];
          
          if (partida) {
            const importe = partida.cantidad * partida.precio_unitario;
            get().updatePartida(categoria, concepto, { importe });
          }
        },

        // Acciones de reportes
        generateReporte: async (justipreciacionId: number, formato = 'json') => {
          set({ generating_report: true, error: null });
          try {
            const data = await api.get(`/costos-construccion/${justipreciacionId}/reporte?formato=${formato}`);
            
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
            const data = await api.get(`/costos-construccion/${justipreciacionId}/reporte?formato=pdf`);
            
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
          costos: initialCostos,
          totales: initialTotales,
          configuracion: initialConfiguracion,
          conceptos: [],
          loading: false,
          saving: false,
          error: null,
          reporte_data: null,
          generating_report: false
        })
      }),
      {
        name: 'costos-construccion-store',
        partialize: (state) => ({
          justipreciacion_id: state.justipreciacion_id,
          registro: state.registro,
          costos: state.costos,
          totales: state.totales,
          configuracion: state.configuracion
        })
      }
    ),
    { name: 'costos-construccion-store' }
  )
);

export default useCostosConstruccionStore;
