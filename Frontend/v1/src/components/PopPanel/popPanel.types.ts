/** @format */

import { ReactNode } from "react";

export interface PopPanelProps {
	children: ReactNode | ReactNode[];

	placement?: "top" | "bottom" | "left" | "right";
	size?: "full" | "lg" | "md" | "sm" | "xs";
	header?: ReactNode | ReactNode[];
	customPanelActions?: ReactNode | ReactNode[];
	action?: ReactNode | ReactNode[];
	btnType?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	btnAppearance?: "default" | "primary" | "link" | "light" | "outline";
	block?: boolean;
	loading?: boolean;
	btnSize?: "xs" | "sm" | "md" | "lg";
	onEnter?: () => void;
}
