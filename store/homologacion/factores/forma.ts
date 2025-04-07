import { Tipo, defaultFactorData } from "../base";

export enum CatalogoFormaTipoRenta {
	REGULAR = 1.0,
	"IRREGULAR LIGERO" = 0.98,
	"P.I. DE 4 LADOS" = 0.96,
	"P.I. DE 5 LADOS" = 0.94,
	"P.I. DE 6 LADOS" = 0.92,
	"IRREGULAR PESADO" = 0.9,
}

export enum CatalogoFormaTipoTerreno {
	REGULAR = 1.0,
	"IRREGULAR LIGERO" = 0.98,
	"P.I. DE 4 LADOS" = 0.95,
	"P.I. DE 5 LADOS" = 0.93,
	"P.I. DE 6 LADOS" = 0.9,
	"IRREGULAR PESADO" = 0.85,
}

const enumToOptions = (
	enumObj: typeof CatalogoFormaTipoRenta | typeof CatalogoFormaTipoTerreno,
) => Object.entries(enumObj).map(([label, value]) => ({ label, value }));

export const opcionsRenta = enumToOptions(CatalogoFormaTipoRenta);
export const opcionsTerreno = enumToOptions(CatalogoFormaTipoTerreno);
export const defaultSubject = opcionsTerreno[0];
export default {
	catalogo: {
		[Tipo.TERRENO]: CatalogoFormaTipoTerreno,
		[Tipo.RENTA]: CatalogoFormaTipoRenta,
	},
	opciones: {
		[Tipo.TERRENO]: opcionsTerreno,
		[Tipo.RENTA]: opcionsRenta,
	},
	default: {
		subject: defaultSubject,
		data: defaultFactorData({ props: defaultSubject }),
	},
};
