/** @format */

import { ReactNode } from "react";

export interface TableProps {
	children: ReactNode | ReactNode[];
	className?: string;
	type?: "success" | "danger" | "warning" | "info" | "primary" | "secondary" | "dark";
}
export interface TableComponent {
	name: string;
	header?: string[];
	customHeader?: ReactNode | ReactNode[];
	body?: any[];
	customBody?: ReactNode | ReactNode[];
	footer?: string[];
	customFooter?: ReactNode | ReactNode[];
	hasFooter?: boolean;
}
