/** @format */

import { MouseEventHandler, ReactNode } from "react";

/** @format */
export interface ButtonProps {
	children: ReactNode|ReactNode[];
	outline?: boolean;
	className?: string;
	name?: string;
	type:
		| "success"
		| "danger"
		| "warning"
		| "info"
		| "primary"
		| "secondary"
		| "dark"
		| "light"
		| "link"
		| string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface ButtonProps2 {
	active?: boolean;
	appearance?: "default" | "primary" | "link" | "subtle" | "ghost";
	color?: "red" | "orange" | "yellow" | "green" | "cyan" | "blue" | "violet";
	as?: "button" | "a" | "input";
	block?: boolean;
	children?: ReactNode;
	classPrefix?: string;
	disabled?: boolean;
	href?: string;
	loading?: boolean;
	size?: "sm" | "md" | "lg" | "xs";
	onClick?: MouseEventHandler<HTMLButtonElement>;
	hasIcon?: boolean;
	circle?: boolean;
	icon?: ReactNode;
	placement?: "left" | "right";
}
