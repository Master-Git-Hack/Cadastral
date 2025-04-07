import {
	defaultFactorData,
	// defaultSymbolResult,
	defaultSubject,
} from "../base";
export enum CatalogoUbicacion {
	EQUIPAMIENTO = 0,
	SERVICIOS = 1,
	DESEABILIDAD = 2,
	TRANSPORTE = 3,
	PERIFERIA = 4,
}

export default {
	catalogo: CatalogoUbicacion,
	default: {
		subject: defaultSubject({}),
		data: defaultFactorData(),
		// result: defaultSymbolResult({}),
	},
};
