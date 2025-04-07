import { defaultFactorData } from "../base";
export enum CatalogoProyecto {
	EXCELENTE = 1.06,
	"MUY BUENO" = 1.03,
	FUNCIONAL = 1.0,
	ADECUADO = 0.98,
	REGULAR = 0.96,
	INADECUADO = 0.94,
	DEFICIENTE = 0.92,
	OBSOLETO = 0.9,
	INEXISTENTE = 0.88,
}

export interface IProyecto {
	label: keyof typeof CatalogoProyecto;
	value: number;
}

export const proyectoOptions: IProyecto[] = Object.entries(
	CatalogoProyecto,
).map(([label, value]) => ({
	label: label as keyof typeof CatalogoProyecto,
	value: value as number,
}));
export const defaultSubject: IProyecto = proyectoOptions[0];
export default {
	catalogo: CatalogoProyecto,
	options: proyectoOptions,
	default: {
		subject: defaultSubject,
		data: defaultFactorData({ props: defaultSubject }),
	},
};
