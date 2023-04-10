
import { PayloadAction } from "@reduxjs/toolkit";
import { HomologacionState, PayloadByKey } from "./interfaces";
export const reducers = ({
    load:(state:HomologacionState,{payload}:PayloadAction<HomologacionState>)=>{
        if(payload!==undefined){
            return payload;
        }
    }
})