/** @format */



export interface PopPanelProps {
	children: JSX.Element | JSX.Element[];

	placement?: "top" | "bottom" | "left" | "right";
	size?: "full" | "lg" | "md" | "sm" | "xs";
	header?: JSX.Element | JSX.Element[];
	customPanelActions?: JSX.Element | JSX.Element[];
	action?: JSX.Element | JSX.Element[];
	btnType?: "danger" | "success" | "warning" | "info" | "primary" | "secondary" | "orange";
	btnAppearance?: "default" | "primary" | "link" | "light" | "outline";
	block?: boolean;
	loading?: boolean;
	btnSize?: "xs" | "sm" | "md" | "lg";
	onEnter?: () => void;
}
