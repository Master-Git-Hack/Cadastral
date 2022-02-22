import {FactorState} from './factor';

export interface Quality extends FactorState{
    type: "PRECARIA" | "BAJA" | "ECONOMICA" | "COMERCIAL" | "MEDIA COMÚN" | "MEDIA ALTA" | "ALTA" | "LUJO";
    value: 0.91 | 0.94 | 0.97 | 1 | 1.03 | 1.06| 1.09 | 1.12;
}