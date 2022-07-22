/** @format */

import { MouseEventHandler } from "react";

/** @format */
export interface ButtonProps {
	text: string;
	outline?: boolean;
	className?: string;
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
