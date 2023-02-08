/** @format */

import { ReactElement } from "react";

export interface TooltipProps {
	children: ReactElement<any, any>;
	sx?: object;
	placement?:
		| "top"
		| "right"
		| "bottom"
		| "left"
		| "top-start"
		| "top-end"
		| "right-start"
		| "right-end"
		| "bottom-start"
		| "bottom-end"
		| "left-start"
		| "left-end";
	helpText: string;
}
