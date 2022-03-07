import { FactorState } from "./factor";

export interface Project extends FactorState {
  type:
    | "EXCELENTE"
    | "MUY BUENO"
    | "FUNCIONAL"
    | "ADECUADO"
    | "REGULAR"
    | "INADECUADO"
    | "DEFICIENTE"
    | "OBSOLETO"
    | "INEXISTENTE";
  value: 1.06 | 1.03 | 1 | 0.98 | 0.96 | 0.94 | 0.92 | 0.9 | 0.88;
}

export interface FactorProject {
  subject?: Project;
  current: Project;
}

export const project: Array<Project> = [
  {
    type: "EXCELENTE",
    value: 1.06,
  },
  {
    type: "MUY BUENO",
    value: 1.03,
  },
  {
    type: "FUNCIONAL",
    value: 1.0,
  },
  {
    type: "ADECUADO",
    value: 0.98,
  },
  {
    type: "REGULAR",
    value: 0.96,
  },
  {
    type: "INADECUADO",
    value: 0.94,
  },
  {
    type: "DEFICIENTE",
    value: 0.92,
  },
  {
    type: "OBSOLETO",
    value: 0.9,
  },
  {
    type: "INEXISTENTE",
    value: 0.88,
  },
];
