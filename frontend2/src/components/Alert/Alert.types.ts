import { ReactNode } from 'react';
/** @format */

export interface AlertProps {
	type?: "success" | "danger" | "warning" | "info" | "primary" | "secondary" | "dark" | "light";
	header?: ReactNode | ReactNode[];
	children: ReactNode | ReactNode[];
	headerStyle?: string;
	bodyStyle?: string;
}
