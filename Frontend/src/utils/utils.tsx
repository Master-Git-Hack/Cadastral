import { FactorState } from "../types/homologation/factors/factor";
export const toFancyNumber: Function = (
  value: number,
  isCurrency: boolean = false,
  isPercentage: boolean = false,
  decimals: number = 2
): string =>
  new Intl.NumberFormat("es-MX", {
    style: isCurrency ? "currency" : isPercentage ? "percent" : "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
    currency: isCurrency ? "currency" : undefined,
  }).format(isPercentage && !isCurrency ? value / 100 : value);

export const roundToTen: Function = (
  value: number,
  decimals: number = 2
): number =>
  Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);

export const findFactor: Function = (
  valueToFind: number,
  collection: Array<FactorState | any>
): FactorState =>
  collection.find((object: FactorState) => object.value === valueToFind);
