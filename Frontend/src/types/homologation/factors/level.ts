import {FactorState} from './factor';

export interface Level extends FactorState {
    type: 'SOTANO 1' | 'SOTANO 2' | 'P.B. NIVEL DE CALLE' | 'P.A. NIVEL DE CALLE';
    value: 0.9 | 0.95 | 1 | 1;
}