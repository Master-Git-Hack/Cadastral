import { defaultFactorData } from "../base";
export enum CatalogoConservacion {
	URBANO = 1.1,
	SUBURBANO = 1.05,
	RUSTICO = 1.0,
	RURAL = 0.95,
}
export interface ICatalogo {
	label: keyof typeof CatalogoConservacion;
	value: number;
}
export const optionsConservacion: ICatalogo[] = Object.entries(
	CatalogoConservacion,
).map(
	([label, value]): ICatalogo => ({
		label: label as keyof typeof CatalogoConservacion,
		value: value as number,
	}),
);
export const defaultSubject = optionsConservacion[0];
export const defaultData = defaultFactorData({ props: defaultSubject });
export default {
	catalogo: CatalogoConservacion,
	options: optionsConservacion,
	default: {
		subject: defaultSubject,
		data: defaultData,
	},
};
