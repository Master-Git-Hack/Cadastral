import moment from "moment";

import {properties,zoneInformation} from "../state";
import {options as building} from "../factors/building";
import {options as usage} from "../factors/usage";
const date = moment();
export interface areaStateProperties extends properties{
    name:string;
    tag:string;
    averageLotArea:Object;
    subject:Object;
    data:Array<properties>;
}
const template = (id:number,type:string)=>({
    id,
    value:1,
    surface:1,
    address:{
        street:"",
        streetNumber:0,
        hasStreetNumber:false,
        colony:"",
        zone:zoneInformation[0],
        extras:{
            factor1:1,
            factor2:1,
            type:type.includes("TERRENO")?usage[0]:building[0], 
            date: date.format("yyyy-MM-D"),
            observations:"",
            reference:"",
            document:{
                type:"",
                filename:"",
                data:null
            },
        }
        


    }
})
const operationAverageLotArea = (data:any,length:number) =>data.reduce((previous:number,current:any)=>previous+Number(current.value),0)/length;

const findLocation=(name:string,disctrict:any) =>disctrict.find((location:any)=>location.name===name);

const insertFactors=(data:any,factors:any)=>{
    factors.slice(1).map((factor:any)=>
        data = data.map((item:any)=>{
            return {...item,
                address: {
                    ...item.address,
                    extras:{
                        ...item.address.extras,
                        [factor]:1
                    }
                }
            };
        })
    )
    return data;

}
const factorsKeys=(factors:any):Array<string> =>{
    const keys:Array<string> =[]
    factors.map((factor:any)=>{
        keys.push(`factor${factor.id}`)
        return factor
    })
    return keys
}
const handleSubjectValues =(factors:any,subject:any, data:any)=>data.map((item:any)=>{
    const {extras,zone} = item.address;
    factors.map((key:string,index:number)=>{
        const {type,root} = subject.factors[index]
        extras[key]=type.includes("percentage")?subject.zone[type]/zone[type]:((subject.zone[type]/zone[type])**(1/root))
        return key
    })
    return item
})
export const areaState=(type:string):areaStateProperties=>({
    name: type.includes( "TERRENO") ? "Áreas " : "Sup. Const ",
    tag: type.includes( "TERRENO") ? "Área de Lote Moda" : "Superficie del sujeto",
    averageLotArea: {
		name: type.includes( "TERRENO") ? "SUPERFICIE LOTE MODA" : "SUPERFICIE DEL COMPARABLE",
		value: 0,
        operation:operationAverageLotArea,
	},
    subject: {
		name: type.includes( "TERRENO") ? "SUPERFICIE TOTAL DEL TERRENO" : "SUPERFICIE DEL SUJETO",
		value: 0,
		zone:zoneInformation[0],
		factors: [
			{ id: 1, type: "totalPopulation", root: 12},
			{ id: 2, type: "totalPopulation", root: 12},
		],
	},
    data: [template(1,type)],
    template,
    options:zoneInformation,
    findLocation,
    insertFactors,
    factorsKeys,
    handleSubjectValues
})