/** @format */

export interface AlertProps {
	closable?: boolean;
	duration?: number;
	header?: JSX.Element;
	type: "success" | "info" | "warning" | "error";
	children: JSX.Element | JSX.Element[];
}
