import {
	defaultFactorData,
	// defaultSymbolResult,
    defaultSubject
} from "./base";
export enum CatalogoUbicacion {
	EQUIPAMIENTO,
	SERVICIOS,
	DESEABILIDAD,
	TRANSPORTE,
	PERIFERIA,
}

export default {
	catalogo: CatalogoUbicacion,
	default: {
		subject: defaultSubject({}),
		data: defaultFactorData(),
		// result: defaultSymbolResult({}),
	},
};
