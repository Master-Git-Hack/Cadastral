/** @format */

import {StateProps} from '../state';

interface State extends StateProps {
	id?: number;
	type:
		| 'PLANA'
		| 'PENDIENTE LIGERA'
		| 'PENDIENTE INCLINADA'
		| 'PENDIENTE ACCIDENTADA';
	value: 1 | 0.98 | 0.97 | 0.96 | 0.94 | 0.91;
	result?: number;
}
export interface TopographyProps {
	name: string;
	tag: string;
	subject: State;
	data: Array<State>;
	isUsed: boolean;
}

export const topographyOptions = (type:string = 'TERRENO' || 'RENTA'): Array<State> => [
	{
		type: 'PLANA',
		value: 1.0,
	},
	{
		type: 'PENDIENTE LIGERA',
		value: type === 'TERRENO' ? 0.97 : 0.98,
	},
	{
		type: 'PENDIENTE INCLINADA',
		value: type === 'TERRENO' ? 0.94 : 0.96,
	},
	{
		type: 'PENDIENTE ACCIDENTADA',
		value: type === 'TERRENO' ? 0.91 : 0.94,
	},
];
export const topographyData = (id: number,type:string): State => ({
	id,
	...topographyOptions(type)[0],
	result:1
})
export const topographyTemplate: TopographyProps = {
	name: 'Topografía',
	tag: 'FTop.',
	subject: {
		type: 'PLANA',
		value: 1.0,
	},
	data:[],
	isUsed: true,

}
