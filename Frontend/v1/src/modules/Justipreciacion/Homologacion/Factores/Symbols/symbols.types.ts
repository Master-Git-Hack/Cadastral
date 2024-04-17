/** @format */
export interface SymbolsProps {}
export interface LocationZoneProps {
	name: "Location" | "Zone";
	tag?: "FUbic." | "FZon.";
}
export interface LocationZoneColumnsProps extends LocationZoneProps {
	columns: Array<string>;
}
export interface LocationZoneActionsProps extends LocationZoneProps {
	colSpan: number;
	length: number;
}
export interface LocationZoneColumnsProps extends LocationZoneProps {
	columns: Array<string>;
}
export interface ColumnsBodyProps {
	index: number;
	columns: string[];
	item: any;
	name: string;
	options: Array<any>;
}
export interface FooterProps {
	name: string;
	results: Array<any>;
}
