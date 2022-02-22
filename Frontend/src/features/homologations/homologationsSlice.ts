import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {HomologationState} from '../../types/homologation/homologation';
import {Factors} from '../../types/homologation/factors/factors';
import {fetchFactors} from './asyncHomologation';
const prevState:Factors=
{
    id:0,
    classification:{
        type: "URBANO",
        value: 1.1,
    },
    typeForm:{
        type: "REGULAR",
        value: 1,
    },
    usage:{
        type: "MIXTO I-C",
        value: 1.09,
    },
    topography:{
        type: "PLANA",
        value: 1,
    },
    level:{
        type: "P.B. NIVEL DE CALLE",
        value: 1,
    },
    quality:{
        type: "LUJO",
        value: 1.12,
    },
    project:{
        type: "EXCELENTE",
        value: 1.06,
    },
    building:{
        type: "RESIDENCIAL PLUS",
        value: 1.08,
    },
    location:{
        id:0,
        name:"location",
        columns:[{
            name:"C1",
            value:{
                type: "+",
                value: 1
            },
        }],
        percentage:0,
        addNextRow: true,
    },
    zone:{
        id:0,
        name:"zone",
        columns:[{
            name:"C1",
            value:{
                type: "+",
                value: 1
            },
        }],
        percentage:0,
        addNextRow: true,
    }

}
const initialState:HomologationState = {
    type: 'TERRENO',
    items:[prevState],
}
export const addAsync = createAsyncThunk('homologation/async',async(current:Factors,)=>(await fetchFactors(current)));

export const homologationSlice = createSlice({
    name: 'homologation',
    initialState,
    reducers:{
        add:(state,action:PayloadAction<Factors>) => {
            state.items.push(action.payload);
        },
        remove:(state, action:PayloadAction<Factors>) => {
            state.items.filter((current:Factors) => current.id !== action.payload.id);
        },
        select:(state, action:PayloadAction<Factors>) => {
            state.items.filter((current:Factors) => current.id === action.payload.id);
        },
        set: (state, action:PayloadAction<Factors>) => {
            state.items.map((current:Factors) =>current.id === action.payload.id ? current = action.payload : current);
        },

    }
});
export const {} = homologationSlice.actions;
export default homologationSlice.reducer;