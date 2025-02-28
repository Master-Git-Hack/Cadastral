import {
	Daum,
	DaumLabel,
	DaumValue,
	DaumResult,
	ValueLabel,
	SubjectComplex,
	Result,
	Tipo,
	Root,
	Resultado,
} from "./base";
import Factors from "./factores";

export interface IHomologacionState {
	factors: Factores;
	documentation: Resultado;
	id: number;
	type: Tipo;
	appraisalPurpose: string;
}

export interface Factores {
	Age: FactorBase<Subject, Daum>;
	Building: FactorBase<SubjectLabel, DaumLabel>;
	Classification: FactorBase<SubjectLabel, DaumLabel>;
	Commercial: FactorBase<null, DaumValue>;
	Level: FactorBase<SubjectLabel, DaumLabel>;
	Project: FactorBase<SubjectLabel, DaumLabel>;
	Quality: FactorBase<SubjectLabel, DaumLabel>;
	Results: FactorBase<null, DaumValue>;
	Surface: FactorBaseWithRoot<DaumValue, Root>;
	Topography: FactorBase<SubjectLabel, DaumLabel>;
	TypeForm: FactorBase<SubjectLabel, DaumLabel>;
	Usage: FactorBase<SubjectLabel, DaumLabel>;
	Location: FactorBase<SubjectComplex[], DaumValue>;
	Zone: FactorBaseWithResults<SubjectComplex[], DaumValue, Result>;
	Other: FactorBase<null, DaumResult>;
}

export interface FactorBase<S, D> {
	name: string;
	tag: string;
	isUsed: boolean;
	position?: number;
	subject?: S;
	data: D[];
}

export interface FactorBaseWithRoot<D, R> extends FactorBase<null, D> {
	root: R;
}

export interface FactorBaseWithResults<S, D, R> extends FactorBase<S, D> {
	results: R[];
}

export interface Subject {
	value: number;
	operator: number;
}

export interface SubjectLabel {
	label: string;
	value: number;
}

const defaultState: IHomologacionState = {
	id: 0,
	type: Tipo.TERRENO,
	appraisalPurpose: "",
	factors: {
		Age: {
			name: "Edad",
			tag: "FEd.",
			isUsed: false,
			position: 0,
			subject: { value: 1, operator: 0.1 },
			data: Factors.Common.defaultAgeData(),
		},
		Building: {
			name: "Construcción",
			tag: "FCons.",
			position: 7,
			isUsed: false,
			...Factors.Construcciones.default,
		},
		Classification: {
			name: "Clasificación",
			tag: "FClas.",
			isUsed: false,
			position: 0,
			...Factors.Clasificacion.default,
		},
		Commercial: {
			name: "Comercialización",
			tag: "FCom.",
			isUsed: true,
			position: 13,
			data: Factors.Common.defaultValueData(),
		},
		Level: {
			name: "Nivel",
			tag: "FNiv.",
			isUsed: false,
			position: 8,
			...Factors.Nivel.default,
		},
		Project: {
			name: "Proyecto",
			tag: "FProy.",
			isUsed: false,
			position: 0,
			...Factors.Proyecto.default,
		},
		Quality: {
			name: "Calidad",
			tag: "FCal.",
			isUsed: false,
			...Factors.Calidad.default,
		},
		Results: {
			name: "Homologación Resultante",
			tag: "F.Ho.Re.",
			isUsed: true,
			data: [{ id: 0, value: 0 }],
		},
		Surface: {
			name: "Superficie",
			tag: "FSup.",
			isUsed: false,
			...Factors.Superficie.default,
		},
		Topography: {
			name: "Topografía",
			tag: "FTop.",
			isUsed: false,
			position: 0,
			...Factors.Topografia.default,
		},
		TypeForm: {
			name: "Forma",
			tag: "FFo.",
			isUsed: true,
			position: 2,
			...Factors.Forma.default,
		},
		Usage: {
			name: "Uso",
			tag: "FUso.",
			isUsed: true,
			position: 3,
			...Factors.Uso.default,
		},
		Location: {
			name: "Ubicación",
			tag: "FUbic.",
			isUsed: false,
			position: 0,
			...Factors.Ubicacion.default,
		},
		Zone: {
			name: "Zona",
			tag: "FZon.",
			isUsed: false,
			position: 0,
			...Factors.Zona.default,
		},
		Other: {
			name: "Otro",
			tag: "FOtro",
			isUsed: true,
			data: Factors.Common.defaultResult(),
		},
	},
	documentation: {
		Area: {
			name: "",
			tag: "",
			averageLotArea: { name: "", value: 0, surface: 0 },
			subject: {
				name: "",
				value: 0,
				zone: {
					id: 0,
					name: "",
					totalPopulation: 0,
					populationDensity: 0,
					percentage: 0,
				},
				factors: [],
			},
			data: [],
		},
		SalesCost: {
			tag: "",
			data: [{ id: 0, value: 0, unitaryCost: 0 }],
			results: [{ id: 0, factor: { 1: 1, 2: 1 } }],
			averageUnitCost: {
				value: 0,
				roundedValue: 0,
				result: 0,
				adjustedValue: 0,
			},
		},
		WeightingPercentage: {
			total: 0,
			data: [{ id: 0, value: 0 }],
		},
		ReFactor: {
			surface: { label: "", value: 0 },
			form: { label: "", value: 0 },
			result: { label: "", value: 0 },
			root: { value: 0, enabled: false, observations: "" },
			isUsed: false,
		},
		Indiviso: {
			surface: 0,
			building: 0,
			indiviso: 0,
		},
		observations: null,
	},
};
export interface IHomologacionActions {
	updateAge: (data: Daum[], subject: Subject) => Daum[];
	updateResults: (data: Daum[], factors: Factores) => Daum[];
	
}
