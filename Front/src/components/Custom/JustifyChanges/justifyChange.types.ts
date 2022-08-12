/** @format */

import {  ReactNode } from "react";
/** @format */

export interface ModalProps {
	type?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	appearance?: "default" | "primary" | "link" | "light" | "outline";
	btnSize?: "xs" | "sm" | "md" | "lg";
	size?: "full" | "lg" | "md" | "sm" | "xs";
	action: string;
	name: string;
	editable: boolean;
	setEditable: (checked: boolean)=> void;
	comment: string;
	setComment: (value: string)=> void;
	children: ReactNode | ReactNode[];
}
