/** @format */

export interface SpinnerProps {
	backdrop?: boolean;
	center?: boolean;
	children?: React.ReactNode|React.ReactNode[];
	inverse?: boolean;
	size?: "xs" | "sm" | "md" | "lg";
	speed?: "fast" | "normal" | "slow";
	vertical?: boolean;
}
