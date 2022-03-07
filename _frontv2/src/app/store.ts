import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import homologationReducer from "../features/homologations/homologationsSlice";
import appraisalReducer from "../features/appraisal/appraisalSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    homologation: homologationReducer,
    appraisal: appraisalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
