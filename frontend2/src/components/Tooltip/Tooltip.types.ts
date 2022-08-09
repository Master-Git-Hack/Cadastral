/** @format */

import { ReactNode } from "react";

export interface TooltipProps {
	id: string;
	placement?: "top" | "bottom" | "left" | "right";
	tooltip?: string | number;
	children: any;
	customTooltip?: ReactNode | ReactNode[];
}
