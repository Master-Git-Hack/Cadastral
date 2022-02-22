import {FactorState} from './factor';

export interface Symbols extends FactorState {
    type: '+' | '=' | '-';
    value: 1 | 0 | -1;
}