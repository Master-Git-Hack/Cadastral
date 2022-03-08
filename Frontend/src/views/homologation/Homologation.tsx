import {FC,useState,useEffect}from "react";
import {useAppSelector, useAppDispatch} from '../../hooks/store';
import {selector,setFactors} from "../../features/homologation/slice";
import {SelectFactor} from "../../components/homologation/selectFactor";
import {FactorsCompilation} from "../../components/homologation/factors";
const VisibilityButton:FC=(props:any)=>(<button
    className="btn btn-sm btn-primary"
    onClick={() =>{
        props.setCurrent(false);
        props.setNext(true);
    }}
>
    Continuar
</button>)
const SelectionFactor:FC<{
    factors:any;
    setFactorsUsed:Function;
    visibility:boolean;
    setCurrent:Function;
    setNext:Function;
}> =(props:any)=>(<>
{props.visibility ?
    <div className="m-5">
        <SelectFactor
            factors={props.factors}
            setFactorsUsed={props.setFactorsUsed}
        />
        <div className="text-end">
            <VisibilityButton {...props}/>
        </div>
    </div>
: null
}

</>)
const EditFactor:FC<{
    visibility:boolean;
    setCurrent:Function;
    setNext:Function;
}> = (props)=>(
    <>
    {props.visibility ?(
        <div className="m-5">
        <FactorsCompilation />
        <div className="text-end">
            <VisibilityButton {...props}/>
        </div>
    </div>
    ):null}
    </>
)
export default function Homologation() {
    const {factors} = useAppSelector(selector);
    const dispatch = useAppDispatch();
    const setFactorsUsed=(key: string)=>{
        dispatch(setFactors({
            itemName:key,
            subItemName:'isUsed',
            value:false
        }))
    }
    const [showSelectFactor,setShowSelectFactor]=useState(true)
    const [showEditFactors,setShowEditFactors]=useState(false)
    const [showResults,setShowResults]=useState(false)

    return(
    <>
        <SelectionFactor
            factors={factors}
            setFactorsUsed={setFactorsUsed}
            visibility={showSelectFactor}
            setCurrent={setShowSelectFactor}
            setNext={setShowEditFactors}
        />
        <EditFactor
            visibility={showEditFactors}
            setCurrent={setShowEditFactors}
            setNext={setShowResults}
        />
    </>)
}
