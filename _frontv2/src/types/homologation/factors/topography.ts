import { FactorState } from "./factor";
export interface Topography extends FactorState {
  type:
    | "PLANA"
    | "PENDIENTE LIGERA"
    | "PENDIENTE INCLINADA"
    | "PENDIENTE ACCIDENTADA";
  value: 1 | 0.98 | 0.97 | 0.96 | 0.94 | 0.91;
}

export interface FactorTopography {
  subject?: Topography;
  current: Topography;
}
export const topography = (type: string): Array<Topography> => [
  {
    type: "PLANA",
    value: 1.0,
  },
  {
    type: "PENDIENTE LIGERA",
    value: type === "TERRENO" ? 0.97 : 0.98,
  },
  {
    type: "PENDIENTE INCLINADA",
    value: type === "TERRENO" ? 0.94 : 0.96,
  },
  {
    type: "PENDIENTE ACCIDENTADA",
    value: type === "TERRENO" ? 0.91 : 0.94,
  },
];
