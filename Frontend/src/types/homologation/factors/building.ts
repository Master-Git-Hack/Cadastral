import { FactorState } from "./factor";

export interface Building extends FactorState {
  type:
    | "RESIDENCIAL PLUS"
    | "RESIDENCIAL"
    | "SEMILUJO"
    | "MEDIA"
    | "MEDIA COMÚN"
    | "INTERÉS SOCIAL ALTA"
    | "INTERÉS SOCIAL MEDIA"
    | "INTERÉS SOCIAL BAJA"
    | "ECONÓMICA ALTA"
    | "ECONÓMICA BAJA"
    | "MÍNIMA";
  value: 1.08 | 1.06 | 1.04 | 1.02 | 1 | 0.98 | 0.96 | 0.94 | 0.92 | 0.9 | 0.88;
}
export interface FactorBuilding {
  subject: Building;
  current: Building;
}

export const building: Array<Building> = [
  {
    type: "RESIDENCIAL PLUS",
    value: 1.08,
  },
  {
    type: "RESIDENCIAL",
    value: 1.06,
  },
  {
    type: "SEMILUJO",
    value: 1.04,
  },
  {
    type: "MEDIA",
    value: 1.02,
  },
  {
    type: "MEDIA COMÚN",
    value: 1.0,
  },
  {
    type: "INTERÉS SOCIAL ALTA",
    value: 0.98,
  },
  {
    type: "INTERÉS SOCIAL MEDIA",
    value: 0.96,
  },
  {
    type: "INTERÉS SOCIAL BAJA",
    value: 0.94,
  },
  {
    type: "ECONÓMICA ALTA",
    value: 0.92,
  },
  {
    type: "ECONÓMICA BAJA",
    value: 0.9,
  },
  {
    type: "MÍNIMA",
    value: 0.88,
  },
];
