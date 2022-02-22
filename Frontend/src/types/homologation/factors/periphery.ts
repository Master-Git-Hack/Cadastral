import {FactorState} from './factor';

export interface Periphery extends FactorState {
    type: 'URBANO' | 'SUBURBANO' | 'RÚSTICO' | 'RURAL';
    value: 1.1 | 1.05 | 1.0 | 0.95;
}