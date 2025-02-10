/** @format */



/** @format */
export interface DropdownProps {
	items?: string[];
	children?: JSX.Element | JSX.Element[];
	trigger?: "click" | "hover" | "contextMenu";
	placement?:
		| "bottomStart"
		| "bottomEnd"
		| "topStart"
		| "topEnd"
		| "leftStart"
		| "leftEnd"
		| "rightStart"
		| "rightEnd";
	title: JSX.Element | JSX.Element[];
	onSelect: (eventKey: string | undefined) => void;
	type?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	appearance?: "default" | "primary" | "link" | "light" | "outline";

	btnSize?: "xs" | "sm" | "md" | "lg";
}
