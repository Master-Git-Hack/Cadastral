/** @format */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  RegistrosState,
  AreaRecord,
  SalesCostData,
  CommercialData,
  PercentageData,
  ZoneData,
  SetAreaDataPayload,
  SetAreaSubjectPayload,
  SetAreaAddressPayload,
  SetAreaAddressExtraPayload,
  SetSalesCostDataPayload,
  SetCommercialDataPayload,
  SetPercentageDataPayload,
  SetZoneDataPayload,
  SetIndivisoPayload,
  SetAdjustedValuePayload,
  SetReFactorPayload,
  ValidationResult,
  CalculationResult
} from './types';

// Datos iniciales para área
const initialAreaData: AreaRecord[] = [
  {
    id: 1,
    surface: 0,
    value: 0,
    result: 0,
    address: {
      street: "",
      number: "",
      neighborhood: "",
      municipality: "",
      zone: "",
      extras: {
        document: "",
        reference: "",
        file: null
      }
    },
    date: "",
    characteristics: "",
    consultation: ""
  },
  {
    id: 2,
    surface: 0,
    value: 0,
    result: 0,
    address: {
      street: "",
      number: "",
      neighborhood: "",
      municipality: "",
      zone: "",
      extras: {
        document: "",
        reference: "",
        file: null
      }
    },
    date: "",
    characteristics: "",
    consultation: ""
  },
  {
    id: 3,
    surface: 0,
    value: 0,
    result: 0,
    address: {
      street: "",
      number: "",
      neighborhood: "",
      municipality: "",
      zone: "",
      extras: {
        document: "",
        reference: "",
        file: null
      }
    },
    date: "",
    characteristics: "",
    consultation: ""
  }
];

const initialSalesCostData: SalesCostData[] = [
  { id: 1, value: 0, result: 0 },
  { id: 2, value: 0, result: 0 },
  { id: 3, value: 0, result: 0 }
];

const initialCommercialData: CommercialData[] = [
  { id: 1, value: 1, result: 1 },
  { id: 2, value: 1, result: 1 },
  { id: 3, value: 1, result: 1 }
];

const initialPercentageData: PercentageData[] = [
  { id: 1, value: 33.33, result: 33.33 },
  { id: 2, value: 33.33, result: 33.33 },
  { id: 3, value: 33.34, result: 33.34 }
];

const initialZoneData: ZoneData[] = [
  { 
    id: 1, 
    name: "Zona A", 
    lotValue: 0, 
    correctionFactor: 1.0, 
    description: "", 
    adjustedValue: 0 
  }
];

const initialState: RegistrosState = {
  area: {
    data: [...initialAreaData],
    subject: {
      value: 0,
      label: "Sujeto"
    },
    averageLotArea: 0,
    surfaceRoot: 0,
    salesCost: [...initialSalesCostData],
    commercial: [...initialCommercialData],
    percentage: [...initialPercentageData],
    percentageTotal: 100,
    zone: [...initialZoneData],
    loading: false,
    error: null
  },
  indiviso: {
    calculation: {
      surface: {
        terrain: 0,
        construction: 0,
        total: 0
      },
      building: {
        levels: 1,
        apartments: 1,
        totalApartments: 1
      },
      indiviso: 0,
      result: 0
    },
    adjustedValue: {
      terrain: 0,
      construction: 0,
      unitValue: 0,
      surfaceFactor: 1,
      result: 0
    },
    reFactor: {
      isUsed: false,
      factor: 1,
      description: ""
    },
    loading: false,
    error: null
  },
  type: "TERRENO"
};

interface RegistrosStore extends RegistrosState {
  // Acciones para área
  setAreaData: (payload: SetAreaDataPayload) => void;
  setAreaSubject: (payload: SetAreaSubjectPayload) => void;
  setAreaAddress: (payload: SetAreaAddressPayload) => void;
  setAreaAddressExtra: (payload: SetAreaAddressExtraPayload) => void;
  setAreaAddressExtraFile: (index: number, file: File | null) => void;
  setAreaAverageLotArea: (value: number) => void;
  setSurfaceRoot: (value: number) => void;
  
  // Acciones para costos de venta
  setSalesCostData: (payload: SetSalesCostDataPayload) => void;
  
  // Acciones para datos comerciales
  setCommercialData: (payload: SetCommercialDataPayload) => void;
  
  // Acciones para porcentajes
  setPercentageData: (payload: SetPercentageDataPayload) => void;
  setPercentageTotal: (total: number) => void;
  
  // Acciones para zona
  setZoneData: (payload: SetZoneDataPayload) => void;
  addZoneRecord: () => void;
  removeZoneRecord: (index: number) => void;
  
