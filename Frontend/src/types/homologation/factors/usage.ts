import {FactorState} from './factor';

export interface Usage extends FactorState {
    type: 'HABITACIONAL' | 'COMERCIAL' | 'MIXTO H-C' | 'INDUSTRIAL' | 'MIXTO I-H' | 'MIXTO I-C' | 'SERVICIOS';
   value: 1.0 | 1.03 | 1.05 | 1.07 | 0.97 | 1.09 | 1.04 ;
}