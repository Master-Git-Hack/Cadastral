import { FactorState } from "./factor";

export interface Periphery extends FactorState {
  type: "URBANO" | "SUBURBANO" | "RÚSTICO" | "RURAL";
  value: 1.1 | 1.05 | 1.0 | 0.95;
}
export interface FactorPeriphery {
  subject?: Periphery;
  current: Periphery;
}
export const periphery: Array<Periphery> = [
  {
    type: "URBANO",
    value: 1.1,
  },
  {
    type: "SUBURBANO",
    value: 1.05,
  },
  {
    type: "RÚSTICO",
    value: 1.0,
  },
  {
    type: "RURAL",
    value: 0.95,
  },
];
