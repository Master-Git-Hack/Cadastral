import { FactorState } from "./factor";

export interface Level extends FactorState {
  type: "SOTANO 1" | "SOTANO 2" | "P.B. NIVEL DE CALLE" | "P.A. NIVEL DE CALLE";
  value: 0.9 | 0.95 | 1 | 1;
}

export interface FactorLevel {
  subject?: Level;
  current: Level;
}

export const level: Array<Level> = [
  {
    type: "SOTANO 1",
    value: 0.9,
  },
  {
    type: "SOTANO 2",
    value: 0.95,
  },
  {
    type: "P.B. NIVEL DE CALLE",
    value: 1.0,
  },
  {
    type: "P.A. NIVEL DE CALLE",
    value: 1.0,
  },
];
