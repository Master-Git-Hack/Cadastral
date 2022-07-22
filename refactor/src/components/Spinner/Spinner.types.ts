/** @format */

export interface SpinnerProps {
	animation?: "border" | "grow";
	type?: "success" | "danger" | "warning" | "info" | "primary" | "secondary" | "dark" | "light";
	className?: string;
	text?: string;
	size?: "sm" | "md" | "lg";
}
