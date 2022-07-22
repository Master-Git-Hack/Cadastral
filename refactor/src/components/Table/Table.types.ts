/** @format */

import { ReactElement } from "react";

export interface TableProps {
	children: any;
	className?: string;
	type?: "success" | "danger" | "warning" | "info" | "primary" | "secondary" | "dark";
}
export interface TableComponent {
	name: string;
	header?: string[];
	customHeader?: JSX.Element | JSX.Element[] | Element | Element[] | ReactElement<any, any>;
	body?: any[];
	customBody?: JSX.Element | JSX.Element[] | Element | Element[] | ReactElement<any, any>;
	footer?: string[];
	customFooter?: JSX.Element | JSX.Element[] | Element | Element[] | ReactElement<any, any>;
	hasFooter?: boolean;
}
