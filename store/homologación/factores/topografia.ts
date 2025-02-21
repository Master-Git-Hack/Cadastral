import { defaultFactorData } from "../base";
export enum CatalogoTopo {
	PLANA = 1.0,
	PENDIENTE_LIGERA = 0.97,
	PENDIENTE_INCLINADA = 0.94,
	PENDIENTE_ACCIDENTADA = 0.91,
}
export interface ITopo {
	label: keyof typeof CatalogoTopo;
	value: number;
}

export const TopoOptions: ITopo[] = Object.entries(CatalogoTopo).map(
	([label, value]) => ({
		label: label as keyof typeof CatalogoTopo,
		value: value as number,
	}),
);
export const defaultSubject: ITopo = TopoOptions[0];
export const defaultData = defaultFactorData({ props: defaultSubject });
export default {
	catalogo: CatalogoTopo,
	options: TopoOptions,
	default: {
		subject: defaultSubject,
		data: defaultData,
	},
};
