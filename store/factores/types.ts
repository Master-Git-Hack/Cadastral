/** @format */

// Tipos base para factores
export interface FactorOption {
  id: number;
  label: string;
  value: number;
}

export interface FactorData {
  id: number;
  label: string;
  value: number;
  result: number;
}

export interface FactorSubject {
  label: string;
  value: number;
}

// Tipos para factores comunes
export interface CommonFactor {
  name: string;
  data: FactorData[];
  subject: FactorSubject;
  options: FactorOption[];
  isUsed: boolean;
  position: number;
}

// Tipos para factor de edad
export interface AgeFactor {
  name: string;
  data: FactorData[];
  subject: FactorSubject;
  isUsed: boolean;
  position: number;
}

// Tipos para símbolos/zonas
export interface SymbolColumn {
  [key: string]: FactorOption;
}

export interface SymbolFactor {
  name: string;
  data: SymbolColumn[];
  subject: FactorSubject;
  options: FactorOption[];
  columns: string[];
  isUsed: boolean;
  position: number;
}

// Estado completo de factores
export interface FactoresState {
  // Factores comunes
  Classification: CommonFactor;
  TypeForm: CommonFactor;
  Usage: CommonFactor;
  Topography: CommonFactor;
  Building: CommonFactor;
  Quality: CommonFactor;
  Level: CommonFactor;
  Project: CommonFactor;
  
  // Factor de edad
  Age: AgeFactor;
  
  // Factores de símbolos/zonas
  Location: SymbolFactor;
  Zone: SymbolFactor;
  
  // Control global
  loading: boolean;
  error: string | null;
  type: "TERRENO" | "RENTA";
}

// Props para componentes
export interface FactorComponentProps {
  name: keyof Omit<FactoresState, 'loading' | 'error' | 'type'>;
}

export interface AgeContainerProps {
  type: "TERRENO" | "RENTA";
}

export interface CompilationProps {
  type: "TERRENO" | "RENTA";
}

export interface SelectorPosition {
  key: string;
  name: string;
  enabled: boolean;
}

// Acciones del store
export interface UpdateCommonSubjectPayload {
  key: string;
  value: FactorOption;
}

export interface UpdateCommonDataPayload {
  index: number;
  key: string;
  value: FactorData;
}

export interface SetAgeSubjectPayload {
  value: number;
}

export interface SetAgeDataPayload {
  index: number;
  value: number;
}

export interface SetEnabledFactorsPayload {
  key: string;
  isUsed: boolean;
  position: number;
}

export interface UpdateSymbolsDataPayload {
  index: number;
  key: string;
  column: string;
  value: FactorOption;
}

export interface UpdateLocZoneSubjectPayload {
  key: string;
  value: FactorOption;
}

export interface AddRowLocZonePayload {
  key: string;
}

export interface RemoveRowLocZonePayload {
  key: string;
}

// Tipos de utilidad
export type FactorType = "common" | "age" | "symbol";

export interface FactorHandler {
  options: FactorOption[];
  defaultValue?: any;
}

export interface FactorsHandlers {
  [key: string]: FactorHandler;
}
