/** @format */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  FactoresState,
  FactorOption,
  FactorData,
  UpdateCommonSubjectPayload,
  UpdateCommonDataPayload,
  SetAgeSubjectPayload,
  SetAgeDataPayload,
  SetEnabledFactorsPayload,
  UpdateSymbolsDataPayload,
  UpdateLocZoneSubjectPayload,
  AddRowLocZonePayload,
  RemoveRowLocZonePayload,
  SelectorPosition
} from './types';

// Datos iniciales para factores
const initialFactorData: FactorData[] = [
  { id: 1, label: "Comparativo 1", value: 1, result: 1 },
  { id: 2, label: "Comparativo 2", value: 1, result: 1 },
  { id: 3, label: "Comparativo 3", value: 1, result: 1 },
];

const defaultSubject = { label: "Sujeto", value: 1 };

const defaultOptions: FactorOption[] = [
  { id: 1, label: "Excelente", value: 1.15 },
  { id: 2, label: "Muy Bueno", value: 1.10 },
  { id: 3, label: "Bueno", value: 1.05 },
  { id: 4, label: "Regular", value: 1.00 },
  { id: 5, label: "Malo", value: 0.95 },
  { id: 6, label: "Muy Malo", value: 0.90 },
];

const locationOptions: FactorOption[] = [
  { id: 1, label: "Centro", value: 1.20 },
  { id: 2, label: "Residencial", value: 1.10 },
  { id: 3, label: "Semi-urbano", value: 1.05 },
  { id: 4, label: "Periférico", value: 1.00 },
  { id: 5, label: "Rural", value: 0.95 },
];

const zoneOptions: FactorOption[] = [
  { id: 1, label: "Zona A", value: 1.25 },
  { id: 2, label: "Zona B", value: 1.15 },
  { id: 3, label: "Zona C", value: 1.05 },
  { id: 4, label: "Zona D", value: 1.00 },
  { id: 5, label: "Zona E", value: 0.90 },
];

// Posiciones disponibles para selectores
export const getFactorPositions = (isTerrenoType: boolean): SelectorPosition[] => [
  { key: "Classification", name: "Clasificación", enabled: true },
  { key: "TypeForm", name: "Tipo y Forma", enabled: true },
  { key: "Location", name: "Ubicación", enabled: true },
  { key: "Usage", name: "Uso", enabled: true },
  { key: "Topography", name: "Topografía", enabled: true },
  { key: "Building", name: "Edificación", enabled: true },
  { key: "Quality", name: "Calidad", enabled: isTerrenoType },
  { key: "Zone", name: "Zona", enabled: isTerrenoType },
  { key: "Age", name: "Edad", enabled: !isTerrenoType },
  { key: "Level", name: "Nivel", enabled: !isTerrenoType },
  { key: "Project", name: "Proyecto", enabled: !isTerrenoType },
];

const initialState: FactoresState = {
  Classification: {
    name: "Clasificación",
    data: [...initialFactorData],
    subject: { ...defaultSubject },
    options: [...defaultOptions],
    isUsed: true,
    position: 0
  },
  TypeForm: {
    name: "Tipo y Forma",
    data: [...initialFactorData],
    subject: { ...defaultSubject },
    options: [...defaultOptions],
    isUsed: true,
    position: 1
  },
  Usage: {
    name: "Uso",
    data: [...initialFactorData],
    subject: { ...defaultSubject },
    options: [...defaultOptions],
    isUsed: true,
    position: 3
  },
  Topography: {
    name: "Topografía",
    data: [...initialFactorData],
    subject: { ...defaultSubject },
    options: [...defaultOptions],
    isUsed: true,
    position: 4
  },
  Building: {
    name: "Edificación",
    data: [...initialFactorData],
    subject: { ...defaultSubject },
    options: [...defaultOptions],
    isUsed: true,
    position: 5
  },
  Quality: {
    name: "Calidad",
    data: [...initialFactorData],
    subject: { ...defaultSubject },
    options: [...defaultOptions],
    isUsed: true,
    position: 6
  },
  Level: {
    name: "Nivel",
    data: [...initialFactorData],
    subject: { ...defaultSubject },
    options: [...defaultOptions],
    isUsed: false,
    position: 9
  },
  Project: {
    name: "Proyecto",
    data: [...initialFactorData],
    subject: { ...defaultSubject },
    options: [...defaultOptions],
    isUsed: false,
    position: 10
  },
  Age: {
    name: "Edad",
    data: [...initialFactorData],
    subject: { ...defaultSubject },
    isUsed: false,
    position: 8
  },
  Location: {
    name: "Ubicación",
    data: [
      { "Frente": locationOptions[3], "Fondo": locationOptions[3] },
      { "Frente": locationOptions[3], "Fondo": locationOptions[3] },
      { "Frente": locationOptions[3], "Fondo": locationOptions[3] }
    ],
    subject: { ...defaultSubject },
    options: [...locationOptions],
    columns: ["Frente", "Fondo"],
    isUsed: true,
    position: 2
  },
  Zone: {
    name: "Zona",
    data: [
      { "Tipo": zoneOptions[3], "Valor": zoneOptions[3] },
      { "Tipo": zoneOptions[3], "Valor": zoneOptions[3] },
      { "Tipo": zoneOptions[3], "Valor": zoneOptions[3] }
    ],
    subject: { ...defaultSubject },
    options: [...zoneOptions],
    columns: ["Tipo", "Valor"],
    isUsed: true,
    position: 7
  },
  loading: false,
  error: null,
  type: "TERRENO"
};

