/** @format */



export interface TableProps {
	children: JSX.Element | JSX.Element[];
	className?: string;
	type?: "success" | "danger" | "warning" | "info" | "primary" | "secondary" | "dark";
}
export interface TableComponent {
	className?: string;
	name: string;
	header?: string[];
	customHeader?: JSX.Element | JSX.Element[];
	headerClassName?: string;
	body?: any[];
	customBody?: JSX.Element | JSX.Element[];
	bodyClassName?: string;
	footer?: string[];
	customFooter?: JSX.Element | JSX.Element[];
	footerClassName?: string;
	hasFooter?: boolean;
}
