import { RootState } from '..';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reducers } from "./justipreciacion.reducers";
import {initialState} from './justipreciacion.initialState';
const slice = createSlice({
    name: "justipreciacion",
    initialState,
    reducers,
});
export const getJustipreciacion = ({ Justipreciacion }: RootState) => Justipreciacion;
export const { load,loadTerreno, add, patch } = slice.actions;
export default slice.reducer;