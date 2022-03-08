/** @format */

import {StateProps} from '../state';

interface State extends StateProps {
	id?: number;
	type: 'URBANO' | 'SUBURBANO' | 'RÚSTICO' | 'RURAL';
	value: 1.1 | 1.05 | 1.0 | 0.95;
	result?: number;
}
export interface ClassificationProps {
	name: string;
	tag: string;
	subject: State;
	data: Array<State>;
	isUsed: boolean;
}
export const classificationOptions: Array<State> = [
	{
		type: 'URBANO',
		value: 1.1,
	},
	{
		type: 'SUBURBANO',
		value: 1.05,
	},
	{
		type: 'RÚSTICO',
		value: 1.0,
	},
	{
		type: 'RURAL',
		value: 0.95,
	},
];
export const classificationData=(id:number):State=>({
	id,
	...classificationOptions[0],
	result:1
})
export const classificationTemplate: ClassificationProps = {
	name: 'Clasificacion',
	tag: 'FClas.',
	subject: classificationOptions[0],
	data: [classificationData(1)],
	isUsed: true,
};