  // Acciones para indiviso
  setIndiviso: (payload: SetIndivisoPayload) => void;
  setAdjustedValue: (payload: SetAdjustedValuePayload) => void;
  setReFactor: (payload: SetReFactorPayload) => void;
  
  // Acciones generales
  setRegistroType: (type: "TERRENO" | "RENTA") => void;
  addAreaRow: () => void;
  removeAreaRow: () => void;
  resetArea: () => void;
  resetIndiviso: () => void;
  resetAll: () => void;
  
  // Cálculos y validaciones
  calculateAreaResults: () => void;
  calculateIndivisoResults: () => void;
  validateArea: () => ValidationResult;
  validateIndiviso: () => ValidationResult;
  getAreaCalculation: () => CalculationResult;
  getIndivisoCalculation: () => CalculationResult;
}

export const useRegistrosStore = create<RegistrosStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Actualizar datos de área
      setAreaData: (payload: SetAreaDataPayload) => {
        set((state) => {
          const newData = [...state.area.data];
          newData[payload.index] = {
            ...newData[payload.index],
            [payload.key]: payload.value
          };

          // Recalcular resultado si es necesario
          if (payload.key === 'surface' || payload.key === 'value') {
            const item = newData[payload.index];
            if (item.surface > 0 && item.value > 0) {
              item.result = item.value / item.surface;
            }
          }

          return {
            ...state,
            area: {
              ...state.area,
              data: newData
            }
          };
        });
        get().calculateAreaResults();
      },

      // Actualizar sujeto de área
      setAreaSubject: (payload: SetAreaSubjectPayload) => {
        set((state) => ({
          ...state,
          area: {
            ...state.area,
            subject: {
              ...state.area.subject,
              value: payload.value
            }
          }
        }));
        get().calculateAreaResults();
      },

      // Actualizar dirección de área
      setAreaAddress: (payload: SetAreaAddressPayload) => {
        set((state) => {
          const newData = [...state.area.data];
          newData[payload.index] = {
            ...newData[payload.index],
            address: {
              ...newData[payload.index].address,
              [payload.key]: payload.value
            }
          };

          return {
            ...state,
            area: {
              ...state.area,
              data: newData
            }
          };
        });
      },

      // Actualizar extras de dirección
      setAreaAddressExtra: (payload: SetAreaAddressExtraPayload) => {
        set((state) => {
          const newData = [...state.area.data];
          newData[payload.index] = {
            ...newData[payload.index],
            address: {
              ...newData[payload.index].address,
              extras: {
                ...newData[payload.index].address.extras,
                [payload.key]: payload.value
              }
            }
          };

          return {
            ...state,
            area: {
              ...state.area,
              data: newData
            }
          };
        });
      },

      // Actualizar archivo de dirección
      setAreaAddressExtraFile: (index: number, file: File | null) => {
        set((state) => {
          const newData = [...state.area.data];
          newData[index] = {
            ...newData[index],
            address: {
              ...newData[index].address,
              extras: {
                ...newData[index].address.extras,
                file
              }
            }
          };

          return {
            ...state,
            area: {
              ...state.area,
              data: newData
            }
          };
        });
      },

      // Actualizar área promedio del lote
      setAreaAverageLotArea: (value: number) => {
        set((state) => ({
          ...state,
          area: {
            ...state.area,
            averageLotArea: value
          }
        }));
        get().calculateAreaResults();
      },

      // Actualizar raíz de superficie
      setSurfaceRoot: (value: number) => {
        set((state) => ({
          ...state,
          area: {
            ...state.area,
            surfaceRoot: value
          }
        }));
        get().calculateAreaResults();
      },

      // Actualizar datos de costo de venta
      setSalesCostData: (payload: SetSalesCostDataPayload) => {
        set((state) => {
          const newSalesCost = [...state.area.salesCost];
          newSalesCost[payload.index] = {
            ...newSalesCost[payload.index],
            [payload.key]: payload.value
          };

          return {
            ...state,
            area: {
              ...state.area,
              salesCost: newSalesCost
            }
          };
        });
        get().calculateAreaResults();
      },

      // Actualizar datos comerciales
      setCommercialData: (payload: SetCommercialDataPayload) => {
        set((state) => {
          const newCommercial = [...state.area.commercial];
          newCommercial[payload.index] = {
            ...newCommercial[payload.index],
            [payload.key]: payload.value
          };

          return {
            ...state,
            area: {
              ...state.area,
              commercial: newCommercial
            }
          };
        });
        get().calculateAreaResults();
      },

      // Actualizar datos de porcentaje
      setPercentageData: (payload: SetPercentageDataPayload) => {
        set((state) => {
          const newPercentage = [...state.area.percentage];
          newPercentage[payload.index] = {
            ...newPercentage[payload.index],
            [payload.key]: payload.value
          };

          return {
            ...state,
            area: {
              ...state.area,
              percentage: newPercentage
            }
          };
        });
        get().calculateAreaResults();
      },

      // Actualizar total de porcentaje
      setPercentageTotal: (total: number) => {
        set((state) => ({
          ...state,
          area: {
            ...state.area,
            percentageTotal: total
          }
        }));
      },

      // Actualizar datos de zona
      setZoneData: (payload: SetZoneDataPayload) => {
        set((state) => {
          const newZone = [...state.area.zone];
          newZone[payload.index] = {
            ...newZone[payload.index],
            [payload.key]: payload.value
          };

          // Calcular valor ajustado automáticamente
          if (payload.key === 'lotValue' || payload.key === 'correctionFactor') {
            newZone[payload.index].adjustedValue = 
              newZone[payload.index].lotValue * newZone[payload.index].correctionFactor;
          }

          return {
            ...state,
            area: {
              ...state.area,
              zone: newZone
            }
          };
        });
      },

      // Agregar nuevo registro de zona
      addZoneRecord: () => {
        set((state) => {
          const newId = Math.max(...state.area.zone.map(z => z.id), 0) + 1;
          const newZone: ZoneData = {
            id: newId,
            name: `Zona ${String.fromCharCode(64 + newId)}`,
            lotValue: 0,
            correctionFactor: 1.0,
            description: "",
            adjustedValue: 0
          };

          return {
            ...state,
            area: {
              ...state.area,
              zone: [...state.area.zone, newZone]
            }
          };
        });
      },

      // Remover registro de zona
      removeZoneRecord: (index: number) => {
        set((state) => {
          const newZone = state.area.zone.filter((_, i) => i !== index);
          
          return {
            ...state,
            area: {
              ...state.area,
              zone: newZone
            }
          };
        });
      },

      // Actualizar indiviso
      setIndiviso: (payload: SetIndivisoPayload) => {
        set((state) => ({
          ...state,
          indiviso: {
            ...state.indiviso,
            calculation: {
              ...state.indiviso.calculation,
              [payload.key]: payload.value
            }
          }
        }));
        get().calculateIndivisoResults();
      },

      // Actualizar valor ajustado
      setAdjustedValue: (payload: SetAdjustedValuePayload) => {
        set((state) => ({
          ...state,
          indiviso: {
            ...state.indiviso,
            adjustedValue: {
              ...state.indiviso.adjustedValue,
              [payload.key]: payload.value
            }
          }
        }));
        get().calculateIndivisoResults();
      },

      // Actualizar refactor
      setReFactor: (payload: SetReFactorPayload) => {
        set((state) => ({
          ...state,
          indiviso: {
            ...state.indiviso,
            reFactor: {
              ...state.indiviso.reFactor,
              [payload.key]: payload.value
            }
          }
        }));
        get().calculateIndivisoResults();
      },

      // Configurar tipo de registro
      setRegistroType: (type: "TERRENO" | "RENTA") => {
        set((state) => ({ ...state, type }));
      },

      // Agregar fila de área
      addAreaRow: () => {
        set((state) => {
          const newId = Math.max(...state.area.data.map(item => item.id)) + 1;
          const newRow: AreaRecord = {
            id: newId,
            surface: 0,
            value: 0,
            result: 0,
            address: {
              street: "",
              number: "",
              neighborhood: "",
              municipality: "",
              zone: "",
              extras: {
                document: "",
                reference: "",
                file: null
              }
            },
            date: "",
            characteristics: "",
            consultation: ""
          };

          return {
            ...state,
            area: {
              ...state.area,
              data: [...state.area.data, newRow],
              salesCost: [...state.area.salesCost, { id: newId, value: 0, result: 0 }],
              commercial: [...state.area.commercial, { id: newId, value: 1, result: 1 }],
              percentage: [...state.area.percentage, { id: newId, value: 0, result: 0 }]
            }
          };
        });
      },

      // Remover fila de área
      removeAreaRow: () => {
        set((state) => {
          if (state.area.data.length <= 1) return state;

          return {
            ...state,
            area: {
              ...state.area,
              data: state.area.data.slice(0, -1),
              salesCost: state.area.salesCost.slice(0, -1),
              commercial: state.area.commercial.slice(0, -1),
              percentage: state.area.percentage.slice(0, -1)
            }
          };
        });
      },

      // Resetear área
      resetArea: () => {
        set((state) => ({
          ...state,
          area: initialState.area
        }));
      },

      // Resetear indiviso
      resetIndiviso: () => {
        set((state) => ({
          ...state,
          indiviso: initialState.indiviso
        }));
      },

      // Resetear todo
      resetAll: () => {
        set(initialState);
      },

      // Calcular resultados de área
      calculateAreaResults: () => {
        set((state) => {
          // Calcular área promedio del lote
          const validSurfaces = state.area.data.filter(item => item.surface > 0);
          const averageLotArea = validSurfaces.length > 0 
            ? validSurfaces.reduce((sum, item) => sum + item.surface, 0) / validSurfaces.length
            : 0;

          // Recalcular porcentajes
          const totalPercentage = state.area.percentage.reduce((sum, item) => sum + item.value, 0);

          return {
            ...state,
            area: {
              ...state.area,
              averageLotArea,
              percentageTotal: totalPercentage
            }
          };
        });
      },

      // Calcular resultados de indiviso
      calculateIndivisoResults: () => {
        set((state) => {
          const { surface, building } = state.indiviso.calculation;
          const { unitValue, surfaceFactor } = state.indiviso.adjustedValue;

          // Calcular superficie total
          const totalSurface = surface.terrain + surface.construction;

          // Calcular total de apartamentos
          const totalApartments = building.levels * building.apartments;

          // Calcular indiviso
          const indiviso = totalSurface / totalApartments;

          // Calcular resultado final
          const result = unitValue * surfaceFactor * indiviso;

          return {
            ...state,
            indiviso: {
              ...state.indiviso,
              calculation: {
                ...state.indiviso.calculation,
                surface: {
                  ...surface,
                  total: totalSurface
                },
                building: {
                  ...building,
                  totalApartments
                },
                indiviso,
                result
              },
              adjustedValue: {
                ...state.indiviso.adjustedValue,
                result: unitValue * surfaceFactor
              }
            }
          };
        });
      },

      // Validar área
      validateArea: (): ValidationResult => {
        const state = get();
        const errors: string[] = [];

        // Validar que hay al menos un registro con datos
        const validRecords = state.area.data.filter(item => item.surface > 0 && item.value > 0);
        if (validRecords.length === 0) {
          errors.push("Debe tener al menos un registro con superficie y valor");
        }

        // Validar porcentajes
        if (Math.abs(state.area.percentageTotal - 100) > 0.01) {
          errors.push("Los porcentajes deben sumar 100%");
        }

        return {
          isValid: errors.length === 0,
          errors
        };
      },

      // Validar indiviso
      validateIndiviso: (): ValidationResult => {
        const state = get();
        const errors: string[] = [];

        const { surface, building } = state.indiviso.calculation;
        const { unitValue } = state.indiviso.adjustedValue;

        if (surface.terrain <= 0) {
          errors.push("La superficie del terreno debe ser mayor a 0");
        }

        if (surface.construction <= 0) {
          errors.push("La superficie de construcción debe ser mayor a 0");
        }

        if (building.levels <= 0) {
          errors.push("El número de niveles debe ser mayor a 0");
        }

        if (building.apartments <= 0) {
          errors.push("El número de apartamentos por nivel debe ser mayor a 0");
        }

        if (unitValue <= 0) {
          errors.push("El valor unitario debe ser mayor a 0");
        }

        return {
          isValid: errors.length === 0,
          errors
        };
      },

      // Obtener cálculo de área
      getAreaCalculation: (): CalculationResult => {
        const state = get();
        const validRecords = state.area.data.filter(item => item.surface > 0 && item.value > 0);
        
        const totalArea = validRecords.reduce((sum, item) => sum + item.surface, 0);
        const averagePrice = validRecords.length > 0 
          ? validRecords.reduce((sum, item) => sum + item.result, 0) / validRecords.length
          : 0;

        return {
          totalArea,
          averagePrice,
          adjustedValue: state.area.subject.value,
          finalResult: averagePrice * state.area.averageLotArea
        };
      },

      // Obtener cálculo de indiviso
      getIndivisoCalculation: (): CalculationResult => {
        const state = get();
        const { calculation, adjustedValue, reFactor } = state.indiviso;
        
        let finalResult = calculation.result;
        if (reFactor.isUsed) {
          finalResult *= reFactor.factor;
        }

        return {
          totalArea: calculation.surface.total,
          averagePrice: adjustedValue.result,
          adjustedValue: adjustedValue.unitValue,
          finalResult
        };
      }
    }),
    {
      name: 'registros-store',
    }
  )
);

// Selectores personalizados
export const useAreaSelector = () => useRegistrosStore((state) => state.area);
export const useIndivisoSelector = () => useRegistrosStore((state) => state.indiviso);
export const useRegistroType = () => useRegistrosStore((state) => state.type);
export const useAreaData = () => useRegistrosStore((state) => state.area.data);
export const useAreaSubject = () => useRegistrosStore((state) => state.area.subject);
export const useIndivisoCalculation = () => useRegistrosStore((state) => state.indiviso.calculation);
