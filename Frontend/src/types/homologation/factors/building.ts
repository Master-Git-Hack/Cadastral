import {FactorState} from './factor';

export interface Building extends FactorState {
    type: 'RESIDENCIAL PLUS' | 'RESIDENCIAL' | 'SEMILUJO' | 'MEDIA' | 'MEDIA COMÚN' | 'INTERÉS SOCIAL ALTA' | 'INTERÉS SOCIAL MEDIA' | 'INTERÉS SOCIAL BAJA' | 'ECONÓMICA ALTA' | 'ECONÓMICA BAJA' | 'MÍNIMA';
    value: 1.08 | 1.06 | 1.04 | 1.02 | 1 | 0.98 | 0.96 | 0.94 | 0.92 | 0.9 | 0.88;
}