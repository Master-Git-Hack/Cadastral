/** @format */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {
  NaturalValueState,
  NaturalValueAnalysis,
  NaturalValueRecord,
  NaturalValueStats,
  CalculateNaturalValuesPayload,
  UpdateConfigPayload,
  QualityLevel
} from './types';

// Estado inicial
const initialState: NaturalValueState = {
  analysis: null,
  loading: false,
  error: null,
  showDetails: false,
  selectedRecord: null,
  config: {
    outlierThreshold: 30, // ±30%
    minAcceptableRecords: 3,
    maxCoefficientOfVariation: 15 // 15%
  }
};

// Utilidades para cálculos estadísticos
const calculateStats = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const mean = sum / values.length;
  
  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
  const standardDeviation = Math.sqrt(variance);
  
  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    average: mean,
    standardDeviation,
    coefficientOfVariation: (standardDeviation / mean) * 100
  };
};

const determineQuality = (stats: NaturalValueStats, config: NaturalValueState['config']): { quality: QualityLevel; score: number } => {
  let score = 100;
  
  // Penalizar por coeficiente de variación alto
  if (stats.homologated.coefficientOfVariation > config.maxCoefficientOfVariation) {
    score -= (stats.homologated.coefficientOfVariation - config.maxCoefficientOfVariation) * 2;
  }
  
  // Penalizar por outliers
  const outlierPercentage = (stats.results.outliers / (stats.results.outliers + stats.results.withinRange)) * 100;
  if (outlierPercentage > 20) {
    score -= (outlierPercentage - 20) * 1.5;
  }
  
  // Penalizar por muestra pequeña
  const totalRecords = stats.results.outliers + stats.results.withinRange;
  if (totalRecords < config.minAcceptableRecords) {
    score -= (config.minAcceptableRecords - totalRecords) * 10;
  }
  
  score = Math.max(0, Math.min(100, score));
  
  if (score >= 90) return { quality: "excellent", score };
  if (score >= 75) return { quality: "good", score };
  if (score >= 60) return { quality: "acceptable", score };
  return { quality: "poor", score };
};

const generateRecommendations = (stats: NaturalValueStats, config: NaturalValueState['config']): string[] => {
  const recommendations: string[] = [];
  
  if (stats.homologated.coefficientOfVariation > config.maxCoefficientOfVariation) {
    recommendations.push(`El coeficiente de variación (${stats.homologated.coefficientOfVariation.toFixed(1)}%) es alto. Considere revisar los factores de homologación.`);
  }
  
  const outlierPercentage = (stats.results.outliers / (stats.results.outliers + stats.results.withinRange)) * 100;
  if (outlierPercentage > 20) {
    recommendations.push(`${outlierPercentage.toFixed(0)}% de los comparativos están fuera del rango aceptable (±${config.outlierThreshold}%). Revise los datos atípicos.`);
  }
  
  const totalRecords = stats.results.outliers + stats.results.withinRange;
  if (totalRecords < config.minAcceptableRecords) {
    recommendations.push(`Se recomienda tener al menos ${config.minAcceptableRecords} comparativos válidos. Actualmente tiene ${totalRecords}.`);
  }
  
  if (stats.natural.ratio > 3) {
    recommendations.push(`La relación entre el mayor y menor valor natural (${stats.natural.ratio.toFixed(2)}) es muy alta. Considere homogeneizar la muestra.`);
  }
  
  if (recommendations.length === 0) {
    recommendations.push("La muestra de comparativos presenta una buena consistencia estadística.");
  }
  
  return recommendations;
};

// Acciones del store
interface NaturalValueActions {
  // Cálculo de valores naturales
  calculateNaturalValues: (payload: CalculateNaturalValuesPayload) => void;
  
  // Configuración
  updateConfig: (payload: UpdateConfigPayload) => void;
  resetConfig: () => void;
  
  // UI Actions
  setShowDetails: (show: boolean) => void;
  setSelectedRecord: (id: number | null) => void;
  
  // Utilidades
  clearAnalysis: () => void;
  recalculate: () => void;
}

export const useValoresNaturalesStore = create<NaturalValueState & NaturalValueActions>()(
  devtools((set, get) => ({
    ...initialState,

    calculateNaturalValues: (payload: CalculateNaturalValuesPayload) => {
      set({ loading: true, error: null });

      try {
        const { salesCostData, config: configOverride } = payload;
        const currentConfig = { ...get().config, ...configOverride };

        if (!salesCostData || salesCostData.length === 0) {
          throw new Error("No hay datos de costos de venta para analizar");
        }

        // Procesar registros
        const records: NaturalValueRecord[] = salesCostData.map((item, index) => {
          const naturalValue = Number(item.unitaryCost.toFixed(2));
          const homologatedValue = Number(item.homologatedValue.toFixed(2));
          const result = Number((homologatedValue / naturalValue).toFixed(4));
          
          // Calcular desviación del resultado esperado (1.0)
          const deviation = Math.abs(result - 1.0) * 100;
          const isOutlier = deviation > currentConfig.outlierThreshold;

          return {
            id: index + 1,
            comparable: `C${index + 1}`,
            naturalValue,
            homologatedValue,
            result,
            deviation,
            isOutlier
          };
        });

        // Calcular estadísticas
        const naturalValues = records.map(r => r.naturalValue);
        const homologatedValues = records.map(r => r.homologatedValue);
        const results = records.map(r => r.result);

        const naturalStats = calculateStats(naturalValues);
        const homologatedStats = calculateStats(homologatedValues);
        
        const stats: NaturalValueStats = {
          natural: {
            ...naturalStats,
            ratio: naturalStats.max / naturalStats.min
          },
          homologated: {
            ...homologatedStats,
            ratio: homologatedStats.max / homologatedStats.min
          },
          results: {
            average: calculateStats(results).average,
            withinRange: records.filter(r => !r.isOutlier).length,
            outliers: records.filter(r => r.isOutlier).length
          }
        };

        // Determinar calidad y recomendaciones
        const { quality, score } = determineQuality(stats, currentConfig);
        const recommendations = generateRecommendations(stats, currentConfig);

        const analysis: NaturalValueAnalysis = {
          records,
          stats,
          recommendations,
          quality,
          qualityScore: score
        };

        set({ 
          analysis, 
          loading: false, 
          config: currentConfig 
        });

      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : "Error al calcular valores naturales",
          loading: false 
        });
      }
    },

    updateConfig: (payload: UpdateConfigPayload) => {
      const newConfig = { ...get().config, ...payload.config };
      set({ config: newConfig });
      
      // Recalcular si hay análisis previo
      const { analysis } = get();
      if (analysis) {
        get().recalculate();
      }
    },

    resetConfig: () => {
      set({ config: initialState.config });
      get().recalculate();
    },

    setShowDetails: (show: boolean) => {
      set({ showDetails: show });
    },

    setSelectedRecord: (id: number | null) => {
      set({ selectedRecord: id });
    },

    clearAnalysis: () => {
      set({ 
        analysis: null, 
        selectedRecord: null, 
        showDetails: false,
        error: null 
      });
    },

    recalculate: () => {
      const { analysis } = get();
      if (analysis) {
        const salesCostData = analysis.records.map(record => ({
          unitaryCost: record.naturalValue,
          homologatedValue: record.homologatedValue
        }));
        get().calculateNaturalValues({ salesCostData });
      }
    }
  }), {
    name: 'valores-naturales-store'
  })
);
