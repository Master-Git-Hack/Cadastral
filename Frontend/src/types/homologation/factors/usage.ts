import { FactorState } from "./factor";

export interface Usage extends FactorState {
  type:
    | "HABITACIONAL"
    | "COMERCIAL"
    | "MIXTO H-C"
    | "INDUSTRIAL"
    | "MIXTO I-H"
    | "MIXTO I-C"
    | "SERVICIOS";
  value: 1.0 | 1.03 | 1.05 | 1.07 | 0.97 | 1.09 | 1.04;
}

export interface FactorUsage {
  subject: Usage;
  current: Usage;
}

export const usage: Array<Usage> = [
  {
    type: "HABITACIONAL",
    value: 1.0,
  },
  {
    type: "COMERCIAL",
    value: 1.03,
  },
  {
    type: "MIXTO H-C",
    value: 1.05,
  },
  {
    type: "INDUSTRIAL",
    value: 1.07,
  },
  {
    type: "MIXTO I-H",
    value: 0.97,
  },
  {
    type: "MIXTO I-C",
    value: 1.09,
  },
  {
    type: "SERVICIOS",
    value: 1.04,
  },
];
