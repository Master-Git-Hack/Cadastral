/** @format */

import { ReactNode } from "react";

export interface EnabledNumberProps {
	defaultValue?: number;
	max?: number;
	min?: number;
	step?: number;
	value: number;
	onChange: (value: number) => void;
	size?: "lg" | "md" | "sm" | "xs";
	postfix?: ReactNode;
	prefix?: ReactNode;
	checked: boolean;
	setChecked: (checked: boolean) => void;
}
