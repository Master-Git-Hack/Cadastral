/** @format */

import type { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
	children?: string | ReactNode | ReactNode[];
	type?:
		| "danger"
		| "success"
		| "warning"
		| "info"
		| "primary"
		| "secondary"
		| "orange";
	appearance?: "default" | "primary" | "link" | "light" | "outline";
	block?: boolean;
	href?: string;
	loading?: boolean;
	size?: "xs" | "sm" | "md" | "lg";
	onClick?: MouseEventHandler<HTMLElement> | (() => void);
	[key: string]: any;
}
export interface SaveProps extends ButtonProps {
	status: "newOne" | "exists";
}
