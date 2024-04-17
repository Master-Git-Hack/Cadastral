/** @format */

import { ReactNode } from "react";
/** @format */

export interface RangeProps {
	defaultValue?: number;
	value: number;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	progress?: boolean;
	customTooltip?: (value: number) => ReactNode;
}
