import { FactorState } from "./factor";
export interface TypeForm extends FactorState {
  type:
    | "REGULAR"
    | "IRREGULAR LIGERO"
    | "P.I. DE 4 LADOS"
    | "P.I. DE 5 LADOS"
    | "P.I. DE 6 LADOS"
    | "IRREGULAR PESADO";
  value: 1 | 0.98 | 0.97 | 0.96 | 0.95 | 0.94 | 0.93 | 0.92 | 0.9 | 0.85;
}
export interface FactorTypeForm {
  subject: TypeForm;
  current: TypeForm;
}
export const type_form = (type: string): Array<TypeForm> => [
  {
    type: "REGULAR",
    value: 1.0,
  },
  {
    type: "IRREGULAR LIGERO",
    value: type === "TERRENO" ? 0.97 : 0.98,
  },
  {
    type: "P.I. DE 4 LADOS",
    value: type === "TERRENO" ? 0.95 : 0.96,
  },
  {
    type: "P.I. DE 5 LADOS",
    value: type === "TERRENO" ? 0.93 : 0.94,
  },
  {
    type: "P.I. DE 6 LADOS",
    value: type === "TERRENO" ? 0.9 : 0.92,
  },
  {
    type: "IRREGULAR PESADO",
    value: type === "TERRENO" ? 0.85 : 0.9,
  },
];
