/** @format */

export interface CostosConstruccion {
	id?: number;
	descripcion?: string;
	costo_directo?: number;
	indirectos?: number;
	valor_neto?: number;
	m2?: number;
	factor_gto?: number;
	valor_resultante?: number;
	total?: number;
	tipo_servicio?: number;
	registro?: number;
	redondeo?: number;
}
