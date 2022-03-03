import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
  HomologationState,
  template,
  elements,
  manageHomologation,
} from "../../types/homologation/homologation";
import { defineResults } from "../../utils/utils";
import { Factors } from "../../types/homologation/factors/factors";
import {
  _templateLocationZone,
  addColumnAtLocationZone,
  removeColumnAtLocationZone,
  addRowAtLocationZone,
  removeRowAtLocationZone,
} from "../../types/homologation/factors/location_zone";
import { FactorState } from "../../types/homologation/factors/factor";
const params = new URLSearchParams(window.location.search);
const type = params.get("tipo");
const id = params.get("tipo");
const initialState: HomologationState = {
  type: type ? type.toString().toUpperCase() : "TERRENO",
  items: [
    {
      ...template(1),
      location: _templateLocationZone,
      zone: _templateLocationZone,
    },
  ],
  results: [],
  elements,
  id: id ? Number(id) : 0,
};
export const homologationSlice = createSlice({
  name: "homologation",
  initialState,
  reducers: {
    setStart: (state, action: PayloadAction<HomologationState>) => {
      state.type = action.payload.type;
      state.items = action.payload.items;
    },

    caseLocationZoneAddRow(state, action: PayloadAction<manageHomologation>) {
      const { itemName } = action.payload;
      const items = state.items[0][itemName];
      state.items = [
        {
          ...state.items[0],
          [itemName]: addRowAtLocationZone(items),
        },
        ...state.items.slice(1),
      ];
    },
    caseLocationZoneRemoveRow(
      state,
      action: PayloadAction<manageHomologation>
    ) {
      const { itemName } = action.payload;
      const items = state.items[0][itemName];
      state.items = [
        {
          ...state.items[0],
          [itemName]: removeRowAtLocationZone(items),
        },
        ...state.items.slice(1),
      ];
    },
    setPercentageLocationZone(
      state,
      action: PayloadAction<manageHomologation>
    ) {
      const { itemName, itemID, transaction } = action.payload;
      state.items[0][itemName][itemID as number].percentage =
        transaction as number;
    },
    setLocationZoneValueLocationZone(
      state,
      action: PayloadAction<manageHomologation>
    ) {
      const { itemName, itemID, transaction } = action.payload;
      console.log(transaction);
      state.items[0][itemName][itemID as number].location_zone =
        transaction as string;
    },
    setCompareSubjectLocationZone(
      state,
      action: PayloadAction<manageHomologation>
    ) {
      const { itemName, itemID, itemColumn, transaction } = action.payload;
      state.items[0][itemName][itemID as number][itemColumn as string] =
        transaction as FactorState;
    },
    addNextRow: (state, action: PayloadAction<manageHomologation>) => {
      const { items } = state;
      const { itemName } = action.payload;
      const { length } = items;
      state.items = [
        {
          ...items[0],
          [itemName]: addColumnAtLocationZone(items[0][itemName]),
        },
        ...items.slice(1),
      ];
      state.items.push(template(length + 1));
    },
    removeLastRow: (state, action: PayloadAction<manageHomologation>) => {
      const { items } = state;
      const { length } = items;
      const { itemName } = action.payload;
      if (length > 1) {
        items.pop();
        items[0][itemName] = removeColumnAtLocationZone(items[0][itemName]);
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
    setResults(state) {
      state.results = defineResults(state.items);
    },
    setElements(state, action: PayloadAction<any>) {
      state.elements = action.payload;
    },
    updateResults(state, action: PayloadAction<manageHomologation>) {
      const { type } = state;
      const { itemID, itemName, transaction } = action.payload;
      if (
        state.results !== undefined &&
        itemID !== undefined &&
        itemName !== undefined &&
        transaction !== undefined
      ) {
        if (type === "TERRENO") {
          state.results[itemID][itemName] = transaction;
          state.results[itemID].unitCost =
            (type === "TERRENO"
              ? state.results[itemID].salesCost
              : state.results[itemID].landSurface) / state.results[itemID].area;
        }
      }
    },
  },
});
export const {
  setResults,
  setStart,
  setSingleFactor,
  addNextRow,
  removeLastRow,
  caseLocationZoneAddRow,
  caseLocationZoneRemoveRow,
  setPercentageLocationZone,
  setLocationZoneValueLocationZone,
  setCompareSubjectLocationZone,
  setElements,
} = homologationSlice.actions;
export const selectHomologation = (state: RootState) => state.homologation;
/*export const addByAsync =
  (current: Factors): AppThunk =>
  async (dispatch) => {
    dispatch(add(current));
  };*/
export default homologationSlice.reducer;
//setStart(initialState);
