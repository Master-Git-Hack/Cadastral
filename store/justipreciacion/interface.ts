/** @format */

import { Tipo } from "../homologación/base";

export type SPKeys = `sp${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`;
export type CNKeys =
	`cn${"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j"}`;

export interface IJustipreciacionState
	extends Partial<
			Record<SPKeys, { vu?: number; factor?: number; superficie?: number }>
		>,
		Partial<
			Record<CNKeys, { edad?: number; superficie?: number; vu?: number }>
		> {
	id: number;
	registro: string | null;
	tipo: Tipo | keyof typeof Tipo;
	comparativo_mercado: number;
	valor_total_obras_comp: number;
	exists:Record<Tipo,boolean>
}

export interface IJustipreciacionActions {
	setJustipreciacion: (justipreciacion: Partial<IJustipreciacionState>) => void;
	clearJustipreciacion: () => void;
	getJustipreciacionById: (key?:string,includes?:string[],excludes?:string[],isLegacy?:boolean) => void;
	getJustipreciacionByRegistro: (key?:string,includes?:string[],excludes?:string[],isLegacy?:boolean) => void;
	patchJustipreciacion: (isLegacy?:boolean) => void;
	flattenObject<T extends Record<string, any>>(obj: T): Record<string, any>;
}

// Estado por defecto
export const defaultState: IJustipreciacionState = {
	id: 0,
	registro: null,
	tipo: Tipo.TERRENO,
	sp1: { vu: 0, superficie: 0, factor: 0 },
	sp2: { vu: 0, superficie: 0, factor: 0 },
	sp3: { vu: 0, superficie: 0, factor: 0 },
	sp4: { vu: 0, superficie: 0, factor: 0 },
	cna: { edad: 0, superficie: 0, vu: 0 },
	cnb: { edad: 0, superficie: 0, vu: 0 },
	cnc: { edad: 0, superficie: 0, vu: 0 },
	cnd: { edad: 0, superficie: 0, vu: 0 },
	comparativo_mercado: 0,
	valor_total_obras_comp: 0,
	exists:{[Tipo.TERRENO]:false,[Tipo.RENTA]:false}
};

function flattenObject<T extends Record<string, any>>(
	obj: T,
): Record<string, any> {
	const flattened: Record<string, any> = {};

	for (const key in obj) {
		if (typeof obj[key] === "object" && obj[key] !== null) {
			for (const subKey in obj[key]) {
				flattened[`${key}_${subKey}`] = obj[key][subKey];
			}
		} else {
			flattened[key] = obj[key];
		}
	}

	return flattened;
}
//const flattened = flattenObject(original);
