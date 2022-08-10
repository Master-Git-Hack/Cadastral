/** @format */

import { ReactNode } from "react";
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
	onSelect: (eventKey: string, event: any) => void;
	size?: "xs" | "sm" | "md" | "lg";
}
