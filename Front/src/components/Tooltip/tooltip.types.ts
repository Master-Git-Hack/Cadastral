/** @format */

import { ReactNode } from "react";

export interface TooltipProps {
	id: string;
	children: any;
	tooltip: ReactNode | ReactNode[];
	trigger?: "click" | "contextMenu" | "hover" | "focus" | "active" | "none";
	delay?: number;
	followCursor?: boolean;
	placement?:
		| "top"
		| "bottom"
		| "right"
		| "left"
		| "bottomStart"
		| "bottomEnd"
		| "topStart"
		| "topEnd"
		| "leftStart"
		| "leftEnd"
		| "rightStart"
		| "rightEnd"
		| "auto"
		| "autoVerticalStart"
		| "autoVerticalEnd"
		| "autoHorizontalStart"
		| "autoHorizontalEnd";
}
