/** @format */

export interface Properties {
	[key: string | number]: any;
}
export interface AreaProps extends Properties {
	name: string;
	tag: string;
	averageLotArea: Properties;
	subject: Properties;
	data: Properties[];
}
export interface IndivisoProps extends Properties {
	surface?: number;
	building?: number;
	indiviso?: number;
	result?: number;
}

export interface SalesCostProps extends Properties {
	data: Properties[];
	results: Properties[];
	averageUnitCost: Properties;
	tag: string;
}

export interface WeightingPercentageProps extends Properties {
	total: number;
	data: Array<Properties>;
}
