import { Tipo, zoneInformation, Area, defaultRootFactor } from "../base";
export const base = {
	name: {
		[Tipo.TERRENO]: "Áreas ",
		[Tipo.RENTA]: "Sup. Const ",
	},
	tag: {
		[Tipo.TERRENO]: "Área de Lote Moda",
		[Tipo.RENTA]: "Superficie del sujeto",
	},
	averageLotArea: {
		name: {
			[Tipo.TERRENO]: "SUPERFICIE LOTE MODA",
			[Tipo.RENTA]: "SUPERFICIE DEL COMPARABLE",
		},
		value: 1,
		surface: 1,
	},
	subject: {
		name: {
			[Tipo.TERRENO]: "SUPERFIICE TOTAL DEL TERRENO",
			[Tipo.RENTA]: "SUPERFICIE DEL SUJETO",
		},
		value: 1,
		zone: zoneInformation[0],
	},
};
export default {
	...base,
	default: {
		name: base.name[Tipo.TERRENO],
		tag: base.name[Tipo.TERRENO],
		averageLotArea: {
			name: base.averageLotArea.name[Tipo.TERRENO],
			value: 1,
			surface: 1,
		},
		subject: {
			name: base.subject.name[Tipo.TERRENO],
			value: 1,
			zone: zoneInformation[0],
		},
		factors: defaultRootFactor({}),
	}, 
};
