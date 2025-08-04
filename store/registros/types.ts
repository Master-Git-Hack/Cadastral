/** @format */

// Tipos base para registros especializados
export interface AddressInfo {
  street: string;
  number: string;
  neighborhood: string;
  municipality: string;
  zone: string;
  extras: {
    document: string;
    reference: string;
    file?: File | null;
  };
}

export interface AreaRecord {
  id: number;
  surface: number;
  value: number;
  result: number;
  address: AddressInfo;
  landUse?: string;
  rentPrice?: number;
  date: string;
  constructionType?: string;
  characteristics: string;
  consultation: string;
}

export interface SalesCostData {
  id: number;
  value: number;
  result: number;
}

export interface CommercialData {
  id: number;
  value: number;
  result: number;
}

export interface PercentageData {
  id: number;
  value: number;
  result: number;
}

export interface ZoneData {
  id: number;
  name: string;
  lotValue: number;
  correctionFactor: number;
  description: string;
  adjustedValue: number;
}

// Estado del área
export interface AreaState {
  data: AreaRecord[];
  subject: {
    value: number;
    label: string;
  };
  averageLotArea: number;
  surfaceRoot: number;
  salesCost: SalesCostData[];
  commercial: CommercialData[];
  percentage: PercentageData[];
  percentageTotal: number;
  zone: ZoneData[];
  loading: boolean;
  error: string | null;
}

// Tipos para indiviso
export interface IndivisoSurface {
  terrain: number;
  construction: number;
  total: number;
}

export interface IndivisoBuilding {
  levels: number;
  apartments: number;
  totalApartments: number;
}

export interface IndivisoCalculation {
  surface: IndivisoSurface;
  building: IndivisoBuilding;
  indiviso: number;
  result: number;
}

export interface AdjustedValue {
  terrain: number;
  construction: number;
  unitValue: number;
  surfaceFactor: number;
  result: number;
}

export interface ReFactorData {
  isUsed: boolean;
  factor: number;
  description: string;
}

// Estado del indiviso
export interface IndivisoState {
  calculation: IndivisoCalculation;
  adjustedValue: AdjustedValue;
  reFactor: ReFactorData;
  loading: boolean;
  error: string | null;
}

// Estado completo de registros especializados
export interface RegistrosState {
  area: AreaState;
  indiviso: IndivisoState;
  type: "TERRENO" | "RENTA";
}

// Props para componentes
export interface AreaComponentProps {
  className?: string;
}

export interface IndivisoComponentProps {
  className?: string;
}

export interface CalculationHeaderProps {
  type: boolean;
  tag: string;
  name: string;
  percentage: number;
}

export interface CalculationBodyProps {
  data: AreaRecord[];
  type: boolean;
  salesCost: SalesCostData[];
  root: number;
  surface: number;
  commercial: CommercialData[];
  percentage: PercentageData[];
  averageLotArea: number;
}

export interface CalculationFooterProps {
  type: boolean;
  subject: {
    value: number;
    label: string;
  };
  averageLotArea: number;
  salesCost: SalesCostData[];
}

export interface DocumentationBodyProps {
  type: boolean;
  options: any;
  data: AreaRecord[];
}

export interface ZoneProps {
  className?: string;
}

// Acciones del store
export interface SetAreaDataPayload {
  index: number;
  key: keyof AreaRecord;
  value: any;
}

export interface SetAreaSubjectPayload {
  value: number;
}

export interface SetAreaAddressPayload {
  index: number;
  key: keyof AddressInfo;
  value: string;
}

export interface SetAreaAddressExtraPayload {
  index: number;
  key: keyof AddressInfo['extras'];
  value: string | File | null;
}

export interface SetSalesCostDataPayload {
  index: number;
  key: keyof SalesCostData;
  value: number;
}

export interface SetCommercialDataPayload {
  index: number;
  key: keyof CommercialData;
  value: number;
}

export interface SetPercentageDataPayload {
  index: number;
  key: keyof PercentageData;
  value: number;
}

export interface SetIndivisoPayload {
  key: keyof IndivisoCalculation;
  value: any;
}

export interface SetAdjustedValuePayload {
  key: keyof AdjustedValue;
  value: number;
}

export interface SetReFactorPayload {
  key: keyof ReFactorData;
  value: any;
}

export interface SetZoneDataPayload {
  index: number;
  key: keyof ZoneData;
  value: any;
}

// Tipos de utilidad
export type RegistroType = "area" | "indiviso";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface CalculationResult {
  totalArea: number;
  averagePrice: number;
  adjustedValue: number;
  finalResult: number;
}
