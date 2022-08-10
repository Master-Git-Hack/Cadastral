/** @format */

import { ReactNode } from "react";

export interface BadgeProps {
	children?: ReactNode | ReactNode[];
	type?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	text: string;
}
