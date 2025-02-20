/** @format */

export interface TableProps {
	children: any;
	className?: string;
	type?:
		| "success"
		| "danger"
		| "warning"
		| "info"
		| "primary"
		| "secondary"
		| "dark";
}
export interface TableComponent {
	className?: string;
	name: string;
	header?: string[];
	customHeader?: any;
	headerClassName?: string;
	body?: any[];
	customBody?: any;
	bodyClassName?: string;
	footer?: string[];
	customFooter?: any;
	footerClassName?: string;
	hasFooter?: boolean;
}
