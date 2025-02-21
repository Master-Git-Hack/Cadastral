import { Tipo,TipoMap,TipoReverseMap } from "@/store/homologación/base"
import { IHomologacionState,IFactors } from "@/store/homologación/interface"
import { IJustipreciacionState } from "@/store/justipreciacion/interface"
import {useState,useEffect,useMemo} from "react"
interface IUseHomologacion extends Partial<IJustipreciacionState>{
    tipo_servicio:"justipreciacion"|"homologacion"
}
export default function useHomologacion({tipo_servicio,id: justiID}:IUseHomologacion){
    const registro =null;
    useEffect(()=>{
        if(registro ===null){
            return
        }
    },[registro])
    return {

    }
}