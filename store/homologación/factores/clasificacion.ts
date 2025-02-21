import { defaultFactorData } from "../base";
export enum CatalogoClasificacion {
	URBANO = 1.1,
	SUBURBANO = 1.05,
	RUSTICO = 1.0,
	RURAL = 0.95,
}
export interface IClasificacion {
	label: keyof typeof CatalogoClasificacion;
	value: number;
}
export const clasificacionOptions: IClasificacion[] = Object.entries(
	CatalogoClasificacion,
).map(
	([label, value]): IClasificacion => ({
		label: label as keyof typeof CatalogoClasificacion,
		value: value as number,
	}),
);
export const defaultSubject: IClasificacion = clasificacionOptions[0];
export const defaultData = defaultFactorData({ props: defaultSubject });
export default {
	catalogo: CatalogoClasificacion,
	options: clasificacionOptions,
	default: {
		subject: defaultSubject,
		data: defaultData,
	},
};
