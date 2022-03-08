/** @format */

import {StateProps} from '../state';
import {State as SymbolsProps, symbolsOptions} from './symbols';
interface State {
	[key: string]: SymbolsProps | string | StateProps;
}
export interface LocationProps{
    name:string;
    tag:string;
    data:Array<any>;
}
