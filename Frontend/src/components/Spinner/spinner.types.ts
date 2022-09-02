/** @format */

import { ReactNode } from "react";

export interface SpinnerProps {
	backdrop?: boolean;
	center?: boolean;
	children?: ReactNode | ReactNode[];
	inverse?: boolean;
	size?: "xs" | "sm" | "md" | "lg";
	speed?: "fast" | "normal" | "slow";
	vertical?: boolean;
}
