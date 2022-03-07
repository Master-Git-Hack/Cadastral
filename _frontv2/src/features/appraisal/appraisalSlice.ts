import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { AppraisalState } from "../../types/appraisal/appraisal";
import { Properties } from "../../types/appraisal/properties/properties";
const prevState: Properties = {
  id: 0,
  limits: {
    min: 0,
    max: 0,
  },
  collection: "0000",
  year: new Date().getFullYear().toString().split("20")[1],
  watermark: false,
  zoom: 1,
  recommended_properties: false,
  moreProperties: {
    pageSize: "A4",
    dpi: 300,
    margins: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  data: "",
};
const initialState: AppraisalState = {
  documents: [prevState],
};

export const appraisalSlice = createSlice({
  name: "appraisal",
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<Properties>) => {
      state.documents.push(action.payload);
    },
    removeDocument: (state, action: PayloadAction<Properties>) => {
      state.documents.filter(
        (current: Properties) => current.id !== action.payload.id
      );
    },
    selectDocument: (state, action: PayloadAction<Properties>) => {
      state.documents.filter(
        (current: Properties) => current.id === action.payload.id
      );
    },
    setDocument: (state, action: PayloadAction<Properties>) => {
      state.documents.map((current: Properties) =>
        current.id === action.payload.id ? (current = action.payload) : current
      );
    },
    getDocuments: (state) => state,
    changeDocument: (state, action: PayloadAction<Properties>) => {
      state.documents.map((current: Properties) =>
        current.id === action.payload.id
          ? (current.data = action.payload.data)
          : current
      );
    },
  },
});
export const {
  addDocument,
  removeDocument,
  selectDocument,
  setDocument,
  getDocuments,
  changeDocument,
} = appraisalSlice.actions;
export const selectAppraisal = (state: RootState) => state.appraisal;
export const addDocumentByAsync =
  (current: Properties): AppThunk =>
  async (dispatch) => {
    //const response = await postCollection(current);
    //current.data = response.data;
    //dispatch(changeDocument(current));
  };
export default appraisalSlice.reducer;