interface FactoresStore extends FactoresState {
  // Acciones para factores comunes
  updateCommonSubject: (payload: UpdateCommonSubjectPayload) => void;
  updateCommonData: (payload: UpdateCommonDataPayload) => void;
  
  // Acciones para factor de edad
  setAgeSubject: (payload: SetAgeSubjectPayload) => void;
  setAgeData: (payload: SetAgeDataPayload) => void;
  
  // Acciones para símbolos/zonas
  updateSymbolsData: (payload: UpdateSymbolsDataPayload) => void;
  updateLocZoneSubject: (payload: UpdateLocZoneSubjectPayload) => void;
  addRowLocZone: (payload: AddRowLocZonePayload) => void;
  removeRowLocZone: (payload: RemoveRowLocZonePayload) => void;
  
  // Acciones para selector
  setEnabledFactors: (payload: SetEnabledFactorsPayload) => void;
  
  // Acciones generales
  setFactorType: (type: "TERRENO" | "RENTA") => void;
  loadFactors: () => Promise<void>;
  updateFactors: () => void;
  resetFactors: () => void;
  
  // Selectores
  getEnabledFactors: () => any[];
  getFactorByName: (name: string) => any;
  getCalculatedResults: () => any;
}

export const useFactoresStore = create<FactoresStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Actualizar sujeto de factor común
      updateCommonSubject: (payload: UpdateCommonSubjectPayload) => {
        set((state) => {
          const factor = state[payload.key as keyof FactoresState] as any;
          if (factor && 'subject' in factor) {
            const newSubject = {
              ...factor.subject,
              value: payload.value.value,
              label: payload.value.label
            };
            
            // Recalcular resultados para todos los datos
            const newData = factor.data.map((item: FactorData) => ({
              ...item,
              result: newSubject.value / item.value
            }));

            return {
              ...state,
              [payload.key]: {
                ...factor,
                subject: newSubject,
                data: newData
              }
            };
          }
          return state;
        });
      },

      // Actualizar datos de factor común
      updateCommonData: (payload: UpdateCommonDataPayload) => {
        set((state) => {
          const factor = state[payload.key as keyof FactoresState] as any;
          if (factor && 'data' in factor) {
            const newData = [...factor.data];
            newData[payload.index] = payload.value;

            return {
              ...state,
              [payload.key]: {
                ...factor,
                data: newData
              }
            };
          }
          return state;
        });
      },

      // Actualizar sujeto de edad
      setAgeSubject: (payload: SetAgeSubjectPayload) => {
        set((state) => {
          const ageFactor = state.Age;
          const newSubject = {
            ...ageFactor.subject,
            value: payload.value
          };

          // Recalcular resultados
          const newData = ageFactor.data.map((item: FactorData) => ({
            ...item,
            result: item.value / newSubject.value
          }));

          return {
            ...state,
            Age: {
              ...ageFactor,
              subject: newSubject,
              data: newData
            }
          };
        });
      },

      // Actualizar datos de edad
      setAgeData: (payload: SetAgeDataPayload) => {
        set((state) => {
          const ageFactor = state.Age;
          const newData = [...ageFactor.data];
          const subject = ageFactor.subject;
          
          newData[payload.index] = {
            ...newData[payload.index],
            value: payload.value,
            result: payload.value / subject.value
          };

          return {
            ...state,
            Age: {
              ...ageFactor,
              data: newData
            }
          };
        });
      },

      // Actualizar datos de símbolos
      updateSymbolsData: (payload: UpdateSymbolsDataPayload) => {
        set((state) => {
          const factor = state[payload.key as keyof FactoresState] as any;
          if (factor && 'data' in factor && Array.isArray(factor.data)) {
            const newData = [...factor.data];
            newData[payload.index] = {
              ...newData[payload.index],
              [payload.column]: payload.value
            };

            return {
              ...state,
              [payload.key]: {
                ...factor,
                data: newData
              }
            };
          }
          return state;
        });
      },

      // Actualizar sujeto de ubicación/zona
      updateLocZoneSubject: (payload: UpdateLocZoneSubjectPayload) => {
        set((state) => {
          const factor = state[payload.key as keyof FactoresState] as any;
          if (factor && 'subject' in factor) {
            return {
              ...state,
              [payload.key]: {
                ...factor,
                subject: payload.value
              }
            };
          }
          return state;
        });
      },

      // Agregar fila a ubicación/zona
      addRowLocZone: (payload: AddRowLocZonePayload) => {
        set((state) => {
          const factor = state[payload.key as keyof FactoresState] as any;
          if (factor && 'data' in factor && 'columns' in factor) {
            const newRow: any = {};
            factor.columns.forEach((column: string) => {
              newRow[column] = factor.options[3] || factor.options[0];
            });

            return {
              ...state,
              [payload.key]: {
                ...factor,
                data: [...factor.data, newRow]
              }
            };
          }
          return state;
        });
      },

      // Remover fila de ubicación/zona
      removeRowLocZone: (payload: RemoveRowLocZonePayload) => {
        set((state) => {
          const factor = state[payload.key as keyof FactoresState] as any;
          if (factor && 'data' in factor && factor.data.length > 1) {
            return {
              ...state,
              [payload.key]: {
                ...factor,
                data: factor.data.slice(0, -1)
              }
            };
          }
          return state;
        });
      },

      // Configurar factores habilitados
      setEnabledFactors: (payload: SetEnabledFactorsPayload) => {
        set((state) => {
          const factor = state[payload.key as keyof FactoresState] as any;
          if (factor) {
            return {
              ...state,
              [payload.key]: {
                ...factor,
                isUsed: payload.isUsed,
                position: payload.position
              }
            };
          }
          return state;
        });
      },

      // Configurar tipo de factor
      setFactorType: (type: "TERRENO" | "RENTA") => {
        set((state) => ({ ...state, type }));
      },

      // Cargar factores (simulado)
      loadFactors: async () => {
        set((state) => ({ ...state, loading: true, error: null }));
        
        try {
          // Simular carga de datos
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set((state) => ({ 
            ...state, 
            loading: false,
            // Aquí se cargarían los datos reales de la API
          }));
        } catch (error) {
          set((state) => ({
            ...state,
            loading: false,
            error: error instanceof Error ? error.message : 'Error loading factors'
          }));
        }
      },

      // Actualizar factores (recalcular)
      updateFactors: () => {
        set((state) => {
          // Lógica para recalcular todos los factores
          return { ...state };
        });
      },

      // Resetear factores
      resetFactors: () => {
        set(initialState);
      },

      // Obtener factores habilitados
      getEnabledFactors: () => {
        const state = get();
        const positions = getFactorPositions(state.type === "TERRENO");
        
        return positions
          .filter(pos => {
            const factor = state[pos.key as keyof FactoresState] as any;
            return factor?.isUsed;
          })
          .sort((a, b) => {
            const factorA = state[a.key as keyof FactoresState] as any;
            const factorB = state[b.key as keyof FactoresState] as any;
            return (factorA?.position || 0) - (factorB?.position || 0);
          });
      },

      // Obtener factor por nombre
      getFactorByName: (name: string) => {
        const state = get();
        return state[name as keyof FactoresState];
      },

      // Obtener resultados calculados
      getCalculatedResults: () => {
        const state = get();
        const enabled = get().getEnabledFactors();
        
        return enabled.reduce((results: any, pos: SelectorPosition) => {
          const factor = state[pos.key as keyof FactoresState] as any;
          if (factor) {
            results[pos.key] = {
              name: factor.name,
              subject: factor.subject,
              data: factor.data,
              isUsed: factor.isUsed,
              position: factor.position
            };
          }
          return results;
        }, {});
      }
    }),
    {
      name: 'factores-store',
    }
  )
);

// Selectores personalizados
export const useFactorSelector = () => useFactoresStore((state) => state);
export const useFactorByName = (name: string) => useFactoresStore((state) => state.getFactorByName(name));
export const useEnabledFactors = () => useFactoresStore((state) => state.getEnabledFactors());
export const useFactorType = () => useFactoresStore((state) => state.type);
export const useFactorLoading = () => useFactoresStore((state) => state.loading);
export const useFactorError = () => useFactoresStore((state) => state.error);
