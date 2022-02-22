import {FactorState} from './factor';

export interface Project extends FactorState {
    type: 'EXCELENTE' | 'MUY BUENO' | 'FUNCIONAL' | 'ADECUADO' | 'REGULAR' | 'INADECUADO' | 'DEFICIENTE' | 'OBSOLETO' | 'INEXISTENTE';
    value: 1.06 | 1.03 | 1 | 0.98 | 0.96 | 0.94 |0.92 | 9 | 0.88;
}