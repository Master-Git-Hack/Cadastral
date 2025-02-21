import {
	defaultFactorData,
	defaultSymbolResult,
	defaultSubject,
} from "../base";
export enum CatalogoZona {
	MANZANA = 0,
	VIALIDAD = 1,
	PAVIMENTO = 2,
}

export default {
	catalogo: CatalogoZona,
	default: {
		subject: defaultSubject({}),
		data: defaultFactorData(),
		results: defaultSymbolResult({}),
	},
};
