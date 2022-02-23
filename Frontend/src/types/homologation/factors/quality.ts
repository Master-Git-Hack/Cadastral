import { FactorState } from "./factor";

export interface Quality extends FactorState {
  type:
    | "PRECARIA"
    | "BAJA"
    | "ECONOMICA"
    | "COMERCIAL"
    | "MEDIA COMÚN"
    | "MEDIA ALTA"
    | "ALTA"
    | "LUJO";
  value: 0.91 | 0.94 | 0.97 | 1 | 1.03 | 1.06 | 1.09 | 1.12;
}

export interface FactorQuality {
  subject: Quality;
  current: Quality;
}

export const quality: Array<Quality> = [
  {
    type: "PRECARIA",
    value: 0.91,
  },
  {
    type: "BAJA",
    value: 0.94,
  },
  {
    type: "ECONOMICA",
    value: 0.97,
  },
  {
    type: "COMERCIAL",
    value: 1.0,
  },
  {
    type: "MEDIA COMÚN",
    value: 1.03,
  },
  {
    type: "MEDIA ALTA",
    value: 1.06,
  },
  {
    type: "ALTA",
    value: 1.09,
  },
  {
    type: "LUJO",
    value: 1.12,
  },
];
