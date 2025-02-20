/** @format */

import { SyntheticEvent } from "react";

/** @format */
export interface DropdownProps {
	items: string[];
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
	activeKey: string;
	title: string;
	onSelect: (eventKey: string, event: SyntheticEvent<Element, Event>) => void;
	size?: "xs" | "sm" | "md" | "lg";
	type?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	appearance?: "default" | "primary" | "link" | "light" | "outline";
	disabled?: boolean;
}
