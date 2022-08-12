/** @format */

import { ReactNode } from "react";

export interface AlertProps {
	closable?: boolean;
	duration?: number;
	header?: ReactNode;
	type: "success" | "info" | "warning" | "error";
	children: ReactNode | ReactNode[];
}
