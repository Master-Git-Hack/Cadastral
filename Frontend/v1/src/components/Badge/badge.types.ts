/** @format */



export interface BadgeProps {
	children?: JSX.Element | JSX.Element[];
	type?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	text: string;
}
