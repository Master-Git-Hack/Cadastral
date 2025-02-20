import {
	Daum,
	DaumLabel,
	DaumValue,
	DaumResult,
	ValueLabel,
	SubjectComplex,
	Result,Tipo,Root,
} from "./factores/base";
import Factors from "./factores";
import { Factores } from "@/Frontend/v1/src/modules/Justipreciacion/Homologacion/Factores";

export interface IHomologacionState {
	factors: Factores;
	documentation: Resultado;
    id: number;
    type:Tipo;
    appraisalPurpose: string;
};

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

export interface FactorBaseWithRoot<D, R>
	extends FactorBase<null, D> {
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



export interface Resultado {
	Area: Area;
	SalesCost: SalesCost;
	WeightingPercentage: WeightingPercentage;
	ReFactor: ReFactor;
	Indiviso: Indiviso;
	observations: string;
}

export interface Area {
	name: string;
	tag: string;
	averageLotArea: AverageLotArea;
	subject: SubjectArea;
	data: DaumArea[];
}

export interface AverageLotArea {
	name: string;
	value: number;
	surface: number;
}

export interface SubjectArea {
	name: string;
	value: number;
	zone: ZoneData;
	factors: Factor[];
}

export interface ZoneData {
	id: number;
	name: string;
	totalPopulation: number;
	populationDensity: number;
	percentage: number;
}

export interface Factor {
	id: number;
	type: Tipo;
	root: number;
}

export interface DaumArea {
	id: number;
	value: number;
	surface: number;
	address: Address;
	factorResult: Record<number, number>;
}

export interface Address {
	street: string;
	streetNumber: number;
	hasNoStreetNumber: boolean;
	colony: string;
	zone: ZoneData;
	extras: Extras;
}

export interface Extras {
	factor:Record<number, number>;
	date: string;
	observations: string;
	reference: string;
	document: Document;
}

export interface Document {
	filename: string;
	file: any;
}

export interface SalesCost {
	tag: string;
	data: DaumCost[];
	results: Result[];
	averageUnitCost: AverageUnitCost;
}

export interface DaumCost {
	id: number;
	value: number;
	unitaryCost: number;
}

export interface AverageUnitCost {
	value: number;
	roundedValue: number;
	result: number;
	adjustedValue: number;
}

export interface WeightingPercentage {
	total: number;
	data: DaumValue[];
}

export interface ReFactor {
	surface: ValueLabel;
	form: ValueLabel;
	result: ValueLabel;
	root: Root;
	isUsed: boolean;
}

export interface Indiviso {
	surface: number;
	building: number;
	indiviso: number;
}

const defaultState: IHomologacionState = {
    id: 0,
    type:Tipo.TERRENO,
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
            position:0,
			...Factors.Topografia.default,
		},
		TypeForm: {
			name: "",
			tag: "",
			isUsed: false,
			data: [{ id: 0, value: 0, result: 0, label: "" }],
		},
		Usage: {
			name: "",
			tag: "",
			isUsed: false,
			data: [{ id: 0, value: 0, result: 0, label: "" }],
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
			data: [
				{
					id: 0,
					value: 0,
					surface: 0,
					address: {
						street: "",
						streetNumber: 0,
						hasNoStreetNumber: false,
						colony: "",
						zone: {
							id: 0,
							name: "",
							totalPopulation: 0,
							populationDensity: 0,
							percentage: 0,
						},
						extras: {
							factor:{1:1,2:1},
							date: "",
							observations: "",
							reference: "",
							document: { filename: "", file: null },
						},
					},
				},
			],
		},
		SalesCost: {
			tag: "",
			data: [{ id: 0, value: 0, unitaryCost: 0 }],
			results: [{ id: 0, factor:{1:1,2:1} }],
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
		observations: "",
	},
};
export interface IHomologacionActions {
	updateAge: (data: Daum[], subject: Subject) => Daum[];
    updateResults:(data: Daum[], factors:Factores) => Daum[];
}
