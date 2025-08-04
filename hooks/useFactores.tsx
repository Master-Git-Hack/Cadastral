/** @format */

"use client";

import React, { useCallback, useMemo } from "react";
import { 
  useFactoresStore,
  useFactorByName,
  useEnabledFactors,
  useFactorType,
  useFactorLoading,
  useFactorError
} from "@/store/factores";
import type { FactorOption, FactorData } from "@/store/factores/types";

// Hook principal para manejar factores
export const useFactores = () => {
  const store = useFactoresStore();
  
  const actions = React.useMemo(() => ({
    updateCommonSubject: store.updateCommonSubject,
    updateCommonData: store.updateCommonData,
    setAgeSubject: store.setAgeSubject,
    setAgeData: store.setAgeData,
    updateSymbolsData: store.updateSymbolsData,
    updateLocZoneSubject: store.updateLocZoneSubject,
    addRowLocZone: store.addRowLocZone,
    removeRowLocZone: store.removeRowLocZone,
    setEnabledFactors: store.setEnabledFactors,
    setFactorType: store.setFactorType,
    loadFactors: store.loadFactors,
    updateFactors: store.updateFactors,
    resetFactors: store.resetFactors,
  }), [store]);

  const selectors = useMemo(() => ({
    getEnabledFactors: store.getEnabledFactors,
    getFactorByName: store.getFactorByName,
    getCalculatedResults: store.getCalculatedResults,
  }), [store]);

  return {
    factors: store,
    actions,
    selectors,
    loading: store.loading,
    error: store.error,
    type: store.type
  };
};

// Hook para manejar un factor específico
export const useFactor = (name: string) => {
  const factor = useFactorByName(name);
  const { actions } = useFactores();
  
  const updateSubject = useCallback((option: FactorOption) => {
    if (name === 'Age') {
      actions.setAgeSubject({ value: option.value });
    } else if (['Location', 'Zone'].includes(name)) {
      actions.updateLocZoneSubject({ key: name, value: option });
    } else {
      actions.updateCommonSubject({ key: name, value: option });
    }
  }, [name, actions]);

  const updateData = useCallback((index: number, value: any) => {
    if (name === 'Age') {
      actions.setAgeData({ index, value: typeof value === 'number' ? value : value.value });
    } else if (['Location', 'Zone'].includes(name)) {
      // Para símbolos, necesitamos columna
      if (typeof value === 'object' && value.column && value.option) {
        actions.updateSymbolsData({
          index,
          key: name,
          column: value.column,
          value: value.option
        });
      }
    } else {
      actions.updateCommonData({ index, key: name, value });
    }
  }, [name, actions]);

  return {
    factor,
    updateSubject,
    updateData,
    isEnabled: factor?.isUsed || false,
    position: factor?.position || 0
  };
};

// Hook para calcular resultados de factores
export const useFactorCalculations = () => {
  const enabledFactors = useEnabledFactors();
  const { selectors } = useFactores();

  const calculations = useMemo(() => {
    const results = selectors.getCalculatedResults();
    
    // Calcular factor total multiplicando todos los factores habilitados
    const totalFactor = enabledFactors.reduce((total, factorPos) => {
      const factor = results[factorPos.key];
      if (factor && factor.data) {
        // Para factores comunes, usar el promedio de resultados
        if (Array.isArray(factor.data) && factor.data[0]?.result !== undefined) {
          const averageResult = factor.data.reduce((sum: number, item: FactorData) => sum + item.result, 0) / factor.data.length;
          return total * averageResult;
        }
        // Para factor de edad
        if (factor.subject && typeof factor.subject.value === 'number') {
          const averageResult = factor.data.reduce((sum: number, item: FactorData) => sum + item.result, 0) / factor.data.length;
          return total * averageResult;
        }
      }
      return total;
    }, 1);

    return {
      enabledFactors,
      results,
      totalFactor,
      factorCount: enabledFactors.length
    };
  }, [enabledFactors, selectors]);

  return calculations;
};

// Hook para gestión de filas en factores de símbolos
export const useSymbolRows = (factorName: 'Location' | 'Zone') => {
  const factor = useFactorByName(factorName);
  const { actions } = useFactores();

  const addRow = useCallback(() => {
    actions.addRowLocZone({ key: factorName });
  }, [factorName, actions]);

  const removeRow = useCallback(() => {
    actions.removeRowLocZone({ key: factorName });
  }, [factorName, actions]);

  const canRemove = factor?.data?.length > 1;

  return {
    rows: factor?.data || [],
    addRow,
    removeRow,
    canRemove,
    columns: factor?.columns || []
  };
};

// Hook para selector de factores
export const useFactorSelector = () => {
  const type = useFactorType();
  const enabledFactors = useEnabledFactors();
  const { actions } = useFactores();

  const toggleFactor = useCallback((key: string, isUsed: boolean, position: number) => {
    actions.setEnabledFactors({ key, isUsed, position });
  }, [actions]);

  const availableFactors = useMemo(() => {
    // Definir qué factores están disponibles según el tipo
    const allFactors = [
      'Classification', 'TypeForm', 'Location', 'Usage', 
      'Topography', 'Building', 'Quality', 'Zone', 'Age', 
      'Level', 'Project'
    ];

    return allFactors.filter(factorKey => {
      if (type === 'TERRENO') {
        return !['Age', 'Level', 'Project'].includes(factorKey);
      } else {
        return !['Quality', 'Zone'].includes(factorKey);
      }
    });
  }, [type]);

  return {
    type,
    enabledFactors,
    availableFactors,
    toggleFactor
  };
};

// Hook para estado de carga y errores
export const useFactorStatus = () => {
  const loading = useFactorLoading();
  const error = useFactorError();
  const { actions } = useFactores();

  const retry = useCallback(() => {
    actions.loadFactors();
  }, [actions]);

  return {
    loading,
    error,
    retry,
    isReady: !loading && !error
  };
};

// Hook para integración con v3
export const useFactoresIntegration = () => {
  const { factors, actions } = useFactores();
  const calculations = useFactorCalculations();

  // Método para exportar datos en formato compatible con v1
  const exportToV1Format = useCallback(() => {
    return {
      factors: calculations.results,
      record: {
        type: factors.type,
        status: "exists"
      },
      handlers: {
        // Agregar handlers si son necesarios para compatibilidad
      }
    };
  }, [calculations, factors]);

  // Método para importar datos desde v1
  const importFromV1 = useCallback((v1Data: any) => {
    if (v1Data.record?.type) {
      actions.setFactorType(v1Data.record.type);
    }
    
    // Importar factores individuales si existen
    Object.keys(v1Data.factors || {}).forEach(key => {
      const factorData = v1Data.factors[key];
      if (factorData) {
        // Lógica para importar cada factor según su tipo
        // Esto dependería de la estructura exacta de v1
      }
    });
  }, [actions]);

  return {
    exportToV1Format,
    importFromV1,
    isReady: calculations.factorCount > 0
  };
};
