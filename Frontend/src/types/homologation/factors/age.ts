/** @format */

import {StateProps} from '../state';

export interface AgeProps {
	name: string;
	tag: string;
	subject: StateProps;
	data: Array<StateProps>;
	isUsed: boolean;
}
export const ageData = (id: number):StateProps => ({
	id,
	value: 1,
	result: 1,
})
export const ageTemplate: AgeProps = {
	name: 'Edad',
	tag: 'FEd.',
	subject: {value:1},
	data: [
		ageData(1),
	],
	isUsed: true,
};
