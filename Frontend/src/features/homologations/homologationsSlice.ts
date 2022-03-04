import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
  HomologationState,
  initialTemplate,
  template,
  elements,
  manageHomologation,
} from "../../types/homologation/homologation";
import { defineResults, makeCalculations } from "../../utils/utils";
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
const id = params.get("id");
const initialState: HomologationState = {
  type: type ? type.toString().toUpperCase() : "TERRENO",
  items: [
    {
      ...initialTemplate(1),
      location: _templateLocationZone,
      zone: _templateLocationZone,
    },
  ],
  results: [],
  elements,
  id: id ? Number(id) : 0,
  averageLotArea: 1,
  areaSubject: 1,
  averageUnitValue: 1,
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
    setAreaSubject(state, action: PayloadAction<number>) {
      state.areaSubject = action.payload;
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
        state.results[itemID][itemName] = transaction;
        /*
        state.results[itemID].unitCost =
        state.results[itemID].salesCost / state.results[itemID].area;

        state.averageLotArea = state.results.reduce((previous:number,current:any)=>previous + current.area,0) / state.results.length;

        state.results[itemID].surface = (state.results[itemID].area / ((state.type==="TERRENO")?state.averageLotArea:state.areaSubject))**
        (1/((state.type==="TERRENO")?12:8))

        const {age,building,classification,level,project,quality,typeForm,topography,usage,location,zone,comparison,surface} = state.results[itemID];
        
        state.results[itemID].resultingTypeApprovalFactor = (age*building*classification*level*project*quality*typeForm*topography*usage*location*zone*comparison*surface);
        
        state.results[itemID].resultingUnitaryCost=state.results[itemID].resultingTypeApprovalFactor * state.results[itemID].unitCost;

        state.averageUnitValue = state.results.reduce((previous:number,current:any)=>previous + Number(current.unitCost * (Number(current.weightingPercentage)/100)),0);

        const response = makeCalculations(state.results,type,state.areaSubject);
*/
        const response = makeCalculations(
          state.results,
          type,
          state.areaSubject
        );
        state.results = response.results;
        state.averageUnitValue = response.averageUnitValue;
        state.averageLotArea = response.averageLotArea;
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
  updateResults,
  setAreaSubject,
} = homologationSlice.actions;
export const selectHomologation = (state: RootState) => state.homologation;
/*export const addByAsync =
  (current: Factors): AppThunk =>
  async (dispatch) => {
    dispatch(add(current));
  };*/
export default homologationSlice.reducer;
//setStart(initialState);
