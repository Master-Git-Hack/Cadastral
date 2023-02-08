/** @format */

import { Input } from "../editable.interfaces";

export interface EnabledNumberProps extends Input {
	value: number;
	defaultValue: string;
	checkedText: string;
	uncheckedText: string;
	label?: string;
	justifyContent?: "flex-start" | "center" | "flex-end";
}
