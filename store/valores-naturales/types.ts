/** @format */

// Interfaces para el sistema de valores naturales
export interface NaturalValueRecord {
  id: number;
  comparable: string;
  naturalValue: number;
  homologatedValue: number;
  result: number;
  deviation: number;
  isOutlier: boolean;
}

export interface NaturalValueStats {
  natural: {
    min: number;
    max: number;
    average: number;
    ratio: number; // max/min
  };
  homologated: {
    min: number;
    max: number;
    average: number;
    ratio: number; // max/min
    standardDeviation: number;
    coefficientOfVariation: number; // (std/mean) * 100
  };
  results: {
    average: number;
    withinRange: number; // cantidad dentro del ±30%
    outliers: number; // cantidad fuera del ±30%
  };
}

export interface NaturalValueAnalysis {
  records: NaturalValueRecord[];
  stats: NaturalValueStats;
  recommendations: string[];
  quality: "excellent" | "good" | "acceptable" | "poor";
  qualityScore: number; // 0-100
}

export interface NaturalValueState {
  analysis: NaturalValueAnalysis | null;
  loading: boolean;
  error: string | null;
  showDetails: boolean;
  selectedRecord: number | null;
  
  // Configuración de análisis
  config: {
    outlierThreshold: number; // default: 30% (±30%)
    minAcceptableRecords: number; // default: 3
    maxCoefficientOfVariation: number; // default: 15%
  };
}

// Payloads para acciones
export interface CalculateNaturalValuesPayload {
  salesCostData: Array<{
    unitaryCost: number;
    homologatedValue: number;
  }>;
  config?: Partial<NaturalValueState['config']>;
}

export interface UpdateConfigPayload {
  config: Partial<NaturalValueState['config']>;
}

// Tipos de utilidad
export type QualityLevel = "excellent" | "good" | "acceptable" | "poor";

export interface QualityMetrics {
  coefficientOfVariation: number;
  outlierPercentage: number;
  sampleSize: number;
  ratioConsistency: number;
}
