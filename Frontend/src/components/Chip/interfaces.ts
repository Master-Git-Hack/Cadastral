/** @format */

import { ReactNode } from "react";

export interface ChipProps {
	children: ReactNode | ReactNode[];
	helpText: string;
	successful?: boolean;
	loading?: boolean;
	color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
	size: "medium" | "small" | string;
	variant: "filled" | "outlined" | string;
	justifyContent?: "flex-start" | "center" | "flex-end";
}
