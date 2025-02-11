/** @format */

export interface ModalProps {
	action: React.ReactNode|React.ReactNode[];
	children: React.ReactNode|React.ReactNode[];
	type?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	appearance?: "default" | "primary" | "link" | "light" | "outline";
	btnSize?: "xs" | "sm" | "md" | "lg";
	size?: "full" | "lg" | "md" | "sm" | "xs";
	header?: React.ReactNode|React.ReactNode[];
	title?: React.ReactNode|React.ReactNode[];
	footer?: React.ReactNode|React.ReactNode[];
}
