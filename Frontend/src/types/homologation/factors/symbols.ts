import { FactorState } from "./factor";

export interface Symbols extends FactorState {
  type: "+" | "=" | "-";
  value: 1 | 0 | -1;
}
export interface FactorSymbols {
  subject?: Symbols;
  current: Symbols;
}

export const symbols: Array<Symbols> = [
  {
    type: "+",
    value: 1,
  },
  {
    type: "=",
    value: 0,
  },
  {
    type: "-",
    value: -1,
  },
];
