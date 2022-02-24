import { Factors, Transaction } from "./factors/factors";

export interface HomologationState {
  type: string;
  items: Array<Factors | any>;
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
  isSubject?: boolean | undefined;
  transaction?: Transaction | undefined;
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
