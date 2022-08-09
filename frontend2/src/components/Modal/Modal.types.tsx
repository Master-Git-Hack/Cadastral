/** @format */

import React, { ReactNode } from "react";

/** @format */
export interface ModalProps {
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
	action: ReactNode | ReactNode[];
	overflow?: boolean;
	backdrop?: "static" | boolean;
	size?: "full" | "lg" | "md" | "sm" | "xs";
	title?: ReactNode | ReactNode[];
	children: boolean | ReactNode | ReactNode[];
	footer?: boolean | ReactNode | ReactNode[];
}
