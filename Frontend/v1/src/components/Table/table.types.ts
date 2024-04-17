/** @format */

import { ReactNode } from "react";

export interface TableProps {
	children: ReactNode | ReactNode[];
	className?: string;
	type?: "success" | "danger" | "warning" | "info" | "primary" | "secondary" | "dark";
}
export interface TableComponent {
	className?: string;
	name: string;
	header?: string[];
	customHeader?: ReactNode | ReactNode[];
	headerClassName?: string;
	body?: any[];
	customBody?: ReactNode | ReactNode[];
	bodyClassName?: string;
	footer?: string[];
	customFooter?: ReactNode | ReactNode[];
	footerClassName?: string;
	hasFooter?: boolean;
}
