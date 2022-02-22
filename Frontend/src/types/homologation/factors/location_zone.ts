import {Columns} from '../columns/columns';
export interface LocationZone{
    id:number;
    name:string;
    columns:Array<Columns>;
    percentage:number;
    addNextRow:boolean;
}