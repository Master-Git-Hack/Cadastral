/** @format */

import { ReactNode } from "react";

/** @format */
export interface DropdownProps {
	items?: string[];
	children?: ReactNode | ReactNode[];
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
	title: ReactNode | ReactNode[];
	onSelect: (eventKey: string | undefined) => void;
	type?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	appearance?: "default" | "primary" | "link" | "light" | "outline";

	btnSize?: "xs" | "sm" | "md" | "lg";
}
