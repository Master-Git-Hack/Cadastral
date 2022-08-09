/** @format */

export interface TitleProps {
	name?: string;
	title?: string;
	colSpan?: number;
}

export interface CommonProps {
	name:
		| "Building"
		| "Classification"
		| "Level"
		| "Project"
		| "Quality"
		| "Topography"
		| "TypeForm"
		| "Usage";
}
export interface LocationZoneProps {
	name: "Location" | "Zone";
	tag?: "FUbic." | "FZon.";
}
export interface LocationZoneActionsProps extends LocationZoneProps {
	colSpan: number;
	length: number;
}
export interface LocationZoneColumnsProps extends LocationZoneProps {
	columns: Array<string>;
}

export interface Container {
	component1:
		| "Building"
		| "Classification"
		| "Level"
		| "Project"
		| "Quality"
		| "Topography"
		| "TypeForm"
		| "Usage";
	component2:
		| "Building"
		| "Classification"
		| "Level"
		| "Project"
		| "Quality"
		| "Topography"
		| "TypeForm"
		| "Usage";
}
