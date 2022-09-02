/** @format */

import { ReactNode, MouseEventHandler } from "react";

export interface ButtonProps {
	children?: ReactNode | ReactNode[];
	type?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	appearance?: "default" | "primary" | "link" | "light" | "outline";
	block?: boolean;
	href?: string;
	loading?: boolean;
	size?: "xs" | "sm" | "md" | "lg";
	onClick?: MouseEventHandler<HTMLElement> | (() => void);
}
export interface SaveProps extends ButtonProps {
	status: "newOne" | "exists";
}
