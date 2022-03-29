/** @format */

import { StateProps } from "../state";
export interface ResultsProps {
	name: string;
	tag: string;
	data: Array<StateProps>;
	isUsed: boolean;
	handleInsert: Function;
	handleOperation: Function;
}
export const resultsData = (id: number): StateProps => ({
	id,
	value: 0.95,
});
const handleOperation = (factors:any)=>factors.results.data.map((item:any,index:any)=>{
	item.value = 1;
	for(const factor in factors){
		if(factor !== "location" && factor !== "zone" && factor !== "surface" && factor !== "commercial"){
			item.value *= factors[factor].data[index].result;
		}else if(factor === "surface" || factor === "commercial" ){
			item.value *= factors[factor].data[index].value;
		}
		else
		item.value *= factors[factor].results[index].value;
	}
	return item
})
export const resultsTemplate: ResultsProps = {
	name: "Homologación Resultante",
	tag: "F.Ho.Re.",
	data: [resultsData(1)],
	isUsed: false,
	handleInsert: resultsData,
	handleOperation
};
