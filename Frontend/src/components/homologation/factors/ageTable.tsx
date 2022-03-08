import { useAppDispatch, useAppSelector} from "../../../hooks/store";
import {selector,setFactorsSubject,setFactorsData} from "../../../features/homologation/slice";
import {toFancyNumber} from "../../../utils/utils";
import {FC}from "react"
export const AgeTable:FC=()=>{
    const dispatch = useAppDispatch();
    const {factors} = useAppSelector(selector);
    const items = factors.ages;
    const subject = items.subject
    const title = items.name.toUpperCase();
    const {data} = items;
    const handleChange=(transaction: any, itemID: number,isSubject:boolean=false) => 
        dispatch(
            isSubject ? 
            setFactorsSubject({
                itemName:"ages",
                value:{value:transaction}
            }) : 
            setFactorsData({
                itemID,
                itemName:"ages",
                value:{
                  id:itemID,
                  value:transaction,
                  result:Number(subject.value/transaction)
                }
            })
        )
    
    console.log(data)
    return(
        <table
            className="table table-sm table-responsive table-responsive-sm table-hover table-bordered table-stripped "
        >
            <thead>
                <tr >
                    <th colSpan={6}>FACTOR POR {title}</th>
                </tr>
            </thead>
            <tbody
                className="text-center align-self-middle align-middle"
            >
                <tr>
                    <td>
                        #
                    </td>
                    <td colSpan={4}>
                        {title}
                    </td>
                    <td colSpan={1} rowSpan={2}>
                        Factores
                    </td>
                </tr>
                <tr>
                    <td>
                        SUJETO
                    </td>
                    <td colSpan={4}>
                        <input
                            type="number"
                            className="form-control form-control-sm bg-warning text-center"
                            name="subject"
                            value={subject.value}
                            onChange={(e)=>handleChange(e.target.value,0,true)}
                        />
                    </td>
                </tr>
                {data.map((item:any,index:number)=><tr>
                    <td>
                        C{index+1}
                    </td>
                    <td colSpan={4}>
                    <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            name="value"
                            value={item.value}
                            onChange={(e)=>handleChange(e.target.value,index,false)}
                        />
                    </td>
                    <td>
                        {toFancyNumber(Number(subject.value/item.value))}
                    </td>
                </tr>)}
            </tbody>
        </table>
    )
}