/** @format */

export interface ICellSize {
	[key: string]:
		| "cell"
		| "doubleCell"
		| "tripleCell"
		| "quadrupleCell"
		| "quintupleCell"
		| "sextupleCell"
		| "septupleCell";
}
export interface ColumnsProps {
	text: string;
	value: string | number;
	isURL?: boolean;
	textSize?: ICellSize;
	valueSize?: ICellSize;
}
export interface SimpleRowProps {
	leftText: string;
	leftValue: string | number;
	leftTextSize?: ICellSize;
	leftValueSize?: ICellSize;
	rightText: string;
	rightValue: string | number;
	rightTextSize?: ICellSize;
	rightValueSize?: ICellSize;
	isLeftURL?: boolean;
	isRightURL?: boolean;
}
export interface IServices {
	agua: boolean;
	drenaje: boolean;
	energia_electrica: boolean;
	alumbrado_publico: boolean;
	banqueta: boolean;
	pavimento: boolean;
	telefonia: boolean;
}
