/** @format */

import {StateProps} from '../state';
import {State as SymbolsProps, symbolsOptions} from './symbols';
interface State {
	[key: string]: SymbolsProps | string | StateProps;
}
export interface ZoneProps{
    name:string;
    tag:string;
    data:Array<any>;
}
