/** @format */



export interface SpinnerProps {
	backdrop?: boolean;
	center?: boolean;
	children?: JSX.Element | JSX.Element[];
	inverse?: boolean;
	size?: "xs" | "sm" | "md" | "lg";
	speed?: "fast" | "normal" | "slow";
	vertical?: boolean;
}
