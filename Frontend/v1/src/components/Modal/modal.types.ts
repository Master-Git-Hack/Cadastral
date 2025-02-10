/** @format */



export interface ModalProps {
	action: JSX.Element | JSX.Element[];
	children: JSX.Element | JSX.Element[];
	type?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	appearance?: "default" | "primary" | "link" | "light" | "outline";
	btnSize?: "xs" | "sm" | "md" | "lg";
	size?: "full" | "lg" | "md" | "sm" | "xs";
	header?: JSX.Element | JSX.Element[];
	title?: JSX.Element | JSX.Element[];
	footer?: JSX.Element | JSX.Element[];
}
