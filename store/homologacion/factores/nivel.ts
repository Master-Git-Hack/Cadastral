import { defaultFactorData } from "../base";
export enum CatalogoNivel {
	"SOTANO 1" = 0.9,
	"SOTANO 2" = 0.95,
	"P.B. NIVEL DE CALLE" = 1.0,
	"P.A. NIVEL DE CALLE" = 1.05,
}
export interface INivel {
	label: keyof typeof CatalogoNivel;
	value: number;
}
export const nivelOptions: INivel[] = Object.entries(CatalogoNivel).map(
	([label, value]): INivel => ({
		label: label as keyof typeof CatalogoNivel,
		value: value as number,
	}),
);
export const defaultSubject: INivel = nivelOptions[0];
export const defaultData = defaultFactorData({ props: defaultSubject });
export default {
	catalogo: CatalogoNivel,
	options: nivelOptions,
	default: {
		subject: defaultSubject,
		data: defaultData,
	},
};
