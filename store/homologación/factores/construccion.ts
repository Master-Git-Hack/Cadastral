import { defaultFactorData } from "./base";
export enum CatalogoConstrucciones {
	"MODERNO SUPERIOR" = 1.08,
	"MODERNO MEDIO" = 1.06,
	"MODERNO ECONÓMICO" = 1.04,
	"MODERNO PRECARIO" = 1.02,
	TRADICIONAL = 1.0,
	PREFABRICADO = 0.98,
	"ANTIGUO SUPERIOR" = 0.96,
	"ANTIGUO MEDIO" = 0.94,
	"ANTIGUO ECONÓMICO" = 0.92,
	"ANTIGUO PRECARIO" = 0.9,
	MIXTAS = 0.88,
}

export interface IConstrucciones {
	label: keyof typeof CatalogoConstrucciones;
	value: number;
}

export const construccionOptions: IConstrucciones[] = Object.entries(
	CatalogoConstrucciones,
).map(
	([label, value]): IConstrucciones => ({
		label: label as keyof typeof CatalogoConstrucciones,
		value: value as number,
	}),
);
export const defaultSubject = construccionOptions[0];
export const defaultData = defaultFactorData({ props: defaultSubject });
export default {
	catalogo: CatalogoConstrucciones,
	options: construccionOptions,
	default: {
		subject: defaultSubject,
		data: defaultData,
	},
};
