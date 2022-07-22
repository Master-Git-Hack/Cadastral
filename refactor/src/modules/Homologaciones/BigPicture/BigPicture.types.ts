/** @format */

export interface HeaderProps {
	factorsUsed: number;
	type: boolean;
	children: JSX.Element | JSX.Element[];
	salesCost: string;
	area: string;
}
export interface BodyProps {
	rows: Array<number>;
	keys: Array<string>;
	factors: any;
	results: any;
	salesCost: any;
	area: any;
	type: boolean;
	percentage: any;
}
export interface FooterProps {
	value: number;
	colSpan: number;
	type: boolean;
	subjectArea: number;
	averageLotArea: number;
	roundedTo: any;
	roundedValue: number;
}
export interface ColumnProps {
	id: string;
	value: number;
	isCurrency?: boolean;
	isPercentage?: boolean;
	isArea?: boolean;
	tooltip?: boolean;
	rowSpan?: number;
}
