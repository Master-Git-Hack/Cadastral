import { Factors, Transaction } from "./factors/factors";

export interface HomologationState {
  type: string;
  items: Array<Factors | any>;
  results?: Array<Factors | any>;
  elements: Array<any>;
  id: number;
}

export interface manageHomologation {
  itemName:
    | "classification"
    | "typeForm"
    | "usage"
    | "topography"
    | "level"
    | "quality"
    | "project"
    | "building"
    | "location"
    | "zone";
  itemID?: number | undefined;
  itemColumn?: string | undefined;
  isSubject?: boolean | undefined;
  transaction?: Transaction | any;
}

export const template = (globalID: number): Factors => ({
  id: globalID,
  classification: {
    subject: {
      type: "URBANO",
      value: 1.1,
    },
    current: {
      type: "URBANO",
      value: 1.1,
    },
  },
  typeForm: {
    subject: {
      type: "REGULAR",
      value: 1,
    },
    current: {
      type: "REGULAR",
      value: 1,
    },
  },
  usage: {
    subject: {
      type: "MIXTO I-C",
      value: 1.09,
    },
    current: {
      type: "MIXTO I-C",
      value: 1.09,
    },
  },
  topography: {
    subject: {
      type: "PLANA",
      value: 1,
    },
    current: {
      type: "PLANA",
      value: 1,
    },
  },
  level: {
    subject: {
      type: "P.B. NIVEL DE CALLE",
      value: 1,
    },
    current: {
      type: "P.B. NIVEL DE CALLE",
      value: 1,
    },
  },
  quality: {
    subject: {
      type: "LUJO",
      value: 1.12,
    },
    current: {
      type: "LUJO",
      value: 1.12,
    },
  },
  project: {
    subject: {
      type: "EXCELENTE",
      value: 1.06,
    },
    current: {
      type: "EXCELENTE",
      value: 1.06,
    },
  },
  building: {
    subject: {
      type: "RESIDENCIAL PLUS",
      value: 1.08,
    },
    current: {
      type: "RESIDENCIAL PLUS",
      value: 1.08,
    },
  },
});

export const elements = [
  {
    name: "Clasificación",
    type: "classification",
    value: 0,
  },
  {
    name: "Construcción",
    type: "building",
    value: 1,
  },
  {
    name: "Nivel",
    type: "level",
    value: 2,
  },
  {
    name: "Proyecto",
    type: "project",
    value: 3,
  },
  {
    name: "Calidad",
    type: "quality",
    value: 4,
  },
  {
    name: "Topografia",
    type: "topography",
    value: 5,
  },
  {
    name: "Forma",
    type: "typeForm",
    value: 6,
  },
  {
    name: "Uso",
    type: "usage",
    value: 7,
  },
];
