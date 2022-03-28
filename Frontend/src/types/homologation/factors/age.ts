/** @format */

import { StateProps } from "../state";

export interface AgeProps {
	name: string;
	tag: string;
	subject: StateProps;
	data: Array<StateProps>;
	isUsed: boolean;
	handleInsert:Function;
}
export const ageData = (id: number): StateProps => ({
	id,
	value: 1,
	result: 1
});
const handleOperation=(subject:number,current:number):number=>(1-((subject-current)*0.01));
export const ageTemplate: AgeProps = {
	name: "Edad",
	tag: "FEd.",
	subject: { value: 1, handleOperation},
	data: [ageData(1)],
	isUsed: true,
	handleInsert:ageData
};
