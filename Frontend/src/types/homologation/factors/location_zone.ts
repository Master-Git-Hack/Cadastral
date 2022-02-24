import { Columns } from "../columns/columns";
import { Symbols, symbols } from "../factors/symbols";

export interface LocationZone {
  name: string;
  columns?:Record<string,Columns>;
  percentage: number;
  location_zone:string;
  
}
const cols = (length: number = 1): Array<Columns> =>
  Array.from({ length }, (_: any, i: number) => ({
    name: `C${i + 1}`,
    current: symbols[0],
  }));

export const customCols = (object:any,name:string)=>{
  object[name]=symbols[0];
}

  export const insertColumn= (object:any)=>
  {
    const {length} = Object.keys(object).filter((current:any)=>current.includes('C'));
    object[`C${length+1}`] = symbols[0];
    return object;
  }
  /*Array.from({ length }, (_: any, i: number) => {
    object[`C${i + 2}`] = symbols[0];
    return object;
  })[0]*/
export const _templateLocationZone = (
  name: string,
  length: number = 1
): LocationZone => ({
  name,
  columns:{
    C1:{
      name: "C1",
      current: symbols[0],
    }
  },
  percentage: 0,
  location_zone: '',
});
