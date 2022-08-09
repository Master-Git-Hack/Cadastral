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


