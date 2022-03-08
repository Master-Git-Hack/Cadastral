/** @format */

import {StateProps} from '../state';

export interface State extends StateProps {
	id?: number;
	type: '+' | '=' | '-';
	value: 1 | 0 | -1;
	result?: number;
}
export const symbolsOptions: Array<State> = [
	{
		type: '+',
		value: 1,
	},
	{
		type: '=',
		value: 0,
	},
	{
		type: '-',
		value: -1,
	},
];
