import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
  HomologationState,
  template,
  manageHomologation,
} from "../../types/homologation/homologation";
import { Factors } from "../../types/homologation/factors/factors";
import { _templateLocationZone } from "../../types/homologation/factors/location_zone";
const initialState: HomologationState = {
  type: "TERRENO",
  items: [
    {
      ...template(1),
      location: _templateLocationZone("location", 1),
      zone: _templateLocationZone("zone", 1),
    },
  ],
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
    addNextRow: (state, action: PayloadAction<manageHomologation>) => {
      const { items } = state;
      const { itemName } = action.payload;
      const { length } = items;
      state.items = [
        {
          ...items[0],
          [itemName]: {
            ...state.items[0][itemName],
            columns: {
              C2:{
                name:"C2",
                current: {
                  type: "+",
                  value: 1,
                },
            },
            }
        },
      },
        ...items.slice(1),
      ];
      state.items.push({ ...template(length + 1), location: 0, zone: 0 });
    },
    removeLastRow: (state, action: PayloadAction<manageHomologation>) => {
      const { items } = state;
      const { length } = items;
      const { itemName } = action.payload;
      if (length > 1) {
        items.pop();
        const { rows } = items[0][itemName];
        if (rows.length > 1) rows.pop();
        state.items = items;
      }
    },
    setSingleFactor(state, action: PayloadAction<manageHomologation>) {
      const { transaction, itemID, itemName, isSubject } = action.payload;
      if (
        transaction !== undefined &&
        itemID !== undefined &&
        itemName !== undefined &&
        isSubject !== undefined
      ) {
        state.items = [
          ...state.items.slice(0, itemID),
          {
            ...state.items[itemID],
            [itemName]: {
              ...state.items[itemID][itemName],
              [isSubject ? "subject" : "current"]: transaction,
            },
          },
          ...state.items.slice(itemID + 1),
        ];
      }
    },
    get: (state) => state,
  },
});
export const {
  add,
  remove,
  select,
  set,
  get,
  setStart,
  setSingleFactor,
  addNextRow,
  removeLastRow,
} = homologationSlice.actions;
export const selectHomologation = (state: RootState) => state.homologation;
export const addByAsync =
  (current: Factors): AppThunk =>
  async (dispatch) => {
    dispatch(add(current));
  };
export default homologationSlice.reducer;
//setStart(initialState);
