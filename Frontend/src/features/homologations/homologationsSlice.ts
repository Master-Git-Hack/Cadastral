import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { HomologationState } from "../../types/homologation/homologation";
import { Factors } from "../../types/homologation/factors/factors";
const prevState: Factors = {
  id: 0,
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
  location: {
    id: 1,
    name: "location",
    columns: [
      {
        name: "C1",
        value: {
          type: "+",
          value: 1,
        },
      },
    ],
    percentage: 0,
    addNextRow: true,
  },
  zone: {
    id: 1,
    name: "zone",
    columns: [
      {
        name: "C1",
        value: {
          type: "+",
          value: 1,
        },
      },
    ],
    percentage: 0,
    addNextRow: true,
  },
};
const initialState: HomologationState = {
  type: "TERRENO",
  items: [prevState],
};

export const homologationSlice = createSlice({
  name: "homologation",
  initialState,
  reducers: {
    setStart: (state, action: PayloadAction<HomologationState>) => {
      state.type = action.payload.type;
      state.items = action.payload.items;
    },
    add: (state, action: PayloadAction<Factors>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<Factors>) => {
      state.items.filter(
        (current: Factors) => current.id !== action.payload.id
      );
    },
    select: (state, action: PayloadAction<Factors>) => {
      state.items.filter(
        (current: Factors) => current.id === action.payload.id
      );
    },
    set: (state, action: PayloadAction<Factors>) => {
      state.items.map((current: Factors) =>
        current.id === action.payload.id ? (current = action.payload) : current
      );
    },
    get: (state) => state,
  },
});
export const { add, remove, select, set, get, setStart } =
  homologationSlice.actions;
export const selectHomologation = (state: RootState) => state.homologation;
export const addByAsync =
  (current: Factors): AppThunk =>
  async (dispatch) => {
    dispatch(add(current));
  };
export default homologationSlice.reducer;
//setStart(initialState);
