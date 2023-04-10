export interface HomologacionState{
    id?: number;
    tipo: string;
    factores: any;
    resultado: any;
    registro: string;
    tipo_servicio: string;
    edicion: boolean;
}
export interface PayloadByKey {
	key: keyof HomologacionState;
	value?: any;
}