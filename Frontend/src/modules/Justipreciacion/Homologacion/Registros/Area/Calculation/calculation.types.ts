/** @format */

export interface HeaderProps {
	type: boolean;
	tag: string;
	name: string;
	percentage: number;
}
export interface BodyProps {
	data: any;
	type: boolean;
	salesCost: any;
	root: any;
	surface: any;
	commercial: any;
	percentage: any;
	averageLotArea: number;
	viewAs: "usage" | "export"
}
export interface FooterProps {
	type: boolean;
	subject: number;
	surface: any;
	averageLotArea: number;
	viewAs: "usage" | "export"
}
