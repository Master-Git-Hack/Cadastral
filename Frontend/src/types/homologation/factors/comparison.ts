/** @format */

import {StateProps} from '../state';

interface State extends StateProps {
	id?: number;
	value: number;
	result?: number;
}

export interface ComparisonProps {
	name: string;
	tag: string;
	subject: State;
	data: Array<State>;
	isUsed: boolean;
}
export const comparisonData= (id:number):State=>({
	id,
	value: 1,
	result: 1,
})
export const comparisonTemplate: ComparisonProps = {
	name: 'Comparacion',
	tag: 'FCom.',
	subject: {
		value: 1,
	},
	data: [comparisonData(1)],
	isUsed: true,
};
