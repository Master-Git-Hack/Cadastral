/** @format */

import {StateProps} from '../state';

interface State extends StateProps {
	id: number;
	value: number;
}
export interface AreasProps{
	[key:string]:number | Array<State>;
}
export const areasData = (id: number):State => ({
	id,
	value: 1,
})
export const areasTemplate:any=(type:string="TERRENO" || "RENTA"):AreasProps=>({
	[type==="TERRENO"?"averageLotArea":"subject"]:1,
	data:[areasData(1)]
})