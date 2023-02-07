
import { reducers } from './alerts.reducers';
import {initialState} from "./alerts.initialState"
import { RootState } from '..';
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'Alerts',
    initialState,
    reducers
});
export const getAlerts = ({ Alerts }: RootState) => Alerts;

export default slice.reducer;
