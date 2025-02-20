export enum Tipo {
	TERRENO = 0,
	RENTA = 1,
}

export const TipoMap: Record<string, Tipo> = {
	TERRENO: Tipo.TERRENO,
	RENTA: Tipo.RENTA,
};

export const TipoReverseMap: Record<Tipo, string> = {
	[Tipo.TERRENO]: "TERRENO",
	[Tipo.RENTA]: "RENTA",
};
export const parseTipo = (value: string | number): Tipo => {
	if (typeof value === "number") return value as Tipo;
	return TipoMap[value.toUpperCase()];
};
export interface Root {
    value: number;
    enabled: boolean;
    observations: string;
}
export interface Daum {
	id: number;
	value: number;
	result: number;
}
export interface Result {
	id: number;
	factor: Record<number, number>;
}
export interface DaumLabel extends Daum {
	label: string;
}
export interface DaumValue {
	id: number;
	value: number;
}

export interface DaumResult {
	id: number;
	result: number;
}

export interface IDefaultData {
	size?: number;
	props?: Partial<DaumLabel | Daum>;
}
export interface IDefaultSymbolData {
	size?: number;
	props?: Partial<DaumValue>;
}
export interface IDefaultSymbolResult {
	size?: number;
	props?: Partial<Result>;
}
export const defaultAgeData = ({
	props = {} as Daum,
	size = 4,
}: IDefaultData = {}): Daum[] => {
	const data: Daum[] = [];
	const defaultProps: Omit<Daum, "id"> = {
		value: props?.value ?? 1,
		result: props?.result ?? 1,
	};

	for (let i = 0; i < size; i++) {
		data.push({ ...defaultProps, id: i + 1 } as Daum);
	}
	return data;
};
export const defaultValueData = ({
	props = {} as DaumValue,
	size = 4,
}: IDefaultData = {}): DaumValue[] => {
	const data: DaumValue[] = [];
	const defaultProps: Omit<DaumValue, "id"> = {
		value: props.value ?? 1,
	};

	for (let i = 0; i < size; i++) {
		data.push({ ...defaultProps, id: i + 1 } as DaumValue);
	}
	return data;
};
export const defaultFactorData = ({
	props = {} as DaumLabel,
	size = 4,
}: IDefaultData = {}): DaumLabel[] => {
	const data: DaumLabel[] = [];
	const defaultProps: Omit<DaumLabel, "id"> = {
		value: props.value ?? 1,
		result: props.result ?? 1,
		label: (props as Partial<DaumLabel>)?.label ?? "",
	};

	for (let i = 0; i < size; i++) {
		data.push({ ...defaultProps, id: i + 1 } as DaumLabel);
	}
	return data;
};
export const defaultSymbolData = ({
	props = {} as DaumValue,
	size = 4,
}: IDefaultSymbolData): DaumValue[] => {
	const data: DaumValue[] = [];
	const defaultProps: Omit<DaumValue, "id"> = {
		value: props.value ?? 1,
	};

	for (let i = 0; i < size; i++) {
		data.push({ ...defaultProps, id: i + 1 } as DaumValue);
	}
	return data;
};
export const defaultSymbolResult = ({
	props = {} as Result,
	size = 4,
}: IDefaultSymbolResult): Result[] => {
	const data: Result[] = [];
	const defaultProps: Omit<Result, "id"> = {
		factor: props.factor ?? { 1: 1, 2: 1 },
	};
	for (let i = 0; i < size; i++) {
		data.push({ ...defaultProps, id: i + 1 } as Result);
	}
	return data;
};
export enum CatalogoSymbols {
	"+" = 1,
	"=" = 0,
	"-" = -1,
}
export type CKeys = `C${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`;
export interface ValueLabel {
	label: string | keyof typeof CatalogoSymbols;
	value: number;
}
export interface SubjectComplex extends Partial<Record<CKeys, ValueLabel>> {
	id: number;
	percentage: number;
	observations: string;
}
export const symbolsOptions: ValueLabel[] = Object.entries(CatalogoSymbols).map(
	([label, value]): ValueLabel => ({
		label: label as keyof typeof CatalogoSymbols,
		value: value as number,
	}),
);
export interface IDefaultSubject {
	size?: number;
	props?: Partial<SubjectComplex>;
}
export const defaultSubject = ({
	props = {} as SubjectComplex,
	size = 4,
}: IDefaultSubject): SubjectComplex[] => {
	const data: SubjectComplex[] = [];
	const defaultProps: Omit<SubjectComplex, "id"> = {
		C1: props?.C1 ?? defaultSymbol,
		C2: props?.C2 ?? defaultSymbol,
		C3: props?.C3 ?? defaultSymbol,
		C4: props?.C4 ?? defaultSymbol,
		percentage: props?.percentage ?? 10,
		observations: props?.observations ?? "",
	};
	for (let i = 0; i < size; i++) {
		data.push({ ...defaultProps, id: i + 1 } as SubjectComplex);
	}
	return data;
};
export const defaultResult= ({props={} as DaumResult, size=4}: IDefaultData = {}): DaumResult[] => {
    const data: DaumResult[] = [];
    const defaultProps: Omit<DaumResult, "id"> = {
        result: props.result ?? 1
    };
    for (let i = 0; i < size; i++) {
        data.push({ ...defaultProps, id: i + 1 } as DaumResult);
    }
    return data;
}
export const defaultSymbol: ValueLabel = symbolsOptions[0];
export const defaultRoot: Root = {
    value: 8,
    enabled: false,
    observations: "",
}
export default {
    Tipo,
    TipoMap,
    TipoReverseMap,
    parseTipo,
	defaultAgeData,
	defaultFactorData,
	defaultValueData,
	defaultSymbol,
	defaultSymbolData,
	defaultSymbolResult,
	symbolsOptions,
    defaultSubject,
    defaultResult,
    defaultRoot,
};
