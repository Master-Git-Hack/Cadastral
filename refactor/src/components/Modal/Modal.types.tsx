/** @format */

import { ReactNode } from "react";

/** @format */
export interface ModalProps {
	actionToDo: string;
	title: string;
	children: boolean | ReactNode | ReactNode[];
	btnType?:
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
}
