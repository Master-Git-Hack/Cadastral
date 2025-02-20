/** @format */

export interface PopPanelProps {
	children: React.ReactNode|React.ReactNode[];

	placement?: "top" | "bottom" | "left" | "right";
	size?: "full" | "lg" | "md" | "sm" | "xs";
	header?: React.ReactNode|React.ReactNode[];
	customPanelActions?: React.ReactNode|React.ReactNode[];
	action?: React.ReactNode|React.ReactNode[];
	btnType?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	btnAppearance?: "default" | "primary" | "link" | "light" | "outline";
	block?: boolean;
	loading?: boolean;
	btnSize?: "xs" | "sm" | "md" | "lg";
	onEnter?: () => void;
}
