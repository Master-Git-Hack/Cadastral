/** @format */

import { ReactNode } from "react";
export interface SwitchProps {
	checked?: boolean;
	onChange: (checked: boolean) => void;
	withText?: boolean;
	label?: ReactNode | ReactNode[];
	checkedText?: ReactNode;
	uncheckedText?: ReactNode;
	size?: "lg" | "md" | "sm";
	reverse?: boolean;
}
