/** @format */

import React from "react";

export interface TooltipProps {
	id: string;
	placement?: "top" | "bottom" | "left" | "right";
	tooltip?: string | number;
	children: any;
	customTooltip?: JSX.Element | JSX.Element[];
}
