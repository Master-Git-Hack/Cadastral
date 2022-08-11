/** @format */

import { ReactNode } from "react";

export interface ModalProps {
	action: ReactNode | ReactNode[];
	children: ReactNode | ReactNode[];
	type?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	appearance?: "default" | "primary" | "link" | "light" | "outline";
	btnSize?: "xs" | "sm" | "md" | "lg";
	size?: "full" | "lg" | "md" | "sm" | "xs";
	header?: ReactNode | ReactNode[];
	title?: ReactNode | ReactNode[];
	footer?: ReactNode | ReactNode[];
}
