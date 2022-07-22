/** @format */

export interface AlertProps {
	type?: "success" | "danger" | "warning" | "info" | "primary" | "secondary" | "dark" | "light";
	header?: string;
	body: string;
	headerStyle?: string;
	bodyStyle?: string;
}
